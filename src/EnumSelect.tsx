import { FormControl, InputLabel, MenuItem, Select, SelectProps } from "@mui/material";

function getEnumKeyValuePairs<EnumT extends string, EnumValueT extends string | number>(enumVariable: { [key in EnumT]: EnumValueT }): [
    string,
    string | number
][] {
    const numericKeys = Object.entries(enumVariable).filter((e) => {
        return typeof e[0] === "string" && typeof e[1] !== "string";
    });
    const isNumericEnum = numericKeys.length > 0;
    if (isNumericEnum) {
        const kvps: [string, string | number][] = Object.entries<EnumValueT>(enumVariable)
            .filter((e) => {
                return typeof e[0] === "string" && typeof e[1] !== "string";
            })
            .map((kvp) => [kvp[0], kvp[1]]);
        return kvps;
    } else {
        const keys = Object.entries<EnumValueT>(enumVariable);
        return keys;
    }
}

export type EnumSelectProps<EnumT extends string | number, EnumValueT extends string | number> = SelectProps<EnumValueT> & {
    enumVariable: { [key in EnumT]: EnumValueT };
    mapper?: (key: { [key in EnumT]: EnumValueT }) => string;
};

export const EnumSelect = <T extends string | number, TEnumValue extends string | number>({
    enumVariable,
    mapper,
    ...props
}: EnumSelectProps<T, TEnumValue>) => {
    return (
        <FormControl>
            <InputLabel id={`${props.label}`}>{props.label}</InputLabel>
            <Select labelId={`${props.label}`} {...props}>
                {getEnumKeyValuePairs(enumVariable).map(([key, value]: [string, string | number], index: number) => {
                    return (
                        <MenuItem key={index} value={value}>
                            {/* TODO: MAke this mapper work so we can have custom strings in there */}
                            {/* {mapper ? mapper(key) : key} */}
                            {key}
                        </MenuItem>
                    );
                })}
            </Select>
        </FormControl>
    );
};
