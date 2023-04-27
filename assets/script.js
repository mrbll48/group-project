document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, options);
  });
// API keys for fetch requests
var workoutAPIKey = '4Z7299Xd9HEZMOuF2j15sg==HS0gwsLVKjmqzWlK'
var youtubeAPIKey = 'AIzaSyC7M2WXOg4tv1C2qqm52Qn_ePVce1tHqDA'
// tag generate workout button
var generateBtn = document.getElementById('generate-button')
// tag the dropdown menus for each option
var workoutType = document.getElementById('workout-type')
var workoutMuscle = document.getElementById('workout-muscle')
var workoutDifficulty = document.getElementById('workout-difficulty')

function getWorkout(event) {
    event.preventDefault();
    var exerciseRequestUrl = `https://api.api-ninjas.com/v1/exercises?type=${workoutType}&muscle=${workoutMuscle}&difficulty=${workoutDifficulty}&X-Api-Key=${workoutAPIKey}`
    fetch(exerciseRequestUrl)
        .then(function (response) {
            return response.json();
        })
            .then(function (data) {
                console.log(data);
            })
            getVideo()
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

generateBtn.addEventListener('click', getWorkout)