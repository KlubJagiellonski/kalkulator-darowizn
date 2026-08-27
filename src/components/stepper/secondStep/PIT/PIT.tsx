import { useElementHeight } from "../../../../hooks/useElementHeight"
import type { PITType, ValuesProps } from "../../../../types/type"
import LumpSumRates from "./lump-sum-rates/LumpSumRates"
import "./PIT.scss"

function PIT({ values, setValues }: ValuesProps) {
    const { pitType } = values
    const { ref, height } = useElementHeight<HTMLDivElement>()

    const handleClick = (type: PITType) => {
        setValues({
            ...values,
            pitType: type
        })
    }

    return (
        <div className="pit" style={{
            "--pit-height": `${height}px`
        } as React.CSSProperties}>
            <div className="title-wrapper">
                <p className="number">02</p>
                <p className="title">Jak rozliczasz PIT?</p>
            </div>

            <div
                className="pit-content"
            >
                <div className="pit-btns">
                    <button
                        className={`button button--chip btn-pit ${pitType === "scale" ? "active" : ""}`}
                        onClick={() => handleClick("scale")}
                    >
                        skala<span> podatkowa</span>
                    </button>

                    <button
                        className={`button button--chip btn-pit ${pitType === "lumpSum" ? "active" : ""}`}
                        onClick={() => handleClick("lumpSum")}
                    >
                        ryczałt
                    </button>

                    <button
                        className={`button button--chip btn-pit ${pitType === "flat19" ? "active" : ""}`}
                        onClick={() => handleClick("flat19")}
                    >
                        <span>podatek </span>liniowy 19%
                    </button>

                    <LumpSumRates
                        isOpen={pitType === "lumpSum"}
                        ref={ref}
                        setValues={setValues}
                        values={values}
                    />
                </div>

                <p className={`pit-text ${pitType !== "lumpSum" ? "active" : ""}`} style={{ height }}>
                    Nie wiesz? Umowa o pracę i większość zleceń to skala podatkowa.
                </p>
            </div>
        </div>
    )
}

export default PIT