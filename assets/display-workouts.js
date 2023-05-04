// API keys for fetch requests
var workoutAPIKey = '4Z7299Xd9HEZMOuF2j15sg==HS0gwsLVKjmqzWlK';
var youtubeAPIKey = 'AIzaSyCPF9U2_tzgTOAQSgw7FLYEwKiW7Gv4fxE';
var workoutsContainer = document.getElementById('workouts-container');
var resultsArea = document.getElementById('workouts')

// gets the input from dropdown menus and turns them into useable variables
function getWorkoutDetails() {
    // splits webpage URL into an array
    var workoutDetailsArr = document.location.search.split('&');
    // splits array and selects the workout type
    var type = workoutDetailsArr[0].split('=').pop();
    // splits array and selects workout muscle
    var muscle = workoutDetailsArr[1].split('=').pop();
    // splits the aray and selects workout difficulty
    var difficulty = workoutDetailsArr[2].split('=').pop();
    // calls function to API search and passes the values taken from URL to the search API function
    searchApi(type, muscle, difficulty);
    displayQuery(type, muscle, difficulty);
}

// displays query parameters at the top of the page
function displayQuery(type, muscle, difficulty) {
    resultsArea.textContent = type + ', ' + muscle + ', & ' + difficulty
}

// API search function
function searchApi(workoutType, workoutMuscle, workoutDifficulty) {
    let options = {
        method: 'GET',
        headers: { 'x-api-key': workoutAPIKey }
    }

    let url = `https://api.api-ninjas.com/v1/exercises?type=${workoutType}&muscle=${workoutMuscle}&difficulty=${workoutDifficulty}`
    // fetch request for workouts 
    fetch(url,options)
        .then(res => res.json())
            .then(function (workouts) {
                getVideo(workoutType, workoutMuscle, workoutDifficulty, workouts);
            })
        .catch(err => {
            console.log(`error ${err}`);
        });

}
// TODO: code youtube API request

function getVideo(type, muscle, difficulty, workouts) {
    var videoRequestUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UC68TLK0mAEzUyHx5x5k-S1Q&maxResults=1&q=${type},${muscle},${difficulty}&key=${youtubeAPIKey}`
    fetch (videoRequestUrl) 
        .then(function (response) {
            return response.json();
        })
            .then(function (workoutVideos) {
                printResults(workouts, workoutVideos)
            })

}

// Generates the workouts on the page. 
function printResults(workouts, workoutVideos) {
    console.log(workoutVideos)
    var workoutVid = workoutVideos.items[0].snippet.thumbnails.default.url
    console.log(workoutVid)
    var workoutsContainer = document.querySelector('#workouts-container .collapsible');
    // var videoUrl = `https://www.youtube.com/embed/${videoID}`
    for (var i = 0; i < workouts.length; i++) {
        var workoutName = workouts[i].name
        var workoutDifficulty = workouts[i].difficulty
        var workoutInstructions = workouts[i].instructions

        var listItem = document.createElement('li');
        var headerDiv = document.createElement('div');
        headerDiv.setAttribute('class', 'collapsible-header');
        headerDiv.textContent = workoutName + ' - Difficulty: ' + workoutDifficulty;

        var bodyDiv = document.createElement('div');
        bodyDiv.setAttribute('class', 'collapsible-body');
        var instructionsEl = document.createElement('p');
        instructionsEl.textContent = workoutInstructions;

        var workoutVideoEl = document.createElement('iframe')
        workoutVideoEl.setAttribute('class', 'workout-video')
        // workoutVideoEl.innerHTML = workoutVid

        bodyDiv.appendChild(instructionsEl);
        listItem.appendChild(headerDiv);
        listItem.appendChild(bodyDiv);
        workoutsContainer.appendChild(listItem);
        bodyDiv.appendChild(workoutVideoEl)
        // workoutVideoEl.innerHTML = "<img src =\"workoutVideos.items[0].snippet.thumbnails.default.url\" width=\"400px\" height=\"150px\">"

    }
    var elems = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elems);
}
// calls first function on page load
getWorkoutDetails()