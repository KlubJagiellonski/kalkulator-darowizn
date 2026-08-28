import { type Ref } from "react"
import "./LumpSumRates.scss"
import type { Values } from "../../../../../types/type"
import Hint from "../../../../UI/hint/Hint"

interface LumpSumRates {
    isOpen: boolean
    ref: Ref<HTMLDivElement> | undefined
    values: Values
    setValues: (values: Values) => void
    showHint: boolean
    setShowHint: (showHint: boolean) => void
}

function LumpSumRates({ isOpen, ref, values, setValues, setShowHint, showHint }: LumpSumRates) {
    const rates = [3, 5.5, 8.5, 12, 14, 15, 17]
    const { lumpSum } = values

    const handleClick = (rate: number) => {
        setValues({
            ...values,
            lumpSum: rate
        })
    }

    return (
        <div className={`lump-sum-rates ${isOpen ? "open" : "close"}`}>
            <div ref={ref} className="lump-sum-box">
                <div className="lump-sum-title-wrapper">
                    <h5 className="title">Twoja stawka ryczałtu</h5>
                    <Hint active={showHint} setActive={setShowHint} />
                </div>
                <p className="text">Zależy od rodzaju działalności. Znajdziesz ją w ewidencji przychodów lub u księgowej.</p>
                <div className="rates">
                    {
                        rates.map(rate => <button onClick={() => { handleClick(rate) }} key={rate} className={`rate ${lumpSum === rate ? "active" : ""}`}>{`${rate}`.replace(".", ",")}%</button>)
                    }
                </div>
            </div>
        </div>
    )
}

export default LumpSumRates