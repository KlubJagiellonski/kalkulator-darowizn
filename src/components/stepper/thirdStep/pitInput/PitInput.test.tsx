import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { dumpValues } from "../../../../test/dumpValues";
import PitInput from "./PitInput";

describe("scale", () => {
    it.each([
        {
            text: "96000",
            inputText: "96 000",
            valueText: 9600,
        },
        {
            text: "0.",
            inputText: "0.",
            valueText: 0,
        },
        {
            text: "08",
            inputText: "0.8",
            valueText: 0.8,
        },
        {
            text: "120,9",
            inputText: "120.9",
            valueText: 120.9,
        },
        {
            text: "120.921",
            inputText: "120.92",
            valueText: 120.92,
        },
    ])(
        "updates input and values for $text",
        async ({ text, inputText, valueText }) => {
            const setValues = vi.fn()

            render(
                <PitInput
                    values={dumpValues}
                    setValues={setValues}
                    info=""
                    taxRate={2}
                    textEmpty=""
                    text=""
                    hint=""
                    title=""
                />
            )

            const input = screen.getByRole("textbox")

            await userEvent.clear(input)
            await userEvent.type(input, text)

            expect(input).toHaveValue(inputText)

            expect(setValues).toHaveBeenCalledWith({
                ...dumpValues,
                income: valueText
            })
        }
    )
})