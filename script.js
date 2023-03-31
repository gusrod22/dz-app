const video = document.querySelector('video');
  const start = 0; // Start time in seconds
  const duration = 3; // Duration of the loop in seconds

  video.addEventListener('loadedmetadata', () => {
    video.currentTime = start;
  });

  video.addEventListener('timeupdate', () => {
    if (video.currentTime >= start + duration) {
      video.currentTime = start;
    }
  });