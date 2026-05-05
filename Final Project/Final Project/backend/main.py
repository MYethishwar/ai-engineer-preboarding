
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
import motor.motor_asyncio   #aync driver for mongoDB
import os
import shutil #it is used for file operations copy/move/delete folders or files
from fastapi.staticfiles import StaticFiles #used to serve files -> access files using URL's
from bson import ObjectId #MongoDB uses this


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


client = motor.motor_asyncio.AsyncIOMotorClient("mongodb://localhost:27017")
db = client["traveljournal"]
journals_collection = db["journals"]
wishlist_collection = db["wishlist"]


UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")



#Here i used pydantic Base Models to define data structure of elements inside project which handles information
class Expense(BaseModel):
    item: str          
    amount: float      
    currency: str      


class Traveler(BaseModel):
    name: str       
    relation: str   


class JournalEntry(BaseModel):
    title: str                          
    date_start: str                     
    date_end: str                     
    location: str                       
    description: str                    
    
    expenses: List[Expense] = []       
    total_expense: float = 0            
    
    best_moments: str = ""              
    major_places: List[str] = []       
    transportation: str = ""            
    num_days: int = 0                 
    
    trip_type: str = ""                 
    travelers: List[Traveler] = []      
    challenges: List[str] = []          
    
    photo_urls: List[str] = []         
    
    latitude: float = 0               
    longitude: float = 0               


class JournalUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    best_moments: Optional[str] = None


class WishlistItem(BaseModel):
    title: str
    location: str
    description: Optional[str] = None
    when_planned: Optional[str] = None  # target date


def entry_to_dict(entry) -> dict:
    """Convert MongoDB document to JSON-safe dict"""
    entry["id"] = str(entry["_id"])
    del entry["_id"]
    return entry



@app.get("/journals")
async def get_journals():
    entries = []
    async for entry in journals_collection.find().sort("date_start", -1):
        entries.append(entry_to_dict(entry))
    return entries


@app.post("/journals")
async def create_journal(entry: JournalEntry):
    entry_data = entry.dict() #converts input into dictionary format
    
    if entry_data.get("expenses"):
        entry_data["total_expense"] = sum(exp["amount"] for exp in entry_data["expenses"])
    
    result = await journals_collection.insert_one(entry_data)
    
    new_entry = await journals_collection.find_one({"_id": result.inserted_id})
    return entry_to_dict(new_entry)


@app.get("/journals/{entry_id}")
async def get_journal(entry_id: str):

    entry = await journals_collection.find_one({"_id": ObjectId(entry_id)})
    if entry:
        return entry_to_dict(entry)
    return {"error": "Entry not found"}


@app.patch("/journals/{entry_id}")
async def update_journal(entry_id: str, updated: JournalUpdate):

    update_data = {}
    if updated.title:
        update_data["title"] = updated.title
    if updated.description:
        update_data["description"] = updated.description
    if updated.best_moments:
        update_data["best_moments"] = updated.best_moments
    
    await journals_collection.update_one(
        {"_id": ObjectId(entry_id)},
        {"$set": update_data}
    )
    
    updated_entry = await journals_collection.find_one({"_id": ObjectId(entry_id)})
    return entry_to_dict(updated_entry)


@app.delete("/journals/{entry_id}")
async def delete_journal(entry_id: str):

    await journals_collection.delete_one({"_id": ObjectId(entry_id)})
    return {"message": "Journal entry deleted"}


@app.get("/journals/search/{query}")
async def search_journals(query: str):

    results = []
    async for entry in journals_collection.find({
        "$or": [
            {"location": {"$regex": query, "$options": "i"}},
            {"title": {"$regex": query, "$options": "i"}}
        ]
    }).sort("date_start", -1):
        results.append(entry_to_dict(entry))
    return results



@app.post("/upload")
async def upload_photo(file: UploadFile = File(...)):
    """
    Save photo to uploads folder
    Return URL that can be used in HTML <img> tag
    """
    try:
        os.makedirs(UPLOAD_FOLDER, exist_ok=True)
        
        content = await file.read()
        file_name = str(file.filename)
        
        file_path = os.path.join(str(UPLOAD_FOLDER), file_name)
        
        with open(file_path, "wb") as f:
            f.write(content)
        
        photo_url = f"http://localhost:8000/uploads/{file_name}"
        
        return {"photo_url": photo_url}
    
    except Exception as e:
        return {"error": str(e)}   


@app.get("/wishlist")
async def get_wishlist():
    """Get all wishlist items"""
    items = []
    async for item in wishlist_collection.find().sort("when_planned", 1):
        items.append(entry_to_dict(item))
    return items


@app.post("/wishlist")
async def add_to_wishlist(item: WishlistItem):
    """Add a place to wishlist"""
    item_data = item.dict()
    result = await wishlist_collection.insert_one(item_data)
    new_item = await wishlist_collection.find_one({"_id": result.inserted_id})
    return entry_to_dict(new_item)


@app.delete("/wishlist/{item_id}")
async def remove_from_wishlist(item_id: str):
    """Remove from wishlist"""
    await wishlist_collection.delete_one({"_id": ObjectId(item_id)})
    return {"message": "Removed from wishlist"}