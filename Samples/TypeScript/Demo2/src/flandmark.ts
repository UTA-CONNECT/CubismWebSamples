// import nodejs bindings to native tensorflow,
// not required, but will speed up things drastically (python required)
// import '@tensorflow/tfjs-node';

// implements nodejs wrappers for HTMLCanvasElement, HTMLImageElement, ImageData
// import * as canvas from 'canvas';

import * as faceapi from 'face-api.js';

// patch nodejs environment, we need to provide an implementation of
// HTMLCanvasElement and HTMLImageElement, additionally an implementation
// of ImageData is required, in case you want to use the MTCNN
// const { Canvas, Image, ImageData } = canvas

export class FLandmark {

    canvas: HTMLCanvasElement;
    renderer: CanvasRenderingContext2D;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        console.log('[FLandmark] [constructor] canvas', canvas);
        // @ts-ignore
        // faceapi.env.monkeyPatch({ Canvas, Image, ImageData })
        this.renderer = this.canvas.getContext('2d');
    }

    init() {
        return faceapi.nets.faceLandmark68Net.loadFromUri('./models');
    }

    detectFace() {
        let currentImg = null;
        faceapi.fetchImage('https://miro.medium.com/max/1022/1*osGdB2BNMThhk1rTwo07JA.jpeg')
        .then((imgEle) => {
            currentImg = imgEle;
            console.log('currentImg', currentImg);
            return faceapi.detectFaceLandmarks(imgEle);
        })
        .then((landmarks) => {
            console.log('landmarks', landmarks);
            // faceapi.draw.drawLa

            const tmpCanvas = faceapi.createCanvasFromMedia(currentImg);
            this.canvas.width = tmpCanvas.width;
            this.canvas.height = tmpCanvas.height;
            this.renderer.clearRect(0, 0, this.canvas.width, this.canvas.height);
            // document.querySelector('body').appendChild(tmpCanvas);
            // @ts-ignore
            new faceapi.draw.DrawFaceLandmarks(landmarks, { drawLines: true }).draw(this.renderer);
        })
    }
}