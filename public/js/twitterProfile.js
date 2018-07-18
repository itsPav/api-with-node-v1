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
    console.log(twitterData);

    personalData.push(twitterData[0].name);
    personalData.push(twitterData[0].screen_name);
    personalData.push(twitterData[0].profile_image_url);
    personalData.push(twitterData[0].profile_banner_url);
    personalData.push(twitterData[0].friends_count);
    personalData.push(twitterData[0].id);

    console.log(personalData);
    return personalData;
    
})

module.exports = personalData;
