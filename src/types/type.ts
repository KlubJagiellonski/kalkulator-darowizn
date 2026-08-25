export type PITType = "scale" | "flat19" | "lumpSum"
export type CITType = "cit19" | "cit9"

export interface Values {
    cit: boolean,
    pit: boolean,
    pitType?: PITType,
    citType?: CITType,
    income: number,
}

export interface ValuesProps {
    values: Values
    setValues: (values: Values) => void
}