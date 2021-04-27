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
    rcanvas: HTMLCanvasElement;
    rrenderer: CanvasRenderingContext2D;
    video: HTMLVideoElement;

    constructor(canvas: HTMLCanvasElement, video: HTMLVideoElement) {
        this.canvas = canvas;
        this.video = video;
        console.log('[FLandmark] [constructor] canvas', canvas);
        // @ts-ignore
        // faceapi.env.monkeyPatch({ Canvas, Image, ImageData })
        this.renderer = this.canvas.getContext('2d');

        this.rcanvas = document.getElementById('rcanvas') as HTMLCanvasElement;
        this.rcanvas.width = 640;
        this.rcanvas.height = 360;
        this.rrenderer = this.rcanvas.getContext('2d');
    }

    init() {
        return faceapi.nets.faceLandmark68Net.loadFromUri('./models');
    }

    webcam() {

        if (navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: { width: 640, height: 360 }})
                .then((stream) => {
                    this.video.srcObject = stream;
                    this.video.onloadedmetadata = (e) => {
                        this.video.play();
                        this.draw();
                      };
                })
                .catch((err0r) => {
                    console.log("Something went wrong!", err0r);
                });
        }

    }

    draw() {
        requestAnimationFrame(() => {
            this.draw();
        });
        this.renderer.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.canvas.width = 640;
        this.canvas.height = 360;
        // console.log(`w: ${this.video.width} h: ${this.video.height}`);
        this.renderer.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
        // rrenderer.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
        this.detectFace(this.canvas.toDataURL(), this.rrenderer, this.video);
    }

    detectFace(src: string = 'https://miro.medium.com/max/1022/1*osGdB2BNMThhk1rTwo07JA.jpeg', renderer: CanvasRenderingContext2D = null, video: HTMLVideoElement = null) {
        let currentImg = null;
        faceapi.fetchImage(src)
        .then((imgEle) => {
            currentImg = imgEle;
            // console.log('currentImg', currentImg);
            return faceapi.detectFaceLandmarks(imgEle);
        })
        .then((landmarks) => {
            // faceapi.draw.drawLa

            const tmpCanvas = faceapi.createCanvasFromMedia(currentImg);
            // this.canvas.width = tmpCanvas.width;
            // this.canvas.height = tmpCanvas.height;
            // document.querySelector('body').appendChild(tmpCanvas);
            if (renderer) {
                console.log('landmarks', landmarks);
                renderer.clearRect(0, 0, this.rcanvas.width, this.rcanvas.height);
                // @ts-ignore
                new faceapi.draw.DrawFaceLandmarks(landmarks, { drawLines: true }).draw(renderer);
                if (video) {
                    renderer.globalAlpha = 0.4;
                    renderer.drawImage(this.video, 0, 0, this.rcanvas.width, this.rcanvas.height);
                    renderer.globalAlpha = 1;
                }
            }
        })
    }
}