export type PITType = "scale" | "flat19" | "lumpSum"

export interface Values {
    cit: boolean,
    pit: boolean,
    pitType: PITType
}