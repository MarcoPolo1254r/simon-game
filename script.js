// Game state
let sequence = [];
let playerIndex = 0;
let round = 0;
let bestScore = 0;
let canPlay = false;
let gameStarted = false; // Track if game has been started
const BASE_DELAY = 800; // Base delay between flashes in ms

// Button references
const buttons = {
    1: document.querySelector('#redButton'),
    2: document.querySelector('#blueButton'),
    3: document.querySelector('#greenButton'),
    4: document.querySelector('#yellowButton')
};

// Flash a button with its color
function flashButton(colorId) {
    const btn = buttons[colorId];
    btn.style.backgroundColor = btn.dataset.color;
    setTimeout(() => btn.style.backgroundColor = 'white', 400);
}

// Calculate speed multiplier (3% faster per round, max 100% = 2x speed)
function getSpeedMultiplier() {
    const speedIncrease = Math.min((round - 1) * 0.03, 1.0); // Max 100% increase
    return 1 - (speedIncrease * 0.5); // Converts to delay multiplier (100% = 0.5x delay)
}

// Show the entire sequence to the player
function showSequence() {
    canPlay = false;
    const delay = BASE_DELAY * getSpeedMultiplier();

    sequence.forEach((colorId, i) => {
        setTimeout(() => {
            flashButton(colorId);
            // After last flash, let player play
            if (i === sequence.length - 1) {
                setTimeout(() => canPlay = true, 600);
            }
        }, i * delay);
    });
}

// Update displays in the header
function updateDisplays() {
    const speedIncrease = Math.min((round - 1) * 3, 100); // 3% per round, max 100%
    document.getElementById('roundDisplay').textContent = `Round: ${round}`;
    document.getElementById('bestScore').textContent = `Best: ${bestScore}`;
    document.getElementById('speedDisplay').textContent = `Speed: +${speedIncrease}%`;
}

// Start a new round by adding a random color
function nextRound() {
    round++;
    playerIndex = 0;
    sequence.push(Math.floor(Math.random() * 4) + 1); // Random 1-4
    updateDisplays();
    showSequence();
}

// Game over - show modal and update best score
function gameOver() {
    canPlay = false;
    gameStarted = false;

    if (round > bestScore) {
        bestScore = round;
    }

    // Show game over modal
    document.getElementById('finalRound').textContent = round;
    document.getElementById('gameOverModal').classList.remove('hidden');

    // Reset game state but don't start
    sequence = [];
    round = 0;
    playerIndex = 0;
    updateDisplays();

    // Enable Start button
    document.getElementById('startBtn').disabled = false;
}

// Player wins at round 20
function playerWins() {
    canPlay = false;
    gameStarted = false;
    bestScore = 20;
    updateDisplays();
    alert('🎉 Congratulations! You Win! You completed all 20 rounds! 🎉');
    sequence = [];
    round = 0;
    playerIndex = 0;
    updateDisplays();
    document.getElementById('startBtn').disabled = false;
}

// Check player's button click
function handleClick(colorId) {
    if (!canPlay || !gameStarted) return; // Ignore clicks if game not started

    flashButton(colorId);

    // Check if player clicked the correct button
    if (colorId !== sequence[playerIndex]) {
        gameOver();
        return;
    }

    playerIndex++;

    // Check for win condition
    if (round === 20 && playerIndex === sequence.length) {
        playerWins();
        return;
    }

    // If player completed the sequence, go to next round
    if (playerIndex === sequence.length) {
        setTimeout(nextRound, 1000);
    }
}

// Attach click handlers to game buttons
Object.keys(buttons).forEach(id => {
    buttons[id].addEventListener('click', () => handleClick(Number(id)));
});

// Modal functionality
const rulesBtn = document.getElementById('rulesBtn');
const rulesModal = document.getElementById('rulesModal');
const closeBtn = document.querySelector('.close-btn');
const resetBtn = document.getElementById('resetBtn');
const startBtn = document.getElementById('startBtn');
const gameOverModal = document.getElementById('gameOverModal');
const closeGameOver = document.querySelector('.close-game-over');

// Rules modal
rulesBtn.addEventListener('click', () => {
    rulesModal.classList.remove('hidden');
});

closeBtn.addEventListener('click', () => {
    rulesModal.classList.add('hidden');
});

rulesModal.addEventListener('click', (e) => {
    if (e.target === rulesModal) {
        rulesModal.classList.add('hidden');
    }
});

// Game Over modal close
closeGameOver.addEventListener('click', () => {
    gameOverModal.classList.add('hidden');
});

gameOverModal.addEventListener('click', (e) => {
    if (e.target === gameOverModal) {
        gameOverModal.classList.add('hidden');
    }
});

// Start button functionality
startBtn.addEventListener('click', () => {
    if (!gameStarted) {
        gameStarted = true;
        startBtn.disabled = true;
        sequence = [];
        round = 0;
        playerIndex = 0;
        canPlay = false;
        updateDisplays();
        nextRound();
    }
});

// Reset button functionality
resetBtn.addEventListener('click', () => {
    gameStarted = false;
    sequence = [];
    round = 0;
    bestScore = 0;
    playerIndex = 0;
    canPlay = false;
    updateDisplays();
    startBtn.disabled = false;
    gameOverModal.classList.add('hidden');
});

// Initialize display
updateDisplays();