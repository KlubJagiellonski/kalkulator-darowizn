import { Result } from './types';

const EUR_PLN_RATE = 4.5153;
const DONATION_RATE: number = 0.1;
const TAX_1_RATE: number = 0.09;
const TAX_THRESHOLD: number = 1200000 * EUR_PLN_RATE;
const TAX_2_RATE: number = 0.19;

export const calculateForCIT = (annualIncome: number): Result => {
    const donationSum = Math.round(countDonationForCIT(annualIncome));
    const taxDeduction = Math.round(countDeductionForCIT(annualIncome));

    return {
        donationSum,
        taxDeduction,
    };
};

const countDonationForCIT = (income: number): number => {
    const donation = DONATION_RATE * income;
    return donation;
};

const countDeductionForCIT = (income: number): number => {
    const deduction =
        income <= TAX_THRESHOLD
            ? TAX_1_RATE * countDonationForCIT(income)
            : TAX_1_RATE * countDonationForCIT(TAX_THRESHOLD) +
              TAX_2_RATE * countDonationForCIT(income - TAX_THRESHOLD);

    return deduction;
};
