import { Canvas } from "./Canvas";
import { Range, rangeLength } from "./Range";

export interface IRangeChartProps {
    categories: Range<number>[];
    colours: string[];
    value?: number;
    valueSelectorColour?: string;
}

const drawTriangle = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    baseWidth: number,
    height: number,
    direction: "up" | "down",
    colour: string
) => {
    ctx.fillStyle = colour;
    const multiplier = direction === "up" ? 1 : -1;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + baseWidth * 0.5, y + multiplier * height);
    ctx.lineTo(x - baseWidth * 0.5, y + multiplier * height);
    ctx.fill();
};

export const RangeChart = ({ categories, value, colours, valueSelectorColour }: IRangeChartProps) => {
    const chartHeight = 35;
    const draw = (ctx: CanvasRenderingContext2D, _frameCount: number) => {
        if (categories.length === 0) return;

        if (value && value > categories[categories.length - 1].max) categories[categories.length - 1].max = value * (1.0 + 0.25);
        if (value && value < categories[0].min) categories[0].min = value * (1.0 - 0.25);
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
            if (index !== 0) {
                ctx.fillStyle = valueSelectorColour ?? "#000000";
                const text = category.min.toFixed(1);
                const textWidth = ctx.measureText(text).width;
                ctx.fillText(category.min.toFixed(1), cX - textWidth * 0.5, y + barHeight * 2);
            }
            cX += cWidth;
        });

        if (value) {
            const arrowHeight = 7;
            const aX = (value - categories[0].min) * widthPerValue;
            const aY = y;
            drawTriangle(ctx, aX, aY, arrowHeight, arrowHeight, "down", valueSelectorColour ?? "#000000");
        }
    };

    return <Canvas draw={draw} height={`${chartHeight}px`} />;
};
