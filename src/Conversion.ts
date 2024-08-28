export class Convert {
    static Constants = class {
        public static InchesPerFoot = 12;
    };

    public static CmToFeet(cms: number): number {
        return cms / 30.48;
    }

    public static CmToInches(cms: number): number {
        return cms / 2.54;
    }

    public static CmToFeetAndInches(cms: number): { foot: number; inches: number } {
        const totalInches = Convert.CmToInches(cms);
        const feet = Math.floor(totalInches / Convert.Constants.InchesPerFoot);
        const inches = totalInches - Convert.Constants.InchesPerFoot * feet;
        return { inches: inches, foot: feet };
    }

    public static FeetToInches(ft: number): number {
        return ft * Convert.Constants.InchesPerFoot;
    }
}
