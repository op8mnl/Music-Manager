import React, { useState, useEffect, useRef } from "react";
import Modal from "../modal/Modal";
import SearchModal from "../modal/SearchModal.js";
import "../App.css";

function Public() {
	const [playlist, setPlaylist] = useState([]);
	const [show, setShow] = useState(false);
	const [showSearchModal, setShowSearchModal] = useState(false);

	const [result, setResult] = useState([]);

	const [playlistData, setPlaylistData] = useState({
		playlist_name: "",
		tracks: [],
	});

	useEffect(async () => {
		const resPlaylist = await fetch("/api/publicPlaylists");
		if (resPlaylist.ok) {
			const data = await resPlaylist.json();
			setPlaylist((playlist) => [...playlist, ...data]);
		}
	}, []);

	const showModal = async (e) => {
		const query = await fetch(`/api/playlists/${e.target.id.replaceAll('"', "")}`);
		const data = await query.json();
		if (data[0].tracks.length != 0) {
			setPlaylistData(data[0]);
			setShow(true);
		} else {
			alert("Empty playlist!");
		}
	};
	const hideModal = () => {
		setShow(false);
		setPlaylistData({
			playlist_name: "",
			tracks: [],
		});
	};

	const showSearchModalResults = async (e) => {
		if (e.key == "Enter") {
			var text = e.target.value;
			var search = text.toLowerCase().split(" ");
			const query = await fetch(`/api/tracks/`);
			const data = await query.json();
			data.map(async (dataE) => {
				var genre = "";
				if (dataE.track_genres.length != 0) {
					genre = dataE.track_genres
						.replace(/\[|\]/g, "")
						.split(",")[1]
						.split(":")[1]
						.replaceAll(`"`, "")
						.replaceAll(`'`, "")
						.replaceAll(` `, "")
						.toLowerCase();
				}
				var year = "N/A";
				if (dataE.track_date_recorded.length != 0) {
					year = dataE.track_date_recorded.split("/")[2];
				}

				const searchObj = [
					dataE.artist.toLowerCase(),
					dataE.track_name.toLowerCase(),
					dataE.album_name.toLowerCase(),
					genre,
					dataE._id,
				];
				const found = search.some((r) => searchObj.indexOf(r) >= 0);
				if (found) {
					const query = await fetch(`/api/track/${searchObj[4]}`);
					const data = await query.json();
					var resultObj = {
						n: data[0].track_name,
						a: data[0].artist,
						g: genre,
						d: data[0].duration,
						y: year,
					};
					setResult((result) => [...result, resultObj]);
				}
			});
			setShowSearchModal(true);
			e.target.value = "";
		}
	};

	const hideSearchModal = () => {
		setResult([]);
		setShowSearchModal(false);
	};

	const viewTracks = () => {};

	const mapPublic = playlist.map((data, i) => (
		<div class="element">
			<div class="number" style={{ width: "5%" }}>
				{JSON.stringify(data.playlist_id).replaceAll('"', "")}
			</div>
			<div
				class="titleE"
				id={JSON.stringify(data._id)}
				onClick={(e) => showModal(e)}
				style={{ width: "29%" }}>
				{JSON.stringify(data.playlist_name).replaceAll('"', "")}
			</div>
			<div class="artist" style={{ width: "14%", textAlign: "center" }}>
				{JSON.stringify(data.no_of_tracks).replaceAll('"', "")}
			</div>
			<div class="album" style={{ width: "29%" }}>
				{JSON.stringify(data.creator).replaceAll('"', "")}
			</div>
			<div class="duration" style={{ width: "12%", textAlign: "center" }}>
				{JSON.stringify(data.total_duration).replaceAll('"', "")}
			</div>
			<div class="add" style={{ width: "10%", lineHeight: "400%" }}>
				{JSON.stringify(data.rating).replaceAll('"', "")}
			</div>
		</div>
	));

	return (
		<>
			<body>
				<div class="accent">
					<a href="/">
						<div class="title">SE3316 Lab 4</div>
					</a>
					<div class="getGenreButton">
						<a href="/auth">
							<input class="button" id="getGenres" type="button" value="Log In" />
						</a>
					</div>
				</div>
				<div class="box" style={{ height: "90vh" }}>
					<div class="start-box" style={{ height: "10vh" }}>
						<div style={{ alignItems: "center", marginLeft: "1.7em" }}>Search Tracks:</div>
						<div
							class="search-container"
							style={{ width: "40vw", marginLeft: "1.7em", marginTop: "0em" }}>
							<input
								type="text"
								id="searchByIdN"
								class="form-control"
								maxlength="30"
								placeholder="Search..."
								onKeyUp={(e) => showSearchModalResults(e)}
							/>
						</div>
					</div>
					<div class="start-box" style={{ alignContent: "flex-start", height: "70vh" }}>
						<div class="tracks-header" style={{ paddingBottom: "6px" }}>
							<div class="number-header">
								<h2>#</h2>
							</div>
							<div class="title-header" style={{ width: "29%" }}>
								<h2>Playlist Title</h2>
							</div>
							<div class="album-header" style={{ width: "29%" }}>
								<h2>Creator</h2>
							</div>
							<div class="artist-header" style={{ width: "14%", textAlign: "center" }}>
								<h2>Tracks</h2>
							</div>
							<div class="duration-header" style={{ textAlign: "center" }}>
								<h2>Duration</h2>
							</div>
							<div class="add-header" style={{ width: "10%" }}>
								<h2>Rating</h2>
							</div>
						</div>
						<div class="tracks-header line">
							<hr width="100%" size="1" />
						</div>
						<div class="tracks-content">
							<ul>{mapPublic}</ul>
						</div>
					</div>
				</div>
			</body>
			<Modal title={playlistData.playlist_name} onClose={() => hideModal()} show={show}>
				{playlistData.description}
				{playlistData.tracks.map((track) => (
					<div class="element">
						<div class="number" id={track.track_id}>
							{track.track_id}
						</div>
						<div
							class="titleE"
							id={track.track_name}
							onClick={(e) => {
								viewTracks(e);
							}}>
							{track.track_name}
						</div>
						<div class="artist" id={track.artist}>
							{track.artist}
						</div>
						<div class="album" id={track.album_name}>
							{track.album_name}
						</div>
						<div class="duration">{track.duration}</div>
						<div class="duration">
							<a
								href={`https://www.youtube.com/results?search_query=${track.album_name}+${track.track_name}`}
								target="_blank">
								<input class="button" id="getGenres" type="button" value="Play >" />
							</a>
						</div>
					</div>
				))}
			</Modal>

			<SearchModal title="Search Results" onClose={() => hideSearchModal()} show={showSearchModal}>
				{result.map((track) => (
					<div class="element">
						<div class="titleE" style={{ width: "27%" }}>
							{track.n}
						</div>
						<div class="titleE" style={{ width: "27%" }}>
							{track.a}
						</div>
						<div class="duration">{track.g}</div>
						<div class="duration">{track.y}</div>
						<div class="duration">
							<a
								href={`https://www.youtube.com/results?search_query=${track.a}+${track.n}`}
								target="_blank">
								<input class="button" id="getGenres" type="button" value="Play >" />
							</a>
						</div>
					</div>
				))}
			</SearchModal>
		</>
	);
}

export default Public;
