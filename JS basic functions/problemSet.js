// function isEven(number) {
//   if (number % 2 === 0) {
//     return true;
//   }
//   return false;
// }

function isEven(number) {
    return number % 2 === 0;
  }

function factorial(number) {
  if (number === 1 || number === 0) {
    return 1;
  } else {
    return number * factorial(number - 1);
  }
}

// function factorial(num) {
//     var result = 1;
//     for (var i = 2; i <= num; num++){
//         result *= i;
//     }
//     return result;
// }


function kebabToSnake(str) {
    var newStr = str.replace(/-/g, "_");
    return newStr;
}

