import DarkModeIconOutlined from "@mui/icons-material/DarkModeOutlined";
import LightModeIconOutlined from "@mui/icons-material/LightModeOutlined";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { ThemeMode } from "./AppThemeProvider";

export interface IThemeToggleProps {
    onThemeChange: (mode: ThemeMode) => void;
}
export const ThemeToggle = ({ onThemeChange }: IThemeToggleProps) => {
    const [theme, setTheme] = useState<ThemeMode>(ThemeMode.Light);
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
        <Button
            onClick={handleTheme}
            size="small"
            disableRipple
            disableElevation
        >
            {theme === ThemeMode.Dark && (
                <DarkModeIconOutlined color="primary" />
            )}
            {theme === ThemeMode.Light && <LightModeIconOutlined />}
        </Button>
    );
};

export interface IMainToolbarProps {
    onThemeModeChange: (mode: ThemeMode) => void;
}
export const MainToolbar = ({ onThemeModeChange }: IMainToolbarProps) => {
    return (
        <AppBar position="static" color="transparent">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Check Yourself
                </Typography>
                <ThemeToggle onThemeChange={onThemeModeChange} />
            </Toolbar>
        </AppBar>
    );
};
