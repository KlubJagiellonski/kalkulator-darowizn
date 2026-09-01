import type { Result } from './types';

const SOCIAL_SECURITY_FREE = 3600;
const DONATION_RATE = 0.06;
const TAX_FREE = 30000;
const TAX_1_RATE = 0.12;
const TAX_2 = 120000;
const TAX_2_RATE = 0.32;

export const calculateForPIT2022 = (
    annualIncome: number,
    donationAmount: number = 0
): Result => {
    const donationSum = Math.round(
        countDonationForPIT(annualIncome)
    );

    const deductibleAmount = Math.min(
        donationAmount,
        donationSum
    );

    const z1 = Math.round(
        countTax(annualIncome)
    );

    const z2 = Math.round(
        countTax(annualIncome, deductibleAmount)
    );

    const taxDeduction = Math.max(
        0,
        z1 - z2
    );

    return {
        donationSum,
        taxDeduction,
    };
};

const countDonationForPIT = (income: number): number => {
    const maxDonation = DONATION_RATE * income;

    if (income - maxDonation >= TAX_FREE) {
        return maxDonation;
    }

    if (income > TAX_FREE) {
        return income - TAX_FREE;
    }

    return 0;
};

const countTax = (
    income: number,
    donation: number = 0
): number => {
    if (income <= TAX_FREE) {
        return 0;
    }

    const restIncome = income - donation;

    if (restIncome <= TAX_2) {
        return TAX_1_RATE * restIncome - SOCIAL_SECURITY_FREE;
    }

    return TAX_2_RATE * (restIncome - TAX_2) + 10800;
};