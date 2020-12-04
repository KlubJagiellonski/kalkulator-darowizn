export interface ITestCase {
    annualIncome: number;
    donationSum: number;
    taxDeduction: number;
}

export const testCase = (annualIncome: number, donationSum: number, taxDeduction: number): ITestCase => ({
    annualIncome,
    donationSum,
    taxDeduction,
});
