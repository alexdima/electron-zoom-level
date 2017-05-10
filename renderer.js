// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const electron = require('electron');
const webFrame = electron.webFrame;
const remote = electron.remote;

test('initial');

webFrame.setZoomLevel(5);
test('after setZoomLevel call');

setTimeout(function () {
    test('5s after setZoomLevel call');
    remote.getCurrentWindow().webContents.openDevTools();
}, 5000);

function test(msg) {
    console.log(`${msg} - zoom level ${webFrame.getZoomLevel()} - pixel ratio: ${computePixelRatio()} - width of 'a': ${measureText('a')}`);
}

function computePixelRatio() {
    let ctx = document.createElement('canvas').getContext('2d');
    let dpr = window.devicePixelRatio || 1;
    let bsr = ctx.webkitBackingStorePixelRatio ||
        ctx.mozBackingStorePixelRatio ||
        ctx.msBackingStorePixelRatio ||
        ctx.oBackingStorePixelRatio ||
        ctx.backingStorePixelRatio || 1;
    return dpr / bsr;
}

function measureText(chr) {
    const PRECISION = 8;

    let d = document.createElement('span');
    let str = chr;
    for (let i = 0; i < PRECISION; i++) {
        str = str + str;
    }
    d.appendChild(document.createTextNode(str));

    document.body.appendChild(d);
    const result = (d.offsetWidth / (1 << PRECISION));
    document.body.removeChild(d);

    return result;
}
