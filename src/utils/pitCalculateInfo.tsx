import type { ReactNode } from "react"
import type { Values } from "../types/type"
import { formatInputValue } from "./formatInputValues"

export const getPit32CalculateInfo = (
    values: Values,
    taxDeduction: number,
    _taxRate: number
): ReactNode => {
    const annualIncome =
        values.incomePeriod === "monthly"
            ? (values.income ?? 0) * 12
            : (values.income ?? 0)

    const donationAmount = values.donationAmount ?? 0

    const incomeAboveThreshold = Math.max(
        0,
        annualIncome - 120000
    )

    const amountAt32 = Math.min(
        donationAmount,
        incomeAboveThreshold
    )

    const amountAt12 = Math.max(
        0,
        donationAmount - amountAt32
    )

    return (
        <>
            {formatInputValue(`${annualIncome}`)} zł − 120 000 zł ={" "}
            {formatInputValue(`${incomeAboveThreshold}`)} zł
            <br />

            {formatInputValue(`${donationAmount}`)} zł −{" "}
            {formatInputValue(`${amountAt32}`)} zł ={" "}
            {formatInputValue(`${amountAt12}`)} zł
            <br />

            {formatInputValue(`${amountAt32}`)} zł × 32% +{" "}
            {formatInputValue(`${amountAt12}`)} zł × 12% ={" "}
            {formatInputValue(`${taxDeduction}`)} zł niższego podatku
        </>
    )
}

export const getCalculateInfo = (
    values: Values,
    taxDeduction: number,
    taxRate: number
): ReactNode => {

    return (
        <>
            {formatInputValue(`${values.donationAmount}`)} zł
            {" "}odliczenia × {taxRate}% ={" "}
            {formatInputValue(`${taxDeduction}`)} zł
            {" "}niższego podatku
        </>
    )
}