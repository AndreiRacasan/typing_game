const randomQuote = 'https://api.quotable.io/random';
const textElem = document.getElementById('text');
const inputElem = document.getElementById('input');
const timerElem = document.getElementById('timer');
let quoteLength = 0;

inputElem.addEventListener('input', () => {
  const arrQuote = textElem.querySelectorAll('span')
  const arrValue = inputElem.value.split('')

  let success = true
  arrQuote.forEach((letterSpan, index) => {
    const letter = arrValue[index]
    if (letter == null) {
      letterSpan.classList.remove('success')
      letterSpan.classList.remove('error')
      success = false
    } else if (letter === letterSpan.innerText) {
      letterSpan.classList.add('success')
      letterSpan.classList.remove('error')
    } else {
      letterSpan.classList.remove('success')
      letterSpan.classList.add('error')
      success = false
    }
  })

  if (success) {
    alert(`You typed ${quoteLength} characters in ${timerElem.innerText} seconds. Click OK to start again.`);
    nextQuote();
  }
});

function newQuote() {
  return fetch(randomQuote)
    .then(response => response.json())
    .then(data => data.content)
};

async function nextQuote() {
  const quote = await newQuote()
  quoteLength = quote.length;
  textElem.innerHTML = ''
  quote.split('').forEach(letter => {
    const letterSpan = document.createElement('span')
    letterSpan.innerText = letter
    textElem.appendChild(letterSpan)
  })
  inputElem.value = null
  newTime()
};

let sTime = 0;
function newTime() {
  timerElem.innerText = 0;
  sTime = new Date();
  setInterval(() => {
    timer.innerText = getTime()
  }, 1000);
};

function getTime() {
  return Math.floor((new Date() - sTime) / 1000)
};

nextQuote();