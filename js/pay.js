const payBTN = document.querySelector(".payBTN");
const ticketID = JSON.parse(localStorage.getItem("selectedMatch"));

fetch('https://gui-projekt-uge-26-27-gruppe4-pxy7m5opzq-lz.a.run.app/matches', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify()
})
  .then(response => response.json())
  .then(data => {
    console.log(data); // Log the response data to inspect its structure
    
    if (data && Array.isArray(data.sections)) {
      data.sections.forEach(section => {
        if (Array.isArray(section.tickets)) {
          section.tickets.forEach(ticket => {
            if (ticket.id === ticketID) {
              ticket.availability = false;
            }
          });
        }
      });
      console.log(data); // Log the updated data
    } else {
      console.log("Invalid response data structure");
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
