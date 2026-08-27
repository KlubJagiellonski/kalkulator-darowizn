import { useState } from "react"
import type { ValuesProps } from "../../../../types/type"
import Input from "../../../UI/input/Input"
import "./Scale.scss"
import { formatInputValue } from "../../../../utils/formatInputValues"
import Toggle from "../../../UI/toggle/Toggle"
import Hint from "../../../UI/hint/Hint"
import HintMessage from "../../../UI/hint/HintMessage"

function Scale({ values, setValues }: ValuesProps) {
    const { income, incomePeriod } = values
    const [value, setValue] = useState(formatInputValue(`${income ?? ""}`))
    const [showHint, setShowHint] = useState(false)

    const handleToggle = () => {
        setValues({
            ...values,
            incomePeriod: incomePeriod === "monthly" ? "yearly" : "monthly"
        })
    }

    const handleChange = (value: string | number) => {
        let sanitized = `${value}`
            .replace(",", ".")
            .replace(/[^\d.]/g, "")
            .replace(/(\..*)\./g, "$1")

        if (sanitized.startsWith(".")) {
            sanitized = `0${sanitized}`
        }

        if (
            sanitized.length > 1 &&
            sanitized.startsWith("0") &&
            !sanitized.startsWith("0.")
        ) {
            sanitized = `0.${sanitized.slice(1)}`
        }

        if (sanitized.includes(".")) {
            const [integer, decimal] = sanitized.split(".")
            sanitized = `${integer}.${decimal.slice(0, 2)}`
        }

        setValue(formatInputValue(sanitized))

        setValues({
            ...values,
            income: Number(sanitized)
        })
    }

    const yearlyIncome = incomePeriod === "monthly"
        ? income && income * 12
        : income

    const taxRate = (yearlyIncome ?? 0) > 120000 ? 32 : 12

    return (
        <div className="scale">
            <div className="title-wrapper">
                <p className="number">03</p>
                <p className="title">Twój roczny dochód brutto</p>
                <Hint active={showHint} setActive={setShowHint} id="income-hint" />
                <div className="hint-message-1">
                    <HintMessage title="Dochód" text="Przychód pomniejszony o koszty jego uzyskania. To od dochodu liczy się podatek — i to on wyznacza limit odliczenia darowizn (6% dla osób prywatnych)." open={showHint} />
                </div>
            </div>
            <div className="info">Potrzebny wyłącznie do wyliczenia stawki i limitu 6%.</div>
            <Toggle firstItem="Rocznie" secondItem="Miesięcznie" position={incomePeriod === "yearly" ? "first" : "second"} setPosition={handleToggle} />
            <div className="scale-content">
                <div className="scale-input">
                    <Input value={value} placeholder="np. 96 000" onChange={handleChange} prefix="zł" />
                    <div className="hint-message-2">
                        <HintMessage title="Dochód" text="Przychód pomniejszony o koszty jego uzyskania. To od dochodu liczy się podatek — i to on wyznacza limit odliczenia darowizn (6%)." open={showHint} />                    </div>
                </div>
                <div className="scale-texts">
                    <p className={`brutto-text ${value === "" ? "active" : ""}`}>Kwota brutto, przed odliczeniem składek.</p>
                    <p className={`brutto-text brutto-text-2  ${value !== "" ? "active" : ""}`}>Twoja stawka podatku: {taxRate}%</p>
                </div>
            </div>
        </div>
    )
}

export default Scale