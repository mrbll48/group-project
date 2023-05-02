// API keys for fetch requests
var workoutAPIKey = '4Z7299Xd9HEZMOuF2j15sg==HS0gwsLVKjmqzWlK';
var youtubeAPIKey = 'AIzaSyC7M2WXOg4tv1C2qqm52Qn_ePVce1tHqDA';
var workoutsContainer = document.getElementById('workouts-container');

// gets the input from dropdown menus and turns them into useable variables
function getWorkoutDetails() {
    // splits webpage URL into an array
    var workoutDetailsArr = document.location.search.split('&');
    console.log(workoutDetailsArr);
    // splits array and selects the workout type
    var type = workoutDetailsArr[0].split('=').pop();
    console.log(type);
    // splits array and selects workout muscle
    var muscle = workoutDetailsArr[1].split('=').pop();
    console.log(muscle);
    // splits the aray and selects workout difficulty
    var difficulty = workoutDetailsArr[2].split('=').pop();
    console.log(difficulty);
    // calls function to API search and passes the values taken from URL to the search API function
    searchApi(type, muscle, difficulty);
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
            console.log(workouts)
            printResults(workouts)
            })
        .catch(err => {
            console.log(`error ${err}`)
        });
    
    // getVideo()
}
// TODO: code youtube API request

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

// Generates the workouts on the page. 
function printResults(workouts) {
    console.log(workouts);
    for (var i = 0; i < workouts.length; i++) {
        console.log(workouts[i].name)
        // dynamically create the card each workout will be on
        var workoutCard = document.createElement('div');
        workoutCard.setAttribute('class', 'workout-card')
        // pulls the name of the workout from the array of workouts 
        var workoutName = workouts[i].name
        // dynamically genereates a p element for the workout name
        var nameEl = document.createElement('p');
        nameEl.setAttribute('class', 'workout-name')
        // pulls the difficulty of the workout from the aray
        var workoutDifficulty = workouts[i].difficulty
        // dynamically generates the p element for the workout difficulty
        var difficultyEl = document.createElement('p');
        difficultyEl.setAttribute('class', 'workout-difficulty')
        // pulls the workout instructions from the array
        var workoutInstructions = workouts[i].instructions
        // dynamically creates the p element for the workout instructions
        var instructionsEl = document.createElement('p');
        instructionsEl.setAttribute('class', 'workout-instructions')

        // sets the name element equal to the workout name text content pulled from the array
        nameEl.textContent = workoutName;
        // sets the workout difficulty element equal to the workout difficulty text content pulled from the aray
        difficultyEl.textContent = workoutDifficulty;
        // sets the workout instructions element equal to the workout instructions text content pulled from the array
        instructionsEl.textContent = workoutInstructions;

        // appends all of the workout elements to the placeholder div in index.html file
        workoutsContainer.appendChild(workoutCard)
        workoutCard.appendChild(nameEl)
        workoutCard.appendChild(difficultyEl)
        workoutCard.appendChild(instructionsEl)
    }
}
// calls first function on page load
getWorkoutDetails()


// Section for youtube API *user's account uploads*

function retrieveMyUploads() {
    var results = YouTube.Channels.list('contentDetails', {mine: true});
    for(var i in results.items) {
      var item = results.items[i];
      // Get the playlist ID, which is nested in contentDetails, as described in the
      // Channel resource: https://developers.google.com/youtube/v3/docs/channels
      var playlistId = item.contentDetails.relatedPlaylists.uploads;
  
      var nextPageToken = '';
  
      // This loop retrieves a set of playlist items and checks the nextPageToken in the
      // response to determine whether the list contains additional items. It repeats that process
      // until it has retrieved all of the items in the list.
      while (nextPageToken != null) {
        var playlistResponse = YouTube.PlaylistItems.list('snippet', {
          playlistId: playlistId,
          maxResults: 25,
          pageToken: nextPageToken
        });
  
        for (var j = 0; j < playlistResponse.items.length; j++) {
          var playlistItem = playlistResponse.items[j];
          Logger.log('[%s] Title: %s',
                     playlistItem.snippet.resourceId.videoId,
                     playlistItem.snippet.title);
  
        }
        nextPageToken = playlistResponse.nextPageToken;
      }
    }
  }

//   searching for videos with specific topic

function searchByTopic() {
    var mid = '/m/0gjf126';
    var results = YouTube.Search.list('id,snippet', {topicId: mid, maxResults: 25});
    for(var i in results.items) {
      var item = results.items[i];
      Logger.log('[%s] Title: %s', item.id.videoId, item.snippet.title);
    }
  }

//  Attempt to search for youtube channel

<script src="https://apis.google.com/js/api.js"></script>

function authenticate(){
    return Gapi.auth2.getAuthInstance()
    .signIn({scope: "https://www.googleapis.com/auth/youtube.readonly"})
    .then(function() { console.log("Sign-in successful"); },
        function(err) { console.error("Error signing in", err); });
}

function loadClient() {
    gapi.client.setApiKey("AIzaSyCuRgrGBysEVLr-VF8kdTB1fvWRPRgumhI");
    return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        .then(function() { console.log("GAPI client loaded for API"); },
              function(err) { console.error("Error loading GAPI client for API", err); });
  }

// Make sure the client is loaded and sign-in is complete before calling this method.
function execute() {
    return gapi.client.youtube.channels.list({
      "part": [
        "snippet,contentDetails,statistics"
      ],
      "forUsername": "GoogleDevelopers"
    })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response);
              },
              function(err) { console.error("Execute error", err); });
  }

  gapi.load("client:auth2", function() {
    gapi.auth2.init({client_id: "YOUR_CLIENT_ID"});
  });