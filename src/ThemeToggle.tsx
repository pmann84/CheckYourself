import DarkModeIconOutlined from "@mui/icons-material/DarkModeOutlined";
import LightModeIconOutlined from "@mui/icons-material/LightModeOutlined";
import { useEffect, useState } from "react";
import { ThemeMode } from "./AppThemeProvider";
import { SquareButton } from "./SquareButton";

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
        <SquareButton onClick={handleTheme} disableRipple disableElevation>
            {theme === ThemeMode.Dark && <DarkModeIconOutlined color="primary" />}
            {theme === ThemeMode.Light && <LightModeIconOutlined />}
        </SquareButton>
    );
};
