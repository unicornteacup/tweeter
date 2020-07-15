$(document).ready(function() {
  
  $('#tweet-text').mouseover(function() {
    console.log('test');
  }); 

  $('#tweet-text').keypress(function() {
    const tweetChars = $(this).val().length
    console.log(tweetChars);
    if (tweetChars > 140) {
      $('output').css('color', 'red');
    }
    $('output').val(140 - tweetChars);
  }) 

});