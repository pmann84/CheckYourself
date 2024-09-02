import { useMediaQuery, useTheme } from "@mui/material";

export const useSmallScreenMediaQuery = (): boolean => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    return isSmallScreen;
};
