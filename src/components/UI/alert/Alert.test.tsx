import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Alert from "./Alert";

describe("Alert", () => {
    it("rendering close alert", () => {
        render(<Alert shortText="short text" text="text" title="title" />)

        expect(screen.getByTestId("alert")).toHaveClass("close")
    })

    it("rendering open alert", () => {
        render(<Alert shortText="short text" show text="text" title="title" />)

        expect(screen.getByTestId("alert")).toHaveClass("open")
    })
})