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
    components: {
        MuiToolbar: {
            styleOverrides: {
                root: {
                    paddingRight: 0,
                    minHeight: 32,
                    paddingBottom: 5,
                    paddingTop: 5,
                    "@media (min-width: 600px)": {
                        paddingRight: 0,
                        minHeight: 32,
                    },
                },
            },
        },
    },
});

export const AppDarkTheme = createTheme(AppBaseTheme, {
    palette: {
        mode: "dark",
        primary: {
            main: "rgb(251, 255, 255)",
        },
        background: {
            default: "rgb(15, 23, 42)",
        },
        text: {
            primary: "rgb(251, 255, 255)",
        },
    },
    components: {
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: "rgb(143, 143, 143)",
                    "&.Mui-focused": {
                        color: "rgb(251, 255, 255)",
                    },
                },
            },
        },
        MuiList: {
            styleOverrides: {
                root: {
                    color: "rgb(251, 255, 255)",
                    backgroundColor: "rgb(15, 23, 42)",
                    "&.Mui-focused": {
                        color: "rgb(143, 143, 143)",
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    color: "rgb(251, 255, 255)",
                    backgroundColor: "rgb(15, 23, 42)",
                    boxShadow: "0px 2px 1px -1px rgba(251,255,255,0.2),0px 1px 1px 0px rgba(251,255,255,0.14),0px 1px 3px 0px rgba(251,255,255,0.12)",
                },
            },
        },
        MuiTable: {
            styleOverrides: {
                root: {
                    color: "rgb(251, 255, 255)",
                    backgroundColor: "rgb(15, 23, 42)",
                },
            },
        },
        MuiDialogContent: {
            styleOverrides: {
                root: {
                    color: "rgb(251, 255, 255)",
                    backgroundColor: "rgb(15, 23, 42)",
                },
            },
        },
        MuiDialogTitle: {
            styleOverrides: {
                root: {
                    color: "rgb(251, 255, 255)",
                    backgroundColor: "rgb(15, 23, 42)",
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    color: "rgb(251, 255, 255)",
                    backgroundColor: "rgb(15, 23, 42)",
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    color: "rgb(251, 255, 255)",
                    backgroundColor: "rgb(15, 23, 42)",
                },
            },
        },
    },
});

export const AppLightTheme = createTheme(AppBaseTheme, {
    palette: {
        mode: "light",
        primary: {
            main: "rgb(15, 23, 42)",
        },
        background: {
            default: "rgb(255, 255, 255)",
        },
        text: {
            primary: "rgb(15, 23, 42)",
        },
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    boxShadow: "0px 2px 1px -1px rgba(15,23,42,0.2),0px 1px 1px 0px rgba(15,23,42,0.14),0px 1px 3px 0px rgba(15,23,42,0.12)",
                },
            },
        },
    },
});
