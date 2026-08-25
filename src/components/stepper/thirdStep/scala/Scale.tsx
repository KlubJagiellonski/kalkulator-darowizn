import { useState } from "react"
import type { ValuesProps } from "../../../../types/type"
import Input from "../../../UI/input/Input"
import "./Scale.scss"
import { formatInputValue } from "../../../../utils/formatInputValues"

function Scale({ values, setValues }: ValuesProps) {
    const { income } = values
    const [value, setValue] = useState(formatInputValue(`${income}`))

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

    return (
        <div className="scale">
            <div className="title-wrapper">
                <p className="number">03</p>
                <p className="title">Twój roczny dochód brutto</p>
            </div>
            <p className="info">Potrzebny wyłącznie do wyliczenia stawki i limitu 6%. Nigdzie go nie zapisujemy.</p>
            <div className="scale-content">
                <div className="hint-wrapper">
                    <p className="hint hint-prec">Twoja stawka: <span className="bold">12%</span></p>
                    <p className="hint">Limit odliczenia: <span className="bold">{(income * 0.06).toLocaleString("pl-PL", {
                        useGrouping: "always",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 2
                    })} zł</span> (6%<span className="des"> dochodu</span>)</p>
                </div>
                <div className="scale-input">
                    <Input value={value} onChange={handleChange} prefix="zł" />
                </div>
            </div>
        </div>
    )
}

export default Scale