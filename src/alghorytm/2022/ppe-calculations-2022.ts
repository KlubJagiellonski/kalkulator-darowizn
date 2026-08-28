import type { Result } from "./types"

const DONATION_RATE = 0.06

export const calculateForPPE2022 = (
    annualIncome: number,
    taxRatePercentage: number,
    donationAmount: number,
    donationRate: number = DONATION_RATE
): Result => {
    const donationSum = Math.round(
        countDonationForPPE(annualIncome, donationRate)
    )

    const deductibleAmount = Math.min(
        donationAmount,
        donationSum
    )

    const taxDeduction = Math.round(
        countTax(annualIncome, taxRatePercentage) -
        countTax(
            annualIncome - deductibleAmount,
            taxRatePercentage
        )
    )

    return {
        donationSum,
        taxDeduction,
    }
}

const countDonationForPPE = (
    income: number,
    donationRate: number
): number => {
    return donationRate * income
}

const countTax = (
    income: number,
    taxRatePercentage: number
): number => {
    return (income * taxRatePercentage) / 100
}