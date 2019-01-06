var h1 = document.querySelector("h1");
h1.style.color = "pink";

var body = document.querySelector("body");
var isBlue = false;

setInterval(function() {
  if (isBlue) {
    body.style.background = "white";
    isBlue = false;
  } else {
    body.style.background = "#0088ff";
    isBlue = true;
  }
}, 2000);
