document.addEventListener("DOMContentLoaded", function() {
  let dropdowns = document.getElementsByClassName("dropdown");
  for (let i = 0; i < dropdowns.length; i++) {
      let dropdown = dropdowns[i];
      let dropdownButton = dropdown.querySelector(".dropbtn");
      let dropdownContent = dropdown.querySelector(".dropdown-content");
      let dropdownOptions = dropdownContent.querySelectorAll("a");

      dropdownButton.addEventListener("click", function() {
          dropdownContent.classList.toggle("active");
      });

      dropdownOptions.forEach(function(option) {
          option.addEventListener("click", function() {
              let selectedOption = this.textContent;
              dropdownButton.textContent = selectedOption;
              dropdownContent.classList.remove("active");
              console.log("Selected option: " + selectedOption);
          });
      });
  }
});
