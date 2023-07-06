var grid = document.querySelector(".grid-container");

async function seeSeasonCard() {
  const response = await fetch(
    "https://helloworld-pxy7m5opzq-lz.a.run.app/usersVFF"  
  );
  console.log("test")
  const userData = await response.json();
  console.log(userData);

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  console.log(loggedInUser.seasoncard[0].seasoncardID);

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
        Billetkode: <br> 12345678
    </div>
</div>   
`;
}

  seeSeasonCard();
