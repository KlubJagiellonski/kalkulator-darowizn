import type { Values } from "../../types/type"
import "./StepperNav.scss"

interface StepperNavProps {
    step: number,
    values: Values
    setStep: (step: number) => void
}

function StepperNav({ step, setStep, values }: StepperNavProps) {
    const text = () =>{
        if(step === 1){
            return "Dalej przejdziesz przyciskiem w panelu obok ↗"
        } else if(step == 2 && !values.pitType){
            return "Wybierz formę rozliczenia, żeby przejść dalej"
        } else if(step == 2 && values.pitType === "scale"){
            return "Wybierz formę rozliczenia, żeby przejść dalej"
        }

        return ""
    }

    return (
        <div className="btns">
            <div className={`btn-box ${step == 1 ? "hide" : ""}`}>
                <button disabled={step == 1} className={`button button--ghost button-stepper`} onClick={() => setStep(step - 1)}>← Wstecz</button>
            </div>
            <p className="text">{text()}</p>
        </div>
    )
}

export default StepperNav