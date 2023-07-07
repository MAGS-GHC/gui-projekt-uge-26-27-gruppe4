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
          console.log(data);        
        })
        .catch(error => {
          console.error('Error:', error);
        });