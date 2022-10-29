//game constrants and variable
let snakeVel = {x: 0, y: 0};
const foodSound = new Audio('food.mp3');
const gameoverSound = new Audio('gameover.mp3');
const moveSound = new Audio('move.mp3');
const themeSound = new Audio('theme.mp3');
let speed = 7;
let lastPaintTime = 0;
let snakeArr = [
    {x:12, y:14}
]
let food = {x:4, y:6};


//game function
function main(ctime){
    window.requestAnimationFrame(main);
    // console.log(main)
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake){
    //if collide with body
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }

    //if colide with walls
    if (snake[0].x >=18 || snake[0].x <=0 || snake[0].y >=18 || snake[0].y <=0){
        return true;
    }
    
}


function gameEngine(){

    //first: updating snake array and food
    if(isCollide(snakeArr)){
        gameoverSound.play();
        // themeSound.pause();
        snakeVel = {x:0, y:0};
        alert("Game Over. Press OK to Play Again");
        snakeArr = [{x:12, y:14}];
        // themeSound.play();
        score = 0;
    }

    //if food is eaten, increment the score and regenerate the food

    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        snakeArr.unshift({x: snakeArr[0].x + snakeVel.x, y: snakeArr[0].y + snakeVel.y})
        let a = 0;
        let b = 18;
        food = {x: Math.round(a+(b-a)* Math.random()), y: Math.round(a+(b-a)* Math.random())}
    }


    //Moving Snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += snakeVel.x;
    snakeArr[0].y += snakeVel.y;


    //second: displaying snake
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('span');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0){
            snakeElement.classList.add('head')
        }
        else{
            snakeElement.classList.add('snake')
        }
        board.appendChild(snakeElement);
    });

    //third: displaying food
        foodElement = document.createElement('span');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food')
        board.appendChild(foodElement);

    }


//main logic
window.requestAnimationFrame(main);
window.addEventListener('keydown', e=>{
    snakeVel= {x:0, y:1}
    moveSound.play();
    // themeSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp")
            snakeVel.x = 0;
            snakeVel.y = -1;
            break;
    
        case "ArrowDown":
            console.log("ArrowDown")
            snakeVel.x = 0;
            snakeVel.y = 1;
            break;
    
        case "ArrowLeft":
            console.log("ArrowLeft")
            snakeVel.x = -1;
            snakeVel.y = 0;
            break;
    
        case "ArrowRight":
            console.log("ArrowRight")
            snakeVel.x = 1;
            snakeVel.y = 0;
            break;
    
        default:
            break;
    }
     
});



