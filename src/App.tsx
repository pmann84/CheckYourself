import { Box } from "@mui/material";
import { useState } from "react";
import { AppThemeProvider, ThemeMode } from "./AppThemeProvider";
import { ActivityFactor } from "./CalorieUtils";
import { MainToolbar } from "./MainToolbar";
import { ResultsDisplay } from "./ResultsDisplay";
import { useLocalStorage } from "./Storage";
import { TDEECalculator, TDEEResults } from "./TDEECalculator";
import { DefaultInputParams } from "./TDEEInput";
import { useSmallScreenMediaQuery } from "./useSmallScreenMediaQuery";

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
                        justifyContent: "center",
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
