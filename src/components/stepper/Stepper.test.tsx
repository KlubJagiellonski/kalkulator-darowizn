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
      isValid: true
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

    expect(screen.getByText("1 · Pierwszy")).toHaveClass("checked")
    expect(screen.getByText("2 · Drugi")).toHaveClass("active")
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

    await userEvent.click(screen.getByTestId("step-2"))

    expect(setStep).toHaveBeenCalledWith(2)
  })

  it("disables the second and third dot", async () => {
    const setStep = vi.fn()

    render(
      <Stepper
        items={items}
        step={2}
        setStep={setStep}
      />
    )

    expect(screen.getByTestId("step-1")).not.toBeDisabled()
    expect(screen.getByTestId("step-2")).toBeDisabled()
    expect(screen.getByTestId("step-3")).toBeDisabled()
  })
})