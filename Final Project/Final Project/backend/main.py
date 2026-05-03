# ============================================================
# PHASE 3 — FastAPI + MongoDB Backend
# Complete Travel Journal with Expenses, People, etc
# ============================================================

from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
import motor.motor_asyncio
import os
import shutil
from fastapi.staticfiles import StaticFiles
from bson import ObjectId


# ============================================================
# APP SETUP
# ============================================================

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================================
# MONGODB CONNECTION
# ============================================================

client = motor.motor_asyncio.AsyncIOMotorClient("mongodb://localhost:27017")
db = client["traveljournal"]
journals_collection = db["journals"]
wishlist_collection = db["wishlist"]


# ============================================================
# UPLOADS SETUP
# ============================================================

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")


# ============================================================
# PYDANTIC MODELS — Define data shape
# ============================================================

# Single expense item
# Example: { "item": "boating", "amount": 2000, "currency": "INR" }
class Expense(BaseModel):
    item: str          # boating, food, hotel, etc
    amount: float      # 2000
    currency: str      # INR, USD, etc (default INR)


# Single person involved
# Example: { "name": "Raj", "relation": "friend" }
class Traveler(BaseModel):
    name: str          # person's name
    relation: str      # friend, family, colleague


# Main journal entry
# This is what user submits when adding a trip
class JournalEntry(BaseModel):
    title: str                          # "Cherry Blossom Trip"
    date_start: str                     # "2024-03-15"
    date_end: str                       # "2024-03-20"
    location: str                       # "Kyoto, Japan"
    description: str                    # long text
    
    # expenses as list of Expense objects
    expenses: List[Expense] = []        # [{ item: "food", amount: 500 }]
    total_expense: float = 0            # auto-calculated
    
    best_moments: str = ""              # "Saw cherry blossoms at sunrise"
    major_places: List[str] = []        # ["Temple A", "Temple B"]
    transportation: str = ""            # "flight", "train", "car", etc
    num_days: int = 0                   # how many days
    
    trip_type: str = ""                 # "family", "friends", "solo"
    travelers: List[Traveler] = []      # [{ name: "Raj", relation: "friend" }]
    
    challenges: List[str] = []          # ["weather", "missed flight"]
    
    photo_urls: List[str] = []          # ["url1", "url2", ...]
    
    latitude: float = 0                 # for map
    longitude: float = 0                # for map


# For updating entries
class JournalUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    best_moments: Optional[str] = None


# Wishlist item
class WishlistItem(BaseModel):
    title: str
    location: str
    description: Optional[str] = None
    when_planned: Optional[str] = None  # target date


# ============================================================
# HELPER FUNCTIONS
# ============================================================

def entry_to_dict(entry) -> dict:
    """Convert MongoDB document to JSON-safe dict"""
    entry["id"] = str(entry["_id"])
    del entry["_id"]
    return entry


# ============================================================
# JOURNAL ROUTES
# ============================================================

# GET /journals — get all journal entries
@app.get("/journals")
async def get_journals():
    """
    Returns ALL journal entries from MongoDB
    User can then search/filter on frontend
    """
    entries = []
    async for entry in journals_collection.find().sort("date_start", -1):
        # sort by date_start descending (newest first)
        entries.append(entry_to_dict(entry))
    return entries


# POST /journals — save a new journal entry
@app.post("/journals")
async def create_journal(entry: JournalEntry):
    """
    Receives complete journal entry from React form
    Saves to MongoDB
    Returns saved entry with ID
    """
    # convert pydantic model to dict
    entry_data = entry.dict()
    
    # calculate total expense if expenses list exists
    if entry_data.get("expenses"):
        entry_data["total_expense"] = sum(exp["amount"] for exp in entry_data["expenses"])
    
    # insert into MongoDB
    result = await journals_collection.insert_one(entry_data)
    
    # get back the saved entry
    new_entry = await journals_collection.find_one({"_id": result.inserted_id})
    return entry_to_dict(new_entry)


# GET /journals/{entry_id} — get one journal entry
@app.get("/journals/{entry_id}")
async def get_journal(entry_id: str):
    """
    Get specific journal entry by ID
    Used in detail page
    """
    entry = await journals_collection.find_one({"_id": ObjectId(entry_id)})
    if entry:
        return entry_to_dict(entry)
    return {"error": "Entry not found"}


# PATCH /journals/{entry_id} — update an entry
@app.patch("/journals/{entry_id}")
async def update_journal(entry_id: str, updated: JournalUpdate):
    """
    Update specific fields of a journal entry
    """
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


# DELETE /journals/{entry_id} — delete an entry
@app.delete("/journals/{entry_id}")
async def delete_journal(entry_id: str):
    """
    Delete a journal entry
    """
    await journals_collection.delete_one({"_id": ObjectId(entry_id)})
    return {"message": "Journal entry deleted"}


# ============================================================
# SEARCH ROUTE
# ============================================================

# GET /journals/search/{query}
@app.get("/journals/search/{query}")
async def search_journals(query: str):
    """
    Search journals by location or title
    Returns matching entries
    """
    # case-insensitive regex search
    results = []
    async for entry in journals_collection.find({
        "$or": [
            {"location": {"$regex": query, "$options": "i"}},
            {"title": {"$regex": query, "$options": "i"}}
        ]
    }).sort("date_start", -1):
        results.append(entry_to_dict(entry))
    return results


# ============================================================
# PHOTO UPLOAD ROUTE
# ============================================================

# POST /upload — upload a photo for a journal entry
@app.post("/upload")
async def upload_photo(file: UploadFile = File(...)):
    """
    Save photo to uploads folder
    Return URL that can be used in HTML <img> tag
    """
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    photo_url = f"http://localhost:8000/uploads/{file.filename}"
    return {"photo_url": photo_url}


# ============================================================
# WISHLIST ROUTES
# ============================================================

# GET /wishlist
@app.get("/wishlist")
async def get_wishlist():
    """Get all wishlist items"""
    items = []
    async for item in wishlist_collection.find().sort("when_planned", 1):
        items.append(entry_to_dict(item))
    return items


# POST /wishlist
@app.post("/wishlist")
async def add_to_wishlist(item: WishlistItem):
    """Add a place to wishlist"""
    item_data = item.dict()
    result = await wishlist_collection.insert_one(item_data)
    new_item = await wishlist_collection.find_one({"_id": result.inserted_id})
    return entry_to_dict(new_item)


# DELETE /wishlist/{item_id}
@app.delete("/wishlist/{item_id}")
async def remove_from_wishlist(item_id: str):
    """Remove from wishlist"""
    await wishlist_collection.delete_one({"_id": ObjectId(item_id)})
    return {"message": "Removed from wishlist"}