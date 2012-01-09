var app = require('express').createServer();

app.get('/', function(req, res){
  var now  = new Date();
  // UTC
  var hour = now.getHours();
  var day  = now.getDay();
  if ( hour >= 19 && day == 0 ) {
    res.send('Blipsy Barcade opens early on Sundays!  Go and drink!');
  }
  else if ( hour < 8 && day == 1 ) { 
    res.send('Dude, Blipsy has been open since noon.  Go and drink!');
  }
  else if ( ( hour >= 23 || hour < 8 ) && day > 0 ) {
    res.send('Barcade is open! Time to drink.');
  }
  else if ( hour < 9 && hour >= 8 ) {
    res.send('Barcade is about to close, fool.  Hurry up!');
  }
  else {
    res.send('Barcade is closed.  You should drink to make yourself feel better.');
  }
  console.log(now + hour + "day is " + day);
});

app.listen(process.env.PORT || 8001);
