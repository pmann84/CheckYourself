import { AppBar, Toolbar, Typography } from "@mui/material";
import { ThemeMode } from "./AppThemeProvider";
import { InfoPanelButton } from "./InfoPanelButton";
import { ThemeToggle } from "./ThemeToggle";

export interface IMainToolbarProps {
    onThemeModeChange: (mode: ThemeMode) => void;
    initialThemeMode: ThemeMode;
}
export const MainToolbar = ({ onThemeModeChange, initialThemeMode }: IMainToolbarProps) => {
    return (
        <AppBar position="static" color="transparent">
            <Toolbar sx={{ minHeight: "32px" }}>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Check Yourself
                </Typography>
                <ThemeToggle onThemeChange={onThemeModeChange} initialThemeMode={initialThemeMode} />
                <InfoPanelButton />
            </Toolbar>
        </AppBar>
    );
};
