const audioCtx = new AudioContext;
const oscillators = [];
const gainNodes = [];
let isPlaying = [];

function setupOscillator(index) {
    oscillators[index] = audioCtx.createOscillator();
    gainNodes[index] = audioCtx.createGain();
    
    oscillators[index].type = "sine";
    oscillators[index].frequency.setValueAtTime(440, audioCtx.currentTime); // value in hertz
    oscillators[index].connect(gainNodes[index]);
    gainNodes[index].connect(audioCtx.destination);
    
    gainNodes[index].gain.value = 0.2;
    oscillators[index].start();
}

for (let i = 0; i < 3; i++) {
    setupOscillator(i);
    isPlaying[i] = false;
}

const playButtons = document.querySelectorAll('.playButton');
const gainFaders = document.querySelectorAll('.gainFader');
const detuneFaders = document.querySelectorAll('.detuneFader');

playButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        if (isPlaying[index]) {
            oscillators[index].stop();
            setupOscillator(index);
            button.textContent = 'Play Sound';
        } else {
            oscillators[index].frequency.setValueAtTime(500+ Number(detuneFaders[index].value), audioCtx.currentTime);
            gainNodes[index].gain.setValueAtTime(gainFaders[index].value, audioCtx.currentTime);
            button.textContent = 'Stop Sound';
        }
        isPlaying[index] = !isPlaying[index];
    });
    
    gainFaders[index].addEventListener('input', () => {
        gainNodes[index].gain.setValueAtTime(gainFaders[index].value, audioCtx.currentTime);
    });
    
    detuneFaders[index].addEventListener('input', () => {
        oscillators[index].frequency.setValueAtTime(40 + Number(detuneFaders[index].value), audioCtx.currentTime);
    });
});
