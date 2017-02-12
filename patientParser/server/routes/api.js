/*jshint esversion: 6 */
/* patient parser */

const express = require('express');

const router = new express.Router();

router.get('/dashboard', (req, res) => {
  res.status(200).json({
    message: "You're authorized to see this secret message."
  });
});

router.get('/api/runTheList', (req, res) => {
  console.log("A request");
  const filter = { hidden: false };
  Patient.find(filter).sort({ro: 1}).exec((err, docs) => {
    if (err) {
      return console.error(err);
    }
    return res.json(docs);
  });
});

module.exports = router;
