import express from 'express';
import csv from 'csv-parser';
import { createReadStream } from 'fs';
import mongoose from 'mongoose';
import Playlist from './schema/playlist.js';
import Track from './schema/tracks.js';
import Genre from './schema/genres.js';
import Artist from './schema/artists.js';
import PrivacyPolicy from './schema/privacypolicydb.js';
import AUP from './schema/aupdb.js';
import DMCAPolicy from './schema/dmcapolicydb.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const router = express.Router();
const PORT = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, '..', 'build')));
app.use(express.json());

//connecting to mongoDB 
const username = "user";
const password = "RHadnjqc2tH4ywe7";
const cluster = "cluster0.ei4uy18";

mongoose.connect(
  `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/?retryWrites=true&w=majority`, 
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

//Reading all csv information and storing in local arrays of json objects
var genres = [];
createReadStream('assets/genres.csv')
  .pipe(csv())
  .on('data', (data) => genres.push(data))
  .on('end', async () => {
    const state = await Genre.find();
    if (state.length == 0){
      for (var i = 0; i < genres.length; i++) {
        const genre = new Genre({
          genre_id: genres[i].genre_id,
          title: genres[i].title,
          parent: genres[i].parent,
        })
        genre.save(function(err, doc) {
          if (err) return console.error(err);
        });
        console.log(`Genres: ${i+1}`);
      }
    }
    genres = [];
    console.log("Loaded genres");
  });
var tracks = [];
createReadStream('assets/raw_tracks.csv')
  .pipe(csv())
  .on('data', (data) => {tracks.push(data)})
  .on('end', async () => {
    const state = await Track.find();
    if (state.length == 0){
      for (var i = 0; i < tracks.length; i++) {
        const track = new Track({
          track_id: tracks[i].track_id,
          album_name:tracks[i].album_title,
          track_name:tracks[i].track_title,
          artist:tracks[i].artist_name,
          duration: tracks[i].track_duration,
          album_id:tracks[i].album_id,
          artist_id: tracks[i].artist_id,
          tags:tracks[i].tags,
          track_genres:tracks[i].track_genres,
          track_date_created: tracks[i].track_date_created,
          track_date_recorded: tracks[i].track_date_recorded,
        });
        track.save(function(err, doc) {
          if (err) return console.error(err);
        });
      console.log(`Track: ${i+1}`);
      }
    }
    tracks = [];
    console.log("Loaded tracks");
  });

var artists = [];
createReadStream('assets/raw_artists.csv')
  .pipe(csv())
  .on('data', (data) => artists.push(data))
  .on('end', async () => {
    const state = await Artist.find();
    if (state.length == 0){
      for (var i = 0; i < artists.length; i++) {
        const artist = new Artist({
          id: artists[i].artist_id,
          startYear:artists[i].artist_active_year_begin,
          endYear:artists[i].artist_active_year_end,
          name:artists[i].artist_name,
          favorites:artists[i].artist_favorites,
          location: artists[i].artist_location,
        })
        artist.save(function(err, doc) {
          if (err) return console.error(err);
        });
        console.log(`Artist: ${i+1}`);
      }
    }
    artists = [];
    console.log("Loaded artists");
  });

//middleware for logging 
app.use((req,res,next)=>{
    console.log(`${req.method} request for ${req.url}`)
    next();
});

//routing for all tracks, albums, artists and genres
router.route('/tracks')
    .get(async (req,res) => {
      const data = await Track.find()
      res.send(data);
    })
router.route('/genres')
    .get( async (req,res) => {
      const data = await Genre.find()
      res.send(data);
    })

//routing for specific tracks using parameter
router.route('/tracks/:track_id')
  .get(async (req,res) =>{
      const tracks = await Track.find();
      const id = req.params.track_id;
      var result = []
      for (var i = 0; i < tracks.length;i++) {
        if (String(tracks[i].track_id).indexOf(id) > -1) {
          const trackObj = {
            track_id: tracks[i].track_id,
            album_name:tracks[i].album_name,
            track_name:tracks[i].track_name,
            artist:tracks[i].artist,
            duration:tracks[i].duration,
            album_id: tracks[i].album_id,
            artist_id: tracks[i].artist_id,
            tags: tracks[i].tags,
            track_date_created: tracks[i].track_date_created,
            track_date_recorded: tracks[i].track_date_recorded,
            track_genres: tracks[i].track_genres,
          }
          result.push(trackObj);
        }
      }
      res.send(result.slice(0,3))
  });
router.route('/artistid/:id')
  .get(async (req,res) =>{
      const artists = await Artist.find();
      const id = req.params.id;
      var result = []
      for (var i = 0; i < artists.length;i++) {
        if (String(artists[i].id).indexOf(id) > -1) {
          const artistObj = {
            id: artists[i].id,
            startYear:artists[i].startYear,
            endYear:artists[i].endYear,
            name:artists[i].name,
            favorites:artists[i].favourites,
            location: artists[i].location,
          }
          result.push(artistObj);
        }
      }
      res.send(result.slice(0,3))
  });
router.route('/artistname/:id')
  .get( async(req,res) =>{
      const artists = await Artist.find();
      const id = req.params.id;
      var result = []
      for (var i = 0; i < artists.length;i++) {
        if ((artists[i].name).toUpperCase().indexOf(id.toUpperCase()) > -1) {
          const artistObj = {
            id: artists[i].id,
            startYear:artists[i].startYear,
            endYear:artists[i].endYear,
            name:artists[i].name,
            favorites:artists[i].favourites,
            location: artists[i].location,
          }
          result.push(artistObj);
        }
      }
      res.send(result.slice(0,3))
  });

// var playlists = [];
// async function updatePlaylists(){
//   const data = await Playlist.find();
//   playlists = [...data];
// }
router.route('/playlists') 
    .get(async (req,res)  =>  {
        const data = await Playlist.find();
        res.send(data);
    })
    .post((req,res)=>{
      const data = new Playlist({
        playlist_id: req.body.playlist_id,
        playlist_name: req.body.playlist_name,
        no_of_tracks: req.body.no_of_tracks,
        total_duration: req.body.total_duration,
        tracks: req.body.tracks,
      })
      data.save(function(err, doc) {
        if (err) return console.error(err);
        console.log("Document inserted succussfully!");
      });
      res.send(req.body);
    })
    .delete(async (req,res)=>{
        Playlist.findByIdAndDelete(req.body._id, function(err) { 
          if(err) console.log(err);
          console.log(`Playlist with id ${req.body._id} deleted`) 
        });
        // Playlist.remove({}, function(err) { 
        //   console.log('collection removed') 
        // });
        res.send(await Playlist.find());
    })
router.route('/playlists/:id')
  .get (async (req,res) => {
    const playlist = await Playlist.find({"_id":req.params.id});
    res.send(playlist)
  })
  .post (async (req, res)=>{
    const track = await Track.find({"track_id":req.body.track});
    const playlistAttr = await Playlist.find({"playlist_id":req.params.id});
    const trackObj = {
      track_id: track[0].track_id,
      album_name:track[0].album_name,
      track_name:track[0].track_name,
      artist:track[0].artist,
      duration:track[0].duration,
      album_id: track[0].album_id,
      artist_id: track[0].artist_id,
      tags: track[0].tags,
      track_date_created: track[0].track_date_created,
      track_date_recorded: track[0].track_date_recorded,
      track_genres: track[0].track_genres,
    }
    const newDuration = () =>{
      var arr1 = String(playlistAttr[0].total_duration).split(':');
      var arr2 = String(track[0].duration).split(':');
      var min = parseInt(arr1[0]) + parseInt(arr2[0]);
      var seconds = parseInt(arr1[1]) + parseInt(arr2[1]);
      if (seconds >= 60){
        seconds = seconds - 60;
        min += 1
      }
      return `${String(min).padStart(2,'0')}:${String(seconds).padStart(2,'0')}`
    }
    await Playlist.updateOne(
      {playlist_id:req.params.id},
      {
        total_duration: newDuration(),
        no_of_tracks:parseInt(playlistAttr[0].no_of_tracks) + 1,
        $addToSet: {tracks: trackObj},
      },
      function(err, doc) {
        if (err) return console.error(err);
        console.log("Document updated succussfully!");
      }).clone();
    res.send(await Playlist.find())
  })

  router.route('/privacypolicy')
  .get (async (req,res) => {
    const policy = await PrivacyPolicy.find();
    res.send(policy)
  })
  .post(async (req,res)=>{
    const policy = req.body.text;
    await PrivacyPolicy.updateOne(
      {id:req.body.id},
      {
        policyText: policy,
      },
      function(err, doc) {
        if (err) return console.error(err);
        console.log("Document updated succussfully!");
      }).clone();
  })

  router.route('/aup')
  .get (async (req,res) => {
    const policy = await AUP.find();
    res.send(policy)
  })
  .post(async (req,res)=>{
    const policy = req.body.text;
    await AUP.updateOne(
      {id:req.body.id},
      {
        policyText: policy,
      },
      function(err, doc) {
        if (err) return console.error(err);
        console.log("Document updated succussfully!");
      }).clone();
  })

  router.route('/dmcapolicy')
  .get (async (req,res) => {
    const policy = await DMCAPolicy.find();
    res.send(policy)
  })
  .post(async (req,res)=>{
    const policy = req.body.text;
    await DMCAPolicy.updateOne(
      {id:req.body.id},
      {
        policyText: policy,
      },
      function(err, doc) {
        if (err) return console.error(err);
        console.log("Document updated succussfully!");
      }).clone();
  })
  
router.route('/pp')
  .post((req,res)=>{
    const data = new AUP({
      id: req.body.id,
      policyText: req.body.text,
    })
    data.save(function(err, doc) {
      if (err) return console.error(err);
      console.log("Document inserted succussfully!");
    });
    res.send(req.body);
  })
  
app.use("/api",router)

app.get('*',async (req,res)=>{
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});



app.listen(PORT,() =>console.log(`Server listening on port ${PORT}`));