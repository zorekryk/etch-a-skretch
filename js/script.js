const container = document.querySelector("#grid-container");
const clearBtn = document.querySelector("#clear-button");
const colorPicker = document.querySelector("#color-picker");
const sizeBtn = document.querySelector("#size-slider");
const gridSize = document.querySelector("#grid-size");
const rainbowBtn = document.querySelector("#rainbow-button");
const eraserBtn = document.querySelector("#eraser-button");

let size = 16;
let color = "#333333";
let isDrawing = false;
let rainbowMode = false;
let eraserMode = false;

sizeBtn.addEventListener("input", () => {
  size = sizeBtn.value;
  gridSize.textContent = `Grid size: ${size} x ${size}`;
  createGrid(size);
});

rainbowBtn.addEventListener("click", () => {
  rainbowMode = !rainbowMode;
  if (rainbowMode) {
    rainbowBtn.textContent = "Disable rainbow mode";
    rainbowBtn.classList.add("button-primary");
  } else {
    rainbowBtn.textContent = "Enable rainbow mode";
    rainbowBtn.classList.remove("button-primary");
  }
});

eraserBtn.addEventListener("click", () => {
  eraserMode = !eraserMode;
  if (eraserMode) {
    eraserBtn.textContent = "Disable eraser mode";
    eraserBtn.classList.add("button-primary");
  } else {
    eraserBtn.textContent = "Enable eraser mode";
    eraserBtn.classList.remove("button-primary");
  }
});

colorPicker.addEventListener("input", () => {
  color = colorPicker.value;
});

clearBtn.addEventListener("click", () => {
  const gridItems = document.querySelectorAll(".grid-item");
  gridItems.forEach((item) => {
    item.style.backgroundColor = "white";
  });
});

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let randomColor = "#";
  for (let i = 0; i < 6; i++) {
    randomColor += letters[Math.floor(Math.random() * 16)];
  }
  return randomColor;
};

const createGrid = (size) => {
  container.innerHTML = "";

  const blockSize = 640 / size;

  for (let i = 0; i < size * size; i++) {
    const div = document.createElement("div");
    div.classList.add("grid-item");
    div.style.backgroundColor = "white";
    div.style.width = `${blockSize}px`;
    div.style.height = `${blockSize}px`;
    container.appendChild(div);
  }
};

container.addEventListener("mousedown", (e) => {
  if (e.target.classList.contains("grid-item")) {
    isDrawing = true;
    applyColor(e.target);
  }
});

container.addEventListener("mouseover", (e) => {
  if (isDrawing && e.target.classList.contains("grid-item")) {
    applyColor(e.target);
  }
});

document.addEventListener("mouseup", () => {
  isDrawing = false;
});

const applyColor = (item) => {
  if (eraserMode) {
    item.style.backgroundColor = "white";
  } else {
    item.style.backgroundColor = rainbowMode ? getRandomColor() : color;
  }
};

createGrid(size);
