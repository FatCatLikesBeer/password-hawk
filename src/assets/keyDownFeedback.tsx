const timeout = 200;

const keyDownFeedback = (targetElement: HTMLElement, color: string) => {
  targetElement.style.color = color;
  targetElement.style.borderColor = color;
  setTimeout(() => {
    targetElement.style.color = '';
    targetElement.style.borderColor = '';
  }, timeout);
}

export default keyDownFeedback;
