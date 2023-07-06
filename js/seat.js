function generateSeats() {
  let sectionSelect = document.getElementById("sectionSelect");
  let selectedSection = sectionSelect.value;
  let seatContainer = document.getElementById("seatContainer");
  seatContainer.innerHTML = "";

  // Retrieve the seat data from localStorage
  const seatData = JSON.parse(localStorage.getItem("selectedMatch"));
  
  console.log(seatData)



  if (!seatData) {
    console.log("Seat data not found in localStorage.");
    return;
  }

  if(selectedSection === seatData.sections[0].sectionName){

  }


let totalSeats = seatData.sections[0].tickets.length;


let rows = 0;
for(let q = 0; q < seatData.sections[0].tickets.length; q++){
  console.log(seatData.sections[0].tickets[q].seat.row)
  rows = seatData.sections[0].tickets[q].seat.row
}


let seatsPerRow = Math.ceil(totalSeats / rows);



  let seatCount = 0;
  for (let i = 1; i <= rows; i++) {
    let row = document.createElement("div");
    row.classList.add("row");

    let seatsInRow = Math.min(totalSeats - seatCount, seatsPerRow);
    for (let j = 1; j <= seatsInRow; j++) {
      let seat = document.createElement("div");
      seat.classList.add(`seat${seatCount}`);

      row.appendChild(seat);
     seatCount++;
   }

    seatContainer.appendChild(row);
  }

  console.log("Seats printed: " + seatCount);
  
  const seats = document.querySelectorAll('.seat');
  
  console.log(seatData.sections[0].tickets[2].id)
  
  console.log(seats)
  
  for(let i = 0; i < seatID.length; i++){
    
    seatID[i].addEventListener("click", () =>{
      console.log("denne blev klikket" + seatData.sections[0].tickets[i].id )
    })
  }
}