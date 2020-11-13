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
    const donationSum = Math.round(countDonationForPIT(annualIncome));
    const taxDeduction = Math.round(countTax(annualIncome) - countTax(annualIncome - donationSum));

    return {
        donationSum,
        taxDeduction,
    };
};

const countDonationForPIT = (income: number): number => {
    let donation = 0;
    if (income > TAX_FREE) {
        if ((1 - DONATION_RATE) * income > TAX_FREE) {
            donation = DONATION_RATE * income;
        } else {
            donation = income - TAX_FREE;
        }
    }

    return donation;
};

const countTax = (income: number): number => {
    const getTaxFreeForFirstRate = (income: number): number =>
        SOCIAL_SECURITY_TOTAL -
        ((SOCIAL_SECURITY_TOTAL - SOCIAL_SECURITY_FREE) / (TAX_0 - TAX_FREE)) * (income - TAX_FREE);

    const getTaxFreeForSecondRate = (income: number): number =>
        SOCIAL_SECURITY_FREE - (SOCIAL_SECURITY_FREE / (TAX_2 - TAX_1)) * (income - TAX_1);

    let tax = 0;
    if (income <= TAX_FREE) {
        return 0;
    } else if (income <= TAX_0) {
        const taxFree = getTaxFreeForFirstRate(income);
        tax = TAX_1_RATE * income - taxFree;
    } else if (income <= TAX_1) {
        tax = TAX_1_RATE * income - SOCIAL_SECURITY_FREE;
    } else if (income <= TAX_2) {
        const taxFree = getTaxFreeForSecondRate(income);
        tax = TAX_1_RATE * TAX_1 + TAX_2_RATE * (income - TAX_1) - taxFree;
    } else {
        tax = TAX_1_RATE * TAX_1 + TAX_2_RATE * (income - TAX_1);
    }

    return tax;
};
