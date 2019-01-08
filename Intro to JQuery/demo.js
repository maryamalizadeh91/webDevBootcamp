$("h1")[0];
$("h1").css("color", "green");

// document.querySelector("h1").style.color = "green";

var styles = {
  color: "red",
  backgroundColor: "pink",
  border: "2px solid purple"
};

$("h1").css(styles);

$("li").css("color", "blue");

// var lis = document.querySelectorAll("li");
// for (var i = 0; i < lis.length; i++) {
//     lis[i].style.color = "blue";
// }

$("a").css("fontSize", "40px");

$("li").css({
    fontSize: "10px",
    border: "3px dashed purple",
    backgroundColor: "rgba(89, 45, 20, 0.5)"
});