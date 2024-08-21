import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectProps,
} from "@mui/material";

function getEnumKeys<
    EnumT extends string,
    EnumValueT extends string | number
>(enumVariable: { [key in EnumT]: EnumValueT }) {
    return Object.keys(enumVariable) as Array<EnumT>;
}

export type EnumSelectProps<
    EnumT extends string,
    EnumValueT extends string | number
> = SelectProps<EnumValueT> & {
    enumVariable: { [key in EnumT]: EnumValueT };
};

export const EnumSelect = <
    T extends string,
    TEnumValue extends string | number
>({
    enumVariable,
    ...props
}: EnumSelectProps<T, TEnumValue>) => {
    return (
        <FormControl>
            <InputLabel id={`${props.label}`}>{props.label}</InputLabel>
            <Select labelId={`${props.label}`} {...props}>
                {getEnumKeys(enumVariable).map((key, index) => {
                    return (
                        <MenuItem key={index} value={enumVariable[key]}>
                            {key}
                        </MenuItem>
                    );
                })}
            </Select>
        </FormControl>
    );
};
