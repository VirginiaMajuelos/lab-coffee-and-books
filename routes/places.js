const Place = require("./../models/Place.model");
const router = require("express").Router();

/* GET home page */

/// READ
router.get("/", (req, res, next) => {

  Place.find()
    .then(allPlaces => res.render("places/place-list", { allPlaces }))
    .catch(err => console.log(err))

});


////CREATE

router.get("/create", (req, res, next) => {
    res.render("places/place-create")
});


router.post("/create", (req, res) => {
  let location = {
    type: 'Point',
    coordinates: [req.body.longitude, req.body.latitude]
  }
  
  const {name, type } = req.body;
    
    Place.create({name, type })
    .then (createPlace => 
        res.redirect("/places") )
        .catch(err => console.log(err))
    });


///// DELETE

router.get("/:id", (req, res) => {
  const placeId = req.params.id;

  Place.findById(placeId)
    .then((place) => {
      res.render("places", { place: place });
    });
});


router.get("/:id/delete", (req, res) =>{
    const { id } = req.params;
    Place.findByIdAndRemove(id)
    .then(() =>{res.redirect("/places")
    })



});

///// Edit

router.get("/place-edit/:id", (req, res) => {
  const { id } = req.params

  Place.findById(id)
    .then(place => res.render("places/place-edit", place))
    .catch(err => console.log(err))

})

router.post("/place-edit/:id",(req, res) => {
  const { id } = req.params
  const {name, type } = req.body

  Place.findByIdAndUpdate(id, {name, type }, { new: true })
    .then(() => {res.redirect("/places")
    .catch(err => console.log(err))

    })
});


///// Map


router.get('/api/places', (req, res) => {
	Place.find()
		.then(places => {
			res.status(200).json({places});
		})
		.catch(err => console.log(err))
});

router.get('/api/places/:id', (req, res) => {
	let placeId = req.params.id;
	Place.findById(placeId)
		.then(place => res.status(200).json(place))
		.catch(err => console.log(err))
})



module.exports= router;