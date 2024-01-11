
const keyDownFeedback = (targetElement, color, timeout) => {
  targetElement.style.color = color;
  targetElement.style.borderColor = color;
  setTimeout(() => {
    targetElement.style.color = '';
    targetElement.style.borderColor = '';
  }, timeout);
}

export default keyDownFeedback;
