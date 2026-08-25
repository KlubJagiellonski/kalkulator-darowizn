import "./StepperNav.scss"

interface StepperNavProps {
    step: number,
    setStep: (step: number) => void
}

function StepperNav({ step, setStep }: StepperNavProps) {
    return (
        <div className="btns">
            <div className={`btn-box ${step == 1 ? "hide" : ""}`}>
                <button disabled={step == 1} className={`button button--ghost button-stepper`} onClick={() => setStep(step - 1)}>← Wstecz</button>
            </div>
            <p className="text">Dalej przejdziesz przyciskiem w panelu obok ↗</p>
        </div>
    )
}

export default StepperNav