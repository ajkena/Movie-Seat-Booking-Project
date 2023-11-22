const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const countSeats = document.getElementById('count');
const totalPrice = document.getElementById('total');
const movieSelect = document.getElementById('movie');

let ticketPrice = +movieSelect.value;

const selectSeatsHandler = (seat) => {
  if (
    seat.target.classList.contains('seat') &&
    !seat.target.classList.contains('occupied')
  ) {
    seat.target.classList.toggle('selected');
  }
  updateCountSeats();
};

const selectMovieHandler = (movie) => {
  ticketPrice = +movie.target.value;
  setMovieData(movie.target.selectedIndex, movie.target.value);
  updateCountSeats();
};

//Update total and count
const updateCountSeats = () => {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  const selectedSeatsCount = selectedSeats.length;

  const seatIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  //Saving seats to local storage
  localStorage.setItem('selectedSeats', JSON.stringify(seatIndex));

  countSeats.innerText = selectedSeatsCount;
  totalPrice.innerText = selectedSeatsCount * ticketPrice;
};

//Get data from local storage and populate UI
const populateUI = () => {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
};

//Saving selected movie to local storage
const setMovieData = (movieIndex, moviePrice) => {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('moviePrice', moviePrice);
};

populateUI();
//Inital count and total test
updateCountSeats();

//Movie select event
movieSelect.addEventListener('change', selectMovieHandler);
//Seat click event
container.addEventListener('click', selectSeatsHandler);
