function average (scores) {
    var total = 0;
    // for (var i = 0; i < scores.length; i++) {
    //     total += scores[i];
    // }
    scores.forEach(function (score) {
        total += score;
    });
    
    var avg = Math.round(total / scores.length);
    return avg;
}

var scores = [90, 98, 89, 100, 100, 86, 94];
console.log(average(scores));

var scores2 = [40, 65, 77, 82, 80, 54, 73, 63, 95, 49];
console.log(average(scores2));