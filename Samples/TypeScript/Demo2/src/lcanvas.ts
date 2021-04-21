import { CubismFramework, Option } from '@framework/live2dcubismframework';
import { LogLevel } from '@framework/live2dcubismframework';

export class LCanvas {

    canvas: HTMLCanvasElement;
    gl: WebGLRenderingContext;

    cubismOption: Option;
    
    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
    }

    public init(): void {
        // @ts-ignore
        this.gl = this.canvas.getContext('webgl') || this.canvas.getContext('experimental-webgl');

        if (!this.gl) {
            console.error('[LCanvas] [init] gl not supported!');
        }
        console.log('[LCanvas] [init] gl ready');

        this.cubismOption = {
            logFunction: (msg) => {
                console.log(`[LCanvas] [init-logFunction] msg: ${msg}`);
            },
            loggingLevel: LogLevel.LogLevel_Verbose
        } as Option;

        CubismFramework.startUp(this.cubismOption);
        CubismFramework.initialize();
        console.log(`[LCanvas] [init] cubism startup`);
    }

    public run(): void {
        console.log(`[LCanvas] [init] cubism now running`);
        const renderer = () => {
            this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

            requestAnimationFrame(renderer);
        }
        renderer();
    }

    public dispose(): void {
        CubismFramework.dispose();
    }
}