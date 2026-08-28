import { useEffect, useState } from "react"
import type { ValuesProps } from "../../../../types/type"
import Input from "../../../UI/input/Input"
import "./PitInput.scss"
import { formatInputValue } from "../../../../utils/formatInputValues"
import Toggle from "../../../UI/toggle/Toggle"
import Hint from "../../../UI/hint/Hint"
import HintMessage from "../../../UI/hint/HintMessage"

interface PitInputProps extends ValuesProps {
    taxRate: number,
    info: string,
    textEmpty: string,
    text: string
    title: string
    hint: string
}

function PitInput({ values, setValues, taxRate, info, text, textEmpty, title, hint }: PitInputProps) {
    const { income, incomePeriod } = values
    const [value, setValue] = useState(formatInputValue(`${income ?? ""}`))
    const [showHint, setShowHint] = useState(false)

    useEffect(() => {
        if (values.income === undefined) {
            setValue("")
        }
    }, [values])

    const handleToggle = () => {
        const come = incomePeriod === "monthly"
            ? (income ?? 0) * 12
            : (income ?? 0) / 12

        setValues({
            ...values,
            incomePeriod: incomePeriod === "monthly" ? "yearly" : "monthly",
            income: come
        })

        setValue(formatInputValue(`${come.toFixed(2) ?? ""}`))
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

        if ((Number(sanitized) >= 100000000 && incomePeriod === "yearly") || (Number(sanitized) >= 100000000 / 12 && incomePeriod === "monthly")) {
            return
        }

        setValue(formatInputValue(sanitized))

        setValues({
            ...values,
            income: Number(sanitized)
        })
    }

    return (
        <div className="scale">
            <div className="title-wrapper">
                <p className="number">03</p>
                <p className="title">{title}</p>
                <Hint active={showHint} setActive={setShowHint} label="informacja o Przychodzie" />
                <div className="hint-message-1">
                    <HintMessage title="Dochód" text={hint} open={showHint} />
                </div>
            </div>
            <div className="info">{info}</div>
            <Toggle firstItem="Rocznie" secondItem="Miesięcznie" position={incomePeriod === "yearly" ? "first" : "second"} setPosition={handleToggle} />
            <div className="scale-content">
                <div className="scale-input">
                    <Input ariaLabel={title} value={value} placeholder="np. 96 000" onChange={handleChange} prefix="zł" />
                    <div className="hint-message-2">
                        <HintMessage title="Dochód" text={hint} open={showHint} />
                    </div>
                </div>
                <div className="scale-texts">
                    <p className={`brutto-text ${!value ? "active" : ""}`}>{textEmpty}</p>
                    <p className={`brutto-text brutto-text-2  ${value ? "active" : ""}`}>{text} {taxRate}%</p>
                </div>
            </div>
        </div>
    )
}

export default PitInput