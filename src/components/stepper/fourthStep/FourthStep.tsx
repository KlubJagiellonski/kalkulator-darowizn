import type { ValuesProps } from "../../../types/type"
import "./FirstStep.scss"

function FourthStep({ values, setValues }: ValuesProps) {
    const { cit, pit } = values

    const handlePit = () => {
        setValues({
            ...values,
            pit: true,
            cit: false
        })
    }

    const handleCit = () => {
        setValues({
            ...values,
            pit: false,
            cit: true
        })
    }

    return (
        <div className="who step-content">
            <div className="title-wrapper">
                <p className="number">01</p>
                <p className="title">Kto przekazuje<span> darowiznę</span>?</p>
            </div>
            <div className="who-btns">
                <button className={`button button--chip btn-who ${pit ? "active" : ""}`} onClick={handlePit}>Osoba Prywatna<span>rozliczam PIT</span></button>
                <button className={`button button--chip btn-who ${cit ? "active" : ""}`} onClick={handleCit}>Firma<span>rozliczam CIT</span></button>
            </div>
        </div>
    )
}

export default FourthStep