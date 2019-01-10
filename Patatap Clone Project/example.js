var sound1 = new Howl({
  src: ['sounds/bubbles.mp3']
});

var sound2 = new Howl({
  src: ['sounds/clay.mp3']
});

var myCircles = [];
function onKeyDown(event) {
  var maxPoint = new Point(view.size.width, view.size.height);
  var randomPoint = Point.random();
  var point = maxPoint * randomPoint;
  var newCircle = new Path.Circle(point, 500);
  if (event.key === "a") {
      sound1.play();
      newCircle.fillColor = 'purple';
  } else if (event.key === "s") {
      sound2.play();
      newCircle.fillColor = '#16a085';
  } else {
  newCircle.fillColor = 'orange';
  }
  myCircles.push(newCircle);
}

function onFrame(event) {
  for (var i = 0; i < myCircles.length; i++) {
      myCircles[i].fillColor.hue +=1;
      myCircles[i].scale(0.9);
  }
}