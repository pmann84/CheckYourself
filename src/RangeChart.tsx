import { Canvas } from "./Canvas";
import { Range, rangeLength } from "./Range";

export interface IRangeChartProps {
    categories: Range<number>[];
    colours: string[];
    value?: number;
}

export const RangeChart = ({ categories, value, colours }: IRangeChartProps) => {
    const chartHeight = 35;
    const draw = (ctx: CanvasRenderingContext2D, _frameCount: number) => {
        if (categories.length === 0) return;

        const x = 0;
        const barHeight = 10;
        const y = (chartHeight - barHeight) / 2;
        const { devicePixelRatio: ratio = 1 } = window;
        const width = ctx.canvas.width / ratio;
        // Draw the outline
        // ctx.strokeStyle = "#000000";
        // ctx.beginPath();
        // ctx.roundRect(x, y, width, height, 2);
        // ctx.stroke();
        // Categories
        const range = categories[categories.length - 1].max - categories[0].min;
        const widthPerValue = width / range;
        let cX = x;
        categories.forEach((category, index) => {
            ctx.fillStyle = colours[index];
            ctx.beginPath();
            const cWidth = rangeLength(category) * widthPerValue;
            if (index === 0) {
                ctx.roundRect(cX, y, cWidth, barHeight, [5, 0, 0, 5]);
            } else if (index === categories.length - 1) {
                ctx.roundRect(cX, y, cWidth, barHeight, [0, 5, 5, 0]);
            } else {
                ctx.rect(cX, y, cWidth, barHeight);
            }
            ctx.fill();
            cX += cWidth;
        });

        if (value) {
            ctx.fillStyle = "#000000";
            const x = (value - categories[0].min) * widthPerValue;
            const arrowHeight = 10;
            const top = y + arrowHeight;
            const arrowBaseWidth = 10;
            ctx.beginPath();
            ctx.moveTo(x - arrowBaseWidth * 0.5, top - 20);
            ctx.lineTo(x + arrowBaseWidth * 0.5, top - 20);
            ctx.lineTo(x, top - 10);
            ctx.fill();
        }
    };

    return <Canvas draw={draw} height={`${chartHeight}px`} />;
};
