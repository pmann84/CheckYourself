export enum Gender {
    Male = "0",
    Female = "1",
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

    public static Calculate(
        bodyWeightKg: number,
        heightCm: number,
        ageYrs: number,
        parameters: BMRParameters
    ): number | undefined {
        if (
            this.isIndividualInputValid(bodyWeightKg) &&
            this.isIndividualInputValid(heightCm) &&
            this.isIndividualInputValid(ageYrs)
        ) {
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
    Sedentary = "1.2",
    Light = "1.375",
    Moderate = "1.55",
    Very = "1.725",
    Extra = "1.9",
}

export const EmptyTDEEMap = new Map<ActivityFactor, number | undefined>([
    [ActivityFactor.Sedentary, undefined],
    [ActivityFactor.Light, undefined],
    [ActivityFactor.Moderate, undefined],
    [ActivityFactor.Very, undefined],
    [ActivityFactor.Extra, undefined],
]);

export class TotalDailyEnergyExpenditure {
    public static Calculate(
        bmr: (() => number) | number,
        activityFactor: ActivityFactor
    ): number {
        let actualBmr: number;
        if (typeof bmr === "function") {
            actualBmr = bmr();
        } else {
            actualBmr = bmr;
        }
        const af = parseFloat(activityFactor);
        return actualBmr * af;
    }

    public static calculateAll(
        bmr: (() => number) | number
    ): Map<ActivityFactor, number | undefined> {
        let actualBmr: number;
        if (typeof bmr === "function") {
            actualBmr = bmr();
        } else {
            actualBmr = bmr;
        }
        return new Map([
            [
                ActivityFactor.Sedentary,
                actualBmr * parseFloat(ActivityFactor.Sedentary),
            ],
            [
                ActivityFactor.Light,
                actualBmr * parseFloat(ActivityFactor.Light),
            ],
            [
                ActivityFactor.Moderate,
                actualBmr * parseFloat(ActivityFactor.Moderate),
            ],
            [ActivityFactor.Very, actualBmr * parseFloat(ActivityFactor.Very)],
            [
                ActivityFactor.Extra,
                actualBmr * parseFloat(ActivityFactor.Extra),
            ],
        ]);
    }
}
