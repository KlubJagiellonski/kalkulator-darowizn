import { useState } from "react"
import type { ValuesProps } from "../../../../types/type"
import { formatInputValue } from "../../../../utils/formatInputValues"
import Input from "../../../UI/input/Input"
import Toggle from "../../../UI/toggle/Toggle"
import "./LastStep.scss"
import Alert from "../../../UI/alert/Alert"

interface LastStepProps extends ValuesProps {
    donationSum?: number
    ariaLabel?: string
}

function LastStep({ values, setValues, donationSum }: LastStepProps) {
    const prices = [200, 500, 1000, 2500]
    const [value, setValue] = useState("")

    const { donationAmount, donationPerid } = values

    const annualDonation =
        donationPerid === "monthly"
            ? (donationAmount ?? 0) * 12
            : (donationAmount ?? 0)

    const aboveLimit = Math.max(
        0,
        annualDonation - (donationSum ?? 0)
    )

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

        setValue(formatInputValue(sanitized))

        setValues({
            ...values,
            donationAmount: Number(sanitized)
        })
    }

    const handleClick = (count: number) => {
        setValue("")
        setValues({
            ...values,
            donationAmount: count
        })
    }

    const handleToggle = () => {

        setValues({
            ...values,
            donationPerid: donationPerid === "once" ? "monthly" : "once"
        })
    }

    const formatAmount = (amount: number) => {
        return Number.isInteger(amount)
            ? formatInputValue(`${amount}`)
            : formatInputValue(amount.toFixed(2))
    }

    return (
        <div className="count-step step-content">
            <div className="title-wrapper">
                <p className="number">04</p>
                <p className="title">Ile chcesz przekazać?</p>
            </div>
            {
                donationSum === undefined &&
                < Alert
                    shortText="Przy PIT liniowym pokazujemy pełny koszt. Wsparcie nadal ma sens."
                    shortTitle="Darowizna nie obniży Twojego podatku"
                    show={!!aboveLimit}
                    title={`Przy PIT liniowym darowizna nie obniża podatku`}
                    text={`Pokazujemy pełny koszt. Wsparcie nadal ma sens — tylko bez korzyści podatkowej.`}
                />
            }
            <Toggle firstItem="Jednorazowo" secondItem="Co miesiąc" position={donationPerid === "once" ? "first" : "second"} setPosition={handleToggle} />
            <div className="prices">
                {
                    prices.map(count => <button onClick={() => handleClick(count)} key={count} className={`price-btn ${donationAmount === count ? "active" : ""}`}>{count} zł</button>)
                }
                <div className="count-input">
                    <Input ariaLabel="Kwota darowizny w złotych" onChange={handleChange} value={value} placeholder="własna kwota" prefix="zł" />
                </div>
            </div>
            {
                donationSum !== undefined &&
                < Alert
                    shortText="Nadwyżka trafi do organizacji, ale nie obniży podatku."
                    show={!!aboveLimit}
                    title={`Powyżej limitu odliczenia o ${formatAmount(aboveLimit)} zł`}
                    text={`Odliczysz maksymalnie ${formatInputValue(`${donationSum}`)} zł rocznie. Nadwyżka nadal trafia do organizacji — po prostu nie obniża podatku.`}
                />
            }
        </div>
    )
}

export default LastStep