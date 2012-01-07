var app = require('express').createServer();

app.get('/', function(req, res){
  var now  = new Date();
  var hour = now.getHours() - 8;
  var day  = now.getDay();
  if ( hour >= 16 && day < 7 ) {
    res.send('Barcade is open! Time to drink.');
  }
  else if ( hour >= 12 && day == 7 ) {
    res.send('Barcade opens early on Sundays!  Go drink and be with God.');
  } 
  else if ( hour <= -6 && hour >= -7 ) {
    res.send('Barcade is open!  Time to drink.');
  }
  else {
    res.send('Barcade is closed.  You should drink to make yourself feel better.');
  }
  console.log(now + hour + "day is " + day);
});

app.listen(process.env.PORT || 8001);
