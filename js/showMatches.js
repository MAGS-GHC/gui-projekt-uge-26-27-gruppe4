const matchSelectDropdown = document.querySelector('.matchSelect-dropdown');
const dropdownContent  = document.querySelector(".dropdown-content")
const dropMenu = document.querySelector(".dropbtn");

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
        for (let i = 0; i < data.length; i++) {
          const matchElement = document.createElement('a');
          matchElement.classList.add('dropdown-matches');
          matchElement.textContent = `${data[i].matchName} ${data[i].matchDay} ${data[i].matchDate} ${data[i].matchTime}`;
          matchElement.addEventListener('click', () => {
            selectMatch(data[i]);
          });
          dropdownContent.appendChild(matchElement);
        }
      })
    .catch((error) => {
      console.error('Error retrieving match data', error);
    });
}

function selectMatch(match) {
    localStorage.setItem('selectedMatch', JSON.stringify(match));
    dropMenu.innerHTML = `<p>${match.matchName}</p>`;

    
}

matchDropdown();
