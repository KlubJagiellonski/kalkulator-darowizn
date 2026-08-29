import { describe, it, expect, vi } from 'vitest';
import { back } from './back';
import type { Values } from '../types/type';

describe('back', () => {
  it('should reset values when step is 1', () => {
    const setStep = vi.fn();
    const setValues = vi.fn();
    const values: Values = {
      pit: true,
      cit: false,
      citType: 'cit19',
      pitType: 'scale',
      donationPerid: 'monthly',
      income: 50000,
      incomePeriod: 'monthly',
      lumpSum: 10,
      donationAmount: 1000,
    };

    back({ step: 1, setStep, setValues, values });

    expect(setValues).toHaveBeenCalledWith({
      ...values,
      citType: undefined,
      pitType: undefined,
      donationPerid: 'once',
      income: undefined,
      incomePeriod: 'yearly',
      lumpSum: undefined,
      donationAmount: 500,
    });
    expect(setStep).toHaveBeenCalledWith(1);
  });

  it('should reset values when step is 2', () => {
    const setStep = vi.fn();
    const setValues = vi.fn();
    const values: Values = {
      pit: true,
      cit: false,
      citType: undefined,
      pitType: 'scale',
      donationPerid: 'monthly',
      income: 50000,
      incomePeriod: 'monthly',
      lumpSum: undefined,
      donationAmount: 1000,
    };

    back({ step: 2, setStep, setValues, values });

    expect(setValues).toHaveBeenCalledWith({
      ...values,
      donationPerid: 'once',
      income: undefined,
      incomePeriod: 'yearly',
      donationAmount: 500,
    });
    expect(setStep).toHaveBeenCalledWith(2);
  });

  it('should reset values when step is 3', () => {
    const setStep = vi.fn();
    const setValues = vi.fn();
    const values: Values = {
      pit: true,
      cit: false,
      citType: undefined,
      pitType: 'scale',
      donationPerid: 'monthly',
      income: 50000,
      incomePeriod: 'yearly',
      lumpSum: 10,
      donationAmount: 1000,
    };

    back({ step: 3, setStep, setValues, values });

    expect(setValues).toHaveBeenCalledWith({
      ...values,
      donationPerid: 'once',
      lumpSum: undefined,
      donationAmount: 500,
    });
    expect(setStep).toHaveBeenCalledWith(3);
  });

  it('should not reset values when step is not 1, 2 or 3', () => {
    const setStep = vi.fn();
    const setValues = vi.fn();
    const values: Values = {
      pit: true,
      cit: false,
      citType: undefined,
      pitType: 'scale',
      donationPerid: 'once',
      income: undefined,
      incomePeriod: 'yearly',
      lumpSum: undefined,
      donationAmount: 500,
    };

    back({ step: 4, setStep, setValues, values });

    expect(setValues).not.toHaveBeenCalled();
    expect(setStep).toHaveBeenCalledWith(4);
  });

  it('should reset donationAmount to 500', () => {
    const setStep = vi.fn();
    const setValues = vi.fn();
    const values: Values = {
      pit: true,
      cit: false,
      citType: undefined,
      pitType: undefined,
      donationPerid: 'once',
      income: undefined,
      incomePeriod: 'yearly',
      lumpSum: undefined,
      donationAmount: 9999,
    };

    back({ step: 1, setStep, setValues, values });

    const call = setValues.mock.calls[0][0];
    expect(call.donationAmount).toBe(500);
  });

  it('should reset incomePeriod to yearly', () => {
    const setStep = vi.fn();
    const setValues = vi.fn();
    const values: Values = {
      pit: true,
      cit: false,
      citType: undefined,
      pitType: undefined,
      donationPerid: 'monthly',
      income: 50000,
      incomePeriod: 'monthly',
      lumpSum: undefined,
      donationAmount: 1000,
    };

    back({ step: 1, setStep, setValues, values });

    const call = setValues.mock.calls[0][0];
    expect(call.incomePeriod).toBe('yearly');
  });
});