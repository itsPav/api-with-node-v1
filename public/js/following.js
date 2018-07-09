const T = require('./config');

// Get 5 most recent following
var following = [];

//     console.log(element.profile_image_url)
//     console.log(element.name)
//     console.log(element.screen_name)

new Promise(function(resolve, reject) {
    T.get('friends/list', {q: 'screen_name:pavlomorgun', count: 5}, function(err, data, response) {
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

module.exports = following;