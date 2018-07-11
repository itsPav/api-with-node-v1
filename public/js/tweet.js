window.onload = function addStuff() {
    var socket = io();

    const button = document.querySelector('button');
    const msg = document.querySelector('textarea');

    var tweetULElement = document.querySelector('.app--tweet--list');
    const liElement = document.createElement('li');
    const strongElement = document.createElement('strong');
    strongElement.className = 'app--tweet--timestamp';
    const aElement = document.createElement('a');
    aElement.className = 'app--tweet--author';
    const h4Element = document.createElement('h4');
    const pElement = document.createElement('p');
    const divElement = document.createElement('div');
    divElement.className = 'app--avatar';
    const imgElement = document.createElement('img');

    const ulItems = document.createElement('ul');
    ulItems.className = 'app--tweet--actions circle--list--inline';

    const reply = document.createElement('li');
    const aReply = document.createElement('a');
    const span = document.createElement('span');
    aReply.className = 'app--reply';
    span.className ='tooptip';
    span.innerHTML = 'Reply';

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

        // tweetULElement.insertBefore(tweetLI, tweetULElement.childNodes[0]);

        // newLI.children[0].innerHTML = `${msg.created_at}`

        // h4Element.innerHTML = `${msg.user.name} | @${msg.user.screen_name}`;
        // imgElement.src = msg.user.profile_image_url;
        // pElement.innerHTML = msg.text;
        // strongElement.innerHTML = msg.created_at;

        // tweetULElement.insertBefore(liElement, tweetULElement.childNodes[0]);
        // liElement.appendChild(strongElement);
        // liElement.appendChild(aElement);
        // liElement.appendChild(pElement);
        // aElement.appendChild(divElement);
        // aElement.appendChild(h4Element);
        // divElement.appendChild(imgElement);

        // liElement.appendChild(ulItems);

        // ulItems.appendChild(reply);
        // reply.appendChild(aReply);
        // aReply.appendChild(span);


    });
}