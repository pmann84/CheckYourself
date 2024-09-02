import { Theme } from "@emotion/react";
import { SxProps, TextField } from "@mui/material";
import { InlineTextField } from "./InlineTextField";
import { useSmallScreenMediaQuery } from "./useSmallScreenMediaQuery";

export interface IResponsiveTextFieldProps {
    label: string;
    step?: string;
    smallScreenSuffix?: string;
    onChange?: (value: number) => void;
    defaultValue?: string;
    sx?: SxProps<Theme>;
}

export const ResponsiveTextField = ({ label, step, smallScreenSuffix, onChange, defaultValue, sx }: IResponsiveTextFieldProps) => {
    const isSmallScreen = useSmallScreenMediaQuery();

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (onChange) {
            const val = event.target.value;
            onChange(parseFloat(val));
        }
    };
    if (isSmallScreen) {
        return <InlineTextField defaultValue={defaultValue} onChange={onChangeHandler} suffix={smallScreenSuffix} />;
    } else {
        return (
            <TextField
                label={label}
                variant="outlined"
                sx={{
                    ...sx,
                }}
                type="number"
                inputProps={{
                    step: step ?? "1",
                }}
                onChange={onChangeHandler}
                defaultValue={defaultValue}
            />
        );
    }
};
