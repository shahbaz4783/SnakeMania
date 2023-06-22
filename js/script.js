let snakeVel = { x: 0, y: 0 };

const foodSound = new Audio('./assets/food.mp3');
const gameoverSound = new Audio('./assets/gameover.mp3');
const moveSound = new Audio('./assets/move.mp3');

let speed = 5;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [{ x: 12, y: 14 }];
let food = { x: 4, y: 6 };

// Game function
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }

    if (
        snake[0].x >= 18 ||
        snake[0].x <= 0 ||
        snake[0].y >= 18 ||
        snake[0].y <= 0
    ) {
        return true;
    }

    return false;
}

function gameEngine() {
    // Part 1: Updating snake array and food
    if (isCollide(snakeArr)) {
        gameoverSound.play();
        snakeVel = { x: 0, y: 0 };
        snakeArr = [{ x: 12, y: 14 }];
        score = 0;
        alert('Game Over. Press OK to Play Again');
    }

    // If food is eaten, increment the score and regenerate the food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        score += 1;
        let hiscore = localStorage.getItem('hiscore');
        if (hiscore === null) {
            hiscore = 0;
        } else {
            hiscore = parseInt(hiscore);
        }

        if (score > hiscore) {
            localStorage.setItem('hiscore', score.toString());
            hiscore = score;
        }

        hiscoreBox.innerHTML = 'HiScore: ' + hiscore;
        scoreBox.innerHTML = 'Score: ' + score;

        snakeArr.unshift({
            x: snakeArr[0].x + snakeVel.x,
            y: snakeArr[0].y + snakeVel.y,
        });

        let a = 1;
        let b = 17;
        food = {
            x: Math.round(a + (b - a) * Math.random()),
            y: Math.round(a + (b - a) * Math.random()),
        };
    }

    // Moving Snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }

    snakeArr[0].x += snakeVel.x;
    snakeArr[0].y += snakeVel.y;

    // Part 2: Displaying snake
    board.innerHTML = '';
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('span');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        } else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    // Part 3: Displaying food
    foodElement = document.createElement('span');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

// Main logic
let hiscore = localStorage.getItem('hiscore');
if (hiscore === null) {
    hiscore = 0;
    localStorage.setItem('hiscore', hiscore.toString());
} else {
    hiscore = parseInt(hiscore);
    hiscoreBox.innerHTML = 'HiScore: ' + hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', (e) => {
    snakeVel = { x: 0, y: 1 };
    moveSound.play();

    switch (e.key) {
        case 'ArrowUp':
            console.log('ArrowUp');
            snakeVel.x = 0;
            snakeVel.y = -1;
            break;

        case 'ArrowDown':
            console.log('ArrowDown');
            snakeVel.x = 0;
            snakeVel.y = 1;
            break;

        case 'ArrowLeft':
            console.log('ArrowLeft');
            snakeVel.x = -1;
            snakeVel.y = 0;
            break;

        case 'ArrowRight':
            console.log('ArrowRight');
            snakeVel.x = 1;
            snakeVel.y = 0;
            break;

        default:
            break;
    }
});

// Touch events
const touchArea = document.getElementById('touch-area');
let startTouchX = 0;
let startTouchY = 0;

touchArea.addEventListener('touchstart', (e) => {
    startTouchX = e.touches[0].clientX;
    startTouchY = e.touches[0].clientY;
});

touchArea.addEventListener('touchmove', (e) => {
    e.preventDefault(); // Prevent scrolling
});

touchArea.addEventListener('touchend', (e) => {
    const endTouchX = e.changedTouches[0].clientX;
    const endTouchY = e.changedTouches[0].clientY;
    const diffX = endTouchX - startTouchX;
    const diffY = endTouchY - startTouchY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
        // Horizontal swipe
        if (diffX > 0) {
            // Right swipe
            if (snakeVel.x !== -1) {
                snakeVel.x = 1;
                snakeVel.y = 0;
            }
        } else {
            // Left swipe
            if (snakeVel.x !== 1) {
                snakeVel.x = -1;
                snakeVel.y = 0;
            }
        }
    } else {
        // Vertical swipe
        if (diffY > 0) {
            // Down swipe
            if (snakeVel.y !== -1) {
                snakeVel.x = 0;
                snakeVel.y = 1;
            }
        } else {
            // Up swipe
            if (snakeVel.y !== 1) {
                snakeVel.x = 0;
                snakeVel.y = -1;
            }
        }
    }
});
