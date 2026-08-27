import { useElementHeight } from "../../hooks/useElementHeight"
import type { Values } from "../../types/type"
import CheckedResultWho from "./result-who/pit-result/CheckedResultWho"
import EmptyResult from "./empty-result/EmptyResult"
import "./Result.scss"
import GreenResult from "./green-result/GreenResult"
import YellowResult from "./yellow-result/yellowResult"

interface ResultProps {
    step: number,
    values: Values,
    setValues: (values: Values)=>void
    setStep: (step: number) => void
}

function Result({ step, values, setStep, setValues }: ResultProps) {
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
        },
        {
            char: "%",
            text: 'Przy ryczałcie odliczenie liczy się od przychodu, a nie od dochodu. Wybierz swoją stawkę, a policzymy, ile realnie zyskasz na darowiźnie.',
            smallTextLonger: 'Limit odliczenia przy ryczałcie to również 6%.'
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
            <div ref={step == 2 && !values.pitType ? ref : undefined} className={`result-card result-card-4 ${step == 2 && !values.pitType ? "active" : ""}`}>
                <EmptyResult {...emptyResults[1]} />
            </div>
            <div ref={step == 2 && values.pitType == "scale" ? ref : undefined} className={`result-card result-card-5 ${step == 2 && values.pitType == "scale" ? "active" : ""}`}>
                <GreenResult setStep={setStep} text="Rozliczając się na skali podatkowej możesz skorzystać z odliczenia. Przejdź dalej, by podać swoje dochody i policzyć Twój limit darowizn na 2026 rok." />
            </div>
            <div ref={step == 2 && values.pitType == "lumpSum" && !values.lumpSum ? ref : undefined} className={`result-card result-card-5 ${step == 2 && values.pitType == "lumpSum" && !values.lumpSum ? "active" : ""}`}>
                <EmptyResult {...emptyResults[2]} />
            </div>
            <div ref={step == 2 && values.pitType == "lumpSum" && values.lumpSum ? ref : undefined} className={`result-card result-card-5 ${step == 2 && values.pitType == "lumpSum" && values.lumpSum ? "active" : ""}`}>
                <GreenResult setStep={setStep} text='Ryczałt też pozwala odliczyć darowiznę — od przychodu, z limitem 6%. Przy stawce 12% każde odliczone 100 zł to 12 zł niższego podatku. Przejdź dalej, by podać swój przychód.' />
            </div>
            <div ref={step == 2 && values.pitType == "flat19" ? ref : undefined} className={`result-card result-card-5 ${step == 2 && values.pitType == "flat19" ? "active" : ""}`}>
                <YellowResult setValues={setValues} values={values} setStep={setStep} />
            </div>
        </div>
    )
}

export default Result