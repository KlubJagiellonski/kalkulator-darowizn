import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { dumpValues } from "../../../test/dumpValues";
import SecondStep from "./SecondStep";

describe("SecondStep", () => {
    it("render pit", () => {
        const setValues = vi.fn()

        render(
            <SecondStep
                values={dumpValues}
                setValues={setValues}
            />
        )

        expect(screen.getByText(/Jak rozliczasz PIT?/i)).toBeInTheDocument()
    })

    it("render cit", () => {
        const setValues = vi.fn()
        const data = {...dumpValues}
        data.cit = true
        data.pit = false

        render(
            <SecondStep
                values={data}
                setValues={setValues}
            />
        )

        expect(screen.getByText(/Jaką stawką CIT się rozliczasz?/i)).toBeInTheDocument()
    })
})