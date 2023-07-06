function generateSeats() {
  let sectionSelect = document.getElementById("sectionSelect");
  let selectedSection = sectionSelect.value;
  let seatContainer = document.getElementById("seatContainer");
  seatContainer.innerHTML = "";

  // Fetch the seat data from the database
  fetch("https://helloworld-pxy7m5opzq-lz.a.run.app/matches")
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error fetching seat data");
      }
    })
    .then(function (seatData) {
      // Find the selected section in the retrieved seat data here

      
      let sectionData = seatData.find(function (seat) {
        return seat.section === selectedSection;
      });

      console.log(sectionData)

      if (!sectionData) {
        console.log("Invalid section selected.");
        return;
      }

      let totalSeats = sectionData.totalSeats;
      let rows = sectionData.rows;
      let seatsPerRow = Math.ceil(totalSeats / rows);

      let seatCount = 0;
      for (let i = 1; i <= rows; i++) {
        let row = document.createElement("div");
        row.classList.add("row");

        let seatsInRow = Math.min(totalSeats - seatCount, seatsPerRow);
        for (let j = 1; j <= seatsInRow; j++) {
          let seat = document.createElement("div");
          seat.classList.add("seat");

          row.appendChild(seat);
          seatCount++;
        }

        seatContainer.appendChild(row);
      }

      console.log("Seats printed: " + seatCount);
    })
    .catch(function (error) {
      console.log("Error: " + error.message);
    });
}