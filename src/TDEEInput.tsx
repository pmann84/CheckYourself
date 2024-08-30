import { Box, FormControl, SelectChangeEvent, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { ActivityFactor, Gender } from "./CalorieUtils";
import { EnumSelect } from "./EnumSelect";
import { ResponsiveTextField } from "./ReponsiveTextField";

export interface IInputParams {
    gender: Gender;
    weight: number;
    height: number;
    age: number;
    activity: ActivityFactor;
}

export const DefaultInputParams: IInputParams = {
    gender: Gender.Male,
    weight: 97,
    height: 185,
    age: 39,
    activity: ActivityFactor.Sedentary,
};

export interface ITDEEInputProps {
    initialInput?: IInputParams;
    onChange: (params: IInputParams) => void;
}

export const TDEEInput = ({ initialInput, onChange }: ITDEEInputProps) => {
    const muiTheme = useTheme();
    const isSmallScreen = useMediaQuery(muiTheme.breakpoints.down("sm"));

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
                }}
            >
                <Box order={{ xs: 5, sm: 1 }}>
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
                <Box order={{ xs: 4, sm: 2 }}>
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
                <Box order={{ xs: 3, sm: 3 }}>
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
                    <EnumSelect
                        enumVariable={Gender}
                        label="Gender"
                        value={input.gender}
                        onChange={handleGenderChange}
                        sx={{ marginBottom: `${bottomMargin}px` }}
                    />
                </Box>
                <Box order={{ xs: 1, sm: 5 }}>
                    <EnumSelect
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
