var express         = require("express"), 
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    localStrategy   = require("passport-local"),
    Campground      = require("./models/campground"),
    Comment         = require("./models/comment"),
    User            = require("./models/user"),
    seedDB          = require("./seeds");


//======================//
//   APP Configuration  //
//======================//

mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true });
seedDB();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));


//======================//
//PASSPORT Configuration//
//======================//

app.use(require("express-session")({
    secret: "YelpCamp is Awesome!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next){
    res.locals.currentUser = req.user;
    next();
});

//======================//
//        ROUTES        //
//======================//

app.get("/", function(req, res) {
    res.render("landing");
});

app.get("/campgrounds", function(req, res) {
    //res.render("campgrounds", { campgrounds: campgrounds });
    Campground.find({}, function(err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    });
});

app.post("/campgrounds", function(req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground = { name: name, image: image, description: description };
    //campgrounds.push(newCampground);
    
    Campground.create(newCampground, function(err, newlyAdded) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
    

});

app.get("/campgrounds/new", function(req, res) {
    res.render("campgrounds/new");
});

app.get("/campgrounds/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            //console.log(foundCampground);
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});


//======================//
//   Comments  ROUTES   //
//======================//
app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", {campground: foundCampground});
        }
    });
});

app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            
            Comment.create(req.body.comment, function(err, comment) {
               if (err) {
                   console.log(err);
               } else {
                   foundCampground.comments.push(comment);
                   foundCampground.save();
                   res.redirect("/campgrounds/" + foundCampground._id);
               }
            });
        }
    });    
});


//======================//
//    AUTH    ROUTES    //
//======================//

//show register form
app.get("/register", function(req, res) {
   res.render("register"); 
});

//handle sign up logic
app.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user) {
        if (err) {
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function() {
           res.redirect("/campgrounds"); 
        });
    });
});

//show login form
app.get("/login", function(req, res) {
   res.render("login"); 
});

//handle login logic
//app.post("/login", middleware, callback)
app.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }) ,function(req, res) {
});

//logout
app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/campgrounds");
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("The YelpCamp server has started!");
});
