import { Result } from './types';

const EUR_PLN_RATE = 4.57;
const DONATION_RATE: number = 0.1;
const TAX_1_RATE: number = 0.09;
const TAX_THRESHOLD: number = 1200000 * EUR_PLN_RATE;
const TAX_2_RATE: number = 0.19;

export const calculateForCIT = (annualIncome: number): Result => {
    const donationSum = countDonationForCIT(annualIncome);
    const taxDeduction = countDeductionForCIT(annualIncome);

    return {
        donationSum,
        taxDeduction,
    };
};

const countDonationForCIT = (annualIncome: number): number => DONATION_RATE * annualIncome;

const countDeductionForCIT = (annualIncome: number): number =>
    annualIncome <= TAX_THRESHOLD
        ? TAX_1_RATE * countDonationForCIT(annualIncome)
        : TAX_1_RATE * countDonationForCIT(TAX_THRESHOLD) +
          TAX_2_RATE * countDonationForCIT(annualIncome - TAX_THRESHOLD);
