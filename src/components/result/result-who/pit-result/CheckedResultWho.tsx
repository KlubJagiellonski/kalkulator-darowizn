import "./CheckedResultWho.scss"

interface PitResultWhoProps {
    setStep: (step: number) => void
    prec: number,
    btn: string
}

function PitResultWho({ setStep, prec, btn }: PitResultWhoProps) {
    return (
        <div className="checked-result-who">
            <p className="tag">TWÓJ LIMIT ODLICZENIA</p>
            <h3 className="prec">{prec}%</h3>
            <p className="text text-1">To limit dochodu, do którego kwoty przekazywane przez Ciebie darowizny będą obniżać Twój podatek. Przejdź dalej, by zyskać konkretne wyliczenie dla Twoich zarobków.</p>
            <button onClick={()=>{setStep(2)}} className="button button--primary button-next">Dalej: {btn} →</button>
        </div>
    )
}

export default PitResultWho

