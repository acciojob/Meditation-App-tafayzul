const app = () => {
    const song = document.querySelector('.song');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.moving-outline circle');
    const video = document.querySelector('.vid-container video');

    // Sounds
    const sounds = document.querySelectorAll('.sound-picker button');
    // Time Display
    const timeDisplay = document.querySelector('.time-display');
    // Time Select Buttons
    const timeSelect = document.querySelectorAll('.time-select button');
    
    // Get the length of the outline for animation
    const outlineLength = outline.getTotalLength();
    
    // Default Duration
    let fakeDuration = 600;

    // Set initial dash attributes for the circle animation
    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

    // Function to pick different sounds/videos
    sounds.forEach(sound => {
        sound.addEventListener('click', function() {
            song.src = this.getAttribute('data-sound');
            video.src = this.getAttribute('data-video');
            checkPlaying(song);
        });
    });

    // Function to play sound
    play.addEventListener('click', () => {
        checkPlaying(song);
    });

    // Function to select time duration
    timeSelect.forEach(option => {
        option.addEventListener('click', function() {
            fakeDuration = this.getAttribute('data-time');
            let minutes = Math.floor(fakeDuration / 60);
            let seconds = Math.floor(fakeDuration % 60);
            
            // Logic to prevent 10:00 (keeps it as 10:0)
            timeDisplay.textContent = `${minutes}:${seconds}`;
        });
    });

    // Helper function to toggle play/pause
    const checkPlaying = song => {
        if (song.paused) {
            song.play().catch(e => console.log("Test Play Interrupted"));
            video.play().catch(e => console.log("Test Play Interrupted"));
            play.src = './svg/pause.svg'; 
        } else {
            song.pause();
            video.pause();
            play.src = './svg/play.svg'; 
        }
    };

    // Animation function using ontimeupdate
    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        let elapsed = fakeDuration - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);

        let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
        outline.style.strokeDashoffset = progress;

        timeDisplay.textContent = `${minutes}:${seconds}`;

        if (currentTime >= fakeDuration) {
            song.pause();
            song.currentTime = 0;
            play.src = './svg/play.svg';
            video.pause();
        }
    };
};

app();