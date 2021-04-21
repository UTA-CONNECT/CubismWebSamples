import {LCanvas} from './lcanvas';


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
}