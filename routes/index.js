const express = require('express');
const router = express.Router();
const userData = require('../public/js/twitterProfile');
var recentTweets = require('../public/js/tweets');
const following = require('../public/js/following');
const dm = require('../public/js/dm');

var dataReady = false;

router.get('/', function (req, res, next) {
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
    }
})

module.exports = router;