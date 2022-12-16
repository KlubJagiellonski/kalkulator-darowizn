import { expect } from 'chai';
import { testCase } from 'src/utils/test-case';
import { calculateForPIT2022 } from './pit-calculations-2022';

describe('PIT 2022 calculations for annual income:', () => {
    [
        testCase(7998, 0, 0),
        testCase(8040, 0, 0),
        testCase(12000, 0, 0),
        testCase(13200, 0, 0),
        testCase(29900, 0, 0),
        testCase(30001, 0, 0),
        testCase(36000, 2160, 259),
        testCase(70000, 4200, 504),
        testCase(84960, 5098, 612),
        testCase(86400, 5184, 622),
        testCase(100000, 6000, 720),
        testCase(100001, 6000, 720),
        testCase(120000, 7200, 864),
        testCase(120001, 7200, 864),
        testCase(128000, 7680, 2458),
        testCase(132000, 7920, 2534),
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
