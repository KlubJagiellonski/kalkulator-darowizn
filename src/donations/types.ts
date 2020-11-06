export enum Tax {
    'PIT' = 'PIT',
    'CIT' = 'CIT',
}

export enum IncomeType {
    'MONTHLY' = 'MONTHLY',
    'ANNUAL' = 'ANNUAL',
}

export interface Result {
    donationSum: number; 
    taxDeduction: number;
};