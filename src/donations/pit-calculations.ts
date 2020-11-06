import { Result } from './types';

const SOCIAL_SECURITY_TOTAL: number = 1360;
const SOCIAL_SECURITY_FREE: number = 525.12;
const DONATION_RATE: number = 0.06;
const TAX_FREE: number = 8000;
const TAX_0: number = 13000;
const TAX_1_RATE: number = 0.17;
const TAX_1: number = 85528;
const TAX_2_RATE: number = 0.32;
const TAX_2: number = 127000;

export const calculateForPIT = (annualIncome: number): Result => {
    const donationSum = countDonationForPIT(annualIncome);
    const taxDeduction = countTax(annualIncome) - countTax(annualIncome - donationSum);

    return {
        donationSum,
        taxDeduction,
    };
};

const countDonationForPIT = (annualIncome: number): number =>
    annualIncome > TAX_FREE ? DONATION_RATE * annualIncome : 0;

const countTax = (annualIncome: number): number => {
    const getTaxFreeForFirstRate = (annualIncome: number): number =>
        SOCIAL_SECURITY_TOTAL -
        ((SOCIAL_SECURITY_TOTAL - SOCIAL_SECURITY_FREE) / (TAX_0 - TAX_FREE)) * (annualIncome - TAX_FREE);

    const getTaxFreeForSecondRate = (annualIncome: number): number =>
        SOCIAL_SECURITY_FREE - (SOCIAL_SECURITY_FREE / (TAX_2 - TAX_1)) * (annualIncome - TAX_1);

    if (annualIncome <= TAX_FREE) {
        return 0;
    } else if (annualIncome <= TAX_0) {
        const taxFree = getTaxFreeForFirstRate(annualIncome);
        return TAX_1_RATE * annualIncome - taxFree;
    } else if (annualIncome <= TAX_1) {
        return TAX_1_RATE * annualIncome - SOCIAL_SECURITY_FREE;
    } else if (annualIncome <= TAX_2) {
        const taxFree = getTaxFreeForSecondRate(annualIncome);
        return TAX_1_RATE * TAX_1 + TAX_2_RATE * (annualIncome - TAX_1) - taxFree;
    } else {
        return TAX_1_RATE * TAX_1 + TAX_2_RATE * (annualIncome - TAX_1);
    }
};
