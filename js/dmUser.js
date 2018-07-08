// const T = require('./config');
// const dm = require('./dm');

// var dmUser = [];

// new Promise(function(resolve, reject) {
//     T.get('users/lookup', { user_id: dm.recipient_id, count: 1},  function (err, data, response) {
//     console.log(dm.recipient_id);
//     console.log(data)
//     resolve(data);
//     })
// }).then(function(value) {
//     dmUser.push(value);

//     // console.log(value);
//     // console.log(value[0].name)
//     // console.log(value[0].screen_name)
//     // console.log(value[0].profile_image_url)

//     // console.log(value.events[0].message_create);
//     // console.log(value.events[0].message_create.message_data.text);

//     return dmUser;
// }).catch(err => console.log(err))

// module.exports = dmUser;