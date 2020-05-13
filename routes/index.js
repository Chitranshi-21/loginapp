var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Kloudrac' });
});

router.get('/abcd', function(req,res,next){
res.send('Hello Customer');
}
)

module.exports = router;
