// ============================================================
// PHASE 0 — Vanilla JS (Simple Version)
// ============================================================


// ----------------------------------
// STATE — our mini "database"
// ----------------------------------
const trips = [];  // all trips live here as objects


// ----------------------------------
// 1. ADD TRIP — runs when button clicked
// ----------------------------------
function addTrip() {

  // read the 3 input values from the form
  const location    = document.getElementById("inp-location").value;
  const date        = document.getElementById("inp-date").value;
  const description = document.getElementById("inp-desc").value;

  // stop if location or date is empty
  if (location === "" || date === "") {
    alert("Please enter a location and date!");
    return;
  }

  // build a trip object
  const newTrip = {
    id          : Date.now(),   // unique number based on time
    location    : location,
    date        : date,
    description : description
  };

  // save it to our array
  trips.push(newTrip);

  // show it on the page
  showTripOnPage(newTrip);

  // clear the form
  clearForm();

  // update the count badge
  updateCount();
}


// ----------------------------------
// 2. SHOW TRIP ON PAGE — pure DOM work
// ----------------------------------
function showTripOnPage(trip) {

  // get the list container from HTML
  const list = document.getElementById("trip-list");

  // hide the "no trips" message
  document.getElementById("empty-state").style.display = "none";

  // create a new div for this trip
  const card = document.createElement("div");
  card.className = "trip-card";

  // fill the card with content
  card.innerHTML =
    "<div class='trip-location'>" + trip.location + "</div>" +
    "<div class='trip-date'>" + trip.date + "</div>" +
    "<div class='trip-desc'>" + trip.description + "</div>" +
    "<button onclick='deleteTrip(" + trip.id + ", this)'>Delete</button>";

  // add the card to the top of the list
  list.prepend(card);
}


// ----------------------------------
// 3. DELETE TRIP — remove from array + page
// ----------------------------------
function deleteTrip(id, buttonClicked) {

  // find the trip in the array by id
  const index = trips.findIndex(function(trip) {
    return trip.id === id;
  });

  // remove it from the array
  trips.splice(index, 1);

  // remove the card from the page
  // buttonClicked.parentElement = the card div
  buttonClicked.parentElement.remove();

  // update the count
  updateCount();
}


// ----------------------------------
// 4. CLEAR FORM — reset all inputs
// ----------------------------------
function clearForm() {
  document.getElementById("inp-location").value = "";
  document.getElementById("inp-date").value     = "";
  document.getElementById("inp-desc").value     = "";
}


// ----------------------------------
// 5. UPDATE COUNT — show how many trips
// ----------------------------------
function updateCount() {
  const badge = document.getElementById("count-badge");
  badge.textContent = trips.length + " trips";

  // if no trips, show the empty message again
  if (trips.length === 0) {
    document.getElementById("empty-state").style.display = "block";
  }
}


// ----------------------------------
// 6. FETCH API — for Phase 1 (not active yet)
// ----------------------------------

// GET trips from backend
async function getTripsFromServer() {
  const response = await fetch("http://localhost:8000/trips");
  const data     = await response.json();
  console.log("Trips from server:", data);
}

// POST one trip to backend
async function sendTripToServer(trip) {
  const response = await fetch("http://localhost:8000/trips", {
    method  : "POST",
    headers : { "Content-Type": "application/json" },
    body    : JSON.stringify(trip)
  });
  const data = await response.json();
  console.log("Server saved:", data);
}


// ----------------------------------
// 7. WIRE THE BUTTON — event listener
// ----------------------------------
document.getElementById("btn-add").addEventListener("click", addTrip);


// ----------------------------------
// 8. SET TODAY'S DATE as default
// ----------------------------------
document.getElementById("inp-date").value = new Date().toISOString().split("T")[0];