const payBTN = document.querySelector(".payBTN");
const selectedMatch = JSON.parse(localStorage.getItem("selectedMatch"));

if (selectedMatch) {
  const { matchId, ticketId } = selectedMatch;

  fetch(`https://gui-projekt-uge-26-27-gruppe4-pxy7m5opzq-lz.a.run.app/matches/${matchId}/tickets/${ticketId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ availability: false })
  })
    .then(response => {
      if (response.ok) {
        console.log('Ticket updated successfully');
      } else {
        console.log('Failed to update ticket');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
} else {
  console.error('No selected match found');
}
