// Function to generate a random number between min and max
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  // Function to randomize the grid layout
  function randomizeGridLayout() {
    const layouts = [
      ['1 / 1 / 3 / 2', '1 / 2 / 2 / 3', '2 / 2 / 3 / 3', '3 / 1 / 4 / 3'],
      ['1 / 1 / 2 / 2', '2 / 1 / 3 / 2', '1 / 2 / 2 / 3', '2 / 2 / 4 / 3'],
      ['1 / 1 / 2 / 3', '2 / 1 / 3 / 2', '3 / 1 / 4 / 2', '2 / 2 / 4 / 3'],
    ];
  
    const randomLayout = layouts[getRandomInt(0, layouts.length - 1)];
    const imageContainers = document.querySelectorAll('.image-container');
  
    imageContainers.forEach((container, index) => {
      container.style.gridArea = randomLayout[index];
    });
  }
  
  // Debounce function
  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  }
  
  // Attach the randomizeGridLayout function to the wheel event of the image grid
  const imageGrid = document.querySelector('.image-grid');
  imageGrid.addEventListener('wheel', (event) => {
    event.preventDefault(); // Add this line to prevent the main scrollbar from scrolling
    randomizeGridLayout();
  });
  
  // Add smooth transition between layouts
  const imageContainers = document.querySelectorAll('.image-container');
  imageContainers.forEach((container) => {
    container.style.transition = 'all 0.5s ease';
  });
  