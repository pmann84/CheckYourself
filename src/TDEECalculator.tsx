import { Box, FormControl, SelectChangeEvent, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import {
    ActivityFactor,
    BasalMetabolicRate,
    EmptyTDEEMap,
    Gender,
    MifflinStJeorParameters,
    TotalDailyEnergyExpenditure,
} from "./CalorieUtils";
import { EnumSelect } from "./EnumSelect";

export interface IInputParams {
    gender: Gender;
    weight: number;
    height: number;
    age: number;
}

export interface TDEEResults {
    bmr: number | undefined;
    tdee: Map<ActivityFactor, number | undefined>;
}

export interface ITDEECalculatorProps {
    onChange: (result: TDEEResults) => void;
}

export const TDEECalculator = ({ onChange }: ITDEECalculatorProps) => {
    const bottomMargin = 15;
    const [input, setInput] = useState<IInputParams>({
        gender: Gender.Male,
        weight: 97,
        height: 185,
        age: 39,
    });

    const handleGenderChange = (
        event: SelectChangeEvent<Gender>,
        _child: React.ReactNode
    ) => {
        setInput((prevInput: IInputParams | undefined) => {
            return {
                ...prevInput,
                gender: event.target.value as Gender,
            } as IInputParams;
        });
    };

    const calculateResults = () => {
        console.log(`Returning sensible results with input`, input);
        const params = MifflinStJeorParameters.get(input.gender);
        const bmr = BasalMetabolicRate.Calculate(
            input.weight,
            input.height,
            input.age,
            params
        );
        const tdee =
            bmr === undefined
                ? EmptyTDEEMap
                : TotalDailyEnergyExpenditure.calculateAll(bmr);

        onChange({ bmr, tdee });
    };

    useEffect(() => {
        calculateResults();
    }, [input]);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                padding: `${bottomMargin}px`,
            }}
        >
            <FormControl>
                <TextField
                    label="Body Weight (kg)"
                    variant="outlined"
                    sx={{
                        marginBottom: `${bottomMargin}px`,
                    }}
                    type="number"
                    inputProps={{
                        step: "0.1",
                    }}
                    onChange={(event) => {
                        const val = event.target.value;
                        setInput((prevInput: IInputParams | undefined) => {
                            return {
                                ...prevInput,
                                weight: parseFloat(val),
                            } as IInputParams;
                        });
                    }}
                    defaultValue={input.weight.toString()}
                />
                <TextField
                    label="Height (cm)"
                    variant="outlined"
                    sx={{ marginBottom: `${bottomMargin}px` }}
                    type="number"
                    inputProps={{
                        step: "0.1",
                    }}
                    onChange={(event) => {
                        const val = event.target.value;
                        setInput((prevInput: IInputParams | undefined) => {
                            return {
                                ...prevInput,
                                height: parseFloat(val),
                            } as IInputParams;
                        });
                    }}
                    defaultValue={input.height.toString()}
                />
                <TextField
                    label="Age (yrs)"
                    variant="outlined"
                    sx={{ marginBottom: `${bottomMargin}px` }}
                    type="number"
                    inputProps={{
                        step: "1",
                    }}
                    onChange={(event) => {
                        const val = event.target.value;
                        setInput((prevInput: IInputParams | undefined) => {
                            return {
                                ...prevInput,
                                age: parseInt(val),
                            } as IInputParams;
                        });
                    }}
                    defaultValue={input.age.toString()}
                />
                <EnumSelect
                    enumVariable={Gender}
                    label="Gender"
                    value={input.gender}
                    onChange={handleGenderChange}
                    sx={{ marginBottom: `${bottomMargin}px` }}
                />
                <EnumSelect
                    enumVariable={ActivityFactor}
                    label="Acivity Level"
                    value={ActivityFactor.Sedentary}
                />
            </FormControl>
        </Box>
    );
};
