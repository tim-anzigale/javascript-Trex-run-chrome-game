document.addEventListener('DOMContentLoaded', () => {
  const dino = document.querySelector('.dino');
  const grid = document.querySelector('.grid');
  const body = document.querySelector('body');
  const alert = document.getElementById('alert');
  let isJumping = false;
  let gravity = 0.9;
  let isGameOver = false;

  function control(e) {
    if ((e.keyCode === 32) || (e.type === 'touchstart' && !isJumping && !isGameOver)) {
      isJumping = true;
      jump();
    }
  }

  document.addEventListener('keyup', control);

  // Use the ontouchstart property directly on the body element to handle touch events.
  body.ontouchstart = control;

  let position = 0;
  function jump() {
    let count = 0;
    let timerId = setInterval(function () {
      // Move down
      if (count === 15) {
        clearInterval(timerId);
        let downTimerId = setInterval(function () {
          if (count === 0) {
            clearInterval(downTimerId);
            isJumping = false;
          }
          position -= 5;
          count--;
          position = position * gravity;
          dino.style.bottom = position + 'px';
        }, 20);
      }

      // Move up
      position += 30;
      count++;
      position = position * gravity;
      dino.style.bottom = position + 'px';
    }, 20);
  }

  function generateObstacles() {
    let randomTime = Math.random() * 4000;
    let obstaclePosition = 1000;
    const obstacle = document.createElement('div');
    if (!isGameOver) obstacle.classList.add('obstacle');
    grid.appendChild(obstacle);
    obstacle.style.left = obstaclePosition + 'px';

    let timerId = setInterval(function () {
      if (obstaclePosition > 0 && obstaclePosition < 60 && position < 60) {
        clearInterval(timerId);
        alert.innerHTML = 'Game Over';
        isGameOver = true;

        // Remove all children
        body.removeChild(body.firstChild);
        while (grid.firstChild) {
          grid.removeChild(grid.lastChild);
        }
      }
      obstaclePosition -= 10;
      obstacle.style.left = obstaclePosition + 'px';
    }, 20);
    if (!isGameOver) setTimeout(generateObstacles, randomTime);
  }
  generateObstacles();
});
