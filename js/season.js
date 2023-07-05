var grid = document.querySelector(".grid-container");

function seeSeasonCard() {
  grid.innerHTML += `
<div class="grid-wrapper">
    <div class="grid-itemName">
        Calle Callesen <br>
        88888888
    </div>
    <div class="grid-itemMail">
        viborg@viborg.dk
    </div>
    <div class="grid-itemIMG">
        <img src="../assets/images/teamphoto.jpg" alt="">
    </div>
    <div class="grid-itemSeasonID">
        SæsonkortNr.
    </div>
    <div class="grid-itemSectionNR">
        SektionNr.
    </div>
</div>   
`;
}

window.onload = function () {
  seeSeasonCard();
};
