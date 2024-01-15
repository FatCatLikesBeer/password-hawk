const timeout = 200;

const keyDownFeedback = (targetElement, color) => {
  targetElement.style.color = color;
  targetElement.style.borderColor = color;
  setTimeout(() => {
    targetElement.style.color = '';
    targetElement.style.borderColor = '';
  }, timeout);
}

export default keyDownFeedback;
