const container = document.querySelector("#grid-container");
const clearBtn = document.querySelector("#clear-button");
const colorPicker = document.querySelector("#color-picker");
const sizeBtn = document.querySelector("#size-slider");
const gridSize = document.querySelector("#grid-size");
const rainbowBtn = document.querySelector("#rainbow-button");

let size = 16;
let color = "#333333";
let isDrawing = false;
let rainbowMode = false;

// Оновлення розміру сітки при зміні слайдера
sizeBtn.addEventListener("input", () => {
  size = sizeBtn.value;
  gridSize.textContent = `${size} x ${size}`;
  createGrid(size);
});

// Увімкнення/вимкнення rainbow mode
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



// Оновлення кольору при виборі нового кольору
colorPicker.addEventListener("input", () => {
  color = colorPicker.value;
});

// Очищення сітки
clearBtn.addEventListener("click", () => {
  const gridItems = document.querySelectorAll(".grid-item");
  gridItems.forEach((item) => {
    item.style.backgroundColor = "white";
  });
});

// Функція для створення випадкового кольору
const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let randomColor = "#";
  for (let i = 0; i < 6; i++) {
    randomColor += letters[Math.floor(Math.random() * 16)];
  }
  return randomColor;
};

// Функція для створення сітки
const createGrid = (size) => {
  container.innerHTML = "";

  // Обчислюємо розмір кожного блоку в залежності від розміру сітки
  const blockSize = 640 / size;

  // Генеруємо блоки
  for (let i = 0; i < size * size; i++) {
    const div = document.createElement("div");
    div.classList.add("grid-item");
    div.style.backgroundColor = "white";
    div.style.width = `${blockSize}px`;
    div.style.height = `${blockSize}px`;
    container.appendChild(div);
  }

  // Додаємо події для малювання
  const gridItems = document.querySelectorAll(".grid-item");
  gridItems.forEach((item) => {
    item.addEventListener("mousedown", () => {
      isDrawing = true;
      item.style.backgroundColor = rainbowMode ? getRandomColor() : color;
    });

    item.addEventListener("mouseover", () => {
      if (isDrawing) {
        item.style.backgroundColor = rainbowMode ? getRandomColor() : color;
      }
    });
  });

  document.addEventListener("mouseup", () => {
    isDrawing = false;
  });
};

// Початкова генерація сітки
createGrid(size);
