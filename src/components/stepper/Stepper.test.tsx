import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import Stepper from "./Stepper";

describe("Stepper", () => {
  const items = [
    {
      children: <div>Content 1</div>,
      title: "Pierwszy krok",
      subtitle: "Opis pierwszego kroku",
      name: "Pierwszy",
    },
    {
      children: <div>Content 2</div>,
      title: "Drugi krok",
      subtitle: "Opis drugiego kroku",
      name: "Drugi",
    },
    {
      children: <div>Content 3</div>,
      title: "Trzeci krok",
      subtitle: "Opis trzeciego kroku",
      name: "Trzeci",
    },
  ]

  it("renders current step", () => {
    render(
      <Stepper
        items={items}
        step={2}
        setStep={vi.fn()}
      />
    )

    expect(screen.getByText(/KROK 2 Z 3/i)).toBeInTheDocument()

    expect(screen.getByText("Drugi krok")).not.toHaveClass("l")
    expect(screen.getByText("Drugi krok")).not.toHaveClass("r")

    expect(screen.getByText("Opis drugiego kroku")).not.toHaveClass("l")
    expect(screen.getByText("Opis drugiego kroku")).not.toHaveClass("r")

    expect(screen.getByText("2 · Drugi")).toHaveClass("active")
  })

  it("calls setStep with next step", async () => {
    const setStep = vi.fn()

    render(
      <Stepper
        items={items}
        step={1}
        setStep={setStep}
      />
    )

    await userEvent.click(screen.getByRole("button", { name: /Dalej/i }))

    expect(setStep).toHaveBeenCalledWith(2)
  })

  it("calls setStep with previous step", async () => {
    const setStep = vi.fn()

    render(
      <Stepper
        items={items}
        step={2}
        setStep={setStep}
      />
    )

    await userEvent.click(screen.getByRole("button", { name: /Wstecz/i }))

    expect(setStep).toHaveBeenCalledWith(1)
  })

  it("disables back button on first step", () => {
    render(
      <Stepper
        items={items}
        step={1}
        setStep={vi.fn()}
      />
    )

    expect(
      screen.getByRole("button", { name: /Wstecz/i })
    ).toBeDisabled()
  })

  it("disables next button on last step", () => {
    render(
      <Stepper
        items={items}
        step={3}
        setStep={vi.fn()}
      />
    )

    expect(
      screen.getByRole("button", { name: /Dalej/i })
    ).toBeDisabled()
  })

  it("changes step when clicking a dot", async () => {
    const setStep = vi.fn()

    render(
      <Stepper
        items={items}
        step={1}
        setStep={setStep}
      />
    )

    await userEvent.click(screen.getByTestId("step-3"))

    expect(setStep).toHaveBeenCalledWith(3)
  })
})