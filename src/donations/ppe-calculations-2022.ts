import { Result } from './types';

const DONATION_RATE: number = 0.06;

export const calculateForPPE2022 = (annualIncome: number, taxRatePercentage: number): Result => {
    const donationSum = Math.round(countDonationForPPE(annualIncome));
    const taxDeduction = Math.round(
        countTax(annualIncome, taxRatePercentage) - countTax(annualIncome - donationSum, taxRatePercentage),
    );

    return {
        donationSum,
        taxDeduction,
    };
};

const countDonationForPPE = (income: number): number => {
    let donation = DONATION_RATE * income;
    return donation;
};

const countTax = (income: number, taxRatePercentage: number): number => {
    return (income * taxRatePercentage) / 100;
};
