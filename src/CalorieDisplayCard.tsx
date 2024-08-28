import { Theme } from "@emotion/react";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Box, Card, CardContent, styled, SxProps, Tooltip, Typography } from "@mui/material";
import { ActivityFactor, ActivityFactorDescription, ActivityFactorLongName } from "./CalorieUtils";

export interface ICalorieDisplayCardProps {
    description: string;
    calories?: number;
    activity?: ActivityFactor;
    sx?: SxProps<Theme>;
}

const AdjustedCardContent = styled(CardContent)(`
    padding: 10px;
    &:last-child {
        padding-bottom: 10px;
    }
`);

export const CalorieDisplayCard = ({ description, calories, activity, sx }: ICalorieDisplayCardProps) => {
    return (
        <Card sx={{ borderRadius: 2, ...sx }}>
            <AdjustedCardContent>
                <Box
                    sx={{
                        justifyContent: "center",
                        display: "flex",
                        flexDirection: "row",
                        paddingBottom: "10px",
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: 50,
                            paddingRight: "3px",
                            lineHeight: 1,
                        }}
                    >{`${calories ? calories.toFixed(0) : "-"}`}</Typography>
                    <Typography sx={{ alignContent: "end" }}>cals/day</Typography>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Typography fontWeight="fontWeightMedium">{description}</Typography>
                    {activity && (
                        <Box
                            sx={{
                                justifyContent: "center",
                                display: "flex",
                                flexDirection: "row",
                                paddingBottom: "10px",
                            }}
                        >
                            <Typography sx={{ marginRight: "3px" }}>Activity Level:</Typography>
                            <Typography fontWeight="fontWeightMedium">{ActivityFactorLongName(activity)}</Typography>
                            <Tooltip title={ActivityFactorDescription(activity)}>
                                <Typography>
                                    <HelpOutlineIcon fontSize="small" />
                                </Typography>
                            </Tooltip>
                        </Box>
                    )}
                </Box>
            </AdjustedCardContent>
        </Card>
    );
};
