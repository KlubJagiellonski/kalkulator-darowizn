import type { PITType, ValuesProps } from "../../../../types/type"
import Alert from "../../../UI/Alert"
import "./PIT.scss"

function PIT({ values, setValues }: ValuesProps) {
    const { pitType } = values

    const handleClick = (type: PITType) => {
        setValues({
            ...values,
            pitType: type
        })
    }

    const alert = {
        shortText: "PIT liniowy nie pozwala odliczyć tej darowizny. Pokazujemy pełny koszt.",
        text: "Ustawa nie przewiduje tego odliczenia dla stawki 19%. Kalkulator pokazuje więc pełny koszt — wsparcie nadal ma sens, tylko bez korzyści podatkowej.",
        title: "Przy PIT liniowym nie odliczysz darowizny na cele pożytku publicznego"
    }

    return (
        <div className="pit">
            <div className="title-wrapper">
                <p className="number">02</p>
                <p className="title">Jak rozliczasz PIT?</p>
            </div>
            <div className="pit-content">
                <p className="text">Nie wiesz? Umowa o pracę i większość zleceń to skala podatkowa.</p>
                <div className="pit-btns">
                    <button className={`button button--chip btn-pit ${pitType === "scale" ? "active" : ""}`} onClick={() => handleClick("scale")}>skala<span> podatkowa</span></button>
                    {/* TODO in the future add lump sum */}
                    <button className={`button button--chip btn-pit ${pitType === "lumpSum" ? "active" : ""}`}>ryczałt</button>
                    <button className={`button button--chip btn-pit ${pitType === "flat19" ? "active" : ""}`} onClick={() => handleClick("flat19")}><span>podatek </span>liniowy 19%</button>
                </div>
                <Alert {...alert} show={pitType === "flat19"} />
            </div>
        </div>
    )
}

export default PIT