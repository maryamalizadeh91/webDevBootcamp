var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/blog_demo", {useNewUrlParser: true});

var postSchema = new mongoose.Schema({
    title: String,
    content: String
});
var Post = mongoose.model("Post", postSchema);

var userSchema = new mongoose.Schema({
   email: String,
   name: String,
   posts: [postSchema]
});
var User = mongoose.model("User", userSchema);


// var newUser = new User({
//     email: "someone@gmail.com",
//     name: "Someone"
// });

// newUser.posts.push({
//     title: "How to write a post",
//     content: "I will tell you some day!"
// });


// newUser.save(function(err, newUser) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(newUser);
//     }
// });

User.findOne({name: "Someone"}, function(err, user) {
    if (err) {
        console.log(err);
    } else {
       user.posts.push({
          title: "Second Post",
          content: "My second Post"
       }); 
       user.save(function(err, user){
           if (err) {
               console.log(err);
           } else {
               console.log(user);
           }
       });
    }
});


// var newUser = User.create({
//     email: "maryamalizadeh91@gmail.com",
//     name: "Maryam Alizadeh"
// }, function(err, newUser) {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log("user created");
//         console.log(newUser);
//     }
// });

// var newPost = Post.create({
//     title: "My first Post",
//     content: "This is my first blog post hurray!!!"
// }, function(err, newPost) {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log("post created");
//         console.log(newPost);
//     }
// });