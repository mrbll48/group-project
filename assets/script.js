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

// Section for youtube API

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