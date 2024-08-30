import { Box, styled, useMediaQuery, useTheme } from "@mui/material";
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

const DisplayBox = styled(Box)(`
    display: "flex";
    flex-direction: "column";
    padding: "10px";
    flex-grow: 1;
`);

export interface IResultsDisplayProps {
    result: TDEEResults;
}

// TODO: Ideal weight graphs
// TODO: BMI graphs
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
                <Box>
                    <BMIDisplay sx={{ margin: `${bottomMargin}px` }} heightCm={result.input.height} weightKg={result.input.weight} />
                </Box>
            </Box>
        </DisplayBox>
    );
};

const InputParamsStorageKey = "check.yourself.last.input";

function App() {
    const [theme, setTheme] = useState(ThemeMode.Light);
    const storage = useLocalStorage();
    const [result, setResult] = useState<TDEEResults>({
        bmr: 0,
        tdee: new Map<ActivityFactor, number>(),
        activity: ActivityFactor.Sedentary,
        input: storage.load(InputParamsStorageKey, DefaultInputParams),
    });

    const muiTheme = useTheme();
    const isSmallScreen = useMediaQuery(muiTheme.breakpoints.down("sm"));
    console.log(`SM: ${isSmallScreen}`);
    const onCalculate = (result: TDEEResults) => {
        setResult(result);
        storage.save(InputParamsStorageKey, result.input);
    };

    return (
        <AppThemeProvider mode={theme}>
            <Box sx={{ flexGrow: 1 }}>
                <MainToolbar onThemeModeChange={(mode: ThemeMode) => setTheme(mode)} />
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
