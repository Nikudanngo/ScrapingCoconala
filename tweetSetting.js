var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: 'nBlb1escsd9Np0GzPUhFjBIZc',
  consumer_secret: 'Gk209gt0PIrYkFztHc2Pto5jNkLd031oH5cBGi1EyP0MNkIm5l',
  access_token_key: '1240143259613224960-T1Qp6KyHUKifYp6kestKIEZE9zshBq',
  access_token_secret: 'meKVf7Gm1GFWr6BFOMRQMjOsdJ7gkde6zYkaVWTcyarbR'
});

const content = "test tweet";

function tweetPost(content) {
    client.post('statuses/update', {status: content}, function(error, tweet, response) {
      if (!error) {
        console.log("tweet success: " + content);
      } else {
        console.log(error);
      }
    });
  }

    tweetPost(content);