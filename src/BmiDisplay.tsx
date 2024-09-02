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
    useTheme,
} from "@mui/material";
import { BMIClassification, BMIClassificationName, BMIRange, BodyMassIndex } from "./CalorieUtils";
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
            <CardContent sx={{ paddingTop: "0px" }}>
                <Box sx={{ padding: "10px" }}>
                    <Typography
                        sx={{
                            fontSize: 30,
                            paddingRight: "3px",
                            lineHeight: 1,
                        }}
                    >
                        {bmi.toFixed(1)}
                    </Typography>
                </Box>
                <RangeChart
                    categories={Object.values(BMIClassification)
                        .filter((fm) => {
                            return typeof fm !== "string";
                        })
                        .map((bmiEntry: string | BMIClassification) => {
                            return BMIRange(bmiEntry as BMIClassification, 0.1);
                        })}
                    colours={["#bef7be", "#73f073", "#ff7373", "#ff2e2e"]}
                    value={bmi}
                    valueSelectorColour={theme.palette.primary.main}
                />
                <TableContainer component={Paper}>
                    <Table aria-label="bmi table" size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>BMI Range</TableCell>
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
