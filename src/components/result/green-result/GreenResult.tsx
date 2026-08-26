import "./GreenResult.scss"

interface PitResultWhoProps {
    setStep: (step: number) => void
    text: string
}

function GreenResult({ setStep, text }: PitResultWhoProps) {
    return (
        <div className="green-result">
            <p className="tag">MOŻESZ ODLICZYĆ</p>
            <h5 className="info">Świetnie!</h5>
            <p className="text text-1">{text}</p>
            <button onClick={()=>{setStep(3)}} className="button button--primary button-next">Dalej: Twoje dochody →</button>
        </div>
    )
}

export default GreenResult

