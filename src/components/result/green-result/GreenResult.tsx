import "./GreenResult.scss"

interface GreenResultProps {
    setStep: (step: number) => void
    text: string
    btn: string
    addText?: string
}

function GreenResult({ setStep, text, btn, addText }: GreenResultProps) {
    return (
        <div className="green-result">
            <p className="tag">MOŻESZ ODLICZYĆ</p>
            <h5 className="info">Świetnie!</h5>
            <p className="text text-1">{text}{addText && <span> {addText}</span>}</p>
            <button onClick={() => { setStep(3) }} className="button button--primary button-next">Dalej: {btn} →</button>
        </div>
    )
}

export default GreenResult

