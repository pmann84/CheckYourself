import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline } from "@mui/material";
import { PropsWithChildren } from "react";

const baseTheme = createTheme({
    typography: {
        fontFamily: [
            '"Inter var"',
            "ui-sans-serif",
            "system-ui",
            "sans-serif",
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
            '"Noto Color Emoji"',
        ].join(","),
    },
});

export const BaseThemeProvider = ({ children }: PropsWithChildren) => {
    return (
        <ThemeProvider theme={baseTheme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
};
