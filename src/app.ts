document.addEventListener("DOMContentLoaded", () => {
	const grid = document.querySelector("#grid");
	function generateGrid() {
		for (let i = 0; i < 210; i++) {
			const divElement = document.createElement("div");
			if (i > 200) {
				divElement.classList.add("taken");
			}
			grid?.appendChild(divElement);
		}
	}

	generateGrid();
});
