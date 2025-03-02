console.log("Welcome to VibeStream");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/Angreji Beat.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Angreji Beat", filePath: "songs/Angreji Beat.mp3", coverPath: "covers/1.jpeg"},
    {songName: "Blue Eyes", filePath: "songs/Blue Eyes.mp3", coverPath: "covers/2.jpeg"},
    {songName: "Daku", filePath: "songs/Daku.mp3", coverPath: "covers/3.jpeg"},
    {songName: "Excuses", filePath: "songs/Excuses.mp3", coverPath: "covers/4.jpeg"},
    {songName: "Goat", filePath: "songs/Goat.mp3", coverPath: "covers/5.jpeg"},
    {songName: "Lalkara", filePath: "songs/Lalkara.mp3", coverPath: "covers/6.jpeg"},
    {songName: "Love Dose", filePath: "songs/Love Dose.mp3", coverPath: "covers/7.jpeg"},
    {songName: "Maniac", filePath: "songs/Maniac.mp3", coverPath: "covers/8.jpeg"},
    {songName: "Millionaire", filePath: "songs/Millionaire.mp3", coverPath: "covers/9.jpeg"},
    {songName: "Payal", filePath: "songs/Payal.mp3", coverPath: "covers/10.jpeg"},
];

songItems.forEach((element, i) => { 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
});

// Handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play().catch(error => console.log("Playback failed:", error));
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});

// Listen to Events
audioElement.addEventListener('timeupdate', () => { 
    // Update Seekbar
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100); 
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};

// Play song from the list
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => { 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = songs[songIndex].filePath;  
        console.log("Playing:", audioElement.src);  
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play().catch(error => console.log("Playback Error:", error));  
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    });
});

// Next song
document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 9) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    audioElement.src = songs[songIndex].filePath;  
    console.log("Next Playing:", audioElement.src);  
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play().catch(error => console.log("Playback Error:", error));  
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});

// Previous song
document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0;
    } else {
        songIndex -= 1;
    }
    audioElement.src = songs[songIndex].filePath;  
    console.log("Previous Playing:", audioElement.src);  
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play().catch(error => console.log("Playback Error:", error));  
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});
