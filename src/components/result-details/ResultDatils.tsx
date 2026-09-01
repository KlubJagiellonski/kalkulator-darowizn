import type { Values } from "../../types/type"
import { formatInputValue } from "../../utils/formatInputValues"
import "./ResultDatils.scss"

interface ResultDetailsProps {
    open?: boolean
    setOpen: (open: boolean) => void
    values: Values
    donationSum: number
    taxDeduction: number
    taxRate: number
    taxName: string
    taxText?: string
}

function ResultDetails({open, values, setOpen, donationSum, taxDeduction, taxRate, taxName, taxText}: ResultDetailsProps) {
    
    const { donationAmount, donationPerid, income } = values

    const annualDonation =
        donationPerid === "monthly"
            ? (donationAmount ?? 0) * 12
            : (donationAmount ?? 0)

    const realCost = annualDonation - taxDeduction

    const displayedCost = Math.max(
        0,
        realCost
    )

    const taxCovered = annualDonation - displayedCost

    return (
        <div className={`result-details ${open? "open" : "close"}`}>
            <div className="cover" onClick={()=>setOpen(false)}></div>
            <div className="result-details-box">
                <div className="result-details-header">
                    <h3 className="title">Jak obliczyliśmy {formatInputValue(`${displayedCost}`)} zł?</h3>
                    <button className="btn-close" onClick={()=>setOpen(false)}>zamknij</button>
                </div>
                <p className="summary">PODSUMOWANIE</p>
                <p className="calculate">{formatInputValue(`${donationAmount}`)} zł darowizny − {formatInputValue(`${taxCovered}`)} zł niższego podatku = {formatInputValue(`${displayedCost}`)} zł realnego kosztu</p>
                <p className="details">
                    Forma rozliczenia: {taxName}<br />
                    Dochód roczny: {formatInputValue(`${income}`)} zł<br />
                    Limit odliczenia: {formatInputValue(`${donationSum}`)} zł<br />
                    Kwota odliczenia: {formatInputValue(`${donationAmount}`)} zł<br />
                    {taxText ?? "Stawka podatku"}: {taxRate}%
                </p>
                <p className="text">{formatInputValue(`${donationAmount}`)} zł × {taxRate}% = {formatInputValue(`${taxCovered}`)} zł niższego podatku</p>
                <p className="legal">Wyliczenie jest szacunkowe i nie stanowi porady podatkowej.</p>
            </div>
        </div>
    )
}

export default ResultDetails