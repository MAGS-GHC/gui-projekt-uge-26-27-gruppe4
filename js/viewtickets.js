var table = document.getElementsByClassName("table-container");

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
                        <th>Dato</th>
                        <th>Kamp</th>
                        <a href="../ticket/index.html"><th>Billet</th></a>
                    </tr>
                </table>
    `;
  }
}

window.onload = function () {
  getNewGameData();
};
