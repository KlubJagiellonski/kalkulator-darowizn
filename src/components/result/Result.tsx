import { useElementHeight } from "../../hooks/useElementHeight"
import type { Values } from "../../types/type"
import CheckedResultWho from "./result-who/pit-result/CheckedResultWho"
import EmptyResult from "./empty-result/EmptyResult"
import "./Result.scss"

interface ResultProps {
    step: number,
    values: Values,
    setStep: (step: number) => void
}

function Result({ step, values, setStep }: ResultProps) {
    const { ref, height } = useElementHeight()

    const emptyResults = [
        {
            char: "%",
            text: 'Odpowiedz, czy rozliczasz się jako osoba prywatna (PIT) czy firma (CIT), a dowiesz się, z jakiego limitu odliczenia darowizn od dochodu możesz skorzystać!',
            smallText: 'Nic nie zapisujemy.',
            smallTextLonger: 'Wyliczenie zostaje na Twoim ekranie.'
        },
        {
            char: "%",
            text: 'Wybierz, w jaki sposób rozliczasz PIT. Nie każda forma pozwala odliczyć darowiznę — powiemy Ci od razu, czy Twoja pozwala.',
            smallTextLonger: 'Formę rozliczenia znajdziesz na swoim PIT za zeszły rok.'
        }
    ]

    return (
        <div className="result" style={{ height }}>
            <div ref={step == 1 && !values.pit && !values.cit ? ref : undefined} className={`result-card result-card-1 ${step == 1 && !values.pit && !values.cit ? "active" : ""}`}>
                <EmptyResult {...emptyResults[0]} />
            </div>
            <div ref={step == 1 && values.pit ? ref : undefined} className={`result-card result-card-2 ${step == 1 && values.pit ? "active" : ""}`}>
                <CheckedResultWho setStep={setStep} btn="forma rozliczenia" prec={6} />
            </div>
            <div ref={step == 1 && values.cit ? ref : undefined} className={`result-card result-card-3 ${step == 1 && values.cit ? "active" : ""}`}>
                <CheckedResultWho setStep={setStep} btn="stawka CIT" prec={10} />
            </div>
            <div ref={step == 2 && !values.pitType ? ref : undefined} className={`result-card result-card-3 ${step == 2 && !values.pitType ? "active" : ""}`}>
                <EmptyResult {...emptyResults[1]} />
            </div>
        </div>
    )
}

export default Result