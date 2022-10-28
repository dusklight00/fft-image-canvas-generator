function loadImage(context, imgPath, config) {
    const x = config.x
    const y = config.y
    const width = config.width;
    const height = config.height;
    const image = new Image();
    image.src = imgPath;
    image.onload = function() {
        context.drawImage(image, x, y, width, height);
    }

    return context;
}

function loadBackgroundImage(context, imgPath) {
    const canvas = context.canvas;
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    loadImage(context, imgPath, {
        x: 0,
        y: 0,
        width: canvasWidth,
        height: canvasHeight,
    })
}

function createRoundRectangleTopLeftAnchor(context, x, y, width, height, radius) {
    if (width < (2 * radius)) radius = width / 2;
    if (height < (2 * radius)) radius = height / 2;
    context.beginPath();
    context.moveTo(x + radius, y);
    context.arcTo(x + width, y, x + width, y + height, radius);
    context.arcTo(x + width, y + height, x, y + height, radius);
    context.arcTo(x, y + height, x, y, radius);
    context.arcTo(x, y, x + width, y, radius);
    context.closePath();
    return context;
}

function createRectangle(context, x, y, width, height) {
    const topX = x - (width / 2);
    const topY = y - (height / 2);
    context.beginPath();
    context.rect(topX, topY, width, height);
    context.stroke();
    return context;
}

function createRoundRectangle(context, x, y, width, height, radius) {
    const topX = x - (width / 2);
    const topY = y - (height / 2);
    createBottomFixedRectangle(context, topX, topY, width, height, radius);
    return context;
}

function createBottomFixedRectangle(context, bottomX, bottomY, width, height) {
    const middleX = bottomX;
    const middleY = bottomY - (height / 2);
    createRectangle(context, middleX, middleY, width, height);
    return context;
}

function createBottomFixedRoundRectangle(context, bottomX, bottomY, width, height) {
    const middleX = bottomX;
    const middleY = bottomY - (height / 2);
    createRoundRectangle(context, middleX, middleY, width, height);
    return context;
}

function createFFT(context, arrFFT) {  
    const numFFT = arrFFT.length;
    const canvas = context.canvas;

    const DEFAULT_MARGIN = 10;
    const DEFAULT_PADDING = 10;
    const DEFAULT_FFT_PARTION = 0.5;

    for(let i = 0; i < numFFT; i++) {
        const barValue = arrFFT[i];
        const maxValue = Math.max(...arrFFT);
        const maxHeight = (canvas.height - (2 * DEFAULT_MARGIN)) * DEFAULT_FFT_PARTION
        const barDisplayHeight = (barValue / maxValue) * maxHeight;
        const barWidth = (canvas.width / numFFT) - DEFAULT_PADDING;
        const bottomX = i * (barWidth + DEFAULT_PADDING) + ((barWidth + DEFAULT_PADDING) / 2)
        const bottomY = canvas.height - DEFAULT_MARGIN;
        createBottomFixedRectangle(context, bottomX, bottomY, barWidth, barDisplayHeight);
    }
}

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

canvas.width = 500;
canvas.height = 500;

const arrFFT = [10, 20, 10, 20, 30, 50, 4, 1];

createFFT(ctx, arrFFT)