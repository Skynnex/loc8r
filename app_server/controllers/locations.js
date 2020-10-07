const request = require('request');
const apiOptions = {
  server: 'http://localhost:3000'
};
if(process.env.NODE_ENV === 'production') {
  apiOptions.server = 'https://safe-dawn-18187.herokuapp.com' ;
}

const showError = (req, res, statusCode) => {
  let title = '' ;
  let content = '' ;
  if(statusCode === 404) {
    title = '404, page non trouvée' ;
    content = 'Désolé, la page que vous recherchez semble ne pas exister, essayez donc un autre café !' ;
  } else {
    title = `${statusCode}, il y a un bug dans le système`;
    content = 'On va essayer de réparer ;-)' ;
  }
  res.status(statusCode);
  res.render('generic-text', {
    title,
    content
  });
};

const formatDistance = (distance) => {
  let thisDistance = 0;
  let unit = 'm';
  if(distance > 1000) {
    thisDistance = parseFloat(distance/1000).toFixed(1) ;
    unit = 'km';
  } else {
    thisDistance = Math.floor(distance) ;
  }
  return thisDistance + unit ;
};

const getLocationInfo = (req, res, callback) => {
  const path = `/api/locations/${req.params.locationid}`;
  const url = `${apiOptions.server}${path}`;
  const requestOptions = {
    url: `${url}`,
    method: 'GET',
    json: {}
  };
  request(
    requestOptions,
    (err, {statusCode}, body) => {
      const data = body;
      if(statusCode === 200){
        data.coords = {
          lng: body.coords[0],
          lat: body.coords[1]
        };
        callback(req, res, data);
      } else {
        showError(req, res, statusCode);
      }
    }
  )
};

/* GET 'home' page */
const renderHomepage = (req, res, responseBody) => {
  let message = null;
  if(!(responseBody instanceof Array)) {
    message = 'API lookup error';
    responseBody = [];
  }else {
    if(!responseBody.length) {
      message = 'No places found nearby';
    }
  }
  res.render('locations-list', {
    title: 'Loc8r, Trouvez des lieux avec du WiFi où travailler autour de vous',
    pageHeader: {
      title: 'Loc8r',
      strapline: 'Trouvez des lieux avec du WiFi où travailler autour de vous'
    },
    sidebar: 'Loc8r vous aide à trouver des lieux où travailler autour de vous !',
    locations: responseBody,
    message
  })
};

const homelist = (req, res) => {
  const path = '/api/locations/';
  const requestOptions = {
    url: `${apiOptions.server}${path}`,
    method: 'GET',
    json: {},
    qs: {
      lng: 0.2185714,
      lat: 47.9791214,
      maxDistance: 5000
    }
  };
  console.log(requestOptions);
  request(
    requestOptions,
    (err, {statusCode}, body) => {
      let data = [];
      if(statusCode === 200 && body.length) {
        data = body.map((item) => {
          item.distance = formatDistance(item.distance);
          return item;
        });
      } else {
        data = body;
      }
      renderHomepage(req, res, data);
    }
  );
}

/* GET 'Location info' page */
const locationInfo = (req, res) => {
  getLocationInfo(req, res, (req, res, responseData) => renderDetailPage(req, res, responseData)
  );
};

const renderDetailPage = (req, res, location) => {
  res.render('location-info', {
    title: location.name,
    pageHeader: {
      title: location.name
    },
    sidebar: {
      context: 'TODO is on Loc8r because it has accessible wifi and space to sit down with your laptop and get some work done.',
      callToAction: 'If you\'ve been and you like it - or if you don\'t - please leave a review to help other people just like you.'
    },
    location
  });
};


/* GET 'Add review page' */
const addReview = (req, res) => {
  getLocationInfo(req, res, 
    (req, res, responseData) => renderReviewForm(req, res, responseData)
  );
};

const renderReviewForm = (req, res, {name}) => {
  res.render('location-review-form', {
    title: `Review ${name} on Loc8r`,
    pageHeader : { title: `Review ${name}`},
    error: req.query.err
  });
};

const doAddReview = (req, res) => {
  const locationId = req.params.locationid ;
  const path = `/api/locations/${locationId}/reviews/`;
  const postdata = {
    author: req.body.name,
    rating: parseInt(req.body.rating, 10),
    reviewText: req.body.review
  };
  const requestOptions = {
    url: `${apiOptions.server}${path}`,
    method: 'POST',
    json: postdata
  };
  if(!postdata.author || !postdata.rating || !postdata.reviewText) {
    res.redirect(`/location/${locationId}/review/new?err=val`) ;
  }else {
    request(
      requestOptions,
      (err, {statusCode},{name}) => {
        if(statusCode === 201) {
          res.redirect(`/location/${locationId}`) ;
        }  else if(statusCode === 400 && name && name === 'ValidationError') {
          res.redirect(`/location/${locationId}/review/new?err=val`);
      } else {
          showError(req, res, statusCode);
        }
      }
    )
  }
};

module.exports = {
  homelist,
  locationInfo,
  addReview,
  doAddReview
};