var workoutAPIKey = '4Z7299Xd9HEZMOuF2j15sg==HS0gwsLVKjmqzWlK'
var youtubeAPIKey = 'AIzaSyC7M2WXOg4tv1C2qqm52Qn_ePVce1tHqDA'

function getWorkout(event) {
    event.preventDefault();
    var exerciseRequestUrl = `https://api.api-ninjas.com/v1/exercises?type=${type}&muscle=${muscle}&difficulty=${difficulty}&X-Api-Key=$${workoutAPIKey}`
    fetch(exerciseRequestUrl)
        .then(function (response) {
            return response.json();
        })
            .then(function (data) {
                console.log(data);
            })
}