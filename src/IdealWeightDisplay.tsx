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
