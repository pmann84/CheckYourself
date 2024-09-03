import { Theme } from "@emotion/react";
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
    Typography,
    useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
    EmptyIdealWeightResult,
    Gender,
    IdealWeight,
    IdealWeightFormula,
    IdealWeightFormulaDescriptiveName,
    IdealWeightFormulaName,
    IdealWeightResult,
} from "./CalorieUtils";
import { rangeLength, toRange } from "./Range";
import { RangeChart } from "./RangeChart";

export interface IIdealWeightDisplayProps {
    heightInCm: number;
    gender: Gender;
    sx?: SxProps<Theme>;
    weightInKg?: number;
}

export const IdealWeightDisplay = ({ heightInCm, gender, sx, weightInKg }: IIdealWeightDisplayProps) => {
    const theme = useTheme();
    const [idealWeightRange, setIdealWeightRange] = useState<IdealWeightResult>(EmptyIdealWeightResult);
    useEffect(() => {
        setIdealWeightRange(IdealWeight.CalculateRange(heightInCm, gender));
    }, [heightInCm, gender]);

    return (
        <Card sx={{ borderRadius: 2, ...sx }}>
            <CardHeader title="Ideal Weight" sx={{ paddingBottom: "5px" }} />
            <CardContent sx={{ paddingTop: "0px" }}>
                <Box sx={{ padding: "10px" }}>
                    <Typography
                        sx={{
                            fontSize: 30,
                            paddingRight: "3px",
                            lineHeight: 1,
                        }}
                    >
                        {idealWeightRange.range[0] !== undefined && idealWeightRange.range[1] !== undefined
                            ? `${idealWeightRange.range[0].toFixed(1)} - ${idealWeightRange.range[1].toFixed(1)}kg`
                            : "-"}
                    </Typography>
                </Box>
                <RangeChart
                    categories={[
                        toRange(idealWeightRange.range[0]! - 0.9 * rangeLength(toRange(...idealWeightRange.range)), idealWeightRange.range[0]),
                        toRange(idealWeightRange.range[0], idealWeightRange.range[1]),
                        toRange(idealWeightRange.range[1], idealWeightRange.range[1]! + 0.9 * rangeLength(toRange(...idealWeightRange.range))),
                    ]}
                    colours={["#bef7be", "#73f073", "#ff7373"]}
                    value={weightInKg}
                    valueSelectorColour={theme.palette.primary.main}
                    units="kg"
                />
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
