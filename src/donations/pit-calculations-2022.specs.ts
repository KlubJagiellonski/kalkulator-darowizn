import { expect } from 'chai';
import { testCase } from 'src/utils/test-case';
import { calculateForPIT2022 } from './pit-calculations-2022';

describe('PIT 2022 calculations for annual income:', () => {
    [
        testCase(1, 0, 0),
        testCase(7998, 0, 0),
        testCase(29900, 0, 0),
        testCase(70000, 4200, 1344),
        testCase(168000, 10080, 3226),
        testCase(254000, 15240, 4877),
    ].forEach((test) => {
        it(`${test.annualIncome} zł`, () => {
            const result = calculateForPIT2022(test.annualIncome);
            expect(result.donationSum).equals(test.donationSum, 'incorrect donation sum');
            expect(result.taxDeduction).equals(test.taxDeduction, 'incorrect tax deduction');
        });
    });
});
