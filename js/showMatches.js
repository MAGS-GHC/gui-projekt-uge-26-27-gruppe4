const matchSelectDropdown = document.querySelector('.matchSelect-dropdown');
const dropdownContent  = document.querySelector(".dropdown-content")

function matchDropdown() {
  fetch('https://helloworld-pxy7m5opzq-lz.a.run.app/matches')
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error retrieving match data');
      }
    })
    .then((data) => {
        for(let i = 0; i < data.length; i++){
            dropdownContent.innerHTML += `
            <a class="dropdown-matches"> ${data[i].matchName} ${data[i].matchDay} ${data[i].matchDate} ${data[i].matchTime} </a>           
            `
        }
    })
    .catch((error) => {
      console.error('Error retrieving match data', error);
    });
}

matchDropdown();
