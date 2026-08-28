import { formatInputValue } from "../../../utils/formatInputValues"
import "./CountResult.scss"

interface PitResultWhoProps {
    setStep: (step: number) => void
    count: number,
}

function CountResult({ setStep, count }: PitResultWhoProps) {
    return (
        <div className="count-result">
            <p className="tag">TWÓJ LIMIT DAROWIZN W 2026</p>
            <h2 className="prec">{Number.isFinite(count) ? `${formatInputValue(`${count}`)} zł` : "0 zł"}</h2>
            <p className="text text-1">Tyle darowizn możesz przekazać, by każda z nich obniżyła kwotę podatku, który płacisz. Przejdź dalej, by sprawdzić, ile zyskasz dzięki darowiźnie na konkretną kwotę.</p>
            <button onClick={() => { setStep(4) }} className="button button--primary button-next">Dalej: kwota darowizny →</button>
        </div>
    )
}

export default CountResult

