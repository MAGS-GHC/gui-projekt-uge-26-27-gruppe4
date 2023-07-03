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

function getNewGameData() {
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

  for (var i = 0; i < kampDataArray.length; i++) {
    var kampData = kampDataArray[i];
    pasteGameDataData(kampData.date, kampData.game, kampData.ticket);
  }
}

window.onload = function () {
  getNewGameDataData();
};
