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
    let options = {
        method: 'GET',
        headers: { 'x-api-key': workoutAPIKey }
    }
  
  let url = `https://api.api-ninjas.com/v1/exercises?type=${workoutType}&muscle=${workoutMuscle}&difficulty=${workoutDifficulty}`
  
  fetch(url,options)
        .then(res => res.json())
        .then(data => {
          console.log(data)
        })
        .catch(err => {
            console.log(`error ${err}`)
        });
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


// get all drropdowns from the document 
const dropdowns = document.querySelectorAll ('.dropdown');

dropdowns.forEach (dropdown => {
    const select = dropdown.querySelector('.select');
    const caret = dropdown.querySelector('.caret');
    const menu = dropdown.querySelector('.menu');
    const options = dropdown.querySelectorAll('.menu li');
    const selected = dropdown.querySelector('.selected');

    select.addEventListener ('click', () => {
        select.classList.toggle('select-clicked');
        caret.classList.toggle('caret-rotate');
        menu.classList.toggle('menu-open');
    });

    options.forEach(option => {
        option.addEventListener('click', () => {
            selected.innerText = option.innerText;
            select.classList.remove('select-clicked');
            select.classList.remove('caret-rotate');
            menu.classList.remove('menu-open');

            option.forEach(option => {
                option.classList.remove('active');
            });

            option.classList.add('active');
        });
    });
});

=======
generateBtn.addEventListener('click', getWorkout)

