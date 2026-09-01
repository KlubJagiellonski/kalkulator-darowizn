import type { Values } from "../../types/type"
import { formatInputValue } from "../../utils/formatInputValues"
import "./ResultDatils.scss"

interface ResultDetailsProps {
    open?: boolean
    setOpen: (open: boolean) => void
    values: Values
}

function ResultDetailsEmpty({open, values, setOpen}: ResultDetailsProps) {
    
    const { donationAmount } = values

    return (
        <div className={`result-details ${open? "open" : "close"}`}>
            <div className="cover" onClick={()=>setOpen(false)}></div>
            <div className="result-details-box">
                <div className="result-details-header">
                    <h3 className="title">Dlaczego koszt winosi {formatInputValue(`${donationAmount}`)} zł?</h3>
                    <button className="btn-close" onClick={()=>setOpen(false)}>zamknij</button>
                </div>
                <p className="summary">PODSUMOWANIE</p>
                <p className="calculate">{formatInputValue(`${donationAmount}`)} zł darowizny − 0 zł korzyści podatkowej = {formatInputValue(`${donationAmount}`)} zł realnego kosztu</p>
                <p className="details">
                    Forma rozliczenia: podatek liniowy 19%<br />
                    Kwota darowizny: {formatInputValue(`${donationAmount}`)} zł<br />
                    Kwota odliczenia: 0 zł<br />
                </p>
                <p className="text">PIT liniowy nie umożliwia odliczenia tej darowizny.</p>
                <p className="legal">Wyliczenie jest szacunkowe i nie stanowi porady podatkowej.</p>
            </div>
        </div>
    )
}

export default ResultDetailsEmpty