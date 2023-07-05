var grid = document.querySelector(".grid-container");

function seeProfile() {
  grid.innerHTML += `
<div class="grid-wrapper">
    <div class="grid-item jFloat">
        <img src="../assets/logo/user-green.svg" alt="Køb ikon">
         Navn
    </div>
    <div class="grid-item jFloat"><img src="../assets/logo/Settings.svg" alt="Køb ikon">
        Skift info
    </div>
    <div class="grid-item jFloat">
        <a href=""><img src="../assets/logo/Phonenumber.svg" alt="Køb ikon">
            Nummer</a>
    </div>
    <div class="grid-item jFloat">
        <a href="../viewtickets/index.html"><img src="../assets/logo/GamesSeen.svg" alt="Køb ikon">
            Dine billetter</a>
    </div>
    <div class="grid-item jFloat">
        <a href="../season/index.html"><img src="../assets/logo/id-green-card-svgrepo-com.svg" alt="Køb ikon">
            Sæsonkort</a>
    </div>
    <div class="grid-item jFloat">
        <a href=""><img src="../assets/logo/mailbox-green-svgrepo-com.svg" alt="Køb ikon">
            Mail</a>
    </div>
</div>   
`;
}

window.onload = function () {
  seeProfile();
};
