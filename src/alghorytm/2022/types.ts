export enum Tax {
    'PIT' = 'PIT',
    'PPE' = 'PPE',
    'CIT' = 'CIT',
}

export enum IncomeType {
    'MONTHLY' = 'MONTHLY',
    'ANNUAL' = 'ANNUAL',
}

export interface Result {
    donationSum: number;
    taxDeduction: number;
}
