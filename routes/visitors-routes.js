const router = require("express").Router();

const Kennels = require("../modules/kennels-modules.js")
const Dogs = require("../modules/dogs-module.js");
const Breeds = require("../modules/breeds-module.js");
const Notifications = require("../modules/notifications-module.js");

// get all kennels
router.get('/kennels', (req, res)=> {
  Kennels.find()
  .then(data => {
    req.status(200).json(data);
  })
  .catch(err => {
    res.status(500).json({ message: "Failed to get Kennels", error: err });
  });
});

//get kennel by id
router.get('/kennels/:id', (req, res) => {
  Kennels.findById(req.params.id)
  .then(data => {
    res.status(200).json(data);
  })
  .catch(err => {
    res.status(500).json({ message: "Failed to get Kennel", error: err });
  });
});

// get all dogs
router.get('/dogs', (req, res) => {
  Dogs.find()
  .then(data => {
    req.status(200).json(data);
  })
  .catch(err => {
    res.status(500).json({ message: "Failed to get Dogs", error: err });
  });
});

// get a dog by id
router.get('/dogs/:id', (req, res) => {
  Dogs.findById(req.params.id)
  .then(data => {
    res.status(200).json(data);
  })
  .catch(err => {
    res.status(500).json({ message: "Failed to get Dog", error: err });
  });
});

//get a breed by id
router.get('/breeds/:id', (req, res) => {
  Breeds.findBreeds(req.params.id)
   .then(data=>{
     res.status(200).json(data)
   })
   .catch( err=> {
     res.status(500).json({ message: "Failed to get Breed", error: err});
  })
});
// create notifications
router.post('/notifications', (req, res) => {
  const date_sent = Date.now()
  const notification = {...req.body, date_sent}
  Notifications.add(notification)
   .then(data=>
     res.status(201).json(...data)
   )
   .catch(err => 
     res.status(500).json(error: err, message: "Unable to post   notification. Please make sure to include your admin_id and dog_id"))
});

module.exports = router;