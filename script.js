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
  clone.style.position = 'absolute';
  return clone;
}

// Function to randomize the grid layout in the clone
function randomizeGridLayout(clone) {
  const layouts = [
    ["a", "b", "c", "d"],
    ["b", "a", "c", "d"],
    ["a", "c", "b", "d"],
    ["b", "c", "a", "d"],
    ["c", "a", "b", "d"],
    ["c", "b", "a", "d"],
  ];

  const randomLayout = layouts[getRandomInt(0, layouts.length - 1)];
  const imageContainers = clone.querySelectorAll(".image-container");

  imageContainers.forEach((imageContainer, index) => {
    imageContainer.style.gridArea = randomLayout[index];
  });
}

// Function to handle swipe up gesture and smoothly switch layouts
function handleSwipeUp(event, imageGrid) {
  const clone = cloneImageGrid(imageGrid);
  randomizeGridLayout(clone);
  imageGrid.parentNode.insertBefore(clone, imageGrid);

  imageGrid.style.transition = 'opacity 0.25s';
  imageGrid.style.opacity = 0;
  clone.style.transition = 'opacity 0.25s';
  clone.style.opacity = 1;

  setTimeout(() => {
    imageGrid.parentNode.removeChild(imageGrid);
  }, 250);
}

// Swipe gesture detection
let touchStartY;
const imageGrid = document.querySelector('.image-grid');

imageGrid.addEventListener('touchstart', (event) => {
  touchStartY = event.touches[0].clientY;
});

imageGrid.addEventListener('touchend', (event) => {
  const touchEndY = event.changedTouches[0].clientY;
  const deltaY = touchStartY - touchEndY;

  if (deltaY > 50) {
    handleSwipeUp(event, imageGrid);
  }
});

// Add this part to handle swipe gestures on desktop devices
imageGrid.addEventListener('mousedown', (event) => {
  touchStartY = event.clientY;
});

imageGrid.addEventListener('mouseup', (event) => {
  const touchEndY = event.clientY;
  const deltaY = touchStartY - touchEndY;

  if (deltaY > 50) {
    handleSwipeUp(event, imageGrid);
  }
});
