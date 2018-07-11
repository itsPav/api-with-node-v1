const T = require('./config');

// Profile Name and Image
var personalData = [];
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
      T.get('users/show', {q: `screen_name:${twitterData[0].screen_name}`, user_id:`${twitterData[0].id}`}, function(err, data, response) {
        resolve(data);
      })
    }).then(function(value) {
      personalData.push(value.name);
      personalData.push(value.screen_name);
      personalData.push(value.profile_image_url);
      personalData.push(value.profile_banner_url);
      personalData.push(value.friends_count);
      personalData.push(value.id);
      return personalData;
    }).catch(err => console.log(err))
    
})

module.exports = personalData;
