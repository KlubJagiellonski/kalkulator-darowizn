export type PITType = "scale" | "flat19" | "lumpSum"
export type CITType = "cit19" | "cit9"
export type IncomePeriod = "monthly" | "yearly"

export interface Values {
    cit: boolean,
    pit: boolean,
    pitType?: PITType,
    citType?: CITType,
    income?: number,
    lumpSum?: number
    incomePeriod?: IncomePeriod
}

export interface ValuesProps {
    values: Values
    setValues: (values: Values) => void
}