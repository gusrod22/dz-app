// Function to generate a random number between min and max
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  // Function to randomize the grid layout
  function randomizeGridLayout() {
    const imageContainers = document.querySelectorAll('.image-container');
    
    imageContainers.forEach((container) => {
      container.style.gridRowEnd = 'span ' + getRandomInt(1, 2);
      container.style.gridColumnEnd = 'span ' + getRandomInt(1, 2);
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
  
  // Attach the randomizeGridLayout function to the scroll event of the image grid
  const imageGrid = document.querySelector('.image-grid');
  imageGrid.addEventListener('scroll', debounce(() => {
    randomizeGridLayout();
  }, 300));
  