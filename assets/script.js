document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, options);
  });

var workoutAPIKey = '4Z7299Xd9HEZMOuF2j15sg==HS0gwsLVKjmqzWlK'
var youtubeAPIKey = 'AIzaSyC7M2WXOg4tv1C2qqm52Qn_ePVce1tHqDA'

function getWorkout(event) {
    event.preventDefault();
    var exerciseRequestUrl = `https://api.api-ninjas.com/v1/exercises?type=${type}&muscle=${muscle}&difficulty=${difficulty}&X-Api-Key=${workoutAPIKey}`
    fetch(exerciseRequestUrl)
        .then(function (response) {
            return response.json();
        })
            .then(function (data) {
                console.log(data);
            })
}

function getVideo() {
    var videoRequestUrl = `https://www.googleapis.com/youtube/v3/videos?part=player&chart=mostPopular`
    var videoUrl = `https://www.youtube.com/embed/${videoID}`
    fetch (videoRequestUrl) 
        .then(function (response) {
            return response.json();
        })
            .then(function (data) {
                console.log(data)
            })
}

