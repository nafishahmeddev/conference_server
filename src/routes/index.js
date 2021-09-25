var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get("/:room_id", function (req, res, next){
  const room_id = req.params.room_id;
  res.render('roomPage', {
    title: "Xpeed Meeting Room",
    room_id: room_id
  });
});
module.exports = router;
