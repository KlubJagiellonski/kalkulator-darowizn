import { expect } from 'chai';
import { calculateForCIT } from './cit-calculations';

interface ITestCase {
    annualIncome: number;
    donationSum: number;
    taxDeduction: number;
}

const testCase = (annualIncome: number, donationSum: number, taxDeduction: number): ITestCase => ({
    annualIncome,
    donationSum,
    taxDeduction,
});

describe('CIT calculations for annual income:', () => {
    [testCase(1, 0, 0), testCase(54000, 5400, 486), testCase(6000000, 600000, 114000)].forEach((test) => {
        it(`${test.annualIncome} zł`, () => {
            const result = calculateForCIT(test.annualIncome);
            expect(result.donationSum).equals(test.donationSum, 'incorrect donation sum');
            expect(result.taxDeduction).equals(test.taxDeduction, 'incorrect tax deduction');
        });
    });
});
