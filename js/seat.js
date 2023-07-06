function generateSeats() {
    var sectionSelect = document.getElementById("sectionSelect");
    var selectedSection = sectionSelect.value;
    var seatContainer = document.getElementById("seatContainer");
    seatContainer.innerHTML = "";




    var sectionInfo ={
      "M": { totalSeats: 600, rows: 18 },
      "L": { totalSeats: 600, rows: 18 },
      "K": { totalSeats: 230, rows: 18 },
      "J Nedre": { totalSeats: 150, rows: 6 },
      "I Nedre": { totalSeats: 150, rows: 6 },
      "H Nedre": { totalSeats: 150, rows: 6 },
      "G": { totalSeats: 280, rows: 18 }
    };

    var sectionData = sectionInfo[selectedSection];
    if (!sectionData) {
      console.log("Invalid section selected.");
      return;
    }

    var totalSeats = sectionData.totalSeats;
    var rows = sectionData.rows;
    var seatsPerRow = Math.ceil(totalSeats / rows);


    var seatCount = 0;
    for (var i = 1; i <= rows; i++) {
      var row = document.createElement("div");
      row.classList.add("row");

      var seatsInRow = Math.min(totalSeats - seatCount, seatsPerRow);
      for (var j = 1; j <= seatsInRow; j++) {
        var seat = document.createElement("div");
        seat.classList.add("seat");

        row.appendChild(seat);
        seatCount++;
      }

      seatContainer.appendChild(row);
    }

    console.log("Seats printed: " + seatCount);
  }