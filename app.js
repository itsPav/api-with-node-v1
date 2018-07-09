const path = require('path');
const express = require('express');
const routes = require('./routes/index');
const app = express();
const T = require('./public/js/config');
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');

// Set views path
app.set('views', path.join(__dirname, 'views'));
// Set public path
app.use(express.static(path.join(__dirname, 'public')));
// Set pug as view engine
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var tweetMessage = "";

app.use((req, res, next) => {
  tweetMessage = req.body.tweetContent;

  if(tweetMessage != ""){
    T.post('statuses/update', { status: tweetMessage }, function(err, data, response) {
      console.log('Posting');
    })
  }

  next();
})

app.use('/', routes);

// Start server
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);  
});
