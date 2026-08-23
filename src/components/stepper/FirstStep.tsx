import type { Values } from "../../types/type"
import "./FirstStep.scss"

interface FirstStepProps {
    values: Values
    setValues: (values: Values) => void
}

function FirstStep({ values, setValues }: FirstStepProps) {
    const { cit, pit } = values

    const handleClick = () => {
        setValues({
            ...values,
            pit: !pit,
            cit: !cit
        })
    }

    return (
        <div className="who step-content">
            <p className="title">Kto przekazuje?</p>
            <div className="who-btns">
                <button className={`button button--chip btn-who ${pit ? "active" : ""}`} onClick={handleClick}>Osoba Prywatna<span>PIT · limit 6% dochodu</span></button>
                <button className={`button button--chip btn-who ${cit ? "active" : ""}`} onClick={handleClick}>Firma<span>CIT · limit 10% dochodu</span></button>
            </div>
        </div>
    )
}

export default FirstStep