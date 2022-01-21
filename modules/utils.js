let c;
window.onload = () => {
    c = document.getElementById("canvas").getContext("2d");
};

let useBackups = false;
let backups;

export function useBackupFonts(backupFontsList) {
    useBackups = true;
    backups = backupFontsList;
}

export function text(str, x, y, styles = {}) {
    let cl = styles.color || "#ccc"; //fallback styles if none are provided
    let sz = styles.size || 22;
    let f;
    if (useBackups) {
        f = backups[styles.font] || "Teko, sans-serif";
    } else {
        f = styles.font || "Teko, sans-serif";
    }
    let w = styles.weight || "400";
    let a = styles.align || "center";
    let st = styles.style || "normal";
    let v = styles.variant || "normal";
    let mw = styles.maxwidth || "500";
    let bl = styles.baseline || "middle";
    c.font = st + " " + v + " " + w + " " + sz + "px " + f;
    c.textAlign = a;
    c.fillStyle = cl;
    c.textBaseline = bl;
    let lines = getLines(str, mw);
    lines.forEach(function (line, lineNum) {
        c.fillText(line, x, y + lineNum * sz);
    });
}

export function getLines(text, maxWidth) {
    //splits given string into an array of strings representing lines of text that fit into a given width
    let string = `${text}`;
    let words = string.split(" ");
    let lines = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
        let word = words[i];
        let width = c.measureText(currentLine + " " + word).width;
        if (width < maxWidth) {
            currentLine += " " + word;
        } else {
            lines.push(currentLine);
            currentLine = word;
        }
    }
    lines.push(currentLine);
    return lines;
}

export function progressBar(x, y, data, min, max, options = {}) {
    let width = options.width || 120;
    let height = options.height || 20;
    let startColor = options.startColor || 0;
    let endColor = options.endColor || 100;
}

export function roundedRect(c, x, y, width, height, options = {}) {
    let stroke = options.stroke || false;
    let fill = options.fill || true;
    let strokeStyle = options.strokeStyle || "#888";
    let fillStyle = options.fillStyle || "#fff8";
    let lineWidth = options.lineWidth || 2;
    let borderRadius = options.borderRadius || 5;

    if (typeof borderRadius === "number") {
        borderRadius = {
            tl: borderRadius,
            tr: borderRadius,
            br: borderRadius,
            bl: borderRadius,
        };
    } else {
        let defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 };
        for (let side in defaultRadius) {
            borderRadius[side] = borderRadius[side] || defaultRadius[side];
        }
    }

    c.beginPath();
    c.lineWidth = lineWidth;
    c.fillStyle = fillStyle;
    c.strokeStyle = strokeStyle;
    c.moveTo(x + borderRadius.tl, y);
    c.lineTo(x + width - borderRadius.tr, y);
    c.quadraticCurveTo(x + width, y, x + width, y + borderRadius.tr);
    c.lineTo(x + width, y + height - borderRadius.br);
    c.quadraticCurveTo(
        x + width,
        y + height,
        x + width - borderRadius.br,
        y + height
    );
    c.lineTo(x + borderRadius.bl, y + height);
    c.quadraticCurveTo(x, y + height, x, y + height - borderRadius.bl);
    c.lineTo(x, y + borderRadius.tl);
    c.quadraticCurveTo(x, y, x + borderRadius.tl, y);
    c.closePath();
    if (fill) c.fill();
    if (stroke) c.stroke();
}

export let units = {
    xmax: 0,
    ymax: 0,
    toRad: function (degrees) {
        let radians = (degrees * Math.PI) / 180;
        return radians;
    },
    toDeg: function (radians) {
        let degrees = radians / (Math.PI / 180);
        return degrees;
    },
    distance: function (x1, y1, x2, y2) {
        return Math.hypot(x1 - x2, y1 - y2);
    },
    direction: function (x1, y1, x2, y2) {
        let xDist = units.distance(x1, 0, x2, 0);
        let yDist = units.distance(0, y1, 0, y2);
        let angle = 0;
        if ((x1 > x2 && y1 > y2) || (x1 < x2 && y1 < y2)) {
            angle = Math.atan(xDist / yDist);
        } else {
            angle = Math.atan(yDist / xDist);
        }
        if (x1 > x2) {
            if (y1 > y2) {
                angle = Math.PI * 2 - angle;
            } else {
                angle = Math.PI * 1.5 - angle;
            }
        } else {
            if (y1 > y2) {
                angle = Math.PI / 2 - angle;
            } else {
                angle = Math.PI - angle;
            }
        }
        return angle;
    },
};
