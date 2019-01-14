var request = require("request");
request("https://randomuser.me/api/?gender=female", function(error, response, body){
    if(!error && response.statusCode == 200) {
        var parsedData = JSON.parse(body);
        console.log("Random User's Lastname is: ");
        console.log(parsedData["results"][0]["name"]["last"]);
    } 
});