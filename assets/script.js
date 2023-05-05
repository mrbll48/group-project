// About Us modal
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);

    var aboutTrigger = document.getElementById('about-trigger');
    var modalClose = document.getElementById('modal-close');

    aboutTrigger.addEventListener('click', function (event) {
        event.preventDefault();
        var instance = M.Modal.getInstance(document.getElementById('about-modal'));
        instance.open();
    });

    modalClose.addEventListener('click', function (event) {
        event.preventDefault();
        var instance = M.Modal.getInstance(document.getElementById('about-modal'));
        instance.close();
    });
});


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
    localStore(workoutType, workoutMuscle, workoutDifficulty)
}

function localStore(workoutType, workoutMuscle, workoutDifficulty) {
    var queryParams = JSON.parse(localStorage.getItem('paramaters')) || [];
    queryParams.push(workoutType);
    queryParams.push(workoutMuscle);
    queryParams.push(workoutDifficulty);

    localStorage.setItem('parameters', JSON.stringify(queryParams));

}

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    instances = M.FormSelect.init(elems);
    // var instance = M.FormSelect.getInstance(elem);
  });
// adds event listener to generate workout button
generateBtn.addEventListener('click', getWorkout)