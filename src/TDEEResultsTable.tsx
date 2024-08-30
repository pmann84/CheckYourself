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
    Tooltip,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { ActivityFactor, ActivityFactorDescription, ActivityFactorShortName } from "./CalorieUtils";

export interface ITDEEResultsTableProps {
    tdeeMap: Map<ActivityFactor, number | undefined>;
    selectedActivityFactor?: ActivityFactor;
    sx?: SxProps<Theme>;
}

export const TDEEResultsTable = ({ tdeeMap, selectedActivityFactor, sx }: ITDEEResultsTableProps) => {
    const muiTheme = useTheme();
    const matches = useMediaQuery(muiTheme.breakpoints.down("sm"));

    return (
        <Card sx={{ borderRadius: 2, ...sx }}>
            <CardHeader title="Total Daily Energy Expenditure" sx={{ paddingBottom: "5px" }} />
            <CardContent sx={{ paddingTop: "0px" }}>
                <TableContainer component={Paper}>
                    <Table aria-label="tdee-results-table" size="small">
                        <TableHead>
                            <TableRow key="headers">
                                <TableCell>Activity Level</TableCell>
                                <TableCell align="right">{matches ? "TDEE (cals)" : "Total Daily Energy Expenditure (cals)"}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {[
                                ActivityFactor.Sedentary,
                                ActivityFactor.Light,
                                ActivityFactor.Moderate,
                                ActivityFactor.Heavy,
                                ActivityFactor.VeryHeavy,
                            ].map((af, index) => {
                                return (
                                    <Tooltip key={`af-row-tooltip-${index}`} title={ActivityFactorDescription(af)}>
                                        <TableRow
                                            key={`af-row-${index}`}
                                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                            selected={af === selectedActivityFactor}
                                        >
                                            <TableCell component="th" scope="row">
                                                {ActivityFactorShortName(af)}
                                            </TableCell>
                                            <TableCell align="right">{tdeeMap.get(af)?.toFixed(0) ?? "-"}</TableCell>
                                        </TableRow>
                                    </Tooltip>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    );
};
