let interval = null;

function timer(seconds) {
    clearInterval(interval);
    const now = Date.now();     // static Date method that returns timesstamp
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayTimeUntil(then);

    interval = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);

        if (secondsLeft < 0) {
            clearInterval(interval);
            return;
        }

        displayTimeLeft(secondsLeft);
    }, 1000);
}

const form = document.querySelector('#custom');
const timeLeft = document.querySelector('.display__time-left');
const timeUntil = document.querySelector('.display__end-time'); 
const buttons = document.querySelectorAll('.timer__button');


form.addEventListener('submit', function (e) {
    e.preventDefault();
    const minutesInput = this.querySelector('input[name="minutes"]');
    const secondsInput = parseFloat(minutesInput.value) * 60;
    timer(secondsInput);
})


buttons.forEach(btn => btn.addEventListener('click', function(e) {
    const btnTime = this.dataset.time;
    timer(btnTime);
}));


function displayTimeUntil(timestamp){
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();

    timeUntil.textContent = `Be back in ${hours}:${formatTime(minutes)}`;
}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60
    timeLeft.textContent = `${minutes}:${formatTime(remainderSeconds)}`;
}


function formatTime(minutesOrSeconds){
    return `${minutesOrSeconds < 10 ? '0' : ''}${minutesOrSeconds}`;
}

