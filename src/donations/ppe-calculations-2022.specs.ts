import { expect } from 'chai';
import { testCase } from 'src/utils/test-case';
import { calculateForPPE2022 } from './ppe-calculations-2022';

describe('PPE 2022 calculations for annual income:', () => {
    [
        testCase(8040, 482, 58),
        testCase(86400, 5184, 622),
        testCase(168000, 10080, 1210),
        testCase(254000, 15240, 1829),
    ].forEach((test) => {
        it(`${test.annualIncome} zł`, () => {
            const result = calculateForPPE2022(test.annualIncome, 12);
            expect(result.donationSum).equals(test.donationSum, 'incorrect donation sum');
            expect(result.taxDeduction).equals(test.taxDeduction, 'incorrect tax deduction');
        });
    });
});
