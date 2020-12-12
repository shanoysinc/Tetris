"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const grid = document.querySelector("#grid");
    const startBtn = document.querySelector("#startBtn");
    function generateGrid() {
        for (let i = 0; i < 210; i++) {
            const divElement = document.createElement("div");
            if (i >= 200) {
                divElement.classList.add("taken");
            }
            grid?.appendChild(divElement);
        }
    }
    generateGrid();
    const squareWidth = 10;
    const lTeromino = [
        [1, squareWidth + 1, squareWidth * 2 + 1, 2],
        [squareWidth, squareWidth + 1, squareWidth + 2, squareWidth * 2 + 2],
        [1, squareWidth + 1, squareWidth * 2 + 1, squareWidth * 2],
        [
            squareWidth,
            squareWidth + 2,
            squareWidth * 2 + 1,
            squareWidth * 2 + 2,
        ],
    ];
    const zTetromino = [
        [0, squareWidth, squareWidth + 1, squareWidth * 2 + 1],
        [
            squareWidth + 1,
            squareWidth + 2,
            squareWidth * 2,
            squareWidth * 2 + 1,
        ],
        [0, squareWidth, squareWidth + 1, squareWidth * 2 + 1],
        [
            squareWidth + 1,
            squareWidth + 2,
            squareWidth * 2,
            squareWidth * 2 + 1,
        ],
    ];
    const tTetromino = [
        [1, squareWidth, squareWidth + 1, squareWidth + 2],
        [1, squareWidth + 1, squareWidth + 2, squareWidth * 2 + 1],
        [squareWidth, squareWidth + 1, squareWidth + 2, squareWidth * 2 + 1],
        [1, squareWidth, squareWidth + 1, squareWidth * 2 + 1],
    ];
    const oTetromino = [
        [0, 1, squareWidth, squareWidth + 1],
        [0, 1, squareWidth, squareWidth + 1],
        [0, 1, squareWidth, squareWidth + 1],
        [0, 1, squareWidth, squareWidth + 1],
    ];
    const iTetromino = [
        [1, squareWidth + 1, squareWidth * 2 + 1, squareWidth * 3 + 1],
        [squareWidth, squareWidth + 1, squareWidth + 2, squareWidth + 3],
        [1, squareWidth + 1, squareWidth * 2 + 1, squareWidth * 3 + 1],
        [squareWidth, squareWidth + 1, squareWidth + 2, squareWidth + 3],
    ];
    const TetrominoShapes = [
        lTeromino,
        zTetromino,
        tTetromino,
        oTetromino,
        iTetromino,
    ];
    let randomTetromino = Math.floor(Math.random() * TetrominoShapes.length);
    const colors = ["orange", "yellow", "green", "purple", "red"];
    let currentPosition = 3;
    let currentTetromino = TetrominoShapes[randomTetromino][0];
    const gridSquares = document.querySelectorAll("#grid div");
    function controls(e) {
        if (e.keyCode === 40) {
            console.log("clcik");
            moveDown();
        }
    }
    document.addEventListener("keyup", controls);
    function drawTetromino() {
        currentTetromino.forEach((index) => {
            gridSquares[index + currentPosition].classList.add("tetromino");
            gridSquares[index + currentPosition].style.backgroundColor =
                colors[randomTetromino];
        });
    }
    drawTetromino();
    function undrawTetromino() {
        currentTetromino.forEach((index) => {
            gridSquares[index + currentPosition].classList.remove("tetromino");
            gridSquares[index + currentPosition].style.backgroundColor = "";
        });
    }
    function moveDown() {
        freezeTetromino();
        undrawTetromino();
        currentPosition += squareWidth;
        drawTetromino();
    }
    function freezeTetromino() {
        currentTetromino.forEach((index) => {
            const nextRow = index + currentPosition + squareWidth;
            const row = index + currentPosition;
            const isNextRowTaken = gridSquares[row].classList.contains("taken");
            const isNextRowTetromino = ["taken", "tetromino"].every((className) => {
                return gridSquares[nextRow].classList.contains(className);
            });
            if (isNextRowTetromino) {
                GenerateNextTetromino();
            }
            else if (isNextRowTaken) {
                GenerateNextTetromino();
            }
            function GenerateNextTetromino() {
                currentTetromino.forEach((index) => {
                    gridSquares[index + currentPosition].classList.add("taken");
                });
                currentPosition = 3;
                randomTetromino = Math.floor(Math.random() * TetrominoShapes.length);
                currentTetromino = TetrominoShapes[randomTetromino][0];
                drawTetromino();
            }
        });
    }
    startBtn.addEventListener("click", () => {
        setInterval(() => moveDown(), 100);
    });
});
// if the next position is taken freezw the tetromino
// create another tetromino and draw it onboard
