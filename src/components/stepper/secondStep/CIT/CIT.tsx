import { useState } from "react"
import type { CITType, ValuesProps } from "../../../../types/type"
import Hint from "../../../UI/hint/Hint"
import "./CIT.scss"
import HintMessage from "../../../UI/hint/HintMessage"

function CIT({ values, setValues }: ValuesProps) {
    const [showHint, setShowHint] = useState(false)

    const { citType } = values

    const handleClick = (type: CITType) => {
        setValues({
            ...values,
            citType: type
        })
    }

    return (
        <div className="cit">
            <div className="title-wrapper">
                <p className="number">02</p>
                <p className="title">Jaką stawką CIT się rozliczasz?</p>
                <Hint active={showHint} setActive={setShowHint} label="informacja o stawce CIT"/>
                <div className="hint-message-1">
                    <HintMessage open={showHint} text="Podatek dochodowy od osób prawnych. 9% dla małych podatników i firm rozpoczynających działalność, 19% dla pozostałych spółek." title="Stawka CIT" />
                </div>
                <div className="hint-message-2">
                    <HintMessage open={showHint} text="Podatek dochodowy od osób prawnych. 9% dla małych podatników i firm rozpoczynających działalność, 19% dla pozostałych spółek." title="Stawka CIT" />
                </div>
            </div>
            <div className="cit-content">
                <p className="text">Mały podatnik i firma rozpoczynająca działalność płacą 9%. Pozostałe spółki — 19%.</p>
                <div className="cit-btns">
                    <button className={`button button--chip btn-cit ${citType === "cit19" ? "active" : ""}`} onClick={() => handleClick("cit19")}>CIT 19%</button>
                    <button className={`button button--chip btn-cit ${citType === "cit9" ? "active" : ""}`} onClick={() => handleClick("cit9")}>CIT 9%<span> (mały podatnik)</span></button>
                </div>
            </div>
        </div>
    )
}

export default CIT