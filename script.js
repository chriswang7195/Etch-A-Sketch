const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const SPEED = 3;
let x = canvas.width / 2;
let y = canvas.height / 2;
let pressedKeys = [];

function validKey(key) {
  return ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Delete'].includes(key);
}

function applyHighlight() {
  let element = document.querySelector(`.${event.key.toLowerCase()}`);

  if (validKey(event.key) && !element.classList.contains('highlight')) {
    element.classList.add('highlight');
  }
}

function removeHighlight() {
  let element = document.querySelector(`.${event.key.toLowerCase()}`);

  if (validKey(event.key) && element.classList.contains('highlight')) {
    element.classList.remove('highlight'); 
  }
}

function handleOutOfBounds() {
  if (x < SPEED) {
    x = SPEED;
  } else if (x > canvas.width - SPEED) {
    x = canvas.width - SPEED;
  }

  if (y < SPEED) {
    y = SPEED;
  } else if (y > canvas.height - SPEED) {
    y = canvas.height - SPEED;
  }  
}

function handleArrowKeys(key) {
  switch(key) {
    case 'ArrowUp':
      y -= SPEED;
      break;
    case 'ArrowDown':
      y += SPEED;
      break; 
    case 'ArrowLeft':
      x -= SPEED;
      break;
    case 'ArrowRight':
      x += SPEED;
      break;       
  }
}

function beginDrawing() {
  x = canvas.width / 2;
  y = canvas.height / 2;
  ctx.beginPath();
  ctx.moveTo(x, y);  
}

beginDrawing();

document.addEventListener('keydown', (event) => {
  if (event.key === 'Delete') {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    beginDrawing();
  }

  applyHighlight();

  if (validKey(event.key) && !pressedKeys.includes(event.key)) {
    pressedKeys.push(event.key);
  }

  pressedKeys.forEach((key) => {handleArrowKeys(key)});

  handleOutOfBounds();

  ctx.lineTo(x, y);
  ctx.stroke();  
});

document.addEventListener('keyup', (event) => {
  removeHighlight();

  if (validKey(event.key)) {
    pressedKeys = pressedKeys.filter((key) => {return key !== event.key});
  }
});
