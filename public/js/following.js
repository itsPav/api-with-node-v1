const T = require('./config');
// Get 5 most recent following
var following = [];
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

    new Promise(function(resolve, reject) {
        T.get('friends/list', {q: `screen_name:${twitterData[0].screen_name}`, count: 5}, function(err, data, response) {
            resolve(data);
        })
    }).then(function(value) {
        var users = value.users;
    
        users.forEach(element => {
            following.push(element);
        });
        // console.log('Following: ' + users[0].following);
        
        return following;
    }).catch(err => console.log(err))
    
});

module.exports = following;