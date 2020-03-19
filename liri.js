require("dotenv").config();

var Spotify = require("node-spotify-api");
// var spotify = new Spotify(keys.spotify);
var keys = require("./keys.js");
// console.log(keys.spotify);

var moment = require("moment");
// console.log(moment);

var fs = require("fs");
var axios = require("axios");

var commandInp = process.argv[2];
// var name = process.argv[3];

var processArgs = process.argv;
var argArray = process.argv.slice(3);
var name = "";
for (let i = 0; i < argArray.length; i++) {
  name += argArray[i];
}

let space = "\n" + "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0";

console.log(commandInp)
switch (commandInp) {
    case "concert-this":
        concertthis(name);
        break;

    case "spotify-this-song":
        spotifythissong(name);
        break;

    case "movie-this":
        moviethis(name);
        break;

    case "do-what-it-says":
        dowhatitsays(name);
        break;
    default: 
        console.log("Invalid Option. Please type any of the following options: \nconcert-this \nspotify-this-song \nmovie-this \ndo-what-it-says")
    }

// Function that writes all the data from output to the logfile
function writeToLog(data) {
    fs.appendFile("log.txt", '\r\n\r\n', function(err) {
        if (err) {
            return console.log(err);
        }
    });

    fs.appendFile("log.txt", (data), function(err) {
        if (err) {
            return console.log(err);
        }
        console.log(space + "log.txt was updated!");
    });
}

function concertthis(name) {

axios.get("https://rest.bandsintown.com/artists/" + name + "/events?app_id=codingbootcamp")
    .then(function(response) {    
        for (var i = 0; i < response.data.length; i++) {

            // var datetime = response.data[i].datetime; //Saves datetime response into a variable
            // var dateArr = datetime.split('T'); //Attempting to split the date and time in the response

            var concertResults = 
                    space + "================= CONCERT THIS BANDS ==================" +
                    space + "\nVenue Name: " + response.data[i].venue.name + 
                    space + "\nVenue Location: " + response.data[i].venue.city +
                    space + "\nDate of the Event: " + moment().format("MM-DD-YYYY"); //dateArr[0] should be the date separated from the time
            console.log(concertResults);
            // writeToLog(concertResults);
        }
    })
    .catch(function (error) {
        console.log(error);
    });
}


function spotifythissong(name) {
    let spotify = new Spotify(keys.spotify);
    // If there is no song name, set the song to Love me tender
    if (!name) {
        name = "The Sign";
    }
    spotify.search({ type: "track", query: name }, function(err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        } else {
            output =
                space + "================= SPOTIFY THIS SONG ==================" +
                space + "Song Name: " + "'" + name.toUpperCase() + 
                space + "Album Name: " + data.tracks.items[0].album.name +
                space + "Artist Name: " + data.tracks.items[0].album.artists[0].name +
                space + "URL: " + data.tracks.items[0].album.external_urls.spotify;
            console.log(output);
            writeToLog(output);
        }
    });

}
function moviethis(name){

    var movieName = process.argv.slice(3).join(" ");

    if (movieName == undefined) {
        movieName = "Mr. Nobody";
    } 

    // if (typeof argArray === "undefined") {
    //     argArray = "Mr Nobody";
    //     // console.log(name);
    // }
    axios.get(`http://www.omdbapi.com/?apikey=trilogy&s=${argArray}`)
        .then(function (response) {
            // console.log(response.data.Search[0].imdbID);
            let tempImdbID = response.data.Search[0].imdbID;
            // console.log(tempImdbID);
            axios.get(`http://www.omdbapi.com/?apikey=trilogy&i=${tempImdbID}`)
                .then(function (response2) {
                    console.log("======================== MOVIE THIS =============================");
                    console.log(`Title: ${response2.data.Title}`);
                    console.log(`Year: ${response2.data.Year}`);
                    console.log(`IMDB Rating: ${response2.data.imdbRating}`);
                    console.log(`Rotten Tomatoes Rating: ${response2.data.Ratings[1].Value}`)
                    console.log(`Country Produced: ${response2.data.Country}`);
                    console.log(`Language: ${response2.data.Language}`);
                    console.log(`Plot: ${response2.data.Plot}`);
                    console.log(`Actors: ${response2.data.Actors}`);
                    console.log("=================================================================");
                    
                    writeToLog(response2);
                })
                
                .catch(function (error) {
                    console.log(error);
                });
        })
        .catch(function (error) {
            console.log(error);
        });
}

function dowhatitsays() {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err);
          }
        
          // We will then print the contents of data
        //   console.log(data);
        
          // Then split it by commas (to make it more readable)
          var dataArr = data.split(",");
        
          // We will then re-display the content as an array for later use.
        //   console.log(dataArr);
        
        commandInp = dataArr[0];
        argArray = dataArr[1];
        if (commandInp === "spotify-this-song") {
            spotifythissong(argArray);

        }
        
    });
}