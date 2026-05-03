# ============================================================
# PHASE 3 — FastAPI + MongoDB Backend
# ============================================================

# fastapi → the web framework
from fastapi import FastAPI, UploadFile, File

# CORSMiddleware → allows React to talk to this backend
from fastapi.middleware.cors import CORSMiddleware

# BaseModel → validates incoming data shape
from pydantic import BaseModel

# Optional → field is not required (used in PATCH)
from typing import Optional

# motor → async MongoDB driver for Python
# AsyncIOMotorClient → connects to MongoDB
import motor.motor_asyncio

# os → to handle file paths
import os

# shutil → to save uploaded files to disk
import shutil

# StaticFiles → serves uploaded images to React
from fastapi.staticfiles import StaticFiles


# ============================================================
# APP SETUP
# ============================================================

# create the FastAPI app
app = FastAPI()

# allow React (localhost:3000) to talk to this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================================
# MONGODB CONNECTION
# ============================================================

# connect to MongoDB running on your computer
# 27017 is the default MongoDB port
client = motor.motor_asyncio.AsyncIOMotorClient("mongodb://localhost:27017")

# create or connect to a database called "traveljournal"
# MongoDB creates it automatically if it doesn't exist
db = client["traveljournal"]

# create or connect to a collection called "trips"
# collection = table in SQL databases
# MongoDB creates it automatically if it doesn't exist
trips_collection = db["trips"]

# collection for wishlist trips
wishlist_collection = db["wishlist"]


# ============================================================
# UPLOADS FOLDER SETUP
# ============================================================

# create uploads folder if it doesn't exist
# this is where photos will be saved
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# serve the uploads folder as static files
# so React can display images via URL
# example: http://localhost:8000/uploads/photo.jpg
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")


# ============================================================
# PYDANTIC MODELS
# ============================================================

# shape of data expected when adding a trip
class Trip(BaseModel):
    location    : str
    date        : str
    description : str
    photo_url   : Optional[str] = None  # photo is optional

# shape of data for partial update
class TripUpdate(BaseModel):
    location    : Optional[str] = None
    date        : Optional[str] = None
    description : Optional[str] = None


# ============================================================
# HELPER FUNCTION
# ============================================================

# MongoDB stores a special _id field which is not JSON serializable
# this function converts it to a normal string
# so we can send it to React as JSON
def trip_to_dict(trip) -> dict:
    trip["id"] = str(trip["_id"])  # convert _id to string called id
    del trip["_id"]                # remove the original _id
    return trip


# ============================================================
# TRIP ROUTES
# ============================================================

# GET /trips
# returns all trips from MongoDB
@app.get("/trips")
async def get_trips():
    trips = []

    # find() gets all documents from collection
    # we loop through each and convert to dict
    async for trip in trips_collection.find():
        trips.append(trip_to_dict(trip))

    return trips


# POST /trips
# saves a new trip to MongoDB
@app.post("/trips")
async def add_trip(trip: Trip):

    # convert pydantic model to dictionary
    trip_data = trip.dict()

    # insert into MongoDB collection
    # insert_one() saves one document
    result = await trips_collection.insert_one(trip_data)

    # get the inserted document back
    new_trip = await trips_collection.find_one({"_id": result.inserted_id})

    return trip_to_dict(new_trip)


# PATCH /trips/{trip_id}
# updates specific fields of a trip
@app.patch("/trips/{trip_id}")
async def update_trip(trip_id: str, updated: TripUpdate):

    # import ObjectId to convert string id back to MongoDB id
    from bson import ObjectId

    # build update dictionary with only provided fields
    update_data = {}
    if updated.location    : update_data["location"]    = updated.location
    if updated.date        : update_data["date"]        = updated.date
    if updated.description : update_data["description"] = updated.description

    # update_one finds by _id and sets new values
    await trips_collection.update_one(
        {"_id": ObjectId(trip_id)},   # find by id
        {"$set": update_data}          # set new values
    )

    # get and return updated trip
    updated_trip = await trips_collection.find_one({"_id": ObjectId(trip_id)})
    return trip_to_dict(updated_trip)


# DELETE /trips/{trip_id}
# removes a trip from MongoDB
@app.delete("/trips/{trip_id}")
async def delete_trip(trip_id: str):

    from bson import ObjectId

    # delete_one finds by _id and removes it
    await trips_collection.delete_one({"_id": ObjectId(trip_id)})

    return {"message": "Trip deleted"}


# ============================================================
# PHOTO UPLOAD ROUTE
# ============================================================

# POST /upload
# receives a photo file from React
# saves it to uploads folder
# returns the URL to access it
@app.post("/upload")
async def upload_photo(file: UploadFile = File(...)):

    # build the file path where photo will be saved
    # example: uploads/kyoto.jpg
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)

    # save the file to disk
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # return the URL React can use to display the image
    photo_url = f"http://localhost:8000/uploads/{file.filename}"
    return {"photo_url": photo_url}


# ============================================================
# WISHLIST ROUTES
# ============================================================

# GET /wishlist
# returns all wishlist items
@app.get("/wishlist")
async def get_wishlist():
    items = []
    async for item in wishlist_collection.find():
        items.append(trip_to_dict(item))
    return items


# POST /wishlist
# adds a place to wishlist
@app.post("/wishlist")
async def add_to_wishlist(trip: Trip):
    trip_data = trip.dict()
    result = await wishlist_collection.insert_one(trip_data)
    new_item = await wishlist_collection.find_one({"_id": result.inserted_id})
    return trip_to_dict(new_item)


# DELETE /wishlist/{item_id}
# removes a place from wishlist
@app.delete("/wishlist/{item_id}")
async def delete_from_wishlist(item_id: str):
    from bson import ObjectId
    await wishlist_collection.delete_one({"_id": ObjectId(item_id)})
    return {"message": "Removed from wishlist"}