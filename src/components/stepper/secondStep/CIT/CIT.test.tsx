import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { dumpValues } from "../../../../test/dumpValues";
import CIT from "./CIT";

describe("SecondStep", () => {
    it("render with cit 19% button active", () => {
        const setValues = vi.fn()

        render(
            <CIT
                values={dumpValues}
                setValues={setValues}
            />
        )

        expect(screen.getByRole("button", { name: /cit 9/i })).not.toHaveClass("active")
        expect(screen.getByRole("button", { name: /cit 19/i })).toHaveClass("active")
    })

    it("calls setValues when click company button", async () => {
        const setValues = vi.fn()

        render(
            <CIT
                values={dumpValues}
                setValues={setValues}
            />
        )

        await userEvent.click(screen.getByRole("button", { name: /cit 9/i }))

        expect(setValues).toHaveBeenCalledWith({
            ...dumpValues,
            citType: "cit9"
        })
    })
})