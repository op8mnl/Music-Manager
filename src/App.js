import logo from './logo.svg';
import './App.css';
import addIcon from "./assets/addIcon.png";
import subIcon from "./assets/subIcon.png";
import React,{useState, useEffect} from 'react';

function App() {
  
  const [playlist, setPlaylist] = useState([])

  useEffect(async () => {
    const res = await fetch("/api/playlists");
    const data = await res.json();
    while (data.length > 0){ 
      setPlaylist(playlist => [...playlist, data.shift()]);
    }
  })

  const selectPlaylist = (e) =>{
    var data = [...document.getElementsByClassName("playlist-element selected")];
    data.map((x,i) => {
        data[i].className = "playlist-element"
        data[i].id = ""
    });
    if (e.target.className == "playlist-element" || e.target.className == "playlist-content-row") {
        e.target.className = "playlist-element selected";
        e.target.id = "selected";
    }
  }
  const removePlaylist = async (e) =>{
    var parent = e.target.parentElement.parentElement.parentElement
    var playlistContent = document.getElementById('content-list');
    playlistContent.innerHTML='';
    await fetch('/api/playlists', {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            _id: parent.id,
        })
    });
  } 

  // const addTrack = async (e)=>{
  //   var playlist = document.getElementById("selected")
  //   if (playlist != null) {
  //       var parent = e.target.parentElement.parentElement
  //       await fetch(`/api/playlists/${playlist.children[0].children[0].id}`, {
  //           method: 'POST',
  //           headers: {'Content-Type': 'application/json'},
  //           body: JSON.stringify({
  //               track : parent.children[0].id
  //           })
  //       });
  //       document.getElementById('content-list').innerHTML='';
  //   }
  // }

  const viewTracks = async (e)=>{
    var data = [...document.getElementsByClassName("wrapper1 selected")];
    data.map((x,i) => {
        data[i].className = "wrapper1"
    });
    if (e.target.className == "wrapper1") {
        e.target.className = "wrapper1 selected";
        var parentid = e.target.parentElement.parentElement.id;
        const res = await fetch(`/api/playlists/${parentid}`);
        const data = await res.json();
        if (data[0].tracks.length > 0) {
            alert(JSON.stringify(data[0].tracks))
        }else{
            alert("Empty Playlist!")
        }
    }
  }

  const mapPlaylist = playlist.map((data,i) => {
    console.log(data);
    <div class='playlist-element' id={data[i]._id} onClick = {selectPlaylist}>
      <div class = 'playlist-header-row'>
        <div class = 'wrapper3' id = {data[i].playlist_id}>
          <h3 contentEditable="true">
            {data[i].playlist_name}
          </h3>
        </div>
        <div class = 'wrapper4'>
          <img class = 'sub' src={subIcon} onClick={removePlaylist} height="15x" width="15px"/>
        </div>
      </div>
      <div class = 'playlist-content-row'>
        <div class = 'wrapper1' id = 'trackDiv' onClick={viewTracks}>
          {`Tracks: ${data[i].no_of_tracks}`}
        </div>
        <div class = 'wrapper2'>
          {`${data[i].total_duration}`}
        </div>
      </div>
    </div>
  })

  return (
    <>
      <body>
        <div class="accent">
            <div class="title">
                SE3316 Lab 4 
            </div>
            <div class="getGenreButton">
              <input class="button" id="getGenres"type="button" value="Get Genres" />
            </div>
            <div class="search-container">
              <input type="text" id="addPlaylistField"class="form-control" maxlength="20"placeholder="Add a Playlist..."/>
            </div>
            <div class="search-container">
              <input type="text" id="searchByIdA"class="form-control" maxlength="20"placeholder="Search by Artist Id..."/>
            </div>
            <div class="search-container">
              <input type="text" id="searchById"class="form-control"maxlength="20" placeholder="Search by Track Id..."/>
            </div>
            <div class="search-container">
              <input type="text" id="searchByIdN"class="form-control"maxlength="20" placeholder="Search by Artist Name..."/>
            </div>
        </div>
        <div class="box"> 
          <div class="tracks-content-box">
            <div class="tracks-header">
              <div class="number-header"><h2>#</h2></div>
              <div class="image-header"></div>
              <div class="title-header"><h2>Title</h2></div>
              <div class="album-header"><h2>Album</h2></div>
              <div class="artist-header"><h2>Artist</h2></div>
              <div class="duration-header"><h2>Duration</h2></div>
              <div class="add-header"><h2>Add</h2></div>
            </div>
            <div class="tracks-header line">
              <hr width="100%" size = "1"/>
            </div>
            <div class="tracks-content">
              <ul id="result-list">

              </ul>
            </div>
          </div>
          <div class="playlist-content-box">
            <div id = 'playlist-header' class="playlist-header">
              <h1>Playlists</h1>
              <img id = "addPlaylist"src={addIcon} height="20px" width="20px"/>
            </div>
            <div class="playlist-content">
              <ul id = "content-list">
                {mapPlaylist}
              </ul>
            </div>
          </div>
        </div>
      </body>
    </>
  );
}

export default App;
