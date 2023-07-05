const seats = document.querySelectorAll('.row .seat');

// Function that update the count of booked seats and save data to local storage
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  // Count the number of selected seats
  const selectedSeatsCount = selectedSeats.length;

  // Update the UI to display the count of selected seats
  document.getElementById('count').innerText = selectedSeatsCount;
}

// Function that create the ui with the booked and selected seats
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

  // Check for selected seats in local storage
  if (selectedSeats !== null && selectedSeats.length > 0) {
    // Iterate over the seats and add the "selected" class to the selected seats
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }
}

// Function to do the seat selection
function handleSeatSelection(e) {
  // Check if the clicked seat is a seat and not already booked
  if (e.target.classList.contains('seat') && !e.target.classList.contains('booked')) {
    // make the seats you click the selected class
    e.target.classList.toggle('selected');

    // call the funktion that saves to local storage
    updateSelectedCount();
  }
}

// selects the seats and calls the function above
document.querySelector('.container').addEventListener('click', handleSeatSelection);

function showSection(section) {
  // Hide all sections
  const sections = document.getElementsByClassName('section');
  for (let i = 0; i < sections.length; i++) {
    sections[i].style.display = 'none';
  }
  
  // Show the selected section
  const selectedSection = document.getElementById(`section${section}`);
  selectedSection.style.display = 'block';

  // Get the currentSection div element
  var sectionM = document.querySelector('.currentSection');

  // Get the <p> element inside currentSection
  var sectionText = document.querySelector('#sectionText');

  sectionText.textContent = 'Section ' + section;
}

populateUI();