const T = require('./config');

// Get 5 most recent tweets
var recentTweets = [];

new Promise(function(resolve, reject) {
  T.get('statuses/user_timeline', {q: 'screen_name:pavlomorgun', count: 5}, function(err, data, response) {
    resolve(data);
  })
}).then(function(value) {
  value.forEach(element => {
    // console.log(element);

    recentTweets.push(element);
  });
  return recentTweets;
}).catch(err => console.log(err))

module.exports = recentTweets;