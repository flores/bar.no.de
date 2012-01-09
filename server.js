var app = require('express').createServer();
app.register('.html', require('jade'));

function checkOpen() {
  var now  = new Date();
  // UTC
  var hour = now.getHours();
  var day  = now.getDay();
  if ( hour >= 20 && day == 0 ) {
    var message = 'Blipsy Barcade opens early on Sundays!  Go and drink!';
  }
  else if ( hour < 9 && day == 1 ) { 
    var message = 'Dude, Blipsy has been open since noon.  Go and drink!';
  }
  else if ( ( hour >= 0 && hour < 9 ) && day > 0 ) {
    var message = 'Barcade is open! Time to drink.';
  }
  else if ( hour < 10 && hour >= 9 ) {
    var message = 'Barcade is about to close, fool.  Hurry up!';
  }
  else {
    var message = 'Barcade is closed.  You should drink to make yourself feel better.';
  }
  //message = message + now + hour + "day is " + day;
  return message;
};

app.get('/', function(req, res){
  res.render('index.html', { message: checkOpen() })
});

app.listen(process.env.PORT || 8001);
