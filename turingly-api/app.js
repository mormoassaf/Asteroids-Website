const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const articleRouter = require('./routes/articles');
const app = express();

// Connect to the database ATLAS
const uri = "mongodb+srv://HetSheldor:" + process.env.ATLAS_PW + "@t-cluster0.oyj9t.gcp.mongodb.net/" + process.env.CLUSTER + "?retryWrites=true&w=majority";
mongoose.connect(uri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then(() => console.log('Database connected!')).catch(error =>  console.log(error));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


// CORS: Cross Origin Resource Sharing: Make sure that the app returns the required header to allow direct access
// Specify restrictions in cors as a JSON object
app.use(cors());
// The new version of express needs to be told to use the body parses in explicit form
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/articles', articleRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  console.log(err);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
