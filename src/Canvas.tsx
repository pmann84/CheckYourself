import { useCanvas } from "./useCanvas";

export const getCanvasSize = (context: CanvasRenderingContext2D): { width: number; height: number } => {
    const { devicePixelRatio: ratio = 1 } = window;
    return { width: context.canvas.width / ratio, height: context.canvas.height / ratio };
};

const resizeCanvas = (context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const { width, height } = canvas.getBoundingClientRect();

    if (canvas.width !== width || canvas.height !== height) {
        const { devicePixelRatio: ratio = 1 } = window;
        canvas.width = width * ratio;
        canvas.height = height * ratio;
        context.scale(ratio, ratio);
        return true;
    }

    return false;
};

const predraw = (context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    context.save();
    resizeCanvas(context, canvas);
    const { width, height } = context.canvas;
    context.clearRect(0, 0, width, height);
};
const postDraw = (context: CanvasRenderingContext2D, _canvas: HTMLCanvasElement) => {
    context.restore();
};

export interface ICanvasProps {
    draw: (ctx: CanvasRenderingContext2D, frameCount: number) => void;
    height?: string;
    onMouseMove?: React.MouseEventHandler<HTMLCanvasElement>;
}

export const Canvas = ({ draw, height, onMouseMove }: ICanvasProps) => {
    const canvasRef = useCanvas(draw, predraw, postDraw);

    return <canvas ref={canvasRef} style={{ width: "100%", height: height ?? "100%" }} onMouseMove={onMouseMove} />;
};
