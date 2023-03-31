// Function to generate a random number between min and max
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to create a clone of the image grid
function cloneImageGrid(imageGrid) {
  const clone = imageGrid.cloneNode(true);
  clone.style.opacity = 0;
  clone.style.position = "absolute";
  return clone;
}

// Function to randomize the grid layout in the clone
function randomizeGridLayout(clone) {
  const layouts = [
    [
      "1 / 1 / span 2 / span 2",
      "1 / 3 / span 1 / span 1",
      "2 / 3 / span 1 / span 1",
      "3 / 1 / span 1 / span 3",
    ],
    [
      "1 / 1 / span 1 / span 2",
      "2 / 1 / span 1 / span 2",
      "1 / 3 / span 1 / span 1",
      "2 / 3 / span 2 / span 1",
    ],
    [
      "1 / 1 / span 1 / span 3",
      "2 / 1 / span 1 / span 1",
      "3 / 1 / span 1 / span 1",
      "2 / 2 / span 2 / span 1",
    ],
  ];

  const randomLayout = layouts[getRandomInt(0, layouts.length - 1)];
  const imageContainers = clone.querySelectorAll(".image-container");

  imageContainers.forEach((container, index) => {
    container.style.gridArea = randomLayout[index];
  });
}

// Function to handle swipe up gesture and smoothly switch layouts
function handleSwipeUp(event, imageGrid) {
  const clone = cloneImageGrid(imageGrid);
  randomizeGridLayout(clone);
  imageGrid.parentNode.insertBefore(clone, imageGrid);

  imageGrid.style.transition = "opacity 0.25s";
  imageGrid.style.opacity = 0;
  clone.style.transition = "opacity 0.25s";
  clone.style.opacity = 1;

  setTimeout(() => {
    imageGrid.parentNode.removeChild(imageGrid);
  }, 250);
}

// Swipe gesture detection
let touchStartY;
const imageGrid = document.querySelector(".image-grid");

imageGrid.addEventListener("touchstart", (event) => {
  touchStartY = event.touches[0].clientY;
});

imageGrid.addEventListener("touchend", (event) => {
  const touchEndY = event.changedTouches[0].clientY;
  const deltaY = touchStartY - touchEndY;

  if (deltaY > 50) {
    handleSwipeUp(event, imageGrid);
  }
});
