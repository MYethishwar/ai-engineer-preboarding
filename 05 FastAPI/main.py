from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# ------------------ CORS ------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------------------ Models ------------------
class Trip(BaseModel):
    id: int
    place: str
    description: str

class User(BaseModel):
    name: str
    email: str

# ------------------ Data Storage ------------------
trips = []
users = []

# ------------------ GET ROUTES ------------------

# 1. Get all trips
@app.get("/trips")
def get_all_trips():
    return trips

# 2. Get trip by ID
@app.get("/trips/{trip_id}")
def get_trip_by_id(trip_id: int):
    for trip in trips:
        if trip.id == trip_id:
            return trip
    return {"error": "Trip not found"}

# 3. Get all users
@app.get("/users")
def get_users():
    return users


# ------------------ POST ROUTES ------------------

# 1. Add a new trip
@app.post("/trips")
def add_trip(trip: Trip):
    trips.append(trip)
    return {"message": "Trip added", "data": trip}

# 2. Register a user
@app.post("/users")
def add_user(user: User):
    users.append(user)
    return {"message": "User added", "data": user}

# 3. Add multiple trips
@app.post("/trips/bulk")
def add_multiple_trips(new_trips: list[Trip]):
    trips.extend(new_trips)
    return {"message": "Multiple trips added", "count": len(new_trips)}