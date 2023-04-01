// Function to generate a random number between min and max
// This function is used later to select a random layout for the new image-grid
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to create a clone of the image grid
// This function is used later to create a new image grid with a randomized layout
function cloneImageGrid(imageGrid) {
  const clone = imageGrid.cloneNode(true);
  clone.style.opacity = 0;
  // clone.style.position = 'absolute';
  return clone;
}

// Function to randomize the grid layout in the clone
// this function is used later to create a new image
let previousLayout;

function randomizeGridLayout(clone) {
  const layouts = [
    "'a b' 'a c' 'd d'",
    "'a b' 'a d' 'c d'",
    "'a b' 'c a' 'c d'",
    "'a a' 'b c' 'd d'",
    "'a a' 'c b' 'd d'",
    "'a a' 'c c' 'b d'",
    "'a b' 'c c' 'a d'",
    "'a b' 'c d' 'a c'",
    "'a b' 'c d' 'b c'",
    "'a c' 'a b' 'd d'",
    "'a c' 'a d' 'b d'",
    "'a c' 'b c' 'a d'",
    "'a d' 'a b' 'c d'",
    "'a d' 'b d' 'c c'",
    "'a d' 'c d' 'b c'",
  ];

  let randomLayout;
  do {
    randomLayout = layouts[getRandomInt(0, layouts.length - 1)];
  } while (randomLayout === clone.style.gridTemplateAreas);

  clone.style.gridTemplateAreas = randomLayout;
  addEventListeners(clone); // Add event listeners to the new grid
}


function addEventListeners(imageGrid) {
  imageGrid.addEventListener('touchstart', (event) => {
    touchStartY = event.touches[0].clientY;
  });

  imageGrid.addEventListener('touchend', (event) => {
    const touchEndY = event.changedTouches[0].clientY;
    const deltaY = touchStartY - touchEndY;

    if (deltaY > 20) {
      handleSwipeUp(event, imageGrid);
    }
  });

  imageGrid.addEventListener('touchmove', (event) => {
    event.preventDefault();
  });

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

  imageGrid.parentNode.removeChild(imageGrid);
}

let touchStartY;
const imageGrid = document.querySelector('.image-grid');
addEventListeners(imageGrid); // Add event listeners to the initial grid
