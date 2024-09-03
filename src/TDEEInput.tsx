import { Box, FormControl, SelectChangeEvent, SxProps, Theme, Typography } from "@mui/material";
import { PropsWithChildren, useEffect, useState } from "react";
import { ActivityFactor, Gender } from "./CalorieUtils";
import { ResponsiveEnumSelect } from "./EnumSelect";
import { ResponsiveTextField } from "./ReponsiveTextField";
import { useSmallScreenMediaQuery } from "./useSmallScreenMediaQuery";

// TODO: Type this properly but assume we'll use it correctly for now
export interface IOrderedTypography {
    order?: any;
    sx?: SxProps<Theme>;
}
const OrderedTypography = ({ children, order, sx }: PropsWithChildren<IOrderedTypography>) => {
    return (
        <Box order={{ ...order }}>
            <Typography sx={{ ...sx }}>{children}</Typography>
        </Box>
    );
};

export interface IInputParams {
    gender: Gender;
    weight: number;
    height: number;
    age: number;
    activity: ActivityFactor;
}

export const DefaultInputParams: IInputParams = {
    gender: Gender.Male,
    weight: 70,
    height: 175,
    age: 25,
    activity: ActivityFactor.Sedentary,
};

export interface ITDEEInputProps {
    initialInput?: IInputParams;
    onChange: (params: IInputParams) => void;
}

export const TDEEInput = ({ initialInput, onChange }: ITDEEInputProps) => {
    const isSmallScreen = useSmallScreenMediaQuery();

    const [input, setInput] = useState<IInputParams>(initialInput ?? DefaultInputParams);

    const handleGenderChange = (event: SelectChangeEvent<Gender>, _child: React.ReactNode) => {
        setInput((prevInput: IInputParams | undefined) => {
            return {
                ...prevInput,
                gender: event.target.value as Gender,
            } as IInputParams;
        });
    };

    const handleActivityChange = (event: SelectChangeEvent<ActivityFactor>, _child: React.ReactNode) => {
        setInput((prevInput: IInputParams | undefined) => {
            return {
                ...prevInput,
                activity: event.target.value as ActivityFactor,
            } as IInputParams;
        });
    };

    useEffect(() => {
        onChange(input);
    }, [input]);

    const bottomMargin = 15;
    return (
        <Box>
            <FormControl
                sx={{
                    display: "flex",
                    flexDirection: `${isSmallScreen ? "row" : "column"}`,
                    padding: `${bottomMargin}px`,
                    flexGrow: 0,
                    flexWrap: isSmallScreen ? "wrap" : "nowrap",
                }}
            >
                {isSmallScreen && (
                    <OrderedTypography sx={{ paddingRight: "4px" }} order={{ xs: 1 }}>
                        Stats for a
                    </OrderedTypography>
                )}
                {isSmallScreen && (
                    <OrderedTypography sx={{ paddingRight: "4px" }} order={{ xs: 3 }}>
                        of
                    </OrderedTypography>
                )}
                {isSmallScreen && (
                    <OrderedTypography sx={{ paddingRight: "4px", paddingLeft: "4px" }} order={{ xs: 5 }}>
                        of age, weighing
                    </OrderedTypography>
                )}
                {isSmallScreen && (
                    <OrderedTypography sx={{ paddingRight: "4px", paddingLeft: "4px" }} order={{ xs: 7 }}>
                        and measuring
                    </OrderedTypography>
                )}
                {isSmallScreen && (
                    <OrderedTypography sx={{ paddingRight: "4px", paddingLeft: "4px" }} order={{ xs: 9 }}>
                        with a
                    </OrderedTypography>
                )}
                {isSmallScreen && (
                    <OrderedTypography sx={{ paddingRight: "4px", paddingLeft: "4px" }} order={{ xs: 11 }}>
                        lifestyle.
                    </OrderedTypography>
                )}
                <Box order={{ xs: 6, sm: 1 }}>
                    <ResponsiveTextField
                        label="Body Weight (kg)"
                        smallScreenSuffix="kg"
                        sx={{
                            marginBottom: `${bottomMargin}px`,
                        }}
                        defaultValue={input.weight.toString()}
                        onChange={(weightInKg) => {
                            setInput((prevInput: IInputParams | undefined) => {
                                return {
                                    ...prevInput,
                                    weight: weightInKg,
                                } as IInputParams;
                            });
                        }}
                        step="0.1"
                    />
                </Box>
                <Box order={{ xs: 8, sm: 2 }}>
                    <ResponsiveTextField
                        label="Height (cm)"
                        smallScreenSuffix="cm"
                        sx={{
                            marginBottom: `${bottomMargin}px`,
                        }}
                        defaultValue={input.height.toString()}
                        onChange={(heightInKg) => {
                            setInput((prevInput: IInputParams | undefined) => {
                                return {
                                    ...prevInput,
                                    height: heightInKg,
                                } as IInputParams;
                            });
                        }}
                        step="0.1"
                    />
                </Box>
                <Box order={{ xs: 4, sm: 3 }}>
                    <ResponsiveTextField
                        label="Age (yrs)"
                        smallScreenSuffix="yrs"
                        sx={{
                            marginBottom: `${bottomMargin}px`,
                        }}
                        defaultValue={input.age.toString()}
                        onChange={(ageInYears) => {
                            setInput((prevInput: IInputParams | undefined) => {
                                return {
                                    ...prevInput,
                                    age: ageInYears,
                                } as IInputParams;
                            });
                        }}
                    />
                </Box>
                <Box order={{ xs: 2, sm: 4 }}>
                    <ResponsiveEnumSelect
                        enumVariable={Gender}
                        label="Gender"
                        value={input.gender}
                        onChange={handleGenderChange}
                        // sx={{ marginBottom: `${bottomMargin}px` }}
                    />
                </Box>
                <Box order={{ xs: 10, sm: 5 }}>
                    <ResponsiveEnumSelect
                        enumVariable={ActivityFactor}
                        label="Acivity Level"
                        onChange={handleActivityChange}
                        value={input.activity}
                        // mapper={ActivityFactorShortName}
                    />
                </Box>
            </FormControl>
        </Box>
    );
};
