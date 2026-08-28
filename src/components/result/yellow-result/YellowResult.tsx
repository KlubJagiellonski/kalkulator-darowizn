import type { Values } from "../../../types/type"
import { back } from "../../../utils/back"
import "./YellowResult.scss"

interface YellowResultProps {
    setValues: (seValues: Values) => void
    values: Values
    setStep: (step: number) => void
}

function YellowResult({ setStep, values, setValues}: YellowResultProps) {
    const handleClick = () =>{
        back({step: 1, setStep, setValues, values})
    }

    return (
        <div className="yellow-result">
            <p className="tag">BEZ ODLICZENIA</p>
            <h5 className="info">Niedobrze!</h5>
            <p className="text text-1">Rozliczający liniowy PIT są co do zasady wyłączeni z możliwości odliczania darowizn.<span> Możesz przekazać darowiznę, ale nie obniży ona Twojego podatku.</span></p>
            <div className="btns">
                <button onClick={() => { setStep(4) }} className="button button--primary button-next">Przekaż darowiznę mimo to →</button>
                <button onClick={handleClick} className="button button--ghost button-next">Zmień formę rozliczenia</button>
            </div>
        </div>
    )
}

export default YellowResult

