// Funktion til at indsætte en ny række i tabellen med gamedata
function pasteGameData(date, game, ticket) {
  var table = document.getElementById("gameData");
  var newRow = table.insertRow(-1);

  var dateCell = newRow.insertCell(0);
  dateCell.innerHTML = date;

  var gameCell = newRow.insertCell(1);
  gameCell.innerHTML = game;

  var ticketCell = newRow.insertCell(2);
  ticketCell.innerHTML = ticket;
}

// Simulerer modtagelse af ny gamedata fra databasen
function getNewGameData() {
  // Antag, at du modtager gamedata som et objekt fra din database
  var gameDataArray = [
    {
      date: "2023-07-05",
      game: "Viborg FF vs. AAB",
      ticket: "Se billet",
    },
    {
      date: "2023-08-05",
      game: "Viborg FF vs. FC Midtjylland",
      ticket: "Se billet",
    },
  ];

  // Kald funktionen til at indsætte den nye gamedata i tabellen
  for (var i = 0; i < kampDataArray.length; i++) {
    var kampData = kampDataArray[i];
    pasteGameDataData(kampData.date, kampData.game, kampData.ticket);
  }
}

// Kald funktionen, når dokumentet er indlæst
window.onload = function () {
  getNewGameDataData();
};
