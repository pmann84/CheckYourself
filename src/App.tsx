import { Box, styled } from "@mui/material";
import { useState } from "react";
import { AppThemeProvider, ThemeMode } from "./AppThemeProvider";
import { BMIDisplay } from "./BmiDisplay";
import { CalorieDisplayCard } from "./CalorieDisplayCard";
import { ActivityFactor } from "./CalorieUtils";
import { IdealWeightDisplay } from "./IdealWeightDisplay";
import { MainToolbar } from "./MainToolbar";
import { useLocalStorage } from "./Storage";
import { TDEECalculator, TDEEResults } from "./TDEECalculator";
import { DefaultInputParams } from "./TDEEInput";
import { TDEEResultsTable } from "./TDEEResultsTable";
import { useSmallScreenMediaQuery } from "./useSmallScreenMediaQuery";

const DisplayBox = styled(Box)(`
    display: "flex";
    flex-direction: "column";
    padding: "10px";
    flex-grow: 1;
`);

export interface IResultsDisplayProps {
    result: TDEEResults;
}

export const ResultsDisplay = ({ result }: IResultsDisplayProps) => {
    const bottomMargin = 10;
    return (
        <DisplayBox>
            {/* <Box sx={{ display: "flex", justifyContent: "center", margin: `${bottomMargin}px` }}>
                <Typography variant="h6">Results</Typography>
            </Box> */}
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
                        shortDescription="BMR"
                    />
                    <CalorieDisplayCard
                        sx={{ margin: `${bottomMargin}px`, flexGrow: 1 }}
                        calories={result.tdee.get(result.activity)}
                        activity={result.activity}
                        description="Total Daily Energy Expenditure (TDEE)"
                        shortDescription="TDEE"
                    />
                </Box>
                <Box>
                    <TDEEResultsTable sx={{ margin: `${bottomMargin}px` }} tdeeMap={result.tdee} selectedActivityFactor={result.activity} />
                </Box>
                <Box>
                    <BMIDisplay sx={{ margin: `${bottomMargin}px` }} heightCm={result.input.height} weightKg={result.input.weight} />
                </Box>
                <Box>
                    <IdealWeightDisplay
                        sx={{ margin: `${bottomMargin}px` }}
                        heightInCm={result.input.height}
                        gender={result.input.gender}
                        weightInKg={result.input.weight}
                    />
                </Box>
            </Box>
        </DisplayBox>
    );
};

const InputParamsStorageKey = "check.yourself.last.input";
const AppThemeModeKey = "check.yourself.theme.mode";

function App() {
    const storage = useLocalStorage();
    const [theme, setTheme] = useState(storage.load(AppThemeModeKey, ThemeMode.Light));
    const [result, setResult] = useState<TDEEResults>({
        bmr: 0,
        tdee: new Map<ActivityFactor, number>(),
        activity: ActivityFactor.Sedentary,
        input: storage.load(InputParamsStorageKey, DefaultInputParams),
    });

    const isSmallScreen = useSmallScreenMediaQuery();
    const onCalculate = (result: TDEEResults) => {
        setResult(result);
        storage.save(InputParamsStorageKey, result.input);
    };

    const onThemeModeChange = (mode: ThemeMode) => {
        setTheme(mode);
        storage.save(AppThemeModeKey, mode);
    };

    return (
        <AppThemeProvider mode={theme}>
            <Box sx={{ flexGrow: 1 }}>
                <MainToolbar onThemeModeChange={onThemeModeChange} initialThemeMode={theme} />
                <Box
                    sx={{
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: `${isSmallScreen ? " column" : "row"}`,
                        maxWidth: "100vw",
                    }}
                >
                    <TDEECalculator onChange={onCalculate} initialInput={result.input} />
                    <ResultsDisplay result={result} />
                </Box>
            </Box>
        </AppThemeProvider>
    );
}

export default App;
