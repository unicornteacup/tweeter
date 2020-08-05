$(document).ready(function() {
  
  $('#tweet-text').mouseover(function() {
  });

  $('#tweet-text').on('keyup',function() {
    const tweetChars = $(this).val().length;
    const maxCount = 140;
    const count = $(this).parent().find('output');
    
    count.val(maxCount - tweetChars);
    
    count.val() < 0 ?  count.css("color", "red") : count.css("color", "black");


  });

});