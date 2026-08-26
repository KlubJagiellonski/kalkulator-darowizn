import { useState } from "react"
import type { PITType, ValuesProps } from "../../../../types/type"
import Hint from "../../../UI/hint/Hint"
import "./PIT.scss"
import HintMessage from "../../../UI/hint/HintMessage"

function PIT({ values, setValues }: ValuesProps) {
    const { pitType } = values
    const [activeHint, setActiveHint] = useState(false)

    const handleClick = (type: PITType) => {
        setValues({
            ...values,
            pitType: type
        })
    }

    return (
        <div className="pit">
            <div className="title-wrapper">
                <p className="number">02</p>
                <p className="title">Jak rozliczasz PIT?</p>
                <Hint active={activeHint} setActive={setActiveHint} id="pit" />
            </div>
            <div className="pit-content">
                <div className="pit-btns">
                    <button className={`button button--chip btn-pit ${pitType === "scale" ? "active" : ""}`} onClick={() => handleClick("scale")}>skala<span> podatkowa</span></button>
                    <button className={`button button--chip btn-pit ${pitType === "lumpSum" ? "active" : ""}`} onClick={() => handleClick("lumpSum")}>ryczałt</button>
                    <button className={`button button--chip btn-pit ${pitType === "flat19" ? "active" : ""}`} onClick={() => handleClick("flat19")}><span>podatek </span>liniowy 19%</button>
                    <HintMessage anchorName="pit" open={activeHint} title="Lorem Ipsum" text='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eget elit est. Fusce vestibulum eleifend quam ac efficitur' />
                </div>
                <p className="text">Nie wiesz? Umowa o pracę i większość zleceń to skala podatkowa.</p>
            </div>
        </div>
    )
}

export default PIT