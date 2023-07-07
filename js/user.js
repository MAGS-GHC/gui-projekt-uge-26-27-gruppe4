var grid = document.querySelector(".grid-container");

async function seeProfile() {
  const response = await fetch(
    "https://helloworld-pxy7m5opzq-lz.a.run.app/usersVFF"
  );
  const userData = await response.json();
  console.log(userData);

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  console.log(loggedInUser);

  grid.innerHTML += `
<div class="grid-wrapper">
    <div class="grid-item jFloat">
        <img src="../assets/logo/user-green.svg" alt="Køb ikon">
        ${loggedInUser.name}
    </div>
    <a href=""><div class="grid-item jFloat"><img src="../assets/logo/Settings.svg" alt="Køb ikon">
        Skift info</a>
    </div>
    <div class="grid-item jFloat">
        <img src="../assets/logo/Phonenumber.svg" alt="Køb ikon">
            ${loggedInUser.number}
    </div>
    <div class="grid-item jFloat">
        <a href="../viewtickets"><img src="../assets/logo/GamesSeen.svg" alt="Køb ikon">
            Dine billetter</a>
    </div>
    <div class="grid-item jFloat">
        <a href="../season"><img src="../assets/logo/id-green-card-svgrepo-com.svg" alt="Køb ikon">
            Sæsonkort</a>
    </div>
    <div class="grid-item jFloat">
        <a href=""><img src="../assets/logo/mailbox-green-svgrepo-com.svg" alt="Køb ikon">
            ${loggedInUser.email}</a>
    </div>
</div>   
`;
}

window.onload = function () {
  seeProfile();
};
