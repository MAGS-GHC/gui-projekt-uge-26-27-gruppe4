var grid = document.querySelector(".grid-container");

async function seeSeasonCard() {
  const response = await fetch(
    "https://helloworld-pxy7m5opzq-lz.a.run.app/usersVFF"  
  );
  console.log("test")
  const userData = await response.json();
  console.log(userData);

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  console.log(loggedInUser);

  grid.innerHTML += `
<div class="grid-wrapper">
    <div class="grid-itemName">
        ${userData[loggedInUser].name} <br>
        ${userData[loggedInUser].number}
    </div>
    <div class="grid-itemMail">
        ${userData[loggedInUser].email}
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

  seeSeasonCard();
