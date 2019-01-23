var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//Comments New
router.get("/new", middleware.isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if (err) {
            req.flash("error", "Campground not found. Please try again!");
            res.redirect("/campgrounds");
        } else {
            res.render("comments/new", {campground: foundCampground});
        }
    });
});

//Comments Create
router.post("/", middleware.isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if (err) {
            req.flash("error", "Campground not found. Please try again!");
            res.redirect("/campgrounds");
        } else {
            
            Comment.create(req.body.comment, function(err, comment) {
               if (err) {
                    req.flash("error", "Couldn't create the comment. Please try again!");
                    res.redirect("/campgrounds/" + req.params.id);
               } else {
                   comment.author.id = req.user._id;
                   comment.author.username = req.user.username;
                   comment.save();
                   foundCampground.comments.push(comment);
                   foundCampground.save();
                   req.flash("success", "Comment created successufully!");
                   res.redirect("/campgrounds/" + foundCampground._id);
               }
            });
        }
    });    
});

//Comments Edit
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res) {
    Comment.findById(req.params.comment_id, function(err, foundComment) {
       if (err) {
           req.flash("error", "Couldn't find the comment. Please try again!");
           res.redirect("back");
       } else {
           res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
       }
    });
});

//Comments Update
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
        if (err) {
            req.flash("error", "Couldn't edit the comment. Please try again!");
            res.redirect("back");
        } else {
            req.flash("success", "Comment edited successufully!");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });    
});

//Comments Destroy
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function(err) {
        if (err) {
            req.flash("error", "Couldn't remove the comment. Please try again!");
            res.redirect("back");
        } else {
            req.flash("success", "Comment removed successufully!");
            res.redirect("/campgrounds/" + req.params.id);
        }
    }); 
});

module.exports = router;