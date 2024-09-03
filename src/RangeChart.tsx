import { Canvas, getCanvasSize } from "./Canvas";
import { Range, rangeLength } from "./Range";

export interface IRangeChartProps {
    categories: Range<number>[];
    colours: string[];
    value?: number;
    valueSelectorColour?: string;
    units?: string;
}

const drawTriangle = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    baseWidth: number,
    height: number,
    direction: "up" | "down" | "left" | "right",
    colour: string
) => {
    ctx.fillStyle = colour;
    ctx.beginPath();
    if (direction === "up" || direction === "down") {
        const multiplier = direction === "up" ? 1 : -1;
        ctx.moveTo(x, y);
        ctx.lineTo(x + baseWidth * 0.5, y + multiplier * height);
        ctx.lineTo(x - baseWidth * 0.5, y + multiplier * height);
    } else {
        const multiplier = direction === "left" ? 1 : -1;
        ctx.moveTo(x, y);
        ctx.lineTo(x + multiplier * height, y + baseWidth * 0.5);
        ctx.lineTo(x + multiplier * height, y - baseWidth * 0.5);
    }
    ctx.fill();
};

const drawText = (ctx: CanvasRenderingContext2D, text: string, x: number, y: number, color: string, alignment: "left" | "center" | "right") => {
    ctx.fillStyle = color;
    const textWidth = ctx.measureText(text).width;
    let cX = x;
    if (alignment === "center") {
        cX = x - textWidth * 0.5;
    } else if (alignment === "right") {
        cX = x - textWidth;
    }
    ctx.fillText(text, cX, y);
};

export const RangeChart = ({ categories, value, colours, valueSelectorColour, units }: IRangeChartProps) => {
    const chartHeight = 50;
    const draw = (ctx: CanvasRenderingContext2D, _frameCount: number) => {
        if (categories.length === 0) return;

        const x = 0;
        const barHeight = 10;
        const y = (chartHeight - barHeight) / 2;
        const width = getCanvasSize(ctx).width;
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
                drawText(ctx, `${category.min.toFixed(1)}${units ?? ""}`, cX, y + barHeight * 2, valueSelectorColour ?? "#000000", "center");
            }
            cX += cWidth;
        });

        // Markers
        const arrowHeight = 7;
        const valueText = `${value?.toFixed(1)}${units ?? ""}`;
        if (value && value > categories[categories.length - 1].max) {
            // Draw a triangle indicating that the value is off the side
            const aX = (categories[categories.length - 1].max - categories[0].min) * widthPerValue;
            const aY = y - 0.5 * arrowHeight;
            drawTriangle(ctx, aX, aY, arrowHeight, arrowHeight, "right", valueSelectorColour ?? "#000000");
            drawText(ctx, valueText, aX, aY - arrowHeight, valueSelectorColour ?? "#000000", "right");
        } else if (value && value < categories[0].min) {
            // Draw a triangle indicating that the value is off the side
            const aX = 0;
            const aY = y - 0.5 * arrowHeight;
            drawTriangle(ctx, aX, aY, arrowHeight, arrowHeight, "left", valueSelectorColour ?? "#000000");
            drawText(ctx, valueText, aX, aY - arrowHeight, valueSelectorColour ?? "#000000", "left");
        } else if (value) {
            const aX = (value - categories[0].min) * widthPerValue;
            const aY = y;
            drawTriangle(ctx, aX, aY, arrowHeight, arrowHeight, "down", valueSelectorColour ?? "#000000");
            drawText(ctx, valueText, aX, aY - arrowHeight * 1.5, valueSelectorColour ?? "#000000", "center");
        }
    };

    return <Canvas draw={draw} height={`${chartHeight}px`} />;
};
