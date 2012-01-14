var DateZ = require('DateZ').DateZ;

var app = require('express').createServer();
app.register('.html', require('jade'));

function checkOpen() {
  var now  = new DateZ().setTimezoneOffset(480);
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
    var message = 'Barcade is open.  $5 Mojitos or Margaritas.  Go and drink!';
  }
  else if ( hour >= 16 && day == 6 ) {
    var message = 'Awwwwwwww shit: not only is Barcade open, it is going to be fun!';
  }
  else if ( hour >= 16 && day == 6 ) {
    var message = 'Awwwwwwww shit.  Not only is barcade open, it is going to be fun!';
  }
  else if ( hour >= 16 && day > 0 ) {
    var message = 'Barcade is open! Time to drink.';
  }
  else if ( hour <= 2 ) {
    var message = 'Dude, last call at Barcade is 1:45.  Hurry up!';
  }
  else {
    var message = 'Barcade is closed.  You should drink to make yourself feel better.';
  }
  //message = message + now + hour + "day is " + day;
  return message;
};

// jacked from http://bit.ly/wvIbrb
function checkWeekAndDay() {
  var date = new DateZ().setTimezoneOffset(480),
    days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
    prefixes = ['First', 'Second', 'Third', 'Fourth', 'Fifth'];
  return prefixes[0 | date.getDate() / 7] + ' ' + days[date.getDay()];
}

app.get('/', function(req, res){
  var message = checkOpen();
  var day = checkWeekAndDay();
  if ( /Monday/.test(day) ) {
    var name = "Caribbtion";
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
  var images = require('./image_list')
  image = images.list[Math.floor(Math.random()*images.list.length)];  
  res.render('index.html', { message: message, image: image, name: name, desc: desc })
});

app.listen(process.env.PORT || 8001);
