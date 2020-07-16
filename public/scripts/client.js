



$(document).ready(function() {
  // const data = [
  //   {
  //     "user": {
  //       "name": "Newton",
  //       "avatars": "https://i.imgur.com/73hZDYK.png"
  //       ,
  //       "handle": "@SirIsaac"
  //     },
  //     "content": {
  //       "text": "If I have seen further it is by standing on the shoulders of giants"
  //     },
  //     "created_at": 1461116232227
  //   },
  //   {
  //     "user": {
  //       "name": "Descartes",
  //       "avatars": "https://i.imgur.com/nlhLi3I.png",
  //       "handle": "@rd" },
  //     "content": {
  //       "text": "Je pense , donc je suis"
  //     },
  //     "created_at": 1461113959088
  //   }
  // ]


  $("time.timeago").timeago();

  const createTweetElement = function(tweet) {
    let created = $.timeago(new Date(tweet.created_at))
    return $(`<article>
    <header>
      <div>
        <img class="avatar" src="${tweet.user.avatars}"> 
        <p class="username">${tweet.user.name}</p>
      </div>
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
      $('.tweets').prepend(latestTweet);
    }
    console.log(tweets)
  }

  $(function() {
    const $button = $('form');
    $button.submit (function ( event ) {
      event.preventDefault();
      if ($('#tweet-text').val().length < 1) {
        alert("error message: No tweet present");
      } else if ($('#tweet-text').val().length > 140) {
        alert("error message: Tweet length is over 140 characters");
      }else {
        let newTweet = $('form #tweet-text').serialize();

        // console.log(newTweet);
        $.post('/tweets', newTweet, function(resultData) { loadTweets(); }
        );
      }
    });
  });




  // *** Are any of these right???? ***

 
  const loadTweets = function() {
    $.get("/tweets", function(data, status){
      renderTweets(data);
    });
  };
  loadTweets();


  // $(function() {
  //   const loadTweets = $.ajax('/tweets', { method: 'GET' })
  //     // console.log(tweets)
  //     rendertweets(res);
  
  //   // loadTweets();
  // })

  // $(function() {
  //   const loadTweets = function() {
  //     $.getJSON('/tweets', tweets, { method: 'GET' })
  //     console.log(tweets)
  //     rendertweets(tweets);
  //   };
  //   // loadTweets();
  // })

  // const $tweet = renderTweets(data);

// Test / driver code (temporary)
// console.log($tweet); // to see what it looks like
// $('#tweets-container').append($tweet);

});


// Test / driver code (temporary). Eventually will get this from the server.
