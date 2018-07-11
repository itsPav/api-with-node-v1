const path = require('path');
const express = require('express');
const routes = require('./routes/index');
const app = express();
const T = require('./public/js/config');
const twitterData = require('./public/js/config');
const bodyParser = require('body-parser');
const http = require('http').Server(app);
const io = require('socket.io')(http);

// Set views path
app.set('views', path.join(__dirname, 'views'));
// Set public path
app.use(express.static(path.join(__dirname, 'public')));
// Set pug as view engine
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

io.on('connection', function(socket){
  socket.on('tweet', function(msg){
    console.log('tweet: ' + msg);

    var twitterData = [];

    T.get('account/verify_credentials', { skip_status: true })
      .catch(function (err) {
        console.log('caught error', err.stack)
      })
      .then(function (result) {
        // `result` is an Object with keys "data" and "resp".
        // `data` and `resp` are the same objects as the ones passed
        // to the callback.
        // See https://github.com/ttezel/twit#tgetpath-params-callback
        // for details.
        twitterData.push(result.data);

        T.post('statuses/update', { status: msg }, function(err, data, response) {
          console.log('Posting');

        new Promise(function(resolve, reject) {
          T.get('statuses/user_timeline', {q: `screen_name:${twitterData[0].screen_name}`, count: 1}, function(err, data, response) {
            resolve(data);
          })
        }).then(function(value) {
            console.log(value[0].text);
            io.emit('tweet', value[0]);
        });
      }).catch(err => console.log(err))
    }); 
  });
});  

app.use('/', routes);

// Start server
http.listen(3000, function(){
  console.log('listening on *:3000');
});
