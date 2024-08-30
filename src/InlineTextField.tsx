import { Box, TextField, Typography } from "@mui/material";

export interface IInlineTextFieldProps {
    step?: string;
    suffix?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    defaultValue?: string;
}

export const InlineTextField = ({ step, suffix, onChange, defaultValue }: IInlineTextFieldProps) => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                width: "75px",
            }}
        >
            <TextField
                variant="standard"
                type="number"
                inputProps={{
                    step: step ?? "1",
                    style: { textAlign: "right" },
                }}
                defaultValue={defaultValue}
                sx={{ width: "auto" }}
                size="small"
                onChange={onChange}
            />
            {suffix && <Typography>{suffix}</Typography>}
        </Box>
    );
};
