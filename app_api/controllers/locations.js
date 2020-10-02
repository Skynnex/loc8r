const mongoose = require('mongoose');
const Loc = mongoose.model('Location');

const locationsListByDistance = async (req, res) => {
  
  const lng = parseFloat(req.query.lng);
  const lat = parseFloat(req.query.lat);
  const maxDistance = parseFloat(req.query.maxDistance);
  if((!lng && lng !== 0) || (!lat && lat !== 0)){
    return res
      .status(400)
      .json({message: 'Veuillez remplir les champs longitude et latitude, merci'});
  }
  const near = {
    type: "Point",
    coordinates: [lng, lat]
  };
  const geoOptions = {
    distanceField: "distance.calculated",
    spherical: true,
    maxDistance: maxDistance
  };
  try {
    const results = await Loc.aggregate([
      {
        $geoNear: {
        near,
        ...geoOptions,
        }
      },
      {
        $limit: 5 
      }
    ]);
    const locations = results.map(result => {
      return {
        id: result._id,
        name: result.name,
        adress: result.adress,
        rating: result.rating,
        facilities: result.facilities,
        distance: `${result.distance.calculated.toFixed()}`
      }
    });
    res
      .status(200)
      .json(locations);
  }catch(err) {
    res
      .status(404)
      .json(err);
  }
 } ;


const locationsCreate = (req, res) => { 
  Loc.create({
    name: req.body.name,
    adress: req.body.adress,
    facilities: req.body.facilities.split(","),
    coords: {
      type: "Point",
      coordinates: [
        parseFloat(req.body.lng),
        parseFloat(req.body.lat)
      ]
    }, 
    openingTimes: [{
      days: req.body.days1,
      opening: req.body.opening1,
      closing: req.body.closing1,
      closed: req.body.closed1
    }, {
      days: req.body.days2,
      opening: req.body.opening2,
      closing: req.body.closing2,
      closed: req.body.closed2
    }]
  }, (err, location) => {
    if(err){
      res
        .status(400)
        .json(err);
    }
    else {
      res
        .status(201)
        .json(location);
    }
  });
};


const locationsReadOne = (req, res) => { 
  Loc
    .findById(req.params.locationid)
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
      res 
        .status(200)
        .json(location);
    });
 };
const locationsUpdateOne = (req, res) => {
  if(!req.params.locationid) {
    return res
    .status(404)
    .json({message: 'Locationid est requis'});
  }
  Loc
    .findById(req.params.locationid)
    .select('-reviews -rating')
    .exec((err, location) => {
      if(!location) {
        return res
          .status(404)
          .json({message: 'Location non trouvée'});
      } else if(err) {
        return res
          .status(400)
          .json(err);
      } 
      location.name = req.body.name ;
      location.adress = req.body.adress ;
      location.facilities = req.body.facilities.split(",") ;
      location.coords = {
        type: "Point",
        coordinates: [
          parseFloat(req.body.lng),
          parseFloat(req.body.lat)
        ]
      };
      location.openingTimes = [{
        days: req.body.days1,
        opening: req.body.opening1,
        closing: req.body.closing1,
        closed: req.body.closed1
      },{
        days: req.body.days2,
        opening: req.body.opening2,
        closing: req.body.closing2,
        closed: req.body.closed2
      }];
      location.save((err, loc) => {
        if(err) {
          res
            .status(404)
            .json(err);
        } else {
          res
            .status(200)
            .json(loc);
        }
      });
    });
 };


const locationsDeleteOne = (req, res) => {
  const locationId = req.params.locationid;
  if(!locationId) {
    return res
    .status(404)
    .json({message: 'Locationid est requis'});
  }
  Loc
    .findByIdAndRemove(locationId)
    .exec((err, location) => {
      if(err) {
        return res
          .status(404)
          .json(err);
      } else {
        res
          .status(204)
          .json(null);
      }
    });
};

module.exports = {
  locationsListByDistance,
  locationsCreate,
  locationsReadOne,
  locationsUpdateOne,
  locationsDeleteOne
};