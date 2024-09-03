import DarkModeIconOutlined from "@mui/icons-material/DarkModeOutlined";
import LightModeIconOutlined from "@mui/icons-material/LightModeOutlined";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { ThemeMode } from "./AppThemeProvider";

export interface IThemeToggleProps {
    onThemeChange: (mode: ThemeMode) => void;
    initialThemeMode: ThemeMode;
}
export const ThemeToggle = ({ onThemeChange, initialThemeMode }: IThemeToggleProps) => {
    const [theme, setTheme] = useState<ThemeMode>(initialThemeMode);
    const handleTheme = (_event: React.MouseEvent<HTMLElement>) => {
        setTheme((pt) => {
            if (pt === ThemeMode.Dark) {
                return ThemeMode.Light;
            } else {
                return ThemeMode.Dark;
            }
        });
    };

    useEffect(() => {
        onThemeChange(theme);
    }, [theme]);

    return (
        <Button onClick={handleTheme} size="small" disableRipple disableElevation>
            {theme === ThemeMode.Dark && <DarkModeIconOutlined color="primary" />}
            {theme === ThemeMode.Light && <LightModeIconOutlined />}
        </Button>
    );
};

export interface IMainToolbarProps {
    onThemeModeChange: (mode: ThemeMode) => void;
    initialThemeMode: ThemeMode;
}
export const MainToolbar = ({ onThemeModeChange, initialThemeMode }: IMainToolbarProps) => {
    return (
        <AppBar position="static" color="transparent" sx={{ paddingRight: "0" }}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Check Yourself
                </Typography>
                <ThemeToggle onThemeChange={onThemeModeChange} initialThemeMode={initialThemeMode} />
            </Toolbar>
        </AppBar>
    );
};
