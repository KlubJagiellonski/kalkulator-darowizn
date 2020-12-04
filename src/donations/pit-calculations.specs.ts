import { expect } from 'chai';
import { testCase } from 'src/utils/test-case';
import { calculateForPIT } from './pit-calculations';

describe('PIT calculations for annual income:', () => {
    [
        testCase(1, 0, 0),
        testCase(7998, 0, 0),
        testCase(8040, 40, 13),
        testCase(12000, 720, 243),
        testCase(13200, 792, 233),
        testCase(84960, 5098, 867),
        testCase(86400, 5184, 1023),
        testCase(120000, 7200, 2395),
        testCase(132000, 7920, 2571),
        testCase(168000, 10080, 3226),
        testCase(254000, 15240, 4877),
    ].forEach((test) => {
        it(`${test.annualIncome} zł`, () => {
            const result = calculateForPIT(test.annualIncome);
            expect(result.donationSum).equals(test.donationSum, 'incorrect donation sum');
            expect(result.taxDeduction).equals(test.taxDeduction, 'incorrect tax deduction');
        });
    });
});
