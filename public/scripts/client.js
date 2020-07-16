

$(document).ready(function() {

  console.log("doc test");
  $("time.timeago").timeago();

  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

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
    <h3>${escape(tweet.content.text)}</h3>
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
      // console.log(latestTweet)
      $('.tweets').prepend(latestTweet);
    }
    // console.log(tweets)
  }

  
    const $button = $('form');
    $button.submit (function ( event ) {
      event.preventDefault();
      console.log($('#tweet-text').val().length)
      if ($('#tweet-text').val().length < 1) {
        $('.error').slideDown(400, function(){});
        $('.error p').text('⚠️ No text present ⚠️');
        //alert("error message: No tweet present");
      } else if ($('#tweet-text').val().length > 140) {
        $('.error').slideDown(400, function(){});
        $('.error p').text('⚠️ Tweet length is over 140 characters ⚠️');
        // alert("error message: Tweet length is over 140 characters");
      }else {
        $('.error').slideUp(400, function(){});
        $('.counter').text('140');
        let newTweet = $('form #tweet-text').serialize();
        $.post('/tweets', newTweet, function(resultData) { loadTweets(); })
        .then(function () {
          $('#tweet-text').val('');
        })         
      }

});

// *** WHERE TO PUT THIS





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
