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

