var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/blog_demo_2", {useNewUrlParser: true});

var Post = require("./models/post");

var User = require("./models/user");


// User.create({
//     email:"Bob@gamil.com",
//     name: "Bob"
// }, function(err, user) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(user);
//     }
// });

// Post.create({
//     title: "Cook Pizza with Me Part3",
//     content: "Pizza is delicious. I want pizza part333333333"
// }, function(err, post) {
//     if (err) {
//         console.log(err);
//     } else {
//         User.findOne({ email:"Bob@gamil.com"}, function(err, foundUser) {
//             if(err) {
//                 console.log(err);
//             } else {
//                 foundUser.posts.push(post);
//                 foundUser.save(function(err, data) {
//                     if (err) {
//                         console.log(err);
//                     } else {
//                         console.log(data);
//                     }
//                 });
//             }
//         })
//     }
// });

//find user and then find all posts for that user

// User.findOne({ email:"Bob@gamil.com"}).populate("posts").exec(function(err, user) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(user);
//     }
// });