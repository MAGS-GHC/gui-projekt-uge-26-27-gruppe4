const seats = document.querySelectorAll('.row .seat');
const seatContainer = document.getElementById('seatContainer');

// The function that handles updates of booked seats and saves data to the server
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  // opret et object med seat data
  const seatData = {
    selectedSeats: seatsIndex,
  };

  // kender ikke lige det endpoint vi skal fetch fra..
  fetch('https://helloworld-pxy7m5opzq-lz.a.run.app/matches', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(seatData),
  })
    .then((response) => {
      if (response.ok) {
        // Seat data saved successfully
        console.log('Seat data saved');
      } else {
        // Handle error
        console.error('Error saving seat data');
      }
    })
    .catch((error) => {
      // Handle error
      console.error('Error saving seat data', error);
    });

  // Count the number of selected seats
  const selectedSeatsCount = selectedSeats.length;

  // Update the UI to display the count of selected seats
  // document.getElementById('count').innerText = selectedSeatsCount;
}


// Function to handle seat selection
function handleSeatSelection(e) {
  // Check if the clicked seat is a seat and not already booked
  if (e.target.classList.contains('seat') && !e.target.classList.contains('booked')) {
    // Toggle the "selected" class for the clicked seat
    e.target.classList.toggle('selected');

    // Call the function to update the count of selected seats
    updateSelectedCount();
  }
}
// Add event listener for seat selection
seatContainer.addEventListener('click', handleSeatSelection);
const seatingContainer = document.querySelector('.seating-container');
const svgStadium = document.querySelector('.svg-stadium');

// Function to show the selected section and their seats
function showSection(section) {
  // Hide the svg-stadium
  svgStadium.style.display = 'none';

  // Hide all sections
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

// Add event listeners to the images
const sectionImages = document.querySelectorAll('.svg-stadium img');
sectionImages.forEach((image) => {
  image.addEventListener('click', handleSectionClick);
});

// Event handler for section image click
function handleSectionClick(event) {
  const sectionId = event.target.getAttribute('id');
  
  if (sectionId === 'svg-section-MF') {
    // Handle Section-MF differently
    //window.location.href = 'https://example.com';
    console.log('Perform a different action for Section-MF');
  } else {
    // Handle other sections
    const section = sectionId.replace('svg-section-', '');
    showSection(section);
  }
}

// Function to populate the UI with booked and selected seats
function populateUI() {
  // kender ikke API så derfor henter vi intet endnu
  fetch('https://helloworld-pxy7m5opzq-lz.a.run.app/matches')
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error retrieving seat data');
      }
    })
    .then((data) => {
      // Check for selected seats in the received data
      const selectedSeats = data.selectedSeats;

      if (selectedSeats !== null && selectedSeats.length > 0) {
        // Iterate over the seats and add the "selected" class to the selected seats
        seats.forEach((seat, index) => {
          if (selectedSeats.indexOf(index) > -1) {
            seat.classList.add('selected');
          }
        });
      }
    })
    .catch((error) => {
      // Handle error
      console.error('Error retrieving seat data', error);
    });
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