const canvas = document.getElementById('game-board');
const ctx = canvas.getContext('2d');

const tileSize = 20;
const numRows = canvas.height / tileSize;
const numCols = canvas.width / tileSize;

let snake = [{ x: 10, y: 10 }]; //posição incial
let food = { x: 15, y: 15 };    //posição incial
let dx = 0;                 //posição incial
let dy = 0;                 //posição incial
let score = 0;

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp' && dy === 0) {
        dx = 0;
        dy = -1;
    }
    if(event.key === 'ArrowDown' && dy === 0) {
        dx = 0;
        dy = 1;
    }
    if(event.key === 'ArrowLeft' && dx === 0) {
        dx = -1;
        dy = 0;
    }
    if(event.key === 'ArrowRight' && dx === 0) {
        dx = 1;
        dy = 0;
    }

})

function main() {
    setTimeout(() => {
        //Score()                   //DONE: pontuação
        moveSnake()                 //DONE: movimentação da cobra
        checkSnakeCollision()       //DONE: checar se a cobra bateu em algo
        checkFoodCollision()        //DONE: checar se a cobra bateu an comida
        //checkObstacleCollision()    //  adiciona colisão aos obstaculos
        clearCanvas()               //  altera cor do background 
        //drawObstacles()             //  adiciona obstaculos
        drawSnake()                 //DONE: desenhar a cobra
        drawFood()                  //DONE: desenhar o alimento     
        main()
    }, 150)
}

function drawSnake() {      //desenhando a cobra
    ctx.fillStyle = 'black'
    snake.forEach((segment) => {
        ctx.fillRect(segment.x * tileSize, segment.y * tileSize, tileSize, tileSize);
        ctx.strokeStyle = 'black';
        ctx.strokeRect(segment.x * tileSize, segment.y * tileSize, tileSize, tileSize);
    })
}

function drawFood() {       //desenhando a comida
    ctx.fillStyle = '#CD5C5C'
    ctx.fillRect(food.x * tileSize, food.y * tileSize, tileSize, tileSize)
}

function moveSnake() {      //movimentação da cobra
    const headSnake = { x: snake[0].x + dx, y: snake[0].y + dy }
    snake.unshift(headSnake)
    snake.pop()
}

function checkFoodCollision() {     //verificando a colisão da cobra com a comida
    const positionX = snake[0].x === food.x;
    const positionY = snake[0].y === food.y;
    if (positionX && positionY) {
        generateFood();
        growSnake();
        score++;
        document.getElementById('score').textContent = score;
    }
}

function growSnake() {      //crescimento da cobra
    const tailSnake = { ...snake[snake.length - 1] }
    snake.push(tailSnake)
}

function generateFood() {       //gerando comidas aleatórias
    food.x = Math.floor(Math.random() * numCols)
    food.y = Math.floor(Math.random() * numRows)
    //para gerar obstaculos 
    //obstacles.push({ x: Math.floor(Math.random() * numCols), y: Math.floor(Math.random() * numRows)})
}

function checkSnakeCollision() {        //verificando colisão da cobra com o próprio corpo
    if(
        snake[0].x < 0 ||
        snake[0].x >= numCols ||
        snake[0].y < 0 ||
        snake[0].y >= numRows
    ){
        resetGame()
    }    
    for (let i = 1; i < snake.length; i++) {
        const positionX = snake[i].x === snake[0].x;
        const positionY = snake[i].y === snake[0].y;
        if (positionX && positionY) {
            resetGame()
        }
    }
}

// function checkObstacleCollision() {
//     for(let i = 0; i < obstacles.length; i++){
//         const positionX = snake[0].x === obstacles[i].x;
//         const positionY = snake[0].y === obstacles[i].y;
//         if(positionX && positionY){
//             resetGame()
//         }
//     }
// }

function resetGame() {           //reseta o jogo
    snake = [{ x: 10, y: 10 }];  //retorna para posição inicial
    food = { x: 15, y: 15 };     //retorna para posição inicial
    dx = 0;                      //retorna para posição inicial
    dy = 0;                      //retorna para posição inicial
    score = 0;
}

function clearCanvas() {
    ctx.fillStyle = '#3CB371';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

main()