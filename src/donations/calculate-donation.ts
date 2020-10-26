import { Tax, Result } from './types';

const SOCIAL_SECURITY_RATE: number = 1 - 0.0775;
const PIT_DONATION_RATE: number = 0.06;
const FREE_PIT_THRESHOLD: number = 8000;
const ZERO_PIT_THRESHOLD: number = 13000;
const FIRST_PIT_RATE: number = 0.17;
const FIRST_PIT_THRESHOLD: number = 85528;
const SOCOND_PIT_RATE: number = 0.32;
const SECOND_PIT_THRESHOLD: number = 127000;

const CIT_DONATION_RATE: number = 0.1;
const FIRST_CIT_RATE: number = 0.09;
const FIRST_CIT_THRESHOLD: number = 1200000 * 4.57;
const SOCOND_CIT_RATE: number = 0.19;

export const calculateDonation = (income: number, taxType: Tax): Result => {
    const donationSum = getDonation(income, taxType);
    const taxDeduction =
        taxType === Tax.PIT ? countDeductionForPIT(income) + getTaxFreeIncome(income) : countDeductionForCIT(income);

    return {
        donationSum,
        taxDeduction,
    };
};

const getDonation = (annualSalary: number, taxType: Tax) =>
    taxType === Tax.PIT ? PIT_DONATION_RATE * annualSalary : CIT_DONATION_RATE * annualSalary;

const countDeductionForPIT = (annualSalary: number): number =>
    annualSalary <= FIRST_PIT_THRESHOLD
        ? FIRST_PIT_RATE * getDonation(annualSalary, Tax.PIT) * SOCIAL_SECURITY_RATE
        : FIRST_PIT_RATE * getDonation(FIRST_PIT_THRESHOLD, Tax.PIT) * SOCIAL_SECURITY_RATE +
          SOCOND_PIT_RATE * getDonation(annualSalary - FIRST_PIT_THRESHOLD, Tax.PIT) * SOCIAL_SECURITY_RATE;

const countDeductionForCIT = (annualIncome: number): number =>
    annualIncome <= FIRST_CIT_THRESHOLD
        ? FIRST_CIT_RATE * getDonation(annualIncome, Tax.CIT)
        : FIRST_CIT_RATE * getDonation(FIRST_CIT_THRESHOLD, Tax.CIT) +
          SOCOND_CIT_RATE * getDonation(annualIncome - FIRST_CIT_THRESHOLD, Tax.PIT);

const getTaxFreeIncome = (annualIncomePIT: number) => {
    let taxFree = annualIncomePIT < FREE_PIT_THRESHOLD ? annualIncomePIT : FREE_PIT_THRESHOLD;

    if (annualIncomePIT <= ZERO_PIT_THRESHOLD) {
        const taxBase = annualIncomePIT - FREE_PIT_THRESHOLD;
        taxFree += 1360 - 834.88 * (taxBase / (ZERO_PIT_THRESHOLD - FREE_PIT_THRESHOLD));
    }
    if (annualIncomePIT <= FIRST_PIT_THRESHOLD) {
        taxFree += 525.12;
    }
    if (annualIncomePIT <= SECOND_PIT_THRESHOLD) {
        const taxBase = annualIncomePIT - FIRST_PIT_THRESHOLD;
        taxFree += 525.12 - 525.12 * (taxBase / (SECOND_PIT_THRESHOLD - FIRST_PIT_THRESHOLD));
    }

    return taxFree;
};
