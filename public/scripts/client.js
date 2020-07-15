



$(document).ready(function() {
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]


  $("time.timeago").timeago();

  const createTweetElement = function(tweet) {
    let created = $.timeago(new Date(tweet.created_at))
    return $(`<article>
    <header> 
      <p class="username">${tweet.user.name}</p>
      <p class="user-id">${tweet.user.handle}</p>
    </header>
    <h3>${tweet.content.text}</h3>
    <footer>
      <p class="created">${created}</p>
      <p>
        <i class="fa fa-flag" aria-hidden="true"></i>
        <i class="fa fa-retweet" aria-hidden="true"></i><i class="fa fa-heart" aria-hidden="true"></i>
      </p>
    </footer>
  </article>`);
     
  };

  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
      const latestTweet = createTweetElement(tweet)
      console.log(latestTweet)
      $('.tweets').append(latestTweet);
    }
    console.log(tweets)
  }


  const $tweet = renderTweets(data);

// Test / driver code (temporary)
// console.log($tweet); // to see what it looks like
// $('#tweets-container').append($tweet);

});


// Test / driver code (temporary). Eventually will get this from the server.



