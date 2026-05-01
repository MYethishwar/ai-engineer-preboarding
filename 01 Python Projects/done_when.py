import json

with open("data.json", "r") as file:
    trips = json.load(file)

filtered_trips = []

for trip in trips:
    if trip["price"] < 4000:
        filtered_trips.append(trip)

print("Filtered Trips:")
for trip in filtered_trips:
    print(trip)