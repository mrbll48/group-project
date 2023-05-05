// API keys for fetch requests
var workoutAPIKey = '4Z7299Xd9HEZMOuF2j15sg==HS0gwsLVKjmqzWlK';
var youtubeAPIKey = 'AIzaSyCeVv69Uf70zAWJ6KZfHeHx-P0pSOlLnIA';
var workoutsContainer = document.getElementById('workouts-container');
var resultsArea = document.getElementById('workouts')
let motVid; 

// Adds youtube video player on bottom of page
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('video-container', {
      height: '480',
      width: '853',
      videoId: 's8hWQwFwayo',
      playerVars: {
        'playsinline': 1
      },
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
  }
function onPlayerReady(event) {
    event.target.playVideo();
  }
var done = false;
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
      done = true;
    }
  }
function stopVideo() {
    player.stopVideo();
  }


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
6
// API request to youtube 
function getVideo(type, muscle, difficulty, workouts) {
    var videoRequestUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=focus,listen,lift&key=${youtubeAPIKey}`
    fetch (videoRequestUrl) 
        .then(function (response) {
            return response.json();
        })
            .then(function (workoutVideos) {
              console.log(workoutVideos.items[0].id.videoId)
              motVid = workoutVideos.items[0].id.videoId;
                printResults(workouts, workoutVideos)
            })

}

// Generates the workouts on the page. 
function printResults(workouts, workoutVideos) {
    console.log(workoutVideos)
    var workoutVid = workoutVideos.items[0].snippet.thumbnails.default.url
    console.log(workoutVid)
    var workoutsContainer = document.querySelector('#workouts-container .collapsible');
    
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

        bodyDiv.appendChild(instructionsEl);
        listItem.appendChild(headerDiv);
        listItem.appendChild(bodyDiv);
        workoutsContainer.appendChild(listItem);

    }
    var elems = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elems);
}
// calls first function on page load
getWorkoutDetails()