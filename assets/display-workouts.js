// API keys for fetch requests
var workoutAPIKey = '4Z7299Xd9HEZMOuF2j15sg==HS0gwsLVKjmqzWlK';
var youtubeAPIKey = 'AIzaSyC7M2WXOg4tv1C2qqm52Qn_ePVce1tHqDA';
var workoutsContainer = document.getElementById('workouts-container');
var resultsArea = document.getElementById('workouts')

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
            console.log(workouts);
            printResults(workouts);
            })
        .catch(err => {
            console.log(`error ${err}`);
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
    var workoutsContainer = document.querySelector('#workouts-container .collapsible');
    for (var i = 0; i < workouts.length; i++) {
        console.log(workouts[i].name)
        // dynamically create the card each workout will be on
        // var workoutCard = document.createElement('div');
        // pulls the name of the workout from the array of workouts 
        var workoutName = workouts[i].name
        // dynamically genereates a p element for the workout name
        // var nameEl = document.createElement('p');
        // pulls the difficulty of the workout from the aray
        var workoutDifficulty = workouts[i].difficulty
        // dynamically generates the p element for the workout difficulty
        // var difficultyEl = document.createElement('p');
        // pulls the workout instructions from the array
        var workoutInstructions = workouts[i].instructions
        // dynamically creates the p element for the workout instructions
        // var instructionsEl = document.createElement('p');

        var listItem = document.createElement('li');
        var headerDiv = document.createElement('div');
        headerDiv.setAttribute('class', 'collapsible-header');
        // headerDiv.setAttribute('class', 'grey darken-3')
        headerDiv.textContent = workoutName + ' - Difficulty: ' + workoutDifficulty;

        var bodyDiv = document.createElement('div');
        bodyDiv.setAttribute('class', 'collapsible-body');
        var instructionsEl = document.createElement('p');
        instructionsEl.textContent = workoutInstructions;
        // bodyDiv.setAttribute('class', 'grey darken-1')
        bodyDiv.appendChild(instructionsEl);

        listItem.appendChild(headerDiv);
        listItem.appendChild(bodyDiv);

        workoutsContainer.appendChild(listItem)

        // // sets the name element equal to the workout name text content pulled from the array
        // nameEl.textContent = workoutName;
        // // sets the workout difficulty element equal to the workout difficulty text content pulled from the aray
        // difficultyEl.textContent = workoutDifficulty;
        // // sets the workout instructions element equal to the workout instructions text content pulled from the array
        // instructionsEl.textContent = workoutInstructions;

        // // appends all of the workout elements to the placeholder div in index.html file
        // workoutsContainer.appendChild(workoutCard)
        // workoutCard.appendChild(nameEl)
        // workoutCard.appendChild(difficultyEl)
        // workoutCard.appendChild(instructionsEl)
    }
    var elems = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elems);
}
// calls first function on page load
getWorkoutDetails()

