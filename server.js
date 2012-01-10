var app = require('express').createServer();
app.register('.html', require('jade'));

function checkOpen() {
  var now  = new Date();
  // UTC
  var hour = now.getHours();
  var day  = now.getDay();
  if ( hour >= 20 && day == 0 ) {
    var message = 'Blipsy Barcade opens early on Sundays!  Go and drink!';
    var image = 'http://cdn.petalphile.com/blipsy/barcade-regulars.jpg';
  }
  else if ( hour < 9 && day == 1 ) { 
    var message = 'Dude, Blipsy has been open since noon.  Go and drink!';
    var image = 'http://cdn.petalphile.com/blipsy/barcade_open.jpg';
  }
  else if ( ( hour >= 0 && hour < 9 ) && day == 6 ) {
    var message = 'Awwwwwwww shit.  Not only is barcade open, it is going to be fun!';
    var image = 'http://cdn.petalphile.com/blipsy/barcade_weekend.jpg';
  }
  else if ( ( hour >= 0 && hour < 9 ) && day > 0 ) {
    var message = 'Barcade is open! Time to drink.';
    var image = 'http://cdn.petalphile.com/blipsy/barcade_open.jpg';
  }
  else if ( hour < 10 && hour >= 9 ) {
    var message = 'Barcade is about to close, fool.  Hurry up!';
    var image = 'http://cdn.petalphile.com/blipsy/barcade-jameson.jpg';
  }
  else {
    var message = 'Barcade is closed.  You should drink to make yourself feel better.';
    var image = "http://cdn.petalphile.com/blipsy/barcade_closed.jpeg";
  }
  //message = message + now + hour + "day is " + day;
  return [ message, image ];
};

function pickImage() {
  var images = [
    "http://cdn.petalphile.com/blipsy/barcade_closed.jpeg",
    "http://cdn.petalphile.com/blipsy/barcade-jameson.jpg",
    "http://cdn.petalphile.com/blipsy/barcade_open.jpg",
    "http://cdn.petalphile.com/blipsy/barcade-regulars.jpg",
    "http://cdn.petalphile.com/blipsy/barcade_weekend.jpg"
  ];

};

app.get('/', function(req, res){
  var status = checkOpen();
  var message = status[0];
  var image = status[1];
  res.render('index.html', { message: message, image: image })
});

app.listen(process.env.PORT || 8001);
