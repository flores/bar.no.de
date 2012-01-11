process.env.TZ = 'PST8DST';
var app = require('express').createServer();
app.register('.html', require('jade'));

function checkOpen() {
  var now  = Date.now();
  // UTC
  var hour = now.getHours();
  var day  = now.getDay();
  if ( hour >= 12 && hour <= 18 && day == 0 ) {
    var message = 'Blipsy Barcade opens early on Sundays!  $3 Margaritas!  Go and drink!';
  }
  else if ( hour > 18 && day == 0 ) { 
    var message = 'Dude, Blipsy has been open since noon.  Go and drink!';
  }
  else if ( hour > 16 && day == 1 ) { 
    var message = '$5 Mojitos or Margaritas.  Go and drink!';
  }
  else if ( hour >= 16 && day == 6 ) {
    var message = 'Awwwwwwww shit.  Not only is barcade open, it is going to be fun!';
  }
  else if ( hour >= 16 && day > 0 ) {
    var message = 'Barcade is open! Time to drink.';
  }
  else if ( hour <= 2 ) {
    var message = 'Dude, last call is at 1:45.  Hurry up!';
  }
  else {
    var message = 'Barcade is closed.  You should drink to make yourself feel better.';
  }
  //message = message + now + hour + "day is " + day;
  return message;
};

// jacked from http://bit.ly/wvIbrb
function checkWeekAndDay() {
  var date = Date.now(),
    days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
    prefixes = ['First', 'Second', 'Third', 'Fourth', 'Fifth'];
  return prefixes[0 | date.getDate() / 7] + ' ' + days[date.getDay()];
}

var images = [
  "http://cdn.petalphile.com/blipsy/barcade_closed.jpeg",
  "http://cdn.petalphile.com/blipsy/barcade-jameson.jpg",
  "http://cdn.petalphile.com/blipsy/barcade_open.jpg",
  "http://cdn.petalphile.com/blipsy/barcade-regulars.jpg",
  "http://cdn.petalphile.com/blipsy/barcade_weekend.jpg",
  "http://cdn.petalphile.com/blipsy/blipsy.jpg",
  "http://cdn.petalphile.com/blipsy/IMG_3585.jpg",
  "http://cdn.petalphile.com/blipsy/blipsy_barcade_flyer.jpg",
  "http://cdn.petalphile.com/blipsy/IMG_32902.jpg",
  "http://cdn.petalphile.com/blipsy/blipsycakes1.jpg",
  "http://cdn.petalphile.com/blipsy/blipsycake2.jpg",
  "http://cdn.petalphile.com/blipsy/blipsy005a-500x0.jpg",
  "http://cdn.petalphile.com/blipsy/blipsy004a-500x0.jpg",
  "http://cdn.petalphile.com/blipsy/dee927d6384611e1a87612313804ec91_7.jpg",
  "http://cdn.petalphile.com/blipsy/l.jpg",
  "http://cdn.petalphile.com/blipsy/IMG_3564.jpg",
  "http://cdn.petalphile.com/blipsy/IMG_3580.jpg"
];

app.get('/', function(req, res){
  var message = checkOpen();
  var day = checkWeekAndDay();
  if ( /Monday/.test(day) ) {
    var name = "Cumbia night!";
  }
  else if ( /Sunday/.test(day) ) {
    var name = "The Jukebox!";
  }
  else if ( /Tuesday/.test(day) ) {
    var name = "Randy J";
    var desc = "Hip-Hop, Rap, Old school";
  }
  else {
    var schedule = require('./schedule');
    name = schedule.dj[day]["name"];
    desc = schedule.dj[day]["desc"];
  }
  var image = images[Math.floor(Math.random()*images.length)];  
  res.render('index.html', { message: message, image: image, name: name, desc: desc })
});

app.listen(process.env.PORT || 8001);
