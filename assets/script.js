// tag generate workout button
var generateBtn = document.getElementById('generate-button')
var instances;

// function to capture inputs from dropdowns 
function getWorkout(event) {
    event.preventDefault();
    // grabs workout type input
    var workoutType = document.getElementById('type').value
    // grabs workout muscle input
    var workoutMuscle = document.getElementById('muscle').value
    // grabs workout difficulty input
    var workoutDifficulty = document.getElementById('difficulty').value
    
    // stops the function if all three dropdowns are not selected
    if (!workoutType) {
        console.log('You need to select a workout type');
        return;
    } else if (!workoutMuscle) {
        console.log('You need to select a muscle group');
        return;
    } else if (!workoutDifficulty) {
        console.log('You need to select a workout difficulty');
        return;
    }
// puts the inputs taken from dropdowns and adds them to the webpage URL
    var queryString = `./single-repo.html?q=${workoutType}&muscle=${workoutMuscle}&difficulty=${workoutDifficulty}`
    // switches the html pages
    location.assign(queryString);
}

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    instances = M.FormSelect.init(elems);
    // var instance = M.FormSelect.getInstance(elem);
  });

generateBtn.addEventListener('click', getWorkout)

