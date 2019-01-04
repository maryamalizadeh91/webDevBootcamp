console.log("print numbers between -10 to 19");
for (var i = -10; i <= 19; i++) {
  console.log(i);
}

console.log("print even numbers between 10 to 40");
for (var i = 10; i <= 40; i += 2) {
  console.log(i);
}

console.log("print odd numbers between 300 to 333");
for (var i = 300; i <= 333; i++) {
  if (i % 2 !== 0) {
    console.log(i);
  }
}

console.log("print numbers divisable by 5 and 3 between 5 to 50");
for (var i = 5; i <= 50; i++) {
  if (i % 5 === 0 && i % 3 === 0) {
    console.log(i);
  }
}
