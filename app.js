var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const expressLayouts = require('express-ejs-layouts');
var dotenv = require('dotenv');
const flash = require('connect-flash');
const session = require('express-session');

dotenv.config();


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

//EJS
app.set('views', path.join(__dirname, 'views'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs');
app.use(expressLayouts);



//Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);



const PORT =process.env.PORT || 5000;

app.listen(PORT, console.log('Server started on port ${PORT}'))
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Connect flash
app.use(flash());


// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;