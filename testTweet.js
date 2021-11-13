
function tweetPost(content) {
    client.post('statuses/update', {status: content}, function(error, tweet, response) {
      if (!error) {
        console.log("tweet success: " + content);
      } else {
        console.log(error);
      }
    });
  }

content = "test tweet";
tweetPost(content);