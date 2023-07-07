function generateSeats() {
  let sectionSelect = document.getElementById("sectionSelect");
  let selectedSection = sectionSelect.value;
  let seatContainer = document.getElementById("seatContainer");
  seatContainer.innerHTML = "";

  const seatData = JSON.parse(localStorage.getItem("selectedMatch"));

  console.log(seatData);

  if (!seatData) {
    console.log("Seat data not found in localStorage.");
    return;
  }

  let sectionCount = 0;

  if (selectedSection === "M") {
    console.log("her printer vi 600 billeter");
    printSeats(seatData,sectionCount);
    saveSeats(seatData,sectionCount);
  }

  if (selectedSection === "L") {
    let sectionCount = 1;
    console.log("her printer vi 600 billeter");
    printSeats(seatData,sectionCount);
    saveSeats(seatData,sectionCount);
  }

  if (selectedSection === "K") {
    let sectionCount = 2;
    console.log("her printer vi 230 billeter");
    printSeats(seatData,sectionCount);
    saveSeats(seatData,sectionCount);
  }

  if (selectedSection === "I") {
    let sectionCount = 3;
    console.log("her printer vi 150 billeter");
    printSeats(seatData,sectionCount);
    saveSeats(seatData,sectionCount);
  }

  if (selectedSection === "J") {
    let sectionCount = 4;
    console.log("her printer vi 150 billeter");
    printSeats(seatData,sectionCount);
    saveSeats(seatData,sectionCount);
  }

  if (selectedSection === "H") {
    let sectionCount = 5;
    console.log("her printer vi 150 billeter");
    printSeats(seatData,sectionCount);
    saveSeats(seatData,sectionCount);
  }

  if (selectedSection === "G") {
    let sectionCount = 6;
    console.log("her printer vi 280 billeter");
    printSeats(seatData,sectionCount);
    saveSeats(seatData,sectionCount);
  }

  if (selectedSection === "M Fan") {
    console.log("her printer vi 300 billeter");
    let sectionCount = 7;
    printSeats(seatData,sectionCount);
    saveSeats(seatData,sectionCount);
  }


function saveSeats(seatData, sectionCount){
  const seats = document.querySelectorAll(".seat");
  let selectedSeatIds = [];

  for (let x = 0; x < seats.length; x++) {
    seats[x].addEventListener("click", () => {
      console.log(x);
      console.log(seatData.sections[sectionCount].tickets[x].id);

      console.log(seatData.sections[sectionCount].tickets[x].id);
      console.log(
        "denne blev klikket " + seatData.sections[sectionCount].tickets[x].id
      );

      const clickedSeatId = seatData.sections[sectionCount].tickets[x].id;
      selectedSeatIds.push(clickedSeatId);
      localStorage.setItem("selectedSeatIds", JSON.stringify(selectedSeatIds));
    });
  }
}
}


function printSeats(seatData, sectionCount){

  console.log(sectionCount)
  let totalSeats = seatData.sections[sectionCount].tickets.length;

  let rows = 0;
  for (let q = 0; q < seatData.sections[sectionCount].tickets.length; q++) {
    console.log(seatData.sections[sectionCount].tickets[q].seat.row);
    rows = seatData.sections[sectionCount].tickets[q].seat.row;
  }

  let seatsPerRow = Math.ceil(totalSeats / rows);
  let seatCount = 0;

  for (let i = 1; i <= rows; i++) {
    let row = document.createElement("div");
    row.classList.add("row");

    let seatsInRow = Math.min(totalSeats - seatCount, seatsPerRow);
    for (let j = 1; j <= seatsInRow; j++) {
      let seat = document.createElement("div");
      seat.classList.add(`seat`);

      row.appendChild(seat);
      seatCount++;
    }
    seatContainer.appendChild(row);
  }

}



