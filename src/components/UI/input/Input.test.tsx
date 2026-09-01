import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import Input from "./Input"

describe("Input", () => {
    it("calls onChange with input value", async () => {
        const onChange = vi.fn()

        render(
            <Input
                value=""
                onChange={onChange}
            />
        )

        const input = screen.getByRole("textbox")

        await userEvent.type(input, "t")

        expect(onChange).toHaveBeenCalledWith("t")
    })
})