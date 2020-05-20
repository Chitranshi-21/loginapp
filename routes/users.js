var express = require('express');
var router = express.Router();
const pool = require('../db/dbConfig');


/*Get Contacts List */ 
router.get('/contactList',(request, response) => {

  pool
  .query('SELECT sfid, name, Email FROM salesforce.Contact')
  .then((contactQueryResult) => {
  console.log('contactQueryResult : '+JSON.stringify(contactQueryResult.rows));
  response.send(contactQueryResult.rows);
  })
  .catch((contactQueryError)=>{
  response.send(contactQueryError);
  })
  
  });

  router.post('/',(request, response) => {
    let body = request.body;
    console.log('body '+JSON.stringify(body));
  
  
})
// Join Query

router.get('/JoinQuery',(request, response) => {

  pool
    .query('SELECT acc.name as accname, con.email as conemail FROM salesforce.Contact as con INNER JOIN salesforce.Account as acc ON con.AccountId = acc.sfid')
    .then((contactQueryResult) => {
      console.log('contactQueryResult   : '+JSON.stringify(contactQueryResult.rows));
      //response.send(contactQueryResult.rows);
      response.render('JoinQuery',{lstContact:contactQueryResult.rows});
})
.catch((contactQueryError) => {
      console.log('contactQueryError  : '+contactQueryError);
      response.send(contactQueryError);
})

  });
  router.get('/welcome',(request, response) => {
    response.render('welcome.ejs');
  })  

//Login Page
router.get('/login',(request, response) => {
  response.render('login.ejs');
})


router.post('/loginPost',(request, response) => {
  pool
  .query('SELECT sfid, Email, password__c FROM salesforce.Contact')
  .then((contactQueryResult) => {
  console.log('contactQueryResult : '+JSON.stringify(contactQueryResult.rows));
  response.send(contactQueryResult.rows);
  })
  .catch((contactQueryError)=>{
  response.send(contactQueryError);
  })
  let body = request.body;
  console.log('Your Response body is :    '+JSON.stringify(body));
  

  response.send('Hello  '+body.email);
})

  //Register Page
  router.get('/register', function(req, res) {
    res.render('register.ejs');
  });
 // Registration
 
    router.post('/InsertPost',(request, response) => {
      let body = request.body;
      let {firstName, lastName, email, password, password2} = request.body;
      let errors =[];
      pool
      .query('SELECT sfid, name, Email FROM salesforce.Contact')
      .then((contactQueryResult) => {
      console.log('contactQueryResult : '+JSON.stringify(contactQueryResult.rows));
      response.send(contactQueryResult.rows);
      })
      .catch((contactQueryError)=>{
      response.send(contactQueryError);
      })
      //Check Required Fields

      if(!firstName || !lastName || !email || !password || !password2) {
        errors.push({ msg: 'Please fill all the fields'});
      }

      //Check Password 

      if(password !== password2) {
        errors.push({ msg: 'Passwords do not match'});
      }

      if(password.length <6) {
        errors.push({ msg: 'Passwords should be atleast 6 character'});
      }
     
      let email2 = pool.email

      if(email == email2)
      {
        errors.push({ msg: 'This Email id already Registered'});
      }
      if(errors.length >0) {
        response.render('register', { errors});
         
      }
      else
      {
        console.log('firstName : '+firstName+' lastName : '+lastName+' email : '+email+ 'password :' +password);
      console.log('Your Response body is :    '+JSON.stringify(body));

      pool
      .query('INSERT into salesforce.Contact(firstname, lastname ,email, password__c) values ($1, $2, $3, $4)',[firstName,lastName,email,password])
      .then((contactQueryResult) => {
      console.log('contactQueryResult : '+JSON.stringify(contactQueryResult));
      response.send(contactQueryResult);
      })
      .catch((contactQueryError)=>{
      console.log('contactQueryError  : '+contactQueryError);  
      response.render(login.ejs);
      });
      }
      
      
    }
    )
  
    
module.exports = router
