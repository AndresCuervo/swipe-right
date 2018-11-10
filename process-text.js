let canvas, context;
let textarea = document.querySelector('#code')
let ui = document.querySelector('#ui')
let downloadButton = document.createElement('a')
// Font size 25 allows for ~40 line
const fontSize = '28'
const lineHeight = fontSize * 1.2
const marginOffset = { x: 25, y: 100 }
const swipeRightTopMargin = 200;
const swipeText = "⇢ swipe right ⇢"
const swipeTextCount = swipeText.length
const swipeRightFontSize = fontSize * 3
const halfCenterText = swipeRightFontSize * swipeTextCount * 0.33

function setup() {
    canvas = document.createElement('canvas')
    context = canvas.getContext('2d');

    document.body.appendChild(canvas)
    canvas.style = "display: inline-block;"
    canvas.width = '1080'
    canvas.height = '1080'

    downloadButton.id = "downloadButton"
    downloadButton.innerText = "DOWNLOAD"
    ui.appendChild(downloadButton)
}

function processText() {
    window.requestAnimationFrame(processText)
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = '#2EAFAC';
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.font = `${fontSize}px monospace`;
    context.fillStyle = 'black';
    const lines = textarea.value.split('\n')
    for (i in lines) {
        context.fillText(lines[i], marginOffset.x, marginOffset.y + (lineHeight* i));
    }

    context.font = `${swipeRightFontSize}px monospace`;
    context.fillText(swipeText, (canvas.width * 0.5) - halfCenterText, swipeRightTopMargin + marginOffset.y + (lineHeight* i + lineHeight));

    const dateObject = new Date();
    const month = dateObject.getUTCMonth() + 1; //months from 1-12
    const day = dateObject.getUTCDate();
    const year = dateObject.getUTCFullYear();
    const milliseconds = dateObject.getMilliseconds()
    downloadButton.download = `swipe-right-${year}-${month}-${day}-${milliseconds}.png`;
    downloadButton.href = canvas.toDataURL();
}

setup()
processText()
