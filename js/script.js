const container = document.querySelector("#grid-container");
const clearBtn = document.querySelector("#clear-button");
const colorBtn = document.querySelector("#color-picker");
const sizeBtn = document.querySelector("#grid-size-slider");
const gridSize = document.querySelector("#grid-size");

let size = 16;  // Початковий розмір сітки
let color = "#333333";
let isDrawing = false;

// Оновлення розміру сітки при зміні слайдера
sizeBtn.addEventListener("input", () => {
  size = sizeBtn.value;
  gridSize.textContent = `${size} x ${size}`;
  createGrid(size);  // Перегенеровуємо сітку
});

colorBtn.addEventListener("input", () => {
  color = colorBtn.value;
});

clearBtn.addEventListener("click", () => {
  const gridItems = document.querySelectorAll(".grid-item");
  gridItems.forEach((item) => {
    item.style.backgroundColor = "white";
  });
});

// Функція для створення сітки
const createGrid = (size) => {
  container.innerHTML = '';

  // Обчислюємо розмір кожного блоку в залежності від розміру сітки
  const blockSize = 640 / size;

  // Генеруємо блоки
  for (let i = 0; i < size * size; i++) {
    const div = document.createElement("div");
    div.classList.add("grid-item");
    div.style.width = `${blockSize}px`;
    div.style.height = `${blockSize}px`;
    container.appendChild(div);
  }

  // Додаємо події для малювання
  const gridItems = document.querySelectorAll(".grid-item");
  gridItems.forEach((item) => {
    item.addEventListener("mousedown", () => {
      isDrawing = true;
      item.style.backgroundColor = color;
    });

    item.addEventListener("mouseover", () => {
      if (isDrawing) {
        item.style.backgroundColor = color;
      }
    });
  });

  document.addEventListener("mouseup", () => {
    isDrawing = false;
  });
};

// Початкова генерація сітки
createGrid(size);
