// Constants
const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

let ticketPrice = +movieSelect.value;

// console.log(typeof ticketPrice);

populateUI();

//Functions

// Update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  const selectedSeatsCount = selectedSeats.length;

  const seatIndex = [...selectedSeats].map(function(seat) {
    return [...seats].indexOf(seat);
  });

  // Save index to local storage
  localStorage.setItem("selectedSeats", JSON.stringify(seatIndex));

  //console.log(seatIndex);

  count.innerText = selectedSeatsCount;
  total.innerText = ticketPrice * selectedSeatsCount;
}
// End of updateSelectedCount function

// Set Movie data for storage in local storage
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}
// End of setMovieData

// Get data from local storage and populate interface
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  //console.log(selectedSeats);
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}
// End of populateUI

// Add eventListeners

// Seat click event
container.addEventListener("click", e => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    // console.log(e.target);
    e.target.classList.toggle("selected");

    updateSelectedCount();
  }
});

// movie select event
movieSelect.addEventListener("change", e => {
  setMovieData(e.target.selectedIndex, e.target.value);
  ticketPrice = +e.target.value;
  updateSelectedCount();
});

// Initial Count and total
updateSelectedCount();
