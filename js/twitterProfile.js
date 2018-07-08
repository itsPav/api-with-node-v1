const T = require('./config');

// Profile Name and Image
var personalData = [];

new Promise(function(resolve, reject) {
  T.get('users/show', {q: 'screen_name: pavlomorgun', user_id: 17123272}, function(err, data, response) {
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

module.exports = personalData;
