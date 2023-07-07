const seats = document.querySelectorAll('.seat');
const seatContainer = document.getElementById('seatContainer');

const seatID = document.querySelectorAll(".seat");

const seatData = JSON.parse(localStorage.getItem("selectedMatch"));

/*---------------------------------------------update localstorge with the count of booked seats------------------------------------------------------------*/
// Function that updates the count of booked seats and saves data to local storage
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));



  // Count the number of selected seats
  const selectedSeatsCount = selectedSeats.length;

  // Update the UI to display the count of selected seats
  //document.getElementById('count').innerText = selectedSeatsCount;
}
console.log(seats[33])

for(let i = 0; i < seatID.length; i++){
  
  seatID[i].addEventListener("click", () =>{
    console.log("denne blev klikket" + seatData.sections[0].tickets[i].id )
  })
}

/*---------------------------------------------handels the seat selection--------------------------------------------------------*/
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

/*--------------------------------------------------- change seat availability start--------------------------------------------------------------------------*/
let matches;
// Function to handle booking tickets
function bookTickets() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  // Extract information about the selected seats
  const seatData = Array.from(selectedSeats).map((seat) => {
    const row = seat.parentNode.dataset.row;
    const seatNr = seat.dataset.seatNr;
    return { row, seatNr };
  });

  // Update seat availability in the matches data
  if (matches) {
    matches.forEach((match) => {
      match.sections.forEach((section) => {
        section.tickets.forEach((ticket) => {
          if (ticket.seat && seatData.some((seat) => seat.row === ticket.seat.row && seat.seatNr === ticket.seat.seatNr)) {
            ticket.availability = false;
          }
        });
      });
    });

    // Make an HTTP request to the server-side script using fetch
    fetch('https://gui-projekt-uge-26-27-gruppe4-pxy7m5opzq-lz.a.run.app/matches', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(matches),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Tickets booked successfully!');
        } else {
          console.error('Error booking tickets:', response.statusText);
        }
      })
      .catch((error) => {
        console.error('Network error occurred while booking tickets:', error);
      });
  } else {
    console.error('Matches data is not available');
  }
}

    document.getElementById('bookTicketsButton').addEventListener('click', bookTickets);

/*--------------------------------------------------- change seat availability end--------------------------------------------------------------------------*/

/*--------------------------------------------------- Show the section when section is chosen --------------------------------------------------------------------------*/
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

/*--------------------------------------------------- handle the section click(while using the svg(not in use atm!)) --------------------------------------------------------------------------*/
// Event handler for section image click
function handleSectionClick(event) {
  const sectionId = event.target.getAttribute('id');
  
  if (sectionId === 'svg-section-MF') {
    // Handle Section-MF differently
    // Example: window.location.href = 'https://example.com';
    console.log('Perform a different action for Section-MF');
  } else {
    // Handle other sections
    const section = sectionId.replace('svg-section-', '');
    showSection(section);
  }
}

/*--------------------------------------------------- populate the ui with booked and selected seats --------------------------------------------------------------------------*/
// Function to populate the UI with booked and selected seats
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  console.log(selectedSeats)

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

/*--------------------------------------------------- Handle the seat selection --------------------------------------------------------------------------*/
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

/*--------------------------------------------------- Show the section when section is chosen(dublicate data) --------------------------------------------------------------------------*/
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