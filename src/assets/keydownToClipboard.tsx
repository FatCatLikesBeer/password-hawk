import keyDownFeedback from './keyDownFeedback.tsx'
// Takes an input, creates a new element, adds input to element,
// adds element to body, selects the element, copies it to the
// clipboard, then deletes said element.

const copyToClipboard = (source) => {
  const clipboardButton = document.getElementById('clipboard').firstChild;
  var textArea = document.createElement('textArea');
  textArea.setAttribute('name', 'clipboard');
  textArea.value = source;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand('copy');
  document.body.removeChild(textArea);
}

export default copyToClipboard;
