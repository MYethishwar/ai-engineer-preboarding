# ============================================================
# PHASE 2 — FastAPI Backend
# FILE: backend/main.py
# RUN: uvicorn main:app --reload
# TEST: http://localhost:8000/docs
# ============================================================


# ---- IMPORTS -----------------------------------------------

# FastAPI is the framework — it handles incoming requests
# Think of it like an "traffic controller" for your API
from fastapi import FastAPI

# CORSMiddleware allows your frontend (localhost:3000 or 5500)
# to talk to this backend (localhost:8000)
# Without this, browser will BLOCK the connection
from fastapi.middleware.cors import CORSMiddleware

# BaseModel is from Pydantic
# It checks/validates incoming data automatically
# If frontend sends wrong data — FastAPI rejects it before it hits your code
from pydantic import BaseModel

# Optional means a field is NOT required
# Used in PATCH route where user updates only some fields
from typing import Optional


# ---- CREATE THE APP ----------------------------------------

# This one line creates your entire FastAPI application
# "app" is the object — all routes are attached to it
app = FastAPI()


# ---- CORS SETUP --------------------------------------------

# This tells the backend: "allow requests from ANY origin"
# allow_origins=["*"] means any frontend URL is allowed
# In production you would replace * with your real frontend URL
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],      # allow all origins
    allow_methods=["*"],      # allow GET, POST, PATCH, DELETE
    allow_headers=["*"],      # allow all headers
)


# ---- DATABASE (in memory) ----------------------------------

# This list acts as our database for now
# Every trip we add gets stored here as a dictionary
# When server restarts — data is gone (we fix this in a real DB later)
trips_db = []

# This is our ID counter
# Every new trip gets the current value, then we increase it by 1
id_counter = 1


# ---- PYDANTIC MODELS ---------------------------------------

# This is the shape of data we EXPECT when adding a trip
# If frontend sends { location: "Paris", date: "2024-01-01", description: "Nice" }
# Pydantic checks all 3 fields exist and are strings
# If any field is missing → FastAPI automatically returns a 422 error
class Trip(BaseModel):
    location    : str   # must be a string
    date        : str   # must be a string
    description : str   # must be a string


# This model is for PATCH (partial update)
# Optional means the field can be missing — that's okay
# User might only want to update location, not date or description
class TripUpdate(BaseModel):
    location    : Optional[str] = None   # None = not provided
    date        : Optional[str] = None
    description : Optional[str] = None


# ---- ROUTES ------------------------------------------------

# What is a route?
# A route = a URL path + an HTTP method
# Example: GET /trips = "give me all trips"
#          POST /trips = "here is a new trip, save it"


# --- GET /trips ---
# Called when frontend wants to load all trips
# Returns the entire trips_db list as JSON
@app.get("/trips")
def get_trips():
    # Just returnw the list — FastAPI converts it to JSON automatically
    return trips_db


# --- POST /trips ---
# Called when frontend submits the Add Trip form
# "trip: Trip" means FastAPI will read the request body
# and validate it against our Trip model above
# CORRECT ✅
@app.post("/trips")
def add_trip(trip: Trip):

    global id_counter        # ← must be FIRST line in function
                             # before you use id_counter anywhere

    new_trip = {
        "id"          : id_counter,
        "location"    : trip.location,
        "date"        : trip.date,
        "description" : trip.description
    }

    trips_db.append(new_trip)
    id_counter += 1
    return new_trip

# --- PATCH /trips/{trip_id} ---
# Called when user edits a trip
# {trip_id} in the URL is a path parameter — it's the ID of the trip to update
# Example URL: PATCH /trips/3 → update trip with id=3
@app.patch("/trips/{trip_id}")
def update_trip(trip_id: int, updated: TripUpdate):

    # Loop through all trips to find the one with matching ID
    for trip in trips_db:
        if trip["id"] == trip_id:

            # Only update fields that were actually sent (not None)
            # This way frontend can update just location without touching date
            if updated.location    is not None : trip["location"]    = updated.location
            if updated.date        is not None : trip["date"]        = updated.date
            if updated.description is not None : trip["description"] = updated.description

            # Return the updated trip
            return trip

    # If we looped through everything and found nothing — return error
    return {"error": "Trip not found"}


# --- DELETE /trips/{trip_id} ---
# Called when user clicks Delete on a trip card
# {trip_id} is the ID of the trip to remove
@app.delete("/trips/{trip_id}")
def delete_trip(trip_id: int):

    # enumerate() gives us both index and value while looping
    # We need the index so we can remove it from the list
    for index, trip in enumerate(trips_db):
        if trip["id"] == trip_id:

            # pop(index) removes the item at that position
            trips_db.pop(index)

            return {"message": "Trip deleted"}

    return {"error": "Trip not found"}


# ---- HOW EXECUTION FLOWS -----------------------------------
# 1. You run: uvicorn main:app --reload
# 2. FastAPI starts a server at http://localhost:8000
# 3. Frontend sends a request — example: GET /trips
# 4. FastAPI matches the URL to the right function (get_trips)
# 5. That function runs and returns data
# 6. FastAPI converts the return value to JSON
# 7. Frontend receives the JSON and displays it
# ============================================================