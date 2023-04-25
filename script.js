const canvas = document.getElementById('game-board');
const ctx = canvas.getContext('2d');

const tileSize = 20;
const numRows = canvas.height/tileSize;
const numCols = canvas.width/tileSize;

let snake = [{x:10, y:10}];
let food = {x:15, y:15};
let dx = 0;
let dy = 0;

function main() {
    setTimeout(() => {
        //DONE: desenhar a cobra
        drawSnake()
        //DONE: desenhar o alimento
        drawFood()
        //TODO: movimentação da cobra
        //TODO: checar se a cobra bateu em algo 
        //TODO: checar se a cobra bateu an comida
        main()
    }, 100)
}

function drawSnake() {
    ctx.fillStyle = 'green'
    snake.forEach((segment) => {
        ctx.fillRect(segment.x*tileSize, segment.y*tileSize, tileSize, tileSize);
        ctx.strokeStyle = 'black';
        ctx.strokeRect(segment.x*tileSize, segment.y*tileSize, tileSize, tileSize);
    })
}

function drawFood() {
    ctx.fillStyle = 'red'
    ctx.fillRect(food.x*tileSize, food.y*tileSize, tileSize, tileSize)
}   

main()