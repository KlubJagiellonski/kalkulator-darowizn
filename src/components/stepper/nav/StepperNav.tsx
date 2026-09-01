import type { Values } from "../../../types/type"
import { back } from "../../../utils/back"
import "./StepperNav.scss"

interface StepperNavProps {
    step: number,
    values: Values
    setStep: (step: number) => void
    setValues: (values: Values)=>void
}

function StepperNav({ step, setStep, values, setValues }: StepperNavProps) {
    const text = () => {
        if (step == 2 && values.pit && !values.pitType) {
            return 1
        } else if (step == 2 && values.pit && values.pitType === "lumpSum" && !values.lumpSum) {
            return 2
        } else if (step == 2 && values.pit && values.pitType === "flat19") {
            return 3
        } else if (step == 2 && values.cit && !values.citType) {
            return 4
        } else if (step == 4) {
            return 5
        } else if (step == 3 && !values.income) {
            return 6
        }

        return 0
    }

    return (
        <div className={`btns ${step == 1 ? "hide" : ""}`}>
            <div className={`btn-box`}>
                <button disabled={step == 1} className={`button button--ghost button-stepper`} onClick={() => back({setStep, step: step-1, setValues, values})}>← Wstecz</button>
            </div>
            <div className="texts">
                <p className={`text text-1 ${text() == 0 ? "active" : ""}`}>Dalej przejdziesz przyciskiem w panelu obok ↗</p>
                <p className={`text text-2 ${text() == 1 ? "active" : ""}`}>Wybierz formę rozliczenia, żeby przejść dalej</p>
                <p className={`text text-3 ${text() == 2 ? "active" : ""}`}>Wybierz stawkę ryczałtu, żeby przejść dalej</p>
                <p className={`text text-4 ${text() == 3 ? "active" : ""}`}>Odliczenie niedostępne — sprawdź opcje w panelu obok ↗</p>
                <p className={`text text-5 ${text() == 4 ? "active" : ""}`}>Wybierz stawkę CIT, żeby przejść dalej</p>
                <p className={`text text-6 ${text() == 5 ? "active" : ""}`}>Wszystko policzone — akcja w panelu obok ↗</p>
                <p className={`text text-6 ${text() == 6 ? "active" : ""}`}>Podaj kwotę, żeby zobaczyć swój limit</p>
            </div>
        </div>
    )
}

export default StepperNav