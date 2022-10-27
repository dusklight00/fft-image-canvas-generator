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

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

loadBackgroundImage(ctx, 'lime-cat.jpg');