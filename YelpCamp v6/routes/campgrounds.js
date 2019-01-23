var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

//Index - show all campgrounds
router.get("/", function(req, res) {
    //res.render("campgrounds", { campgrounds: campgrounds });
    Campground.find({}, function(err, allCampgrounds) {
        if (err) {
            req.flash("error", "Couldn't find campgrounds. Please try again!");
            res.redirect("/campgrounds");
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    });
});

//Create - add new campground to DB
router.post("/", middleware.isLoggedIn, function(req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id, 
        username: req.user.username
    };
    var newCampground = { name: name, image: image, description: description, author: author };
    
    Campground.create(newCampground, function(err, newlyAdded) {
        if (err) {
            req.flash("error", "Couldn't create a new campground. Please try again!");
            res.redirect("/campgrounds");
        } else {
            req.flash("success", "The campground created successufully!");
            res.redirect("/campgrounds");
        }
    });
});

//New - show form to create new campground
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
});

//Show - show more info about one campground
router.get("/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if (err) {
            req.flash("error", "Couldn't show the requested campground. Please try again!");
            res.redirect("/campgrounds");
        } else {
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

//Edit campgorund route
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if (err) {
            req.flash("error", "Campground not found. Please try again!");
            res.redirect("/campgrounds/" + req.params.id);
        } else {
            res.render("campgrounds/edit", {campground: foundCampground});            
        }
        
    });
});

//Update campground route
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
        if (err) {
            req.flash("error", "Couldn't update the requested campground. Please try again!");
            res.redirect("/campgrounds");
        } else {
            req.flash("success", "Requested campground updated successufully!");
            res.redirect("/campgrounds/" + req.params.id);
        }
    }); 
});

//Destroy campground route
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            req.flash("error", "Couldn't remove the requested campground. Please try again!");
            res.redirect("/campgrounds");
        } else {
            req.flash("success", "Requested campground removed successufully!");
            res.redirect("/campgrounds");
        }
    });
});


module.exports = router;