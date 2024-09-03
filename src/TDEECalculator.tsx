import {
    ActivityFactor,
    BasalMetabolicRate,
    EmptyTDEEMap,
    KatchMccardleParameters,
    MifflinStJeorParameters,
    TotalDailyEnergyExpenditure,
} from "./CalorieUtils";
import { IInputParams, TDEEInput } from "./TDEEInput";

export interface TDEEResults {
    bmr: number | undefined;
    tdee: Map<ActivityFactor, number | undefined>;
    activity: ActivityFactor;
    input: IInputParams;
}

export interface ITDEECalculatorProps {
    initialInput: IInputParams;
    onChange: (result: TDEEResults) => void;
}

export const TDEECalculator = ({ initialInput, onChange }: ITDEECalculatorProps) => {
    const calculateResults = (input: IInputParams) => {
        const useMifflin = input.bodyFatPct === null || isNaN(input.bodyFatPct);
        const params = useMifflin ? MifflinStJeorParameters.get(input.gender) : KatchMccardleParameters.get(input.gender);
        const bodyFatPct = useMifflin ? 0 : input.bodyFatPct;
        const bmr = BasalMetabolicRate.Calculate(input.weight, input.height, input.age, bodyFatPct!, params);
        const tdee = bmr === undefined ? EmptyTDEEMap : TotalDailyEnergyExpenditure.calculateAll(bmr);

        onChange({ bmr, tdee, activity: input.activity, input });
    };

    const onInputsChange = (params: IInputParams) => {
        calculateResults(params);
    };

    return <TDEEInput initialInput={initialInput} onChange={onInputsChange} />;
};
