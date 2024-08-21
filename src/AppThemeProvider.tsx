import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline, Theme } from "@mui/material";
import { PropsWithChildren } from "react";

const darkTheme = createTheme({
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
});

const lightTheme = createTheme({
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

export enum ThemeMode {
    Light,
    Dark,
    System,
}

export interface IAppThemeProviderProps {
    mode: ThemeMode;
}

export const AppThemeProvider = ({
    children,
    mode,
}: PropsWithChildren<IAppThemeProviderProps>) => {
    return (
        <ThemeProvider
            theme={(theme: Theme) => {
                if (mode === ThemeMode.Dark) {
                    return createTheme({ ...theme, ...darkTheme });
                } else {
                    return createTheme({ ...theme, ...lightTheme });
                }
            }}
        >
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
};
