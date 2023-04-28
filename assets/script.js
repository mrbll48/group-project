// API keys for fetch requests
var workoutAPIKey = '4Z7299Xd9HEZMOuF2j15sg==HS0gwsLVKjmqzWlK'
var youtubeAPIKey = 'AIzaSyC7M2WXOg4tv1C2qqm52Qn_ePVce1tHqDA'
// tag generate workout button
var generateBtn = document.getElementById('generate-button')
// tag the dropdown menus for each option
// console.log(instance)
// console.log(workoutType)
var instances;

// var workoutDifficulty = document.getElementById('workout-difficulty')

function getWorkout(event) {
    event.preventDefault();
    var workoutType = document.getElementById('type').value
    var workoutMuscle = document.getElementById('muscle').value
    console.log(workoutType, workoutMuscle)

    // $.ajax({
    //     method: 'GET',
    //     url: `https://api.api-ninjas.com/v1/exercises?type=${workoutType}&muscle=${workoutMuscle}`,
    //     headers: { 'X-Api-Key': workoutAPIKey},
    //     contentType: 'application/json',
    //     success: function(result) {
    //         console.log(result);
    //     },
    //     error: function ajaxError(jqXHR) {
    //         console.error('Error: ', jqXHR.responseText);
    //     }
    // });

    let options = {
        method: 'GET',
        headers: { 'x-api-key': workoutAPIKey }
    }

  let url = `https://api.api-ninjas.com/v1/exercises?type=${workoutType}&muscle=${workoutMuscle}`
console.log(url)
  fetch(url,options)
        .then(res => res.json())
        .then(data => {
          console.log(data)
        })
            .then(function (data) {
                console.log(data);
            })
            getVideo()
        .catch(err => {
            console.log(`error ${err}`)
        });
}

// function getVideo() {
//     var videoRequestUrl = `https://www.googleapis.com/youtube/v3/videos?part=player&chart=mostPopular`
//     var videoUrl = `https://www.youtube.com/embed/${videoID}`
//     fetch (videoRequestUrl) 
//         .then(function (response) {
//             return response.json();
//         })
//             .then(function (data) {
//                 console.log(data)
//             })
// }

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    instances = M.FormSelect.init(elems);
    // var instance = M.FormSelect.getInstance(elem);
    console.log(instances[0].getSelectedValues('#type'));
  });

generateBtn.addEventListener('click', getWorkout)

