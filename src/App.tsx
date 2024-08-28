import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { AppThemeProvider, ThemeMode } from "./AppThemeProvider";
import { CalorieDisplayCard } from "./CalorieDisplayCard";
import { ActivityFactor } from "./CalorieUtils";
import { IdealWeightDisplay } from "./IdealWeightDisplay";
import { MainToolbar } from "./MainToolbar";
import { DefaultInputParams, TDEECalculator, TDEEResults } from "./TDEECalculator";
import { TDEEResultsTable } from "./TDEEResultsTable";

export interface IResultsDisplayProps {
    result: TDEEResults;
}

// TODO: BMI
export const ResultsDisplay = ({ result }: IResultsDisplayProps) => {
    const bottomMargin = 10;
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                padding: `${bottomMargin}px`,
                flexGrow: 1,
            }}
        >
            <Box sx={{ display: "flex", justifyContent: "center", margin: `${bottomMargin}px` }}>
                <Typography variant="h6">Results</Typography>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                    }}
                >
                    <CalorieDisplayCard
                        sx={{ margin: `${bottomMargin}px`, flexGrow: 1 }}
                        calories={result.bmr}
                        description="Basal Metabolic Rate (BMR)"
                    />
                    <CalorieDisplayCard
                        sx={{ margin: `${bottomMargin}px`, flexGrow: 1 }}
                        calories={result.tdee.get(result.activity)}
                        activity={result.activity}
                        description="Total Daily Energy Expenditure (TDEE)"
                    />
                </Box>
                <Box>
                    <TDEEResultsTable sx={{ margin: `${bottomMargin}px` }} tdeeMap={result.tdee} selectedActivityFactor={result.activity} />
                </Box>
                <Box>
                    <IdealWeightDisplay sx={{ margin: `${bottomMargin}px` }} heightInCm={result.input.height} gender={result.input.gender} />
                </Box>
            </Box>
        </Box>
    );
};

function App() {
    const [theme, setTheme] = useState(ThemeMode.Light);
    const [result, setResult] = useState<TDEEResults>({
        bmr: 0,
        tdee: new Map<ActivityFactor, number>(),
        activity: ActivityFactor.Sedentary,
        input: DefaultInputParams,
    });

    const onCalculate = (result: TDEEResults) => {
        setResult(result);
    };

    return (
        <AppThemeProvider mode={theme}>
            <Box sx={{ flexGrow: 1 }}>
                <MainToolbar onThemeModeChange={(mode: ThemeMode) => setTheme(mode)} />
                <Box
                    sx={{
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "row",
                        maxWidth: "100vw",
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
