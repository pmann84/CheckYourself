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
import { BMIClassification, BMIClassificationName, BMIRange, BodyMassIndex } from "./CalorieUtils";
import { rangeToString } from "./Range";

export interface IBMIDisplayProps {
    weightKg: number;
    heightCm: number;
    sx?: SxProps<Theme>;
}

export const BMIDisplay = ({ weightKg, heightCm, sx }: IBMIDisplayProps) => {
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
                                    console.log(fm, typeof fm !== "string");
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
