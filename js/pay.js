const payBTN = document.querySelector(".payBTN");
const selectedSeatIds = JSON.parse(localStorage.getItem("selectedSeatIds"));

if (selectedSeatIds && selectedSeatIds.length > 0) {
  const ticketIDs = selectedSeatIds.map(seatId => seatId.id);

  fetch(`https://gui-projekt-uge-26-27-gruppe4-pxy7m5opzq-lz.a.run.app/matches/tickets`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ticketIDs, availability: false })
  })
    .then(response => {
      if (response.ok) {
        console.log('Tickets updated successfully');
      } else {
        console.log('Failed to update tickets');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
} else {
  console.error('No selected seats found');
}
