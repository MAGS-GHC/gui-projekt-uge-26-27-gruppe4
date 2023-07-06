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



const nextBTN = document.querySelectorAll(".mainBTN")
var slideIndex = 0;
var slides = document.querySelectorAll(".main-ticket-container");

function showNextSlide() {
    if (slideIndex < slides.length - 1) {
      slides[slideIndex].classList.remove("active");
      slideIndex++;
      slides[slideIndex].classList.add("active");
    } else {
      console.log("Last slide reached.");
    }
  }
  

  for(let i = 0; i < nextBTN.length; i++){

    nextBTN[i].addEventListener("click", showNextSlide);
  }
  
  slides[slideIndex].classList.add("active");