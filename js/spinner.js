document.addEventListener("DOMContentLoaded", function() {
    var spinner = document.querySelector(".spinner");
    var content = document.querySelector(".main-spinner-container");
  
    setTimeout(function() {
      spinner.classList.add("fade-out");
      content.classList.add("content-visible");
    }, 3000);
  });
  