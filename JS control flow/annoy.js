// var answer = prompt("Are we there yet");

// while(answer !== "yes" && answer !== "yeah")
// {
//     answer = prompt("Are we there yet");
// }

// alert("Yeah we made it");

var answer = prompt("Are we there yet");

while(answer.indexOf("yes") === -1 && answer.indexOf("yeah") === -1)
{
    answer = prompt("Are we there yet");
}

alert("Yeah we made it");