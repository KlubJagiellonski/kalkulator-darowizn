import { Result } from './types';

const SOCIAL_SECURITY_FREE: number = 3600;
const DONATION_RATE: number = 0.06;
const TAX_FREE: number = 30000;
const TAX_1_RATE: number = 0.12;
const TAX_2: number = 120000;
const TAX_2_RATE: number = 0.32;

export const calculateForPIT2022 = (annualIncome: number): Result => {
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
    if (income <= TAX_FREE) {
        return 0;
    } else if (income <= TAX_2) {
        return TAX_1_RATE * TAX_2 + TAX_2_RATE * (income - TAX_2) - SOCIAL_SECURITY_FREE;
    } else {
        return TAX_1_RATE * TAX_2 + TAX_2_RATE * (income - TAX_2);
    }
};
