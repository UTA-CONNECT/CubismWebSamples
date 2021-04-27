import {LCanvas} from './lcanvas';
import {FLandmark} from './flandmark';

window.onload = () => {
    console.log('hell');
    
    let canvas: HTMLElement = document.getElementById('canvas');
    let lcanvas = new LCanvas(canvas as HTMLCanvasElement);
    lcanvas.init();

    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    window.addEventListener('resize', () => {
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;
    })

    lcanvas.run();

    let flandmark = new FLandmark(document.getElementById('fcanvas') as HTMLCanvasElement, document.getElementById('webcam') as HTMLVideoElement);
    flandmark.webcam();
    flandmark.init()
    .then(() => {
        flandmark.detectFace();
    });
}