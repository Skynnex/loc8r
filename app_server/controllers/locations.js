/* GET 'home' page */
const homelist = (req, res) => {
  res.render('locations-list', {
    title:'Loc8r, Trouvez des lieux avec du WiFi où travailler autour de vous',
    pageHeader: {
      title: 'Loc8r',
      strapline: 'Trouvez des lieux avec du WiFi où travailler autour de vous'
    },
    sidebar: 'Loc8r vous aide à trouver des lieux où travailler autour de vous !',
    locations: [{
      name: 'Starcups',
      adress: '65 rue Michel Ange, 72100, Le Mans',
      rating: 3,
      facilities: ['Boissons chaudes', 'Nourriture sur le pouce', 'Fibre'],
      distance: '100m'
    },{
      name: 'Café du coin',
      adress: '65 rue du coin, 72100, Le Mans',
      rating: 4,
      facilities: ['Boissons chaudes', 'Fibre'],
      distance: '350m'
    }, {
      name: 'Médiathèque Sud',
      adress: '65 rue des glonnières, 72100, Le Mans',
      rating: 4,
      facilities: ['Livres', 'Fibre'],
      distance: '500m'
    }]
  });
};

/* GET 'Location info' page */
const locationInfo = (req, res) => {
  res.render('location-info', {
    sidebar: {
      context: 'Starcups is on Loc8r because it has accessible wifi and space to sit down with your laptop and get some work done.',
      callToAction: 'If you\'ve been and you like it - or if you don\'t - please leave a review to help other people just like you.'
    },
    location:{
      name: 'Starcups',
      adress: '65 rue Michel Ange, 72100, Le Mans',
      rating: 3,
      facilities: ['Boissons chaudes', 'Nourriture sur le pouce', 'Fibre'],
      coords: {lat: 47.9779384, lng: 0.2150212},
      openingTimes: [
        {
          days: 'Lundi - Vendredi',
          opening: '7:00', 
          closing: '19:00',
          closed: false
        },
        {
          days: 'Samedi',
          opening: '8:00', 
          closing: '17:00',
          closed: false
        },
        {
          days: 'Dimanche',
          closed: true
        }
      ], 
      reviews: [{
        author: 'Simon Holmes',
        date: '16 February 2017',
        rating: 4,
        reviewText: 'What a great place.'
      }, {
        author: 'Charlie Chaplin',
        date: '16 February 2017',
        rating: 3,
        reviewText: 'It was okay. Coffee wasn\'t great.'
      }]
    },
    title: 'Starcups',
  });
};

/* GET 'Add review page' */
const addReview = (req, res) => {
  res.render('location-review-form', {title: 'Add review'});
};

module.exports = {
  homelist,
  locationInfo,
  addReview
};