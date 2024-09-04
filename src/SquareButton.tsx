import { Button, ButtonProps } from "@mui/material";

export interface ISquareButtonProps {
    sizePx?: number;
}

export type SquareButtonProps = ButtonProps & ISquareButtonProps;
export const SquareButton = ({ children, sizePx = 30, sx, ...rest }: SquareButtonProps) => {
    return (
        <Button {...rest} sx={{ maxWidth: `${sizePx}px`, maxHeight: `${sizePx}px`, minWidth: `${sizePx}px`, minHeight: `${sizePx}px`, ...sx }}>
            {children}
        </Button>
    );
};
