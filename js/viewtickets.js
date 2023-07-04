var table = document.querySelector(".table-container");

async function getNewGameData() {
  var gameDataArray = [];

  const response = await fetch("http://localhost:5000/matches");
  const matchData = await response.json();
  console.log(matchData);

  for (var i = 0; i < matchData.length; i++) {
    // var gameData = gameDataArray[i];
    table.innerHTML += `
    <table id="gameData">

            <tr>
                <th>${matchData[i].matchDay} ${matchData[i].matchDate} ${matchData[i].matchTime}</th>
                  <th>${matchData[i].matchName}</th>
                      <th><button class="billetBTN jBounceIn">Billet</button></th>               
                  </tr>

            </table>
    `;
  }
  readTickets();
}

function readTickets() {
  const billetBTN = document.querySelectorAll(".billetBTN");

  for (let i = 0; i < billetBTN.length; i++) {
    billetBTN[i].addEventListener("click", () => {
      console.log("hej fra click");
      window.location.href = "../ticket/index.html";
    });
  }
}

window.onload = function () {
  getNewGameData();
};
