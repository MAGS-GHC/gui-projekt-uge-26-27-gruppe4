var table = document.querySelector(".table-container");

async function getNewGameData() {
  const response = await fetch("https://gui-projekt-uge-26-27-gruppe4-pxy7m5opzq-lz.a.run.app/matches");
  const matchData = await response.json();
  console.log(matchData);

  for (var i = 0; i < matchData.length; i++) {
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
      localStorage.setItem("selectedMatchId", i);
      console.log("hej fra click" + [i]);
      window.location.href = "../ticket";
    });
  }
}

window.onload = function () {
  getNewGameData();
};
