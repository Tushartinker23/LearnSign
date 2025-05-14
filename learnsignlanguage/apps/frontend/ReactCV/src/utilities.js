const labelMap = {
    1: { name: 'A', color: 'red' },
    2: { name: 'B', color: 'yellow' },
    3: { name: 'C', color: 'lime' },
    4: { name: 'D', color: 'blue' },
    5: { name: 'E', color: 'purple' },
    6: { name: 'F', color: 'maroon' },
    7: { name: 'G', color: 'fuchsia' },
    8: { name: 'H', color: 'green' },
    9: { name: 'I', color: 'olive' },
    10: { name: 'K', color: 'navy' },
    11: { name: 'L', color: 'aqua' },
    12: { name: 'M', color: 'orange' },
    13: { name: 'N', color: 'antiquewhite' },
    14: { name: 'O', color: 'chocolate' },
    15: { name: 'P', color: 'coral' },
    16: { name: 'Q', color: 'chartreuse' },
    17: { name: 'R', color: 'crimson' },
    18: { name: 'S', color: 'darkgoldenrod' },
    19: { name: 'T', color: 'darkgreen' },
    20: { name: 'U', color: 'deeppink' },
    21: { name: 'V', color: 'salmon' },
    22: { name: 'W', color: 'wheat' },
    23: { name: 'X', color: 'seashell' },
    24: { name: 'Y', color: 'lightslategray' },
}

export const drawRect = (boxes, classes, scores, threshold, imgWidth, imgHeight, ctx, target) => {

    for (let i = 0; i <= Math.min(5, boxes.length); i++) {
        if (boxes[i] && classes[i] && scores[i] > threshold) {
            const [y, x, height, width] = boxes[i]
            const text = classes[i]
            ctx.strokeStyle = labelMap[text]['color']
            ctx.lineWidth = 5
            ctx.fillStyle = 'white'
            ctx.font = '30px Poppins'
            ctx.beginPath()
            ctx.fillText(labelMap[text]['name'] + ' - ' + Math.round(scores[i] * 100) / 100, x * imgWidth, y * imgHeight - 10)
            ctx.rect(x * imgWidth, y * imgHeight, width * imgWidth / 2, height * imgHeight / 1.5);
            ctx.stroke()
            if (target && target.toUpperCase() === labelMap[text]['name'].toUpperCase()) {
                return true;
            };
        }
    }
    return false;
}