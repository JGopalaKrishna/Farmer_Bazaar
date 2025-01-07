var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const mongoose = require('mongoose')
const bodyParser =require('body-parser');
const cors =require('cors');
const CustomerRoute1 = require("./Routes/Routergk1");

var app = express();

mongoose.connect("mongodb+srv://gkfarmerbazaar:NuptchMKAMKUdsDc@cluster0.nrgbu.mongodb.net/")
.then(result=>{console.log("connect successfully with DataBase of MongoDB")})
.catch(err=>{console.log(err)})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors())
app.use(bodyParser.json())
app.use("/",CustomerRoute1);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.listen(9000,function(){
  console.log("Server Started at 9000");
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;