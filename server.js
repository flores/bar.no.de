var DateZ = require('DateZ').DateZ;

var app = require('express').createServer();
app.register('.html', require('jade'));

function checkOpen() {
  var now  = new DateZ().setTimezoneOffset(480);
  // UTC
  var hour = now.getHours();
  var day  = now.getDay();
  var schedule = require('./conf/schedule.js');

  if ( schedule.hours[day] ) {
    open = schedule.hours[day].open;
    message_closed =  schedule.hours[day].closed_message;
    message_open = schedule.hours[day].open_message || schedule.hours["default"].open_message;
  } else {
    open = schedule.hours["default"].open;
    message_closed =  schedule.hours["default"].closed_message;
    message_open = schedule.hours["default"].open_message;
  }

  if ( hour >= open ) {
    var message = message_open;
  }
  else if ( hour < open && hour >= 2 ) { 
    var message = message_closed; 
  }
  else { 
    var message = schedule.hours["last_call"];
  }
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
    var schedule = require('./conf/schedule');
    name = schedule.dj[day]["name"];
    desc = schedule.dj[day]["desc"];
  }
  var images = require('./conf/images_list');
  var image = images.list[Math.floor(Math.random()*images.list.length)];  
  res.render('index.html', { message: message, image: image, name: name, desc: desc })
});

app.get('/nerdsandtoughgirls', function(req, res){
  var today = new Date();
  var month = today.getMonth();
  var day = today.getDate();
  if ( month == 1 && day == 26 ) {
    var message = "Lets drink!";
    var m2 = ""; // nothing funny is coming to me
  }
  else {
    var message = "It is not yet time, friend.";
    var m2 = "Sunday, Feburary 26th, Blipsy";
  }
  res.render('thedaniel.html', { message: message, m2: m2 });
});

app.listen(process.env.PORT || 8001);
