import { roundNumber } from '../../utils/numeric';
import { Result } from '../types';

const SOCIAL_SECURITY_FREE: number = 3600;
const DONATION_RATE: number = 0.06;
const TAX_FREE: number = 30000;
const TAX_1_RATE: number = 0.12;
const TAX_2: number = 120000;
const TAX_2_RATE: number = 0.32;

export const calculateForPIT2022 = (annualIncome: number): Result => {
    const donationSum = roundNumber(countDonationForPIT(annualIncome));
    const z1 = Math.round(countTax(annualIncome));
    const z2 = Math.round(countTax(annualIncome, donationSum));
    console.log({ z1, z2 });
    const taxDeduction = z1 - z2;

    return {
        donationSum,
        taxDeduction,
    };
};

const countDonationForPIT = (income: number): number => {
    const maxDonation = DONATION_RATE * income;
    let donation = 0;

    if (income - maxDonation >= TAX_FREE) {
        donation = maxDonation;
    } else if (income > TAX_FREE) {
        const taxableIncome = income - TAX_FREE;
        donation = Math.min(taxableIncome, maxDonation);
    }

    return donation;
};

const countTax = (income: number, donation: number = 0): number => {
    if (income <= TAX_FREE) {
        return 0;
    } else {
        const restIncome = income - donation;
        if (restIncome <= TAX_2) {
            return TAX_1_RATE * restIncome - SOCIAL_SECURITY_FREE;
        } else {
            return TAX_2_RATE * (restIncome - TAX_2) + 10800;
        }
    }
};
