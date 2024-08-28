import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useState } from "react";
import { AppThemeProvider, ThemeMode } from "./AppThemeProvider";
import { CalorieDisplayCard } from "./CalorieDisplayCard";
import { ActivityFactor, ActivityFactorShortName } from "./CalorieUtils";
import { MainToolbar } from "./MainToolbar";
import { TDEECalculator, TDEEResults } from "./TDEECalculator";

export interface ITDEEResultsTableProps {
    tdeeMap: Map<ActivityFactor, number | undefined>;
    selectedActivityFactor?: ActivityFactor;
}

export const TDEEResultsTable = ({ tdeeMap, selectedActivityFactor }: ITDEEResultsTableProps) => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Activity Level</TableCell>
                        <TableCell align="right">Total Daily Energy Expenditure (cals)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {[ActivityFactor.Sedentary, ActivityFactor.Light, ActivityFactor.Moderate, ActivityFactor.Heavy, ActivityFactor.VeryHeavy].map(
                        (af) => (
                            <TableRow
                                key={ActivityFactorShortName(af)}
                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                selected={af === selectedActivityFactor}
                            >
                                <TableCell component="th" scope="row">
                                    {ActivityFactorShortName(af)}
                                </TableCell>
                                <TableCell align="right">{tdeeMap.get(af)?.toFixed(0) ?? "-"}</TableCell>
                            </TableRow>
                        )
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export interface IResultsDisplayProps {
    result: TDEEResults;
}

// TODO: Ideal weight
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
                <Typography variant="h4">Results</Typography>
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
                    <TDEEResultsTable tdeeMap={result.tdee} selectedActivityFactor={result.activity} />
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
    });

    const onCalculate = (result: TDEEResults) => {
        // console.log(`Result recieved...`, result);
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
