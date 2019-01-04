//create secretNumber
var secretNumber = 8;

//ask user for guess
var guess = Number(prompt("Guess a number"));

//check guess
if (guess === secretNumber) {
  alert("You got it right");
} else if (guess < secretNumber) {
  alert("your guess is too low");
} else {
  alert("your guess is too high");
}
