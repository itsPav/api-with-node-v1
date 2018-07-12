window.onload = function addStuff() {
    var socket = io();

    const button = document.querySelector('button');
    const msg = document.querySelector('textarea');

    button.addEventListener('click', function(e){
            socket.emit('tweet', msg.value);
            msg.value = "";
            return false;
    });

    socket.on('tweet', function(msg){
        console.log(msg);

        var tweetLI = document.querySelectorAll('.app--tweet--list li')[0];
        var tweet_dupe = tweetLI.cloneNode(true);
        tweetULElement.insertBefore(tweet_dupe, tweetULElement.childNodes[0]);

        var newTweet = document.querySelectorAll('.app--tweet--list li')[0];
        newTweet.children[0].innerHTML = `${msg.created_at}`;
        newTweet.children[2].innerHTML = `${msg.text}`;
        // retweet count
        newTweet.children[3].children[1].children[0].children[2].innerHTML = `${msg.retweet_count}`;
        // like count
        newTweet.children[3].children[2].children[0].children[2].innerHTML = ` ${msg.favorite_count}`;
    });
}