const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const userData = require('./js/twitterProfile.js');
const recentTweets = require('./js/tweets.js');
const following = require('./js/following.js');
const dm = require('./js/dm.js');
// const dmUser = require('./js/dmUser.js');

// Set views path
app.set('views', path.join(__dirname, 'views'));
// Set public path
app.use(express.static(path.join(__dirname, 'public')));
// Set pug as view engine
app.set('view engine', 'pug');

var dataReady = false;

app.get('/', function (req, res, next) {
    
  // check if recentTweets is empty
  if(recentTweets.length == 0) {
    const err = new Error('Recent Tweets are empty.');
    res.render('layout', {dataReady: dataReady})
    return next(err);
    // check if any of the arrays are empty
  } else if(userData.length == 0) {
    const err = new Error('User Data is empty.');
    res.render('layout', {dataReady: dataReady})
    return next(err);
      // check if following is empty
  } else if(following.length == 0) {
    const err = new Error('Following list is empty.');
    res.render('layout', {dataReady: dataReady})
    return next(err);
        // check if dm is empty
  } else if(dm.length == 0) {
    const err = new Error('Direct Messages are empty.');
    res.render('layout', {dataReady: dataReady})
    return next(err);
  } else {
    dataReady = true;
    res.render('layout', { twitterName: userData[0] , twitterScreenName: userData[1],
      twitterURL: userData[2], twitterHeader: userData[3], numFollowing: userData[4],
      userID: userData[5], recentTweets: recentTweets, following: following, dm: dm, dataReady: dataReady})
      console.log(dm);
  }
})

// Start server
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);  
});