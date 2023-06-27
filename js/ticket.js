document.addEventListener("DOMContentLoaded", function() {
    var matchDropdown = document.getElementById("matchDropdown");
  
    matchDropdown.addEventListener("change", function() {
      var selectedValue = matchDropdown.value;
      console.log("Selected value: " + selectedValue);
    });
  });
  