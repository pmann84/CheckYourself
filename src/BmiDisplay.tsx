import {
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
    useTheme,
} from "@mui/material";
import { BMIClassification, BMIClassificationName, BMIRange, BMIWeightRange, BodyMassIndex } from "./CalorieUtils";
import { rangeToString } from "./Range";
import { RangeChart } from "./RangeChart";

export interface IBMIDisplayProps {
    weightKg: number;
    heightCm: number;
    sx?: SxProps<Theme>;
}

export const BMIDisplay = ({ weightKg, heightCm, sx }: IBMIDisplayProps) => {
    const theme = useTheme();
    const bmi = BodyMassIndex.Calculate(weightKg, heightCm);
    const bmiClassification = BodyMassIndex.CalculateClassification(weightKg, heightCm);
    return (
        <Card sx={{ borderRadius: 2, ...sx }}>
            <CardHeader title="Body Mass Index (BMI)" sx={{ paddingBottom: "5px" }} />
            <CardContent sx={{ paddingTop: "0px", paddingBottom: "5px" }}>
                <RangeChart
                    categories={Object.values(BMIClassification)
                        .filter((fm) => {
                            return typeof fm !== "string";
                        })
                        .map((bmiEntry: string | BMIClassification) => {
                            return BMIRange(bmiEntry as BMIClassification, 0.25);
                        })}
                    colours={["#bef7be", "#73f073", "#ff7373", "#ff2e2e"]}
                    value={bmi}
                    valueSelectorColour={theme.palette.primary.main}
                />
            </CardContent>
            <CardHeader title="Weight" sx={{ paddingTop: "5px", paddingBottom: "5px" }} />
            <CardContent sx={{ paddingTop: "0px" }}>
                <RangeChart
                    categories={Object.values(BMIClassification)
                        .filter((fm) => {
                            return typeof fm !== "string";
                        })
                        .map((bmiEntry: string | BMIClassification) => {
                            return BMIWeightRange(bmiEntry as BMIClassification, heightCm, 0.25);
                        })}
                    colours={["#bef7be", "#73f073", "#ff7373", "#ff2e2e"]}
                    value={weightKg}
                    valueSelectorColour={theme.palette.primary.main}
                    units="kg"
                />
                <TableContainer component={Paper}>
                    <Table aria-label="bmi table" size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>BMI Range</TableCell>
                                <TableCell>Weight Range</TableCell>
                                <TableCell align="right">Classification</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Object.values(BMIClassification)
                                .filter((fm) => {
                                    return typeof fm !== "string";
                                })
                                .map((bmiEntry: string | BMIClassification) => (
                                    <TableRow
                                        key={BMIClassificationName(bmiEntry as BMIClassification)}
                                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                        selected={bmiClassification === bmiEntry}
                                    >
                                        <TableCell component="th" scope="row">
                                            {rangeToString(BMIRange(bmiEntry as BMIClassification))}
                                        </TableCell>
                                        <TableCell>{rangeToString(BMIWeightRange(bmiEntry as BMIClassification, heightCm))}</TableCell>
                                        <TableCell align="right">{BMIClassificationName(bmiEntry as BMIClassification)}</TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    );
};
