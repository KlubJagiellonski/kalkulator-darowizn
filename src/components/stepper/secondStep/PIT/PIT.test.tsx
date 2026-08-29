import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { dumpValues } from "../../../../test/dumpValues";
import PIT from "./PIT";

describe("SecondStep", () => {
    it("render with flat 19 button active", () => {
        const setValues = vi.fn()
        const data = { ...dumpValues }
        data.pitType = "flat19"

        render(
            <PIT
                values={data}
                setValues={setValues}
            />
        )

        expect(screen.getByRole("button", { name: /skala/i })).not.toHaveClass("active")
        expect(screen.getByRole("button", { name: "ryczałt" })).not.toHaveClass("active")
        expect(screen.getByRole("button", { name: /liniowy/i })).toHaveClass("active")
    })

    it("calls setValues when click company button", async () => {
        const setValues = vi.fn()

        render(
            <PIT
                values={dumpValues}
                setValues={setValues}
            />
        )

        await userEvent.click(screen.getByRole("button", { name: /liniowy/i }))

        expect(setValues).toHaveBeenCalledWith({
            ...dumpValues,
            pitType: "flat19"
        })
    })
})