export enum Gender {
    Male,
    Female,
}

interface BMRParameters {
    Constant: number;
    WeightMultiplier: number;
    HeightMultiplier: number;
    AgeMultiplier: number;
}

// TODO: Katch-McArdle (uses a body fat %)
export class HarrisBenedictParameters {
    public static get(gender: Gender): BMRParameters {
        switch (gender) {
            case Gender.Male: {
                return {
                    Constant: 66.5,
                    WeightMultiplier: 13.75,
                    HeightMultiplier: 5.003,
                    AgeMultiplier: 6.75,
                };
            }
            // Female
            default: {
                return {
                    Constant: 66.5,
                    WeightMultiplier: 13.75,
                    HeightMultiplier: 5.003,
                    AgeMultiplier: 6.75,
                };
            }
        }
    }
}

export class MifflinStJeorParameters {
    public static get(gender: Gender): BMRParameters {
        switch (gender) {
            case Gender.Male: {
                return {
                    Constant: 5.0,
                    WeightMultiplier: 10.0,
                    HeightMultiplier: 6.25,
                    AgeMultiplier: 5.0,
                };
            }
            // Female
            default: {
                return {
                    Constant: -161.0,
                    WeightMultiplier: 10.0,
                    HeightMultiplier: 6.25,
                    AgeMultiplier: 5.0,
                };
            }
        }
    }
}

// Calculates BMR in kcal/day. This is equivalent to the amount of
// energy (in the form of calories) that your body needs to function
// if it were to rest for 24 hours
export class BasalMetabolicRate {
    private static isIndividualInputValid = (value: number): boolean => {
        return !(value === 0 || isNaN(value));
    };

    public static Calculate(bodyWeightKg: number, heightCm: number, ageYrs: number, parameters: BMRParameters): number | undefined {
        if (this.isIndividualInputValid(bodyWeightKg) && this.isIndividualInputValid(heightCm) && this.isIndividualInputValid(ageYrs)) {
            return (
                parameters.Constant +
                parameters.WeightMultiplier * bodyWeightKg +
                parameters.HeightMultiplier * heightCm -
                parameters.AgeMultiplier * ageYrs
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
