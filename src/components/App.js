import "../App.css";
import addIcon from "../assets/addIcon.png";
import subIcon from "../assets/subIcon.png";
import React, { useState, useEffect } from "react";
import { signOutUser } from "./firebase.js";
import { useNavigate, Link } from "react-router-dom";
import { passwordReset } from "./firebase";
import { UserProvider } from "./user";
import { getAuth } from "firebase/auth";
import Modal from "../modal/Modal";

function App(props) {
	const [playlist, setPlaylist] = useState([]);
	const [track, setTrack] = useState([]);
	const nav = useNavigate();

	const [currentUser, setCurrentUser] = useState([]);
	const [show, setShow] = useState(false);
	const [showEdit, setShowEdit] = useState(false);
	const [confirm, setConfirm] = useState(false);
	const [element, setElement] = useState();
	const [current, setCurrent] = useState({
		n: "",
		d: "",
	});

	useEffect(async () => {
		const auth = getAuth();
		const user = auth.currentUser;
		setCurrentUser(user);
		const resPlaylist = await fetch("/api/playlists");
		const resTracks = await fetch("/api/tracks");
		if (resPlaylist.ok) {
			const data = await resPlaylist.json();
			setPlaylist((playlist) => [...playlist, ...data]);
		}
		if (resTracks.ok) {
			const data = await resTracks.json();
			setTrack((track) => [...track, ...data]);
		}
	}, []);
	console.log(currentUser);
	const selectPlaylist = (e) => {
		var data = [...document.getElementsByClassName("playlist-element selected")];
		data.map((x, i) => {
			data[i].className = "playlist-element";
			data[i].id = "";
		});
		if (e.target.className == "playlist-element" || e.target.className == "playlist-content-row") {
			e.target.className = "playlist-element selected";
			e.target.id = "selected";
		}
	};
	const removePlaylist = async (e) => {
		var parent = e.target.parentElement.parentElement.parentElement;
		setPlaylist((current) =>
			current.filter((playlist) => {
				return playlist._id !== parent.id;
			})
		);
		await fetch("/api/playlists", {
			method: "DELETE",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				_id: parent.id,
			}),
		});
	};

	const addTrack = async (e) => {
		var playlist = document.getElementById("selected");
		if (playlist != null) {
			var parent = e.target.parentElement.parentElement;
			await fetch(`/api/playlists/${playlist.children[0].children[0].id}`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					track: parent.children[0].id,
				}),
			});
			const updatePlaylist = playlist.map((playlistElement, i) => {
				if (playlistElement.playlist_id == playlist.children[0].children[0].id) {
					alert(playlistElement.tracks);
				}
			});
			updatePlaylist();
		} else {
			alert("No playlist selected!");
		}
	};

	const createPlaylists = async (e) => {
		if (e.target.id == "addPlaylist" || e.key == "Enter") {
			var id = await checkPlaylist();
			const noOfTracks = 0;
			const duration = "00:00";
			var playlistObj;
			if (e.target.id != "addPlaylist") {
				playlistObj = {
					playlist_name: `${e.target.value}`,
					playlist_id: id,
					no_of_tracks: noOfTracks,
					total_duration: duration,
					tracks: [],
				};
			} else {
				playlistObj = {
					playlist_name: `Playlist #${id}`,
					playlist_id: id,
					no_of_tracks: noOfTracks,
					total_duration: duration,
					tracks: [],
				};
			}

			await fetch("/api/playlists", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(playlistObj),
			});

			const res = await fetch("/api/playlists");
			const data = await res.json();
			console.log(JSON.stringify(data[data.length - 1]));
			setPlaylist((playlist) => [...playlist, data[data.length - 1]]);
		}
	};

	async function checkPlaylist() {
		const res = await fetch("/api/playlists");
		const data = await res.json();
		var id = "1";
		if (data.length != 0) {
			id = parseInt(data[data.length - 1].playlist_id) + 1;
		}
		return id;
	}

	const viewTracks = async (e) => {
		var data = [...document.getElementsByClassName("wrapper1 selected")];
		data.map((x, i) => {
			data[i].className = "wrapper1";
		});
		if (e.target.className == "wrapper1") {
			e.target.className = "wrapper1 selected";
			var parentid = e.target.parentElement.parentElement.id;
			const res = await fetch(`/api/playlists/${parentid}`);
			const data = await res.json();
			if (data[0].tracks.length > 0) {
				alert(JSON.stringify(data[0].tracks));
			} else {
				alert("Empty Playlist!");
			}
		}
	};

	const setVisibility = async (e) => {
		await fetch(`/api/playlistVisibility/${e.target.parentElement.parentElement.parentElement.id}`);
		const query = await fetch(
			`/api/playlists/${e.target.parentElement.parentElement.parentElement.id}`
		).clone();
		const data = await query.json();
		alert(`Public: ${data[0].isPublic}`);
	};

	const mapTracks = track.map((data) => (
		<div class="element">
			<div class="number" id={data.track_id}>
				{JSON.stringify(data.track_id).replaceAll('"', "")}
			</div>
			<div class="titleE" id={data.track_name}>
				{JSON.stringify(data.track_name).replaceAll('"', "")}
			</div>
			<div class="artist" id={data.artist}>
				{JSON.stringify(data.artist).replaceAll('"', "")}
			</div>
			<div class="album" id={data.album_name}>
				{JSON.stringify(data.album_name).replaceAll('"', "")}
			</div>
			<div class="duration">{JSON.stringify(data.duration).replaceAll('"', "")}</div>
			<div class="add">
				<img
					class="add"
					src={addIcon}
					onClick={addTrack}
					style={{ height: "25px", width: "25px" }}
				/>
			</div>
		</div>
	));
	const mapPlaylist = playlist.map((data) => (
		<div class="playlist-element" id={data._id} onClick={selectPlaylist}>
			<div class="playlist-header-row">
				<div class="wrapper3" id={data.playlist_id}>
					<h3 contentEditable="true">{data.playlist_name}</h3>
				</div>
				<div class="wrapper4">
					<input
						class="button"
						id="getGenres"
						type="button"
						value={"e"}
						onClick={(e) => {
							showEditModal(e);
						}}
					/>
					<input
						class="button"
						id="getGenres"
						type="button"
						value={"v"}
						onClick={(e) => setVisibility(e)}
					/>
					<img
						class="sub"
						src={subIcon}
						onClick={(e) => showConfirmDelete(e)}
						height="15x"
						width="15px"
					/>
				</div>
			</div>
			<div class="playlist-content-row">
				<div class="wrapper1" id="trackDiv" onClick={viewTracks}>
					{`Tracks: ${data.no_of_tracks}`}
				</div>
				<div class="wrapper2">{`${data.total_duration}`}</div>
			</div>
		</div>
	));

	const confirmDelete = async () => {
		setConfirm(true);
		setShow(false);
		setElement(null, removePlaylist(element));
	};

	const showConfirmDelete = (e) => {
		setShow(true);
		setElement(e);
	};

	const closeConfirmDelete = () => {
		setConfirm(false);
		setShow(false);
	};

	const showEditModal = async (e) => {
		const query = await fetch(
			`/api/playlists/${e.target.parentElement.parentElement.parentElement.id}`
		);
		const data = await query.json();
		const currentObj = {
			n: data[0].playlist_name,
			d: data[0].description,
		};
		setCurrent(currentObj);
		setShowEdit(true);
	};
	const hideEditModal = () => {
		setShowEdit(false);
	};

	const save = async (e) => {
		const one = {
			name: e.target.parentElement.parentElement.children[0].children[0].value,
			desc: e.target.parentElement.parentElement.children[1].children[0].value,
		};
		await fetch(`/api/playlistsave/${e.target.parentElement.parentElement.parentElement.id}"`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(one),
		});
	};

	return (
		<>
			<body>
				<div class="accent">
					<a href="/">
						<div class="title">SE3316 Lab 4</div>
					</a>
					<div class="search-container">
						<input
							type="text"
							id="addPlaylistField"
							class="form-control"
							maxlength="20"
							placeholder="Add a Playlist..."
							onKeyUp={(e) => createPlaylists(e)}
						/>
					</div>
				</div>
				<div class="box">
					<div class="tracks-content-box">
						<div class="tracks-header">
							<div class="number-header">
								<h2>#</h2>
							</div>
							<div class="image-header"></div>
							<div class="title-header">
								<h2>Title</h2>
							</div>
							<div class="album-header">
								<h2>Album</h2>
							</div>
							<div class="artist-header">
								<h2>Artist</h2>
							</div>
							<div class="duration-header">
								<h2>Duration</h2>
							</div>
							<div class="add-header">
								<h2>Add</h2>
							</div>
						</div>
						<div class="tracks-header line">
							<hr width="100%" size="1" />
						</div>
						<div class="tracks-content">
							<ul id="result-list">{mapTracks}</ul>
						</div>
					</div>
					<div class="playlist-wrapper">
						<div class="playlist-content-box">
							<div id="playlist-header" class="playlist-header">
								<h1>Playlists</h1>
								<img
									id="addPlaylist"
									src={addIcon}
									onClick={createPlaylists}
									height="20px"
									width="20px"
								/>
							</div>
							<div class="playlist-content">
								<ul id="content-list">{mapPlaylist}</ul>
							</div>
						</div>
					</div>
				</div>
			</body>
			<Modal title="Confirm Deletion" onClose={() => setShow(false)} show={show}>
				<input
					class="button"
					id="getGenres"
					type="button"
					value={"Confirm Delete"}
					onClick={confirmDelete}
				/>
				<input
					class="button"
					id="getGenres"
					type="button"
					value={"Cancel"}
					onClick={closeConfirmDelete}
				/>
			</Modal>
			<Modal title="Edit" onClose={() => hideEditModal()} show={showEdit}>
				<div class="search-container">
					<input
						type="text"
						class="form-control"
						maxlength="20"
						placeholder="Playlist Name"
						value={current.n}
					/>
				</div>
				<div class="search-container">
					<input
						type="text"
						class="form-control"
						maxlength="20"
						placeholder="Description"
						value={current.d}
					/>
				</div>
				<div class="search-container">
					<input
						class="button"
						id="getGenres"
						type="button"
						value={"Save"}
						onClick={(e) => save(e)}
					/>
				</div>
			</Modal>
		</>
	);
}

export default App;
