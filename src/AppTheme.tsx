import { createTheme } from "@mui/material";

const AppBaseTheme = createTheme({
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

export const AppDarkTheme = createTheme(AppBaseTheme, {
    palette: {
        mode: "dark",
        primary: {
            main: "#fbffff",
        },
        background: {
            default: "#0f172a",
        },
        text: {
            primary: "#fbffff",
        },
    },
    components: {
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: "#8f8f8f",
                },
                focused: {
                    color: "#fbffff",
                },
            },
        },
        MuiList: {
            styleOverrides: {
                root: {
                    color: "#fbffff",
                    backgroundColor: "#0f172a",
                },
                focused: {
                    color: "#8f8f8f",
                },
            },
        },
    },
});

export const AppLightTheme = createTheme(AppBaseTheme, {
    palette: {
        mode: "light",
        primary: {
            main: "#0f172a",
        },
        background: {
            default: "#ffffff",
        },
        text: {
            primary: "#0f172a",
        },
    },
});
