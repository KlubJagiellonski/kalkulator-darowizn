import { useState } from "react"
import { useElementHeight } from "../../../../hooks/useElementHeight"
import type { PITType, ValuesProps } from "../../../../types/type"
import Hint from "../../../UI/hint/Hint"
import LumpSumRates from "./lump-sum-rates/LumpSumRates"
import "./PIT.scss"
import HintMessage from "../../../UI/hint/HintMessage"

function PIT({ values, setValues }: ValuesProps) {
    const [showHint, setShowHint] = useState(false)
    const [showHintLumpSum, setShowHintLumpSum] = useState(false)
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
                <Hint active={showHint} setActive={setShowHint} />
                <div className="hint-message-1">
                    <HintMessage open={showHint} text="Skala podatkowa (12% i 32%) to domyślne rozliczenie umowy o pracę i większości zleceń. Ryczałt i podatek liniowy 19% wybierają osoby prowadzące działalność gospodarczą." title="Formy rozliczenia PIT" />
                </div>
                <div className="hint-message-2">
                    <HintMessage open={showHint} text="Skala podatkowa (12% i 32%) to domyślne rozliczenie umowy o pracę i większości zleceń. Ryczałt i podatek liniowy 19% wybierają osoby prowadzące działalność gospodarczą." title="Formy rozliczenia PIT" />
                </div>
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
                        setShowHint={setShowHintLumpSum}
                        showHint={showHintLumpSum}
                    />
                    <HintMessage className="hint-lumpsum" open={showHintLumpSum} title="Stawka ryczałtu" text="Procent, którym opodatkowany jest Twój przychód. Zależy od rodzaju działalności — od 3% w handlu do 17% w wolnych zawodach. Znajdziesz ją w ewidencji przychodów." />
                </div>
                <p className={`pit-text ${pitType !== "lumpSum" ? "active" : ""}`} style={{ height }}>
                    Nie wiesz? Umowa o pracę i większość zleceń to skala podatkowa.
                </p>
            </div>
        </div>
    )
}

export default PIT