const seats = document.querySelectorAll('.row .seat');
const seatingContainer = document.querySelector('.seating-container');
const svgStadium = document.querySelector('.svg-stadium');
const container = document.querySelector('.container');

// Function that updates the count of booked seats and saves data to local storage
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
  const selectedSeatsCount = selectedSeats.length;
  // Update the UI to display the count of selected seats
  // document.getElementById('count').innerText = selectedSeatsCount;
}

// Function to handle seat selection
function handleSeatSelection(e) {
  if (e.target.classList.contains('seat') && !e.target.classList.contains('booked')) {
    e.target.classList.toggle('selected');
    updateSelectedCount();
  }
}

// Add event listener for seat selection
document.querySelector('#seatContainer').addEventListener('click', handleSeatSelection);

// Function to show the selected section and their seats
function showSection(section) {
  svgStadium.style.display = 'none';
  const sections = document.querySelectorAll('.section');
  sections.forEach((section) => {
    section.style.display = 'none';
  });
  const selectedSection = document.getElementById(`section${section}`);
  selectedSection.style.display = 'block';
  seatingContainer.classList.remove('hidden');
  container.classList.remove('hidden');
  const currentSection = document.querySelector('.currentSection');
  const sectionText = document.querySelector('#sectionText');
  sectionText.textContent = `Section ${section}`;
  updateSelectedCount();
}

// Event handler for section image click
function handleSectionClick(event) {
  const sectionId = event.target.getAttribute('id');
  if (sectionId === 'svg-section-MF') {
    console.log('Perform a different action for Section-MF');
  } else {
    const section = sectionId.replace('svg-section-', '');
    showSection(section);
  }
}

// Add event listeners to the images
const sectionImages = document.querySelectorAll('.svg-stadium img');
sectionImages.forEach((image) => {
  image.addEventListener('click', handleSectionClick);
});

// Function to populate the UI with booked and selected seats
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }
}

populateUI();