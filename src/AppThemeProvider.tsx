import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { PropsWithChildren } from "react";
import { AppDarkTheme, AppLightTheme } from "./AppTheme";

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
            theme={mode === ThemeMode.Dark ? AppDarkTheme : AppLightTheme}
        >
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
};
