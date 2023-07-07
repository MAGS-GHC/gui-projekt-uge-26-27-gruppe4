var grid = document.querySelector(".grid-container");

async function seeSeasonCard() {
  const response = await fetch(
    "https://helloworld-pxy7m5opzq-lz.a.run.app/usersVFF"
  );
  const userData = await response.json();
  console.log(userData);

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  console.log(loggedInUser);

  grid.innerHTML += `
<div class="grid-wrapper">
    <div class="grid-itemName">
        ${loggedInUser.name} <br>
        ${loggedInUser.number}
    </div>
    <div class="grid-itemMail">
        ${loggedInUser.email}
    </div>
    <div class="grid-itemIMG">
        <img src="../assets/images/teamphoto.jpg" alt="">
    </div>
    <div class="grid-itemSeasonID">
        Sæsonkortnummer: <br> ${loggedInUser.seasoncard[0].seasoncardID}
    </div>
    <div class="grid-itemSectionNR">
        Section: <br> ${loggedInUser.seasoncard[0].section} <br> <a href="">Bestil billet</a>
    </div>
</div>   
`;
}

window.onload = function () {
  seeSeasonCard();
};
