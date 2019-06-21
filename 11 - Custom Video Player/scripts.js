const playerContainer = document.querySelector('.player');

// Elements: 


// Good to not forget: When grabbing elements with multiple classes, need to write them together conencted with a dot (same as CSS)
const playerViewer = document.querySelector('.player__video.viewer');
const playBtn = document.querySelector('.toggle');

const progressBar = document.querySelector('.progress');
const progressBarFilled = document.querySelector('.progress__filled');

const sliders = document.querySelectorAll('.player__slider');

// Good to not forget: get elements by their data attributes
const skipBtns = document.querySelectorAll('[data-skip]');


const fullscreenBtn = document.querySelector('.fullscreen');

// --------------------------------------------------------------

// Event handlers:


// Play / pause video
function togglePlay() {
    const method = playerViewer.paused ? 'play' : 'pause';

    // Good to consider: Dynamic methods
    playerViewer[method]();
}


// Better to have it as a separate method:
function updateBtn() {
    const icon = this.paused ? '►' : '❚❚';
    playBtn.innerHTML = icon;
}

// Manipulate video speed / volume 
function handleSliders(e) {
    const { target: { value } } = e;

    // Good to consider: Update player control based on name property
    playerViewer[this.name] = value;
}


// Handle video skips
function handleVideoSkips() {
    playerViewer.currentTime = playerViewer.currentTime + Number(this.dataset.skip);
}


function updatePlayback(e) {
    isClicked = true;
    const playbackIn = e.offsetX / progressBar.offsetWidth * playerViewer.duration;
    playerViewer.currentTime = playbackIn;
}



playBtn.addEventListener('click', togglePlay);
playerViewer.addEventListener('click', togglePlay);
playerViewer.addEventListener('play', updateBtn);
playerViewer.addEventListener('pause', updateBtn);


// Good to know: 
// onchange - event handler is executed after value of element is updated and element loses focus
// oninput - event handler is executed immediately after value is updated 
sliders.forEach(slider => slider.addEventListener('input', handleSliders));


skipBtns.forEach(skipBtn => {
    skipBtn.addEventListener('click', handleVideoSkips)
});


// Change progress bar 
function handleProgressUpdate() {
    progressBarFilled.style.flexBasis = `${this.currentTime / this.duration * 100}%`;   // <-- percentages 
}



playerViewer.addEventListener('load', handleProgressUpdate);
playerViewer.addEventListener('timeupdate', handleProgressUpdate);


let mousedown = false;



progressBar.addEventListener('click', updatePlayback);

// Good to consider: boolean && function
progressBar.addEventListener('mousemove', (e) => mousedown && updatePlayback(e));
progressBar.addEventListener('mousedown', () => mousedown = true);
progressBar.addEventListener('mouseup', () => mousedown = false);



function updateFullScreen() {
    playerViewer.requestFullscreen();
}

fullscreenBtn.addEventListener('click', updateFullScreen);