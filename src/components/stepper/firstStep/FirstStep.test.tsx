import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import FirstStep from "./FirstStep";
import { dumpValues } from "../../../test/dumpValues";

describe("FirstStep", () => {
    it("render with private person button active", () => {
        const setValues = vi.fn()

        render(
            <FirstStep
                values={dumpValues}
                setValues={setValues}
            />
        )

        expect(screen.getByRole("button", { name: /firma/i })).not.toHaveClass("active")
        expect(screen.getByRole("button", { name: /osoba prywatna/i })).toHaveClass("active")
    })

    it("calls setValues when click company button", async () => {
        const setValues = vi.fn()

        render(
            <FirstStep
                values={dumpValues}
                setValues={setValues}
            />
        )

        await userEvent.click(screen.getByRole("button", { name: /firma/i }))
        expect(setValues).toHaveBeenCalledWith({
            ...dumpValues,
            pit: false,
            cit: true
        })
    })
})