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
    return (
        <Box>
            <Typography>{`BMR: ${
                result.bmr ? result.bmr.toFixed() : "-"
            }`}</Typography>
            {[...result.tdee.keys()].map((af, i) => {
                const tdee = result.tdee.get(af);
                return (
                    <Typography key={i}>{`TDEE (${ActivityFactor[af]}): ${
                        tdee ? tdee.toFixed() : "-"
                    }`}</Typography>
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
        console.log(`Result recieved...`, result);
        setResult(result);
    };

    return (
        <AppThemeProvider mode={theme}>
            <Box sx={{ flexGrow: 1 }}>
                <MainToolbar
                    onThemeModeChange={(mode: ThemeMode) => setTheme(mode)}
                />
                <TDEECalculator onChange={onCalculate} />
                <ResultsDisplay result={result} />
            </Box>
        </AppThemeProvider>
    );
}

export default App;
