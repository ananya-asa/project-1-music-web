console.log("Welcome to Spotify");

let songIndex = 0;
let audioElement = new Audio('gorila-315977.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    { songName: "Song-1", filePath: "gorila-315977.mp3", coverPath: "1.jpg" },
    { songName: "Song-2", filePath: "anu.mp3", coverPath: "2.jpg" },
    { songName: "Song-3", filePath: "stylish-deep-electronic-262632.mp3", coverPath: "3.jpg" },
    { songName: "Song-4", filePath: "gorila-315977.mp3", coverPath: "4.jpg" },
    { songName: "Song-5", filePath: "anu.mp3", coverPath: "5.jpg" },
    { songName: "Song-6", filePath: "stylish-deep-electronic-262632.mp3", coverPath: "6.jpg" },
    { songName: "Song-7", filePath: "gorila-315977.mp3", coverPath: "7.jpg" },
    { songName: "Song-8", filePath: "anu.mp3", coverPath: "8.jpg" },
];

// Update song information in the UI
songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// Master Play/Pause
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
    }
});

// Progress bar update
audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

// Seek bar
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

// Reset all small play buttons
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songitemplay')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    });
};

// Play song from small play buttons
Array.from(document.getElementsByClassName('songitemplay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id); // Using the ID (index) of the clicked play button
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = songs[songIndex].filePath; // Set the source of the audio based on the selected song
        audioElement.currentTime = 0; // Start the song from the beginning
        audioElement.play();

        // Sync master play icon
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    });
});
