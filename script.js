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

function createRectangle(context, x, y, width, height) {
    const topX = x - (width / 2);
    const topY = y - (height / 2);
    context.beginPath();
    context.rect(topX, topY, width, height);
    context.stroke();
    return context;
}

function createBottomFixedRectangle(context, bottomX, bottomY, width, height) {
    const middleX = bottomX;
    const middleY = bottomY - (height / 2);
    createRectangle(context, middleX, middleY, width, height);
    return context;
}

function createFFT(context, numFFT, padding) {
    const canvas = context.canvas;

    const DEFAULT_MARGIN = 10;
    const DEFAULT_HEIGHT = 100;

    for(let i = 0; i < numFFT; i++) {
        const barWidth = (canvas.width / numFFT) - padding;
        const bottomX = i * (barWidth + padding) + ((barWidth + padding) / 2)
        const bottomY = canvas.height - DEFAULT_MARGIN;
        createBottomFixedRectangle(context, bottomX, bottomY, barWidth, DEFAULT_HEIGHT);
    }
}

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

canvas.width = 500;
canvas.height = 500;

createFFT(ctx, 10, 10);