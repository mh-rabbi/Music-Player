const wrapper = document.querySelector(".wrapper"),
    musicImg = document.querySelector("#music-image"),
    musicName = document.querySelector("#music-name"),
    musicArtist = document.querySelector("#music-artist"),
    playPauseBtn = document.querySelector("#play-pause"),
    prevBtn = document.querySelector("#prev"),
    nextBtn = document.querySelector("#next"),
    progressBar = document.querySelector(".progress-bar");

const songListDiv = document.querySelector("#songList");
const toggleListBtn = document.querySelector("#toggle-list");

let musicIndex = 0;
let isPlaying = false;
const mainAudio = new Audio();  // taking an empty Audio object as index file has main audio

// Load music based on the index
function loadMusic(index) {
    musicName.innerText = allMusic[index].name;
    musicArtist.innerText = allMusic[index].artist;
    musicImg.src = `images/${allMusic[index].img}.jpg`;  
    mainAudio.src = `songs/${allMusic[index].src}.mp3`;  
}

// Play music function
function playMusic() {
    isPlaying = true;
    mainAudio.play();
    playPauseBtn.innerHTML = '<i class="fi fi-sr-pause"></i>';
}

// Pause music function
function pauseMusic() {
    isPlaying = false;
    mainAudio.pause();
    playPauseBtn.innerHTML = '<i class="fi fi-sr-play"></i>';
}

// Toggle Play/Pause
playPauseBtn.addEventListener("click", () => {
    isPlaying ? pauseMusic() : playMusic();
});


// Toggle song list visibility
toggleListBtn.addEventListener("click", () => {
    songListDiv.style.display = (songListDiv.style.display === "block") ? "none" : "block";
});

// Generate Song List from music_list.js
function generateSongList() {
    songListDiv.innerHTML = "<ul>" + allMusic.map((song, index) => `
        <li data-index="${index}">${song.name} - ${song.artist}</li>
    `).join("") + "</ul>";

    // Add click event to play selected song
    document.querySelectorAll(".song-list li").forEach(item => {
        item.addEventListener("click", function () {
            let index = this.getAttribute("data-index");
            loadMusic(index);
            playMusic();
            songListDiv.style.display = "none"; // Hide after selection
        });
    });
}

// Call function to generate the song list
generateSongList();


// Previous Song
prevBtn.addEventListener("click", () => {
    musicIndex = (musicIndex - 1 + allMusic.length) % allMusic.length;
    loadMusic(musicIndex);
    playMusic();
});

// Next Song
nextBtn.addEventListener("click", () => {
    musicIndex = (musicIndex + 1) % allMusic.length;
    loadMusic(musicIndex);
    playMusic();
});

// Update Progress Bar
mainAudio.addEventListener("timeupdate", () => {
    const progressPercent = (mainAudio.currentTime / mainAudio.duration) * 100;
    progressBar.style.width = `${progressPercent}%`;
});

// // Load the first song when page loads
// window.addEventListener("load", () => {
//     loadMusic(musicIndex);
// });
