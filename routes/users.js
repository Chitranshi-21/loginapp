var express = require('express');
var router = express.Router();
const pool = require('../db/dbConfig');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Hii this is inside user.js file');
});

router.get('/contactList',(request, response) => {

  pool
  .query('SELECT sfid, name FROM salesforce.Contact')
  .then((contactQueryResult) => {
  console.log('contactQueryResult : '+JSON.stringify(contactQueryResult.rows));
  response.send(contactQueryResult.rows);
  })
  
  .catch((contactQueryError)=>{
  response.send(contactQueryError);
  })
  
  });

module.exports = router;
