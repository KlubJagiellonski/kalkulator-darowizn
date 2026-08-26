import { useElementHeight } from "../../hooks/useElementHeight"
import type { Values } from "../../types/type"
import EmptytResultWho from "./result-who/empty-result/EmptyResultWho"
import CheckedResultWho from "./result-who/pit-result/CheckedResultWho"
import "./Result.scss"

interface ResultProps {
    step: number,
    values: Values,
    setStep: (step: number) => void
}

function Result({ step, values, setStep }: ResultProps) {
    const { ref, height } = useElementHeight()

    return (
        <div className="result" style={{ height }}>
            <div ref={step == 1 && !values.pit && !values.cit ? ref : undefined} className={`result-card result-card-1 ${step == 1 && !values.pit && !values.cit ? "active" : ""}`}>
                <EmptytResultWho />
            </div>
            <div ref={step == 1 && values.pit ? ref : undefined} className={`result-card result-card-2 ${step == 1 && values.pit ? "active" : ""}`}>
                <CheckedResultWho setStep={setStep} btn="forma rozliczenia" prec={6} />
            </div>
            <div ref={step == 1 && values.cit ? ref : undefined} className={`result-card result-card-3 ${step == 1 && values.cit ? "active" : ""}`}>
                <CheckedResultWho setStep={setStep} btn="stawka CIT" prec={10} />
            </div>
        </div>
    )
}

export default Result