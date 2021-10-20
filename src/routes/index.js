let express = require('express');
const path = require("path");
let router = express.Router();

/* GET room page */
router.get('/:room', function(req, res, next) {
  res.sendFile(path.resolve(__dirname+'/../public/index.html'), (error)=>{
    if(error){
      console.log(error);
    }
  });
});
module.exports = router;
