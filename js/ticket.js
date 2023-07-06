var grid = document.querySelector(".grid-container");

async function seeTicket() {
  const selectedMatchId = localStorage.getItem("selectedMatchId");
  const response = await fetch(
    "https://helloworld-pxy7m5opzq-lz.a.run.app/matches"
  );
  const matchData = await response.json();
  console.log(matchData);

  grid.innerHTML += `
<div class="grid-wrapper">
    <div class="game-info"><h5>${matchData[selectedMatchId].matchDay} ${matchData[selectedMatchId].matchDate}</h5>
    <br> <h5>${matchData[selectedMatchId].matchTime}</h5>
    <br> <h5>${matchData[selectedMatchId].matchName}</h5>
    </div>
    <div class="seat-info"><h5>Sektion X <br> Række X <br> sæde X</h5> <br><br>
    <button class = "Button">Print billet</button>
    </div>
    <div class="IMG"></div>
</div>    
`;
}

window.onload = function () {
  seeTicket();
};
