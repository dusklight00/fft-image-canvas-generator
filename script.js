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

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

canvas.width = 500;
canvas.height = 500;

// loadBackgroundImage(ctx, 'lime-cat.jpg');

createBottomFixedRectangle(ctx, 100, 300, 100, 200)