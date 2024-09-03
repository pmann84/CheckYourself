import { Convert } from "./Conversion";
import { Range } from "./Range";

export enum Gender {
    Male,
    Female,
}

interface BMRParameters {
    Constant: number;
    WeightMultiplier: number;
    HeightMultiplier: number;
    AgeMultiplier: number;
    LeanBodyMassMultiplier: number;
}

export class HarrisBenedictParameters {
    public static get(gender: Gender): BMRParameters {
        switch (gender) {
            case Gender.Male: {
                return {
                    Constant: 66.5,
                    WeightMultiplier: 13.75,
                    HeightMultiplier: 5.003,
                    AgeMultiplier: 6.75,
                    LeanBodyMassMultiplier: 0,
                };
            }
            // Female
            default: {
                return {
                    Constant: 66.5,
                    WeightMultiplier: 13.75,
                    HeightMultiplier: 5.003,
                    AgeMultiplier: 6.75,
                    LeanBodyMassMultiplier: 0,
                };
            }
        }
    }
}

export class MifflinStJeorParameters {
    public static get(gender: Gender): BMRParameters {
        console.log(`MFSJ`);
        switch (gender) {
            case Gender.Male: {
                return {
                    Constant: 5.0,
                    WeightMultiplier: 10.0,
                    HeightMultiplier: 6.25,
                    AgeMultiplier: 5.0,
                    LeanBodyMassMultiplier: 0,
                };
            }
            // Female
            default: {
                return {
                    Constant: -161.0,
                    WeightMultiplier: 10.0,
                    HeightMultiplier: 6.25,
                    AgeMultiplier: 5.0,
                    LeanBodyMassMultiplier: 0,
                };
            }
        }
    }
}

export class KatchMccardleParameters {
    public static get(_gender: Gender): BMRParameters {
        return { WeightMultiplier: 0, HeightMultiplier: 0, AgeMultiplier: 0, LeanBodyMassMultiplier: 21.6, Constant: 370 };
    }
}

// Calculates BMR in kcal/day. This is equivalent to the amount of
// energy (in the form of calories) that your body needs to function
// if it were to rest for 24 hours
export class BasalMetabolicRate {
    private static isIndividualInputValid = (value: number): boolean => {
        return !(value === 0 || isNaN(value));
    };

    public static Calculate(
        bodyWeightKg: number,
        heightCm: number,
        ageYrs: number,
        bodyFatPct: number,
        parameters: BMRParameters
    ): number | undefined {
        if (this.isIndividualInputValid(bodyWeightKg) && this.isIndividualInputValid(heightCm) && this.isIndividualInputValid(ageYrs)) {
            return (
                parameters.Constant +
                parameters.WeightMultiplier * bodyWeightKg +
                parameters.HeightMultiplier * heightCm -
                parameters.AgeMultiplier * ageYrs +
                parameters.LeanBodyMassMultiplier * ((100.0 - bodyFatPct) / 100.0) * bodyWeightKg
            );
        } else {
            return undefined;
        }
    }
}

// TODO: Custom Activity Factor
export enum ActivityFactor {
    Sedentary = 1.2,
    Light = 1.375,
    Moderate = 1.55,
    Heavy = 1.725,
    VeryHeavy = 1.9,
}

export const ActivityFactorShortName = (activity: ActivityFactor): string => {
    switch (activity) {
        case ActivityFactor.Sedentary:
            return "Sedentary";
        case ActivityFactor.Light:
            return "Light";
        case ActivityFactor.Moderate:
            return "Moderate";
        case ActivityFactor.Heavy:
            return "Heavy";
        case ActivityFactor.VeryHeavy:
            return "Very Heavy";
        default:
            return "";
    }
};

export const ActivityFactorLongName = (activity: ActivityFactor): string => {
    switch (activity) {
        case ActivityFactor.Sedentary:
            return "Sedentary";
        case ActivityFactor.Light:
            return "Light Exercise";
        case ActivityFactor.Moderate:
            return "Moderate Exercise";
        case ActivityFactor.Heavy:
            return "Heavy Exercise";
        case ActivityFactor.VeryHeavy:
            return "Very Heavy Exercise";
        default:
            return "";
    }
};

export const ActivityFactorDescription = (activity: ActivityFactor): string => {
    switch (activity) {
        case ActivityFactor.Sedentary:
            return "Little to no physical activity";
        case ActivityFactor.Light:
            return "1-3 hours of exercise per week";
        case ActivityFactor.Moderate:
            return "4-6 hours of exercise per week";
        case ActivityFactor.Heavy:
            return "7-9 hours of exercise per week";
        case ActivityFactor.VeryHeavy:
            return "10+ hours of exercise per week";
        default:
            return "";
    }
};

export const EmptyTDEEMap = new Map<ActivityFactor, number | undefined>([
    [ActivityFactor.Sedentary, undefined],
    [ActivityFactor.Light, undefined],
    [ActivityFactor.Moderate, undefined],
    [ActivityFactor.Heavy, undefined],
    [ActivityFactor.VeryHeavy, undefined],
]);

export class TotalDailyEnergyExpenditure {
    public static Calculate(bmr: (() => number) | number, activityFactor: ActivityFactor): number {
        let actualBmr: number;
        if (typeof bmr === "function") {
            actualBmr = bmr();
        } else {
            actualBmr = bmr;
        }
        return actualBmr * activityFactor;
    }

    public static calculateAll(bmr: (() => number) | number): Map<ActivityFactor, number | undefined> {
        let actualBmr: number;
        if (typeof bmr === "function") {
            actualBmr = bmr();
        } else {
            actualBmr = bmr;
        }
        return new Map([
            [ActivityFactor.Sedentary, actualBmr * ActivityFactor.Sedentary],
            [ActivityFactor.Light, actualBmr * ActivityFactor.Light],
            [ActivityFactor.Moderate, actualBmr * ActivityFactor.Moderate],
            [ActivityFactor.Heavy, actualBmr * ActivityFactor.Heavy],
            [ActivityFactor.VeryHeavy, actualBmr * ActivityFactor.VeryHeavy],
        ]);
    }
}

interface IdealWeightParameters {
    initialConstantKg: number;
    kgPerInchOverFiveFeet: number;
}

export class GJHamwiParameters {
    public static get(gender: Gender): IdealWeightParameters {
        switch (gender) {
            case Gender.Male: {
                return {
                    initialConstantKg: 48.0,
                    kgPerInchOverFiveFeet: 2.7,
                };
            }
            // Female
            default: {
                return {
                    initialConstantKg: 45.5,
                    kgPerInchOverFiveFeet: 2.2,
                };
            }
        }
    }
}

export class BJDevineParameters {
    public static get(gender: Gender): IdealWeightParameters {
        switch (gender) {
            case Gender.Male: {
                return {
                    initialConstantKg: 50.0,
                    kgPerInchOverFiveFeet: 2.3,
                };
            }
            // Female
            default: {
                return {
                    initialConstantKg: 45.5,
                    kgPerInchOverFiveFeet: 2.3,
                };
            }
        }
    }
}

export class JDRobinsonParameters {
    public static get(gender: Gender): IdealWeightParameters {
        switch (gender) {
            case Gender.Male: {
                return {
                    initialConstantKg: 52.0,
                    kgPerInchOverFiveFeet: 1.9,
                };
            }
            // Female
            default: {
                return {
                    initialConstantKg: 49.0,
                    kgPerInchOverFiveFeet: 1.7,
                };
            }
        }
    }
}

export class DRMillerParameters {
    public static get(gender: Gender): IdealWeightParameters {
        switch (gender) {
            case Gender.Male: {
                return {
                    initialConstantKg: 56.2,
                    kgPerInchOverFiveFeet: 1.41,
                };
            }
            // Female
            default: {
                return {
                    initialConstantKg: 53.1,
                    kgPerInchOverFiveFeet: 1.36,
                };
            }
        }
    }
}

export enum IdealWeightFormula {
    Hamwi,
    Devine,
    Robinson,
    Miller,
}

export const IdealWeightFormulaYear = (formula: IdealWeightFormula): number => {
    switch (formula) {
        case IdealWeightFormula.Hamwi:
            return 1964;
        case IdealWeightFormula.Devine:
            return 1974;
        case IdealWeightFormula.Robinson:
            return 1983;
        case IdealWeightFormula.Miller:
            return 1983;
        default:
            return 0;
    }
};

export const IdealWeightFormulaName = (formula: IdealWeightFormula): string => {
    switch (formula) {
        case IdealWeightFormula.Hamwi:
            return "G. J. Hamwi";
        case IdealWeightFormula.Devine:
            return "B. J. Devine";
        case IdealWeightFormula.Robinson:
            return "J. D. Robinson";
        case IdealWeightFormula.Miller:
            return "D. R. Miller";
        default:
            return "";
    }
};

export const IdealWeightFormulaDescriptiveName = (formula: IdealWeightFormula): string => {
    return `${IdealWeightFormulaName(formula)} (${IdealWeightFormulaYear(formula)})`;
};

export const GetIdealWeightParameters = (formula: IdealWeightFormula, gender: Gender): IdealWeightParameters | undefined => {
    switch (formula) {
        case IdealWeightFormula.Hamwi:
            return GJHamwiParameters.get(gender);
        case IdealWeightFormula.Devine:
            return BJDevineParameters.get(gender);
        case IdealWeightFormula.Robinson:
            return JDRobinsonParameters.get(gender);
        case IdealWeightFormula.Miller:
            return DRMillerParameters.get(gender);
        default:
            return undefined;
    }
};

export interface IdealWeightResult {
    rangeMap: Map<IdealWeightFormula, number | undefined>;
    range: [number | undefined, number | undefined];
}

export const EmptyIdealWeightResult: IdealWeightResult = {
    rangeMap: new Map<IdealWeightFormula, number | undefined>([
        [IdealWeightFormula.Hamwi, undefined],
        [IdealWeightFormula.Devine, undefined],
        [IdealWeightFormula.Robinson, undefined],
        [IdealWeightFormula.Miller, undefined],
    ]),
    range: [undefined, undefined],
};

export class IdealWeight {
    private static isIndividualInputValid = (value: number): boolean => {
        return !(value === 0 || isNaN(value));
    };

    public static Calculate(heightCm: number, params: IdealWeightParameters): number | undefined {
        if (!this.isIndividualInputValid(heightCm)) return undefined;
        const inchesOverFiveFeet = Convert.CmToInches(heightCm) - Convert.FeetToInches(5);
        return params.initialConstantKg + inchesOverFiveFeet * params.kgPerInchOverFiveFeet;
    }

    public static CalculateRange(heightCm: number, gender: Gender): IdealWeightResult {
        const rangeMap = new Map<IdealWeightFormula, number | undefined>([
            [IdealWeightFormula.Hamwi, IdealWeight.Calculate(heightCm, GJHamwiParameters.get(gender))],
            [IdealWeightFormula.Devine, IdealWeight.Calculate(heightCm, BJDevineParameters.get(gender))],
            [IdealWeightFormula.Robinson, IdealWeight.Calculate(heightCm, JDRobinsonParameters.get(gender))],
            [IdealWeightFormula.Miller, IdealWeight.Calculate(heightCm, DRMillerParameters.get(gender))],
        ]);

        let range: [number | undefined, number | undefined] = [undefined, undefined];
        const canCalculateRange = rangeMap.values().next().value !== undefined;
        if (canCalculateRange) {
            const rangeValues: number[] = [...rangeMap.values()].filter((w) => w !== undefined);
            range = [Math.min(...rangeValues.values()), Math.max(...rangeValues!.values())];
        }
        return { rangeMap, range };
    }
}

export enum BMIClassification {
    Underweight,
    Normal,
    Overweight,
    Obese,
}

const BMIUnderweightThreshold = 18.5;
const BMINormalThreshold = 25.0;
const BMIOverweightThreshold = 30.0;

export class BodyMassIndex {
    public static Calculate(weightKg: number, heightCm: number): number {
        const heightM = Convert.CmToMetres(heightCm);
        return weightKg / (heightM * heightM);
    }

    public static CalculateWeight(bmi: number, heightCm: number): number {
        const heightM = Convert.CmToMetres(heightCm);
        return bmi * (heightM * heightM);
    }

    public static CalculateClassification(weightKg: number, heightCm: number): BMIClassification {
        const bmi = BodyMassIndex.Calculate(weightKg, heightCm);
        if (bmi < BMIUnderweightThreshold) return BMIClassification.Underweight;
        if (bmi < BMINormalThreshold) return BMIClassification.Normal;
        if (bmi < BMIOverweightThreshold) return BMIClassification.Overweight;
        return BMIClassification.Obese;
    }
}

export const BMIRange = (bmi: BMIClassification, extremaPercentage?: number): Range<number> => {
    const range = BMIOverweightThreshold - BMIUnderweightThreshold;
    switch (bmi) {
        case BMIClassification.Underweight:
            return { min: extremaPercentage ? BMIUnderweightThreshold - range * extremaPercentage : NaN, max: BMIUnderweightThreshold };
        case BMIClassification.Normal:
            return { min: BMIUnderweightThreshold, max: BMINormalThreshold };
        case BMIClassification.Overweight:
            return { min: BMINormalThreshold, max: BMIOverweightThreshold };
        case BMIClassification.Obese:
            return { min: BMIOverweightThreshold, max: extremaPercentage ? BMIOverweightThreshold + range * extremaPercentage : NaN };
    }
};

export const BMIWeightRange = (bmi: BMIClassification, heightCm: number, extremaPercentage?: number): Range<number> => {
    const range = BMIOverweightThreshold - BMIUnderweightThreshold;
    switch (bmi) {
        case BMIClassification.Underweight:
            return {
                min: extremaPercentage ? BodyMassIndex.CalculateWeight(BMIUnderweightThreshold - range * extremaPercentage, heightCm) : NaN,
                max: BodyMassIndex.CalculateWeight(BMIUnderweightThreshold, heightCm),
            };
        case BMIClassification.Normal:
            return {
                min: BodyMassIndex.CalculateWeight(BMIUnderweightThreshold, heightCm),
                max: BodyMassIndex.CalculateWeight(BMINormalThreshold, heightCm),
            };
        case BMIClassification.Overweight:
            return {
                min: BodyMassIndex.CalculateWeight(BMINormalThreshold, heightCm),
                max: BodyMassIndex.CalculateWeight(BMIOverweightThreshold, heightCm),
            };
        case BMIClassification.Obese:
            return {
                min: BodyMassIndex.CalculateWeight(BMIOverweightThreshold, heightCm),
                max: extremaPercentage ? BodyMassIndex.CalculateWeight(BMIOverweightThreshold + range * extremaPercentage, heightCm) : NaN,
            };
    }
};

export const BMIClassificationName = (bmi: BMIClassification): string => {
    switch (bmi) {
        case BMIClassification.Underweight:
            return "Underweight";
        case BMIClassification.Normal:
            return "Normal";
        case BMIClassification.Overweight:
            return "Overweight";
        case BMIClassification.Obese:
            return "Obese";
    }
};
