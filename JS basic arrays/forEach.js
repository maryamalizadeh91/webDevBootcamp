function myForEach(arr, func) {
  for (var i = 0; i < arr.length; i++) {
    func(arr[i]);
  }
}

var myArray = ["m", "a", "r", "y", "a", "m"];
myForEach(myArray, function(element) {
  console.log(element);
});

Array.prototype.myForEach = function(func) {
  for (i = 0; i < this.length; i++) {
    func(this[i]);
  }
};

var myArray = ["m", "a", "r", "y", "a", "m"];
myArray.myForEach(function(element) {
  console.log("element is:" + element);
});
