import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Paper,
    SxProps,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Theme,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { AppThemeProvider, ThemeMode } from "./AppThemeProvider";
import { CalorieDisplayCard } from "./CalorieDisplayCard";
import {
    ActivityFactor,
    EmptyIdealWeightResult,
    Gender,
    IdealWeight,
    IdealWeightFormula,
    IdealWeightFormulaDescriptiveName,
    IdealWeightFormulaName,
    IdealWeightResult,
} from "./CalorieUtils";
import { MainToolbar } from "./MainToolbar";
import { DefaultInputParams, TDEECalculator, TDEEResults } from "./TDEECalculator";
import { TDEEResultsTable } from "./TDEEResultsTable";

export interface IIdealWeightDisplayProps {
    heightInCm: number;
    gender: Gender;
    sx?: SxProps<Theme>;
}

export const IdealWeightDisplay = ({ heightInCm, gender, sx }: IIdealWeightDisplayProps) => {
    const [idealWeightRange, setIdealWeightRange] = useState<IdealWeightResult>(EmptyIdealWeightResult);
    useEffect(() => {
        console.log(`Height changed: ${heightInCm}`);
        setIdealWeightRange(IdealWeight.CalculateRange(heightInCm, gender));
    }, [heightInCm, gender]);

    return (
        <Card sx={{ borderRadius: 2, ...sx }}>
            <CardHeader title="Ideal Weight" sx={{ paddingBottom: "5px" }} />
            <CardContent sx={{ paddingTop: "0px" }}>
                <Box sx={{ padding: "10px" }}>
                    {" "}
                    <Typography
                        sx={{
                            fontSize: 30,
                            paddingRight: "3px",
                            lineHeight: 1,
                        }}
                    >
                        {idealWeightRange.range[0] !== undefined && idealWeightRange.range[1] !== undefined
                            ? `${idealWeightRange.range[0].toFixed(1)}-${idealWeightRange.range[1].toFixed(1)}kg`
                            : "-"}
                    </Typography>
                </Box>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table" size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Formula</TableCell>
                                <TableCell align="right">Ideal Weight (kg)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Object.values(IdealWeightFormula)
                                .filter((fm) => {
                                    console.log(fm, typeof fm !== "string");
                                    return typeof fm !== "string";
                                })
                                .map((fm: string | IdealWeightFormula) => (
                                    <TableRow
                                        key={IdealWeightFormulaName(fm as IdealWeightFormula)}
                                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {IdealWeightFormulaDescriptiveName(fm as IdealWeightFormula)}
                                        </TableCell>
                                        <TableCell align="right">
                                            {idealWeightRange.rangeMap.get(fm as IdealWeightFormula)?.toFixed(1) ?? "-"}
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    );
};

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
