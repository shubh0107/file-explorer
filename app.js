var express = require('express');
var path = require('path');
var list_dir = require('./list_dir');
var opn = require('opn');

var app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
app.set('views', __dirname);

app.set('view engine', 'ejs');


app.use(express.static(path.join(__dirname, 'public')));




/* GET home page. */
app.get('/', function(req, res, next) {
    /*var path = req.query.path;
    if(!path){
        path = process.cwd();
    }
    console.log('Path is '+path);*/
    res.render('./index.ejs');

    /* var result;
     list_dir.listDir(path, function (err, data) {
         if(err){
             console.log('Error in / route-');
         } else {
             result = data;
             res.render('index', {path: path, data: result});
         }
     });*/
});

app.get('/list_dir', function (req, res) {
    list_dir.listDir(req.query.path, function (err, data) {
        if(err){
            res.send(err);
        } else {
            //console.log('In /list_dir ' + data);
            res.json(data);
        }
    });
});

app.get('/get_file', function (req, res) {
    var extArray = ['.mp3', '.wmv', '.txt', '.mp4', '.mkv', '.png', '.jpeg', '.jpg', '.MP3', '.WMV', '.TXT', '.MP4', '.MKV', '.PNG', '.JPEG', './JPG'];
    var filePath = req.query.path;
    var extension = path.extname(filePath);
    console.log('Extension is -'+extension);
    if(extArray.indexOf(extension) === -1){
        res.download(filePath);
    } else {
        opn(filePath, {app: 'chrome'});
    }
});









// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
