// API keys for fetch requests
var workoutAPIKey = '4Z7299Xd9HEZMOuF2j15sg==HS0gwsLVKjmqzWlK'
var youtubeAPIKey = 'AIzaSyC7M2WXOg4tv1C2qqm52Qn_ePVce1tHqDA'
// tag generate workout button
var generateBtn = document.getElementById('generate-button')
// tag the dropdown menus for each option
// console.log(instance)
// console.log(workoutType)
var instances;
// placeholder to test dynamic element generation, will change later
var workoutLocations = document.getElementById('workouts')

// var workoutDifficulty = document.getElementById('workout-difficulty')

function getWorkout(event) {
    event.preventDefault();
    var workoutType = document.getElementById('type').value
    var workoutMuscle = document.getElementById('muscle').value
    var workoutDifficulty = document.getElementById('difficulty').value
    console.log(workoutType, workoutMuscle)

    let options = {
        method: 'GET',
        headers: { 'x-api-key': workoutAPIKey }
    }

    let url = `https://api.api-ninjas.com/v1/exercises?type=${workoutType}&muscle=${workoutMuscle}&difficulty=${workoutDifficulty}`
   
    fetch(url,options)
        .then(res => res.json())
            .then(function (workouts) {
            console.log(workouts)
            printResults(workouts)
            })
        // .catch(err => {
        //     console.log(`error ${err}`)
        // });
    
    // getVideo()
}

function printResults(workouts) {
    console.log(workouts);
    for (var i = 0; i < workouts.length; i++) {
        console.log(workouts[i].name)
        // dynamically create the card each workout will be on
        var workoutCard = document.createElement('div');
        // pulls the name of the workout from the array of workouts 
        var workoutName = workouts[i].name
        // dynamically genereates a p element for the workout name
        var nameEl = document.createElement('p');
        // pulls the difficulty of the workout from the aray
        var workoutDifficulty = workouts[i].difficulty
        // dynamically generates the p element for the workout difficulty
        var difficultyEl = document.createElement('p');
        // pulls the workout instructions from the array
        var workoutInstructions = workouts[i].instructions
        // dynamically creates the p element for the workout instructions
        var instructionsEl = document.createElement('p');

        // sets the name element equal to the workout name text content pulled from the array
        nameEl.textContent = workoutName;
        // sets the workout difficulty element equal to the workout difficulty text content pulled from the aray
        difficultyEl.textContent = workoutDifficulty;
        // sets the workout instructions element equal to the workout instructions text content pulled from the array
        instructionsEl.textContent = workoutInstructions;

        // appends all of the workout elements to the placeholder div in index.html file
        workoutLocations.appendChild(workoutCard)
        workoutCard.appendChild(nameEl)
        workoutCard.appendChild(difficultyEl)
        workoutCard.appendChild(instructionsEl)
        
    }
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
  });

generateBtn.addEventListener('click', getWorkout)

