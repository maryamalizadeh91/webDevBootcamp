var mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment")

var data = [
    {
        name: "Cloud's Rest", 
        image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam aliquet nibh non ipsum rhoncus lobortis. Morbi id tellus nisl. Proin eu viverra est. Morbi scelerisque efficitur neque vel vehicula. Nulla tempus nulla at sollicitudin efficitur. Proin odio nisl, hendrerit at malesuada sit amet, egestas et tellus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis orci libero, lobortis a imperdiet ac, sollicitudin non felis. Nam scelerisque nulla quis urna mollis sollicitudin. Proin nec tortor orci.Cras nec erat non augue ullamcorper hendrerit id id libero. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed sed dui at erat lacinia tempor. Pellentesque sit amet sapien et augue maximus pellentesque. Sed sagittis dictum dolor, id bibendum eros cursus nec. Quisque nec dui et risus elementum condimentum non sit amet mauris. Nulla mi lacus, posuere vel ornare ac, vehicula vel enim. Vestibulum porttitor dui sit amet laoreet mattis. "
    },
    {
        name: "Desert Mesa", 
        image: "https://images.unsplash.com/photo-1517824806704-9040b037703b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description: "Nam rutrum rutrum tellus eget ultricies. Duis tincidunt metus ac scelerisque elementum. In accumsan fringilla dolor ac euismod. Fusce fermentum, nibh vitae viverra malesuada, mauris eros ornare arcu, sagittis condimentum eros felis eu orci. Donec aliquam neque euismod, egestas massa vel, cursus arcu. Fusce sit amet tincidunt orci, sit amet mattis quam. Etiam sodales mauris dolor, sit amet cursus arcu iaculis nec. Cras sit amet justo quis sapien blandit consectetur non vel ligula. Quisque accumsan sem sit amet suscipit suscipit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec bibendum lectus in sem ultricies lacinia. Vivamus vulputate faucibus lacus pretium iaculis. "
    },
    {
        name: "Canyon Floor", 
        image: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description: "Aenean sit amet hendrerit quam. Nunc tellus odio, posuere eget condimentum ut, lobortis pellentesque purus. Cras molestie congue metus, non tincidunt purus lacinia eu. Donec felis arcu, viverra rhoncus sodales id, bibendum vel arcu. Proin ut urna feugiat, volutpat orci efficitur, accumsan erat. Suspendisse lorem odio, elementum sit amet mi eu, facilisis laoreet magna. Nullam scelerisque consectetur nisi, eget accumsan elit scelerisque eget. Nunc quis eros vel ex ultricies tincidunt nec a massa. Phasellus non augue efficitur ligula sollicitudin sodales. Cras vel magna tellus. Integer ultrices lobortis malesuada. Vestibulum fermentum dolor ante, in lobortis nulla commodo ut. Morbi dignissim, elit non placerat tempor, tellus massa pulvinar est, vel ultricies diam tortor ac felis. Ut condimentum tincidunt ipsum, vitae vehicula urna auctor id. Quisque ullamcorper, libero non dictum ultricies, arcu tortor aliquam sem, nec malesuada turpis leo vitae enim. Fusce nec ex rhoncus, varius quam quis, rutrum magna. "
    }
];

function seedDB() {
    //Remove all campgrounds
    Campground.remove({}, function(err) {
        if(err) {
            console.log(err);
        }
        else
        {
            console.log("Removed Campgrounds");
            Comment.remove({}, function(err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Removed Comments");
                    //add a few campgrounds
                    data.forEach(function(seed) {
                      Campground.create(seed, function(err, campground) {
                          if (err) {
                              console.log(err);
                          } else {
                              console.log("added a campground");
                              //create a comment
                              Comment.create(
                                  {
                                      text: campground.name + ": This place is great but I wish it had internet!",
                                      author:"Homer"
                                  }, function(err, comment) {
                                      if (err) {
                                          console.log(err);
                                      } else {
                                          campground.comments.push(comment);
                                          campground.save();               
                                          console.log("Created new comment!");
                                      }
            
                                });
                          }
                      }) 
                    });                
                }
            });           
        }
    });   
}

module.exports = seedDB;