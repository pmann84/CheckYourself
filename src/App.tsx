import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { AppThemeProvider, ThemeMode } from "./AppThemeProvider";
import { ActivityFactor } from "./CalorieUtils";
import { MainToolbar } from "./MainToolbar";
import { TDEECalculator, TDEEResults } from "./TDEECalculator";

export interface IResultsDisplayProps {
    result: TDEEResults;
}

export const ResultsDisplay = ({ result }: IResultsDisplayProps) => {
    const bottomMargin = 15;
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                padding: `${bottomMargin}px`,
            }}
        >
            <Typography>{`BMR: ${
                result.bmr ? result.bmr.toFixed() : "-"
            }`}</Typography>
            {[...result.tdee.keys()].map((af, i) => {
                const tdee = result.tdee.get(af);
                // TODO: Be aware that this depends on the fact that the order of the
                // keys in the map is the same as the enum is defined. Should probably
                // look for a way around this
                return (
                    <Typography key={i}>{`TDEE (${
                        Object.keys(ActivityFactor)[i]
                    }): ${tdee ? tdee.toFixed() : "-"}`}</Typography>
                );
            })}
        </Box>
    );
};

function App() {
    const [theme, setTheme] = useState(ThemeMode.Light);
    const [result, setResult] = useState<TDEEResults>({
        bmr: 0,
        tdee: new Map<ActivityFactor, number>(),
    });

    const onCalculate = (result: TDEEResults) => {
        // console.log(`Result recieved...`, result);
        setResult(result);
    };

    return (
        <AppThemeProvider mode={theme}>
            <Box sx={{ flexGrow: 1 }}>
                <MainToolbar
                    onThemeModeChange={(mode: ThemeMode) => setTheme(mode)}
                />
                <Box
                    sx={{
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "row",
                    }}
                >
                    <TDEECalculator onChange={onCalculate} />
                    <ResultsDisplay result={result} />
                </Box>
            </Box>
        </AppThemeProvider>
    );
}

export default App;
