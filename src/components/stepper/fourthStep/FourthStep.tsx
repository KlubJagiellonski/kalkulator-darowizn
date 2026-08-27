import { useState } from "react"
import type { ValuesProps } from "../../../types/type"
import { formatInputValue } from "../../../utils/formatInputValues"
import Input from "../../UI/input/Input"
import Toggle from "../../UI/toggle/Toggle"
import "./FourthStep.scss"

function FourthStep({ values, setValues }: ValuesProps) {
    const prices = [200, 500, 1000, 2500]
    const [value, setValue] = useState("")
    const [price, setPrice] = useState<null | number>(500)

    const { donationPerid } = values

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

        if ((Number(sanitized) >= 100000000)) {
            return
        }

        setPrice(null)

        setValue(formatInputValue(sanitized))

        setValues({
            ...values,
            donationAmount: Number(sanitized)
        })
    }

    const handleClick = (count: number) => {
        setPrice(count)
        setValue("")
    }

    const handleToggle = () => {
        
        setValues({
            ...values,
            donationPerid: donationPerid === "once" ? "monthly" : "once"
        })
    }

    return (
        <div className="count-step step-content">
            <div className="title-wrapper">
                <p className="number">04</p>
                <p className="title">Ile chcesz przekazać?</p>
            </div>
            <Toggle firstItem="Jednorazowo" secondItem="Co miesiąc" position={donationPerid === "once" ? "first" : "second"} setPosition={handleToggle} />
            <div className="prices">
                {
                    prices.map(count => <button onClick={() => handleClick(count)} key={count} className={`price-btn ${price === count ? "active" : ""}`}>{count} zł</button>)
                }
                <div className="count-input">
                    <Input onChange={handleChange} value={value} placeholder="własna kwota" prefix="zł" />
                </div>
            </div>
        </div>
    )
}

export default FourthStep