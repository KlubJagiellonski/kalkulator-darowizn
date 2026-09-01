import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import Toggle from "./Toggle";

describe("Toggle", () => {
    it("calls setPosition with 'first' after clicking simple mode", async () => {
        const setPosition = vi.fn();

        render(
            <Toggle position="second" setPosition={setPosition} firstItem="Tryb prosty" secondItem="Tryb rozszerzony"/>
        );

        await userEvent.click(
            screen.getByRole("button", { name: "Tryb prosty" })
        );

        expect(setPosition).toHaveBeenCalledWith("first");
    })

    it("calls setPosition with 'second' after clicking extended mode", async () => {
        const setPosition = vi.fn();

        render(
            <Toggle position="second" setPosition={setPosition} firstItem="Tryb prosty" secondItem="Tryb rozszerzony" />
        );

        await userEvent.click(
            screen.getByRole("button", { name: "Tryb rozszerzony" })
        );

        expect(setPosition).toHaveBeenCalledWith("second");
    })
})