var grid = document.querySelector(".grid-container");

async function seeTicket() {
  const selectedMatchId = localStorage.getItem("selectedMatchId");
  const response = await fetch("http://localhost:4000/matches");
  const matchData = await response.json();
  console.log(matchData);

  grid.innerHTML += `
<div class="grid-wrapper">
    <div class="game-info">${matchData[selectedMatchId].matchDay} ${matchData[selectedMatchId].matchDate}
    <br> ${matchData[selectedMatchId].matchTime} 
    <br> ${matchData[selectedMatchId].matchName}
    </div>
    <div class="seat-info">Sektion X <br> Række X <br> sæde X <br><br><br>
    <button class = "Button">Print billet</button>
    </div>
    <div class="IMG"></div>
</div>    
`;
}

window.onload = function () {
  seeTicket();
};
