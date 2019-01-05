function printReverse(arr) {
  for (var i = arr.length - 1; i >= 0; i--) {
    console.log(arr[i]);
  }
}

function isUniform(arr) {
  var firstElement = arr[0];
  for (var i = 1; i < arr.length; i++) {
    if (firstElement !== arr[i]) {
      return false;
    }
  }
  return true;
}

function sumArray(arr) {
  var sum = 0;
  arr.forEach(function(number) {
    sum += number;
  });
  return sum;
}

function max(arr) {
  var max = 0;
  arr.forEach(function(number) {
    if (number > max) {
      max = number;
    }
  });
  return max;
}
