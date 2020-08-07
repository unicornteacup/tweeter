

$(document).ready(function() {

  // Button to slide down the add new tweet form
  const $button2 = $('nav');
  $button2.on('click',function(event) {
    event.preventDefault();
    $('form').slideToggle(400, function() {});
  });

  $("time.timeago").timeago();

  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = function(tweet) {
    let created = $.timeago(new Date(tweet.created_at));
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
      const latestTweet = createTweetElement(tweet);
      $('.tweets').prepend(latestTweet);
    }
  };

  // Button to checkif tweet is >140 or <1 characters and display error if applicable, then submit tweet, reset counter colour and clear text box.
  const $button = $('form');
  $button.submit(function(event) {
    event.preventDefault();
    if ($('#tweet-text').val().length < 1) {
      $('.error').slideDown(400, function() {});
      $('.error p').text('⚠️ No text present ⚠️');
    } else if ($('#tweet-text').val().length > 140) {
      $('.error').slideDown(400, function() {});
      $('.error p').text('⚠️ Tweet length is over 140 characters ⚠️');
    } else {
      $('.error').slideUp(400, function() {});
      $('.counter').text('140');
      $('output').css('color', 545149);
      
      let newTweet = $('form #tweet-text').serialize();
      $.post('/tweets', newTweet, function(resultData) {
        loadTweets();
      })
        .then(function() {
          $(count).css('color', 545149);
        });
      $('#tweet-text').val('');
    }
  });

  const loadTweets = function() {
    $.get("/tweets", function(data, status) {
      renderTweets(data);
    });
  };
  loadTweets();

  $('.tweets').mouseover(function() {
    $(this).css('border-right', '10px');
  });
});