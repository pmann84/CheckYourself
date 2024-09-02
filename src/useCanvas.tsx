import { useEffect, useRef } from "react";

export const useCanvas = (
    draw: (ctx: CanvasRenderingContext2D, frameCount: number) => void,
    preDraw?: (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => void,
    postDraw?: (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => void
) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) throw new Error("Cannot get canvas reference");
        const context = canvas.getContext("2d");
        if (!context) throw new Error("Cannot get canvas context");
        let frameCount = 0;
        let animationFrameId: number;

        //Our draw came here
        const render = () => {
            frameCount++;
            if (preDraw) preDraw(context, canvas);
            draw(context, frameCount);
            if (postDraw) postDraw(context, canvas);
            animationFrameId = window.requestAnimationFrame(render);
        };
        render();

        return () => {
            window.cancelAnimationFrame(animationFrameId);
        };
    }, [draw]);

    return canvasRef;
};
