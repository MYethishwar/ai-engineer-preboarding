from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional


app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],      # allow all origins
    allow_methods=["*"],      # allow GET, POST, PATCH, DELETE
    allow_headers=["*"],      # allow all headers
)

trips_db = []
id_counter = 1

class Trip(BaseModel):
    location    : str   # must be a string
    date        : str   # must be a string
    description : str   # must be a string

class TripUpdate(BaseModel):
    location    : Optional[str] = None   # None = not provided
    date        : Optional[str] = None
    description : Optional[str] = None

@app.get("/trips")
def get_trips():
    # Just returnw the list — FastAPI converts it to JSON automatically
    return trips_db

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

@app.patch("/trips/{trip_id}")
def update_trip(trip_id: int, updated: TripUpdate):

    for trip in trips_db:
        if trip["id"] == trip_id:

            if updated.location    is not None : trip["location"]    = updated.location
            if updated.date        is not None : trip["date"]        = updated.date
            if updated.description is not None : trip["description"] = updated.description

            # Return the updated trip
            return trip

    return {"error": "Trip not found"}


@app.delete("/trips/{trip_id}")
def delete_trip(trip_id: int):
    for index, trip in enumerate(trips_db):
        if trip["id"] == trip_id:

            trips_db.pop(index)

            return {"message": "Trip deleted"}

    return {"error": "Trip not found"}
