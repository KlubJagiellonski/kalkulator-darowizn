import { describe, expect, it } from "vitest"
import { formatInputValue } from "./formatInputValues"

describe("formatInputValue", () => {
    it.each([
        ["0", "0"],
        ["12", "12"],
        ["123", "123"],
        ["1234", "1 234"],
        ["12345", "12 345"],
        ["123456", "123 456"],
        ["1234567", "1 234 567"],
    ])("formats integer %s as %s", (value, expected) => {
        expect(formatInputValue(value)).toBe(expected)
    })

    it.each([
        ["0.", "0."],
        ["0.5", "0.5"],
        ["12.34", "12.34"],
        ["1234.56", "1 234.56"],
        ["1234567.89", "1 234 567.89"],
    ])("formats decimal %s as %s", (value, expected) => {
        expect(formatInputValue(value)).toBe(expected)
    })
})