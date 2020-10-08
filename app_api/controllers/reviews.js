const mongoose = require('mongoose');
const { use } = require('passport');
const locations = require('./locations');
const Loc = mongoose.model('Location');

const doSetAverageRating = (location) => {
  if(location.reviews && location.reviews.length > 0) {
    const count = location.reviews.length ;
    const total = location.reviews.reduce((acc, {rating}) => {
      return acc + rating ;
    }, 0);

    location.rating = parseInt(total/count, 10);
    location.save(err => {
      if(err) {
        console.log(err);
      } else {
        console.log(`La moyenne des notes après la mise à jour est de ${location.rating}`);
      }
    });
  }
};

const updateAverageRating = (locationId) => {
  Loc
    .findById(locationId)
    .select('rating reviews')
    .exec((err, location) => {
      if(!err) {
        doSetAverageRating(location);
      }
    })
};

const doAddReview = (req, res, location) => {
  if(!location) {
    res
      .status(404)
      .json({message: "Location non trouvée"});
  } else {
    const {author, rating, reviewText} = req.body;
    location.reviews.push({
      author,
      rating,
      reviewText
    });
    console.log(location.reviews);
    location.save((err, location) => {
      if(err) {
        res
          .status(400)
          .json(err);
      } else {
        updateAverageRating(location._id);
        const thisReview = location.reviews.slice(-1).pop();
        res
          .status(201)
          .json(thisReview);
      }
    });
  }
};

const reviewsCreate = (req, res) => { 
  getAuthor((req, res, callback) => {
    (req, res, userName) => {
      const locationId = req.params.locationid;
      if(locationId) {
        Loc
          .findById(locationId)
          .select('reviews')
          .exec((err, location) => {
            if(err) {
              res
                .status(400)
                .json(err);
            }
            else {
              doAddReview(req, res, location, userName);
            }
          });
      } else {
        res
          .status(404)
          .json({message: "Location non trouvée"});
      }
    }
  });
} ;


const reviewsReadOne = (req, res) => { 
  Loc
  .findById(req.params.locationid)
  .select('name reviews')
  .exec((err, location) => {
    if(!location){
      return res
        .status(404)
        .json({"message": "Location n'existe pas"});
    }else if(err) {
      return res
        .status(404)
        .json(err);
    }
    if(location.reviews && location.reviews.length > 0){
      const review = location.reviews.id(req.params.reviewid);
      if(!review){
        return res  
          .status(400)
          .json({"message": "review non trouvée"});
      } else {
        response = {
          location :{
            name: location.name,
            id: req.params.locationid
          },
          review
        };
        return res
          .status(200)
          .json({response});
      }
    } else {
      return res
        .status(404)
        .json({"message": "La review demandée n'existe pas"});
    }
    res 
      .status(200)
      .json(location);
  });
} ;
const reviewsUpdateOne = (req, res) => {
  if(!req.params.locationid) {
    return res 
      .status(404)
      .json({message: 'locationid est requis'});
  }else if(!req.params.reviewid) {
    return res
      .status(404)
      .json({message: 'reviewid est requis'});
  }
  Loc  
    .findById(req.params.locationid)
    .select('reviews')
    .exec((err, location) => {
      if(!location) {
        return res
          .status(404)
          .json({message: 'location non trouvé'});
      } else if(err) {
        return res
          .status(400)
          .json(err);
      }
      if(location.reviews && location.reviews.length > 0) {
        const thisReview = location.reviews.id(req.params.reviewid);
        if(!thisReview) {
          res
            .status(404)
            .json({message: 'Review not found'});
        } else {
          thisReview.author = req.body.author;
          thisReview.rating = req.body.rating;
          thisReview.reviewText = req.body.reviewText;
          location.save((err, loc) => {
            if(err) {
              res
                .status(400)
                .json(err);
            } else {
              updateAverageRating(location._id);
              res
                .status(200)
                .json(loc);
            }
          });
        }
      } else {
        res
          .status(404)
          .json({message: 'Aucune review à mettre à jour'});
      }
    });
 } ;
const reviewsDeleteOne = (req, res) => {
  if(!req.params.locationid) {
    return res 
      .status(404)
      .json({message: 'locationid est requis'});
  }else if(!req.params.reviewid) {
    return res
      .status(404)
      .json({message: 'reviewid est requis'});
  }
  Loc  
    .findById(req.params.locationid)
    .select('reviews')
    .exec((err, location) => {
      if(!location) {
        return res
          .status(404)
          .json({message: 'location non trouvé'});
      } else if(err) {
        return res
          .status(400)
          .json(err);
      }
      if(location.reviews && location.reviews.length > 0) {
        if(!location.reviews.id(req.params.reviewid)){
          return res
            .status(404)
            .json({message: "Review non trouvée"});
        }else {
          location.reviews.id(req.params.reviewid).remove();
          location.save((err) => {
            if(err) {
              res
                .status(400)
                .json(err);
            } else {
              updateAverageRating(location._id);
              res
                .status(204)
                .json(null);
            }
          });
        }
      } else {
        res
          .status(404)
          .json(null);
      }
    });
 };

module.exports = {
  reviewsCreate,
  reviewsReadOne,
  reviewsUpdateOne,
  reviewsDeleteOne
}