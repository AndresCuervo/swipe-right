let canvas, context;
let textarea = document.querySelector('#code')
let ui = document.querySelector('#ui')
let downloadButton = document.createElement('a')
// Font size 25 allows for ~40 line
const fontSize = '28'
const lineHeight = fontSize * 1.2
const marginOffset = { x: 25, y: 100 }
let   swipeRightTopMargin = 50;
const swipeText = "⇢ swipe right ⇢"
const swipeTextCount = swipeText.length
const swipeRightFontSize = fontSize * 3
const halfCenterText = swipeRightFontSize * swipeTextCount * 0.33
const canvasDimensions = {
    width: 1080,
    height: 1080
}

function setup() {
    canvas = document.createElement('canvas')
    context = canvas.getContext('2d');

    document.body.appendChild(canvas)
    canvas.style = "display: inline-block;"
    canvas.width = canvasDimensions.width;
    canvas.height = canvasDimensions.height;

    downloadButton.id = "downloadButton"
    downloadButton.innerText = "DOWNLOAD"
    ui.appendChild(downloadButton)

    // Create slider, label, and event listener to update
    const topMarginSlider = document.createElement('input');
    topMarginSlider.type = "range";
    topMarginSlider.name = "topMargin";
    topMarginSlider.min = "0";
    topMarginSlider.max = canvasDimensions.height;
    topMarginSlider.step = "0.1";

    const topMarginSliderLabel = document.createElement('label')
    topMarginSliderLabel.for = 'topMargin'
    topMarginSliderLabel.innerText = 'top margin'

    ui.appendChild(topMarginSlider);
    ui.appendChild(topMarginSliderLabel);

    topMarginSlider.addEventListener('input', event => {
        console.log(event.target.value)
        swipeRightTopMargin = Number(event.target.value);
    })

    const scaleSlider = document.createElement('input');
    scaleSlider.type = "range";
    scaleSlider.name = "scale";
    scaleSlider.min = 0;
    scaleSlider.max = 1;
    scaleSlider.step = "0.001";

    const scaleSliderLabel = document.createElement('label')
    scaleSliderLabel.for = 'canvas-scale'
    scaleSliderLabel.innerText = 'canvas scale'

    ui.appendChild(scaleSlider);
    ui.appendChild(scaleSliderLabel);

    scaleSlider.addEventListener('input', event => {
        console.log(event.target.value)
        const newScale = Number(event.target.value);
        canvas.setAttribute('style', `transform: scale(${newScale}, ${newScale})`)
    })
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
