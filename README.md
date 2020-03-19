# LIRI Bot (liri-node-app)

LIRI is a Language Interpretation and Recognition Interface. Use LIRI to get your latest concert, search for your favorite song, or a movie, or just choose a random action from your own random file.

[View Demo](liri-demo.webm)

## Overview
LIRI Bot is a command line application using Node.js and several modules installed using NPM.

![Liri CLI](/liri-CLI-gif.png)

The application uses the axios package to connect to the various APIs, as well as other modules for various tasks:

* [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)
* [Axios](https://www.npmjs.com/package/axios)
* [Bands In Town API](http://www.artists.bandsintown.com/bandsintown-api)
* [OMDB API](http://www.omdbapi.com)
* [Moment](https://www.npmjs.com/package/moment)
* [DotEnv](https://www.npmjs.com/package/dotenv)
---
## The instructions are the command line application (CLI) to follows:
1. node liri.js concert-this <artist/band name here> - This will return:
* Name of the venue
* Venue location
* Date of the Event
  
2. node liri.js spotify-this-song '<song name here>' - This will return:

* Artist(s)
* Song Name
* A preview link of the son
* The album
* If no song is provided the default is "The Sign" by Ace of Base.

3. node liri.js movie-this '<movie name here>' - This will return:

* Title.
* Year of release.
* IMDB Rating.
* Rotten Tomatoes Rating.
* Country where the movie was produced.
* Language of the movie.
* Plot of the movie.
* Actors in the movie.

4. node liri.js do-what-it-says

* LIRI using the fs Node package, it will take the text inside of random.txt and then use it to call one of LIRI's commands.

---

## Application created by:
 Sirintorn Pritchard @ 2020
