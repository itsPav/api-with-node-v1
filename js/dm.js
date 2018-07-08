const T = require('./config');

// Getting 6 most recent DMs
var dm = [];

new Promise(function(resolve, reject) {
    T.get('direct_messages/events/list', { count: 6}, function(err, data, response) {
        resolve(data);
    })
}).then(function(value) {

    var msgs = value.events;

    msgs.forEach(element => {

        // getting info of recipient
        new Promise(function(resolve, reject) {
            T.get('users/lookup', { user_id: element.message_create.target.recipient_id, count: 1},  function (err, data, response) {
            resolve(data);
            })
        }).then(function(value) {

            // adding keys to the message element
            element.rName = value[0].name;
            element.rScreen_name = value[0].screen_name;
            element.rProfile_image_url = value[0].profile_image_url;

            // pushing element into dm array
            dm.push(element);
        }).catch(err => console.log(err))
    });
    
    return dm;

}).catch(err => console.log(err))

module.exports = dm;