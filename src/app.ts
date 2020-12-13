document.addEventListener("DOMContentLoaded", () => {
	const grid = document.querySelector("#grid");
	const startBtn = document.querySelector("#startBtn") as HTMLButtonElement;
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
	let rotateTetromino = 0;
	let currentTetromino = TetrominoShapes[randomTetromino][rotateTetromino];

	const gridSquares = (document.querySelectorAll(
		"#grid div"
	) as unknown) as HTMLElement[];

	function controls(e: { keyCode: number }) {
		if (e.keyCode === 40) {
			moveDown();
		} else if (e.keyCode === 39) {
			console.log("right");
			moveRight();
		} else if (e.keyCode === 38) {
			console.log("up");
			rotate();
		} else if (e.keyCode === 37) {
			console.log("left");
			moveLeft();
		}
	}

	document.addEventListener("keyup", controls);

	function drawTetromino() {
		currentTetromino.forEach((index) => {
			// console.log("draw", index + currentPosition);

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
		undrawTetromino();
		currentPosition += squareWidth;
		drawTetromino();
		freezeTetromino();
	}

	function moveRight() {
		let blockPos = 0;

		currentTetromino.forEach((index) => {
			blockPos = (index + currentPosition) % squareWidth;
		});

		if (blockPos <= 8) {
			console.log("right", blockPos);

			undrawTetromino();

			currentPosition += 1;
			drawTetromino();
		}
	}
	function moveLeft() {
		//need work on
		let blockPos = 0;

		currentTetromino.forEach((index) => {
			blockPos = (index + currentPosition) % squareWidth;
		});

		console.log("left", currentPosition % squareWidth);
		undrawTetromino();

		currentPosition -= 1;
		console.log("current pos", currentPosition);

		drawTetromino();
	}

	function rotate() {
		undrawTetromino();
		console.log(TetrominoShapes[randomTetromino]);
		rotateTetromino += 1;
		if (rotateTetromino === 4) {
			rotateTetromino = 0;
		}
		currentTetromino = TetrominoShapes[randomTetromino][rotateTetromino];
		drawTetromino();
	}

	function freezeTetromino() {
		currentTetromino.forEach((index) => {
			const nextRow = index + currentPosition + squareWidth;
			const row = index + currentPosition;
			const isNextRowTaken = gridSquares[row].classList.contains("taken");

			const isNextRowTetrominoAndTaken = ["taken", "tetromino"].every(
				(className) => {
					return gridSquares[nextRow].classList.contains(className);
				}
			);

			if (isNextRowTetrominoAndTaken) {
				GenerateNextTetromino();
			} else if (isNextRowTaken) {
				GenerateNextTetromino();
			}

			function GenerateNextTetromino() {
				currentTetromino.forEach((index) => {
					gridSquares[index + currentPosition].classList.add("taken");
				});

				currentPosition = 3;
				randomTetromino = Math.floor(
					Math.random() * TetrominoShapes.length
				);
				currentTetromino = TetrominoShapes[randomTetromino][0];
				drawTetromino();
			}
		});
	}
	startBtn.addEventListener("click", () => {
		setInterval(() => moveDown(), 100);
	});
});
