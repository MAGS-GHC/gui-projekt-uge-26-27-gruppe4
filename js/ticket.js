var grid = document.querySelector(".grid-container");

function seeTicket() {
  grid.innerHTML += `
<div class="grid-wrapper">
    <div class="game-info">Dag, Dato 123 12 <br> 19:00 <br> Viborg - FC Midtjylland</div>
    <div class="seat-info">Sektion X <br> Række X <br> sæde X <br><br><br>button</div>
    <div class="IMG"></div>
</div>    
`;
}

window.onload = function () {
  seeTicket();
};
