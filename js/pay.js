const payBTN = document.querySelector(".payBTN");
const ticketID = JSON.parse(localStorage.getItem("selectedMatch"));

fetch(`https://gui-projekt-uge-26-27-gruppe4-pxy7m5opzq-lz.a.run.app/matches/${ticketID}`, {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ availability: false })
})
  .then(response => response.json())
  .then(data => {
    console.log(data); // Response from the server
    // Optionally, update the ticket's availability in localStorage
    const storedData = JSON.parse(localStorage.getItem("matches"));
    if (storedData && Array.isArray(storedData)) {
      storedData.forEach(match => {
        if (Array.isArray(match.sections)) {
          match.sections.forEach(section => {
            if (Array.isArray(section.tickets)) {
              const ticket = section.tickets.find(t => t.id === ticketID);
              if (ticket) {
                ticket.availability = false;
              }
            }
          });
        }
      });
      localStorage.setItem("matches", JSON.stringify(storedData));
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
