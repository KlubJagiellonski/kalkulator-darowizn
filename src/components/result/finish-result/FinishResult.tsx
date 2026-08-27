import type { Values } from "../../../types/type"
import { formatInputValue } from "../../../utils/formatInputValues"
import "./FinishResult.scss"

interface FinishResultProps {
    values: Values
    donationSum: number
    taxDeduction: number
}

function FinishResult({ values, donationSum, taxDeduction }: FinishResultProps) {

    const { donationAmount, donationPerid, income } = values

    const annualDonation =
        donationPerid === "monthly"
            ? (donationAmount ?? 0) * 12
            : (donationAmount ?? 0)

    const deductibleAmount = Math.min(
        annualDonation,
        donationSum
    )

    const realCost = annualDonation - taxDeduction

    const displayedCost = Math.max(
        0,
        realCost
    )

    const taxRate = (income ?? 0) <= 120000 ? 12 : 32

    const limitUsage =
        donationSum > 0
            ? (annualDonation / donationSum) * 100
            : 0

    const taxCovered = annualDonation - displayedCost

    const aboveLimit = Math.max(
        0,
        annualDonation - donationSum
    )

    return (
        <div className="finish-result">

            <p className="tag">
                TWOJA DAROWIZNA ·{" "}
                {donationPerid === "once"
                    ? "JEDNORAZOWO"
                    : "MIESIĘCZNIE"}
            </p>

            <div className="texts-wrapper">
                <div className="texts">
                    <p className="text text-1">
                        Realnie zapłacisz
                    </p>

                    <h3 className="prec">
                        {formatInputValue(`${displayedCost}`)} zł
                    </h3>
                </div>

                <a className="details">
                    Szczegóły wyliczenia
                </a>
            </div>

            <p className="text text-2">
                z darowizny{" "}
                <span className="bold">
                    {formatInputValue(`${annualDonation}`)} zł
                </span>{" "}
                rocznie
            </p>

            <div className="belt-wrapper">
                <div
                    className="belt"
                    style={{
                        transform: `translateX(${100 -
                            (taxCovered / (annualDonation || 1)) * 100
                            }%)`
                    }}
                />
            </div>

            <div className="belt-legend">

                <div className="belt-1">
                    <p className="belt-text">
                        Z Twojej kieszeni
                    </p>

                    <p className="belt-count">
                        {formatInputValue(`${displayedCost}`)} zł
                    </p>
                </div>

                <div className="belt-2">
                    <p className="belt-text">
                        Pokrywa niższy podatek
                    </p>

                    <p className="belt-count">
                        {formatInputValue(`${taxCovered}`)} zł
                    </p>
                </div>

                <p className="belt-text-2">
                    z darowizny{" "}
                    {formatInputValue(`${displayedCost}`)} zł
                </p>

                <p className="belt-text-3">
                    {formatInputValue(`${taxCovered}`)} zł
                    {" "}pokrywa niższy podatek
                </p>

            </div>

            <div className="info-wrapper">

                <div className="info-box">
                    <p className="info-text">
                        Kwota odliczenia
                    </p>

                    <p className="info-count">
                        {formatInputValue(`${deductibleAmount}`)} zł
                    </p>
                </div>

                <div className="info-box">
                    <p className="info-text">
                        Stawka podatku
                    </p>

                    <p className="info-count">
                        {taxRate}%
                    </p>
                </div>

                <div className="info-box">
                    <p className="info-text">
                        Wykorzystanie limitu
                    </p>

                    <p className="info-count">
                        {Math.round(limitUsage)}%
                    </p>
                </div>

            </div>

            <div className="belt-limit">
                <div
                    className={`b-limit ${Math.min(Math.round(limitUsage), 100) === 100
                        ? "full"
                        : ""
                        }`}
                    style={{
                        transform: `translateX(${-100 +
                            Math.min(Math.round(limitUsage), 100)
                            }%)`
                    }}
                />
            </div>

            <p className="info-alg">
                {formatInputValue(`${deductibleAmount}`)} zł
                {" "}odliczenia × {taxRate}% ={" "}
                {formatInputValue(`${taxDeduction}`)} zł
                {" "}niższego podatku
            </p>
            <p className="text text-3">
                Wyliczenie szacunkowe, na podstawie stawki
                obowiązującej dla podanego dochodu. Nie stanowi
                porady podatkowej.
            </p>

        </div>
    )
}

export default FinishResult