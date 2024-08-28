import { Theme } from "@emotion/react";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Box, Card, CardContent, Popover, SxProps, Typography } from "@mui/material";
import { useState } from "react";
import { ActivityFactor, ActivityFactorDescription, ActivityFactorLongName } from "./CalorieUtils";

export interface ICalorieDisplayCardProps {
    description: string;
    calories?: number;
    activity?: ActivityFactor;
    sx?: SxProps<Theme>;
}

export const CalorieDisplayCard = ({ description, calories, activity, sx }: ICalorieDisplayCardProps) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    return (
        <Card sx={{ borderRadius: 2, ...sx }}>
            <CardContent>
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
                            <Typography onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose}>
                                <HelpOutlineIcon fontSize="small" />
                            </Typography>
                            <Popover
                                id="mouse-over-popover"
                                sx={{
                                    pointerEvents: "none",
                                }}
                                open={open}
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "left",
                                }}
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "left",
                                }}
                                onClose={handlePopoverClose}
                                disableRestoreFocus
                            >
                                <Box sx={{ padding: `20px` }}>
                                    <Typography>{ActivityFactorDescription(activity)}</Typography>
                                </Box>
                            </Popover>
                        </Box>
                    )}
                </Box>
            </CardContent>
        </Card>
    );
};
