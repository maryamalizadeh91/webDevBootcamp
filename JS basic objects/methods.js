var obj = {
  name: "Chunk",
  age: 45,
  isCool: false,
  friends: ["Bob", "Tina"],
  add: function(x, y) {
    return x + y;
  }
};

obj.add(10, 30);

var comments = {};
comments.data = ["Good Job!", "Bye", "Lame..."];
comments.print = function() {
  this.data.forEach(function(el) {
    console.log(el);
  });
};

comments.print();