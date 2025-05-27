class PomodoroTimer {
    constructor() {
        this.interval = null;
        this.timeLeft = 0;
        this.isBreak = false;
        this.activeMode = null;
        this.initializeTimers();
    }

    initializeTimers() {
        const modes = document.querySelectorAll('.mode');
        modes.forEach(mode => {
            const button = mode.querySelector('.timer-button');
            const skipButton = mode.querySelector('.skip-button');
            const display = mode.querySelector('.timer-display');

            button.addEventListener('click', () => {
                if (this.interval) {
                    this.stopTimer();
                    if (this.activeMode === mode) {
                        return;
                    }
                }

                this.activeMode = mode;
                const workTime = parseInt(mode.dataset.time);
                const breakTime = parseInt(mode.dataset.break);
                
                this.startTimer(workTime, breakTime, display, button, skipButton);
            });

            skipButton.addEventListener('click', () => {
                if (!this.isBreak) {
                    // Skip to break
                    this.timeLeft = 1;
                } else {
                    // Skip break and stop timer
                    this.stopTimer();
                }
            });
        });
    }

    startTimer(workTime, breakTime, display, button, skipButton) {
        this.timeLeft = workTime * 60;
        this.isBreak = false;
        button.textContent = 'Detener';
        button.classList.add('active');
        skipButton.style.display = 'block';

        this.interval = setInterval(() => {
            this.timeLeft--;
            this.updateDisplay(display);

            if (this.timeLeft <= 0) {
                if (!this.isBreak) {
                    this.timeLeft = breakTime * 60;
                    this.isBreak = true;
                } else {
                    this.stopTimer();
                    return;
                }
            }
        }, 1000);
    }

    stopTimer() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
            
            if (this.activeMode) {
                const button = this.activeMode.querySelector('.timer-button');
                const skipButton = this.activeMode.querySelector('.skip-button');
                const display = this.activeMode.querySelector('.timer-display');
                
                button.textContent = `Iniciar ${this.activeMode.dataset.time}/${this.activeMode.dataset.break}`;
                button.classList.remove('active');
                skipButton.style.display = 'none';
                display.textContent = '';
                this.activeMode.classList.remove('active');
            }
        }
    }

    updateDisplay(display) {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        const phase = this.isBreak ? 'DESCANSO' : 'ENFOQUE';
        const timeStr = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        display.innerHTML = `
            <div class="phase-indicator">${phase}</div>
            <div>${timeStr}</div>
        `;
        
        this.activeMode.classList.add('active');
    }
}

// Initialize the timer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new PomodoroTimer();
});