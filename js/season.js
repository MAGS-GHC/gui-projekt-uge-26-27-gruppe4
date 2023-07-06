var grid = document.querySelector(".grid-container");

async function seeSeasonCard() {
  const response = await fetch("http://localhost:4000/usersVFF");
  const userData = await response.json();
  console.log(userData);

  grid.innerHTML += `
<div class="grid-wrapper">
    <div class="grid-itemName">
        ${userData[6].name} <br>
        ${userData[6].number}
    </div>
    <div class="grid-itemMail">
        ${userData[6].email}
    </div>
    <div class="grid-itemIMG">
        <img src="../assets/images/teamphoto.jpg" alt="">
    </div>
    <div class="grid-itemSeasonID">
        Sæsonkortnummer: <br> 12345678
    </div>
    <div class="grid-itemSectionNR">
        Billetkode: <br> 12345678
    </div>
</div>   
`;
}

window.onload = function () {
  seeSeasonCard();
};
