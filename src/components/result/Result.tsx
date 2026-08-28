import { useElementHeight } from "../../hooks/useElementHeight"
import type { Values } from "../../types/type"
import CheckedResultWho from "./result-who/pit-result/CheckedResultWho"
import EmptyResult from "./empty-result/EmptyResult"
import "./Result.scss"
import GreenResult from "./green-result/GreenResult"
import YellowResult from "./yellow-result/YellowResult"
import CountResult from "./count-result/CountResult"
import { calculateForPIT2022 } from "../../alghorytm/2022/pit-calculations-2022"
import FinishResult from "./finish-result/FinishResult"
import { calculateForPPE2022 } from "../../alghorytm/2022/ppe-calculations-2022"
import FinisEmptyhResult from "./finish-empty-result/FinishEmptyResult"

interface ResultProps {
    step: number,
    values: Values,
    setValues: (values: Values) => void
    setStep: (step: number) => void
}

function Result({ step, values, setStep, setValues }: ResultProps) {
    const { ref, height } = useElementHeight()

    // 🌟 FUNKCJA DO PROPSÓW DOSTĘPNOŚCI – poprawione typy
    const getCardProps = (isActive: boolean) => {
        return {
            inert: isActive ? undefined : true,
            "aria-hidden": !isActive ? true : undefined,  // ✅ true/false/undefined
            tabIndex: isActive ? 0 : -1,
        };
    };

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
        },
        {
            char: "%",
            text: 'Wybierz stawkę CIT, którą stosuje Twoja firma. Od niej zależy, ile realnie zyskacie na darowiźnie.',
            smallTextLonger: 'Stawkę znajdziesz w zeznaniu CIT-8 za zeszły rok.'
        },
        {
            char: "zł",
            text: 'Podaj swój dochód, a policzymy dokładną kwotę darowizn, którą możesz odliczyć w 2026 roku.',
            smallTextLonger: 'Wyliczenie zostaje na Twoim ekranie.',
            smallText: "Nigdzie nie zapisujemy tej liczby. "
        },
        {
            char: "zł",
            text: 'Podaj swój roczny przychód, a policzymy dokładną kwotę darowizn, którą możesz odliczyć w 2026 roku.',
            smallText: "Nigdzie nie zapisujemy tej liczby."
        },
        {
            char: "zł",
            text: 'Podaj roczny dochód firmy, a policzymy dokładną kwotę darowizn, którą możecie odliczyć w 2026 roku.',
            smallText: "Nigdzie nie zapisujemy tej liczby."
        }
    ]

    const greenResults = [
        {
            btn: "Twoje dochody",
            text: "Rozliczając się na skali podatkowej możesz skorzystać z odliczenia. Przejdź dalej, by podać swoje dochody i policzyć Twój limit darowizn na 2026 rok."
        },
        {
            btn: "Twój przychód",
            text: "Spółki rozliczające CIT mogą odliczyć darowiznę od dochodu, z limitem 10%. Przy stawce 19% każde odliczone 100 zł to 19 zł niższego podatku.",
            addText: "Przejdź dalej, by podać roczny dochód firmy."
        },
        {
            btn: "Dochód firmy",
            text: "Spółki rozliczające CIT mogą odliczyć darowiznę od dochodu, z limitem 10%. Przy stawce 19% każde odliczone 100 zł to 19 zł niższego podatku.",
            addText: "Przejdź dalej, by podać roczny dochód firmy."
        },
        {
            btn: "Dochód firmy",
            text: "Spółki rozliczające CIT mogą odliczyć darowiznę od dochodu, z limitem 10%. Przy stawce 9% każde odliczone 100 zł to 9 zł niższego podatku.",
            addText: "Przejdź dalej, by podać roczny dochód firmy."
        },
    ]

    return (
        <div className="result" style={{ height }}>
            {/* Karta 1 */}
            <div 
                ref={step == 1 && !values.pit && !values.cit ? ref : undefined} 
                className={`result-card result-card-1 ${step == 1 && !values.pit && !values.cit ? "active" : ""}`}
                {...getCardProps(!!(step == 1 && !values.pit && !values.cit))}
            >
                <EmptyResult {...emptyResults[0]} />
            </div>

            {/* Karta 2 */}
            <div 
                ref={step == 1 && values.pit ? ref : undefined} 
                className={`result-card result-card-2 ${step == 1 && values.pit ? "active" : ""}`}
                {...getCardProps(!!(step == 1 && values.pit))}
            >
                <CheckedResultWho setStep={setStep} btn="forma rozliczenia" prec={6} />
            </div>

            {/* Karta 3 */}
            <div 
                ref={step == 1 && values.cit ? ref : undefined} 
                className={`result-card result-card-3 ${step == 1 && values.cit ? "active" : ""}`}
                {...getCardProps(!!(step == 1 && values.cit))}
            >
                <CheckedResultWho setStep={setStep} btn="stawka CIT" prec={10} />
            </div>

            {/* Karta 4 */}
            <div 
                ref={step == 2 && values.pit && !values.pitType ? ref : undefined} 
                className={`result-card result-card-4 ${step == 2 && values.pit && !values.pitType ? "active" : ""}`}
                {...getCardProps(!!(step == 2 && values.pit && !values.pitType))}
            >
                <EmptyResult {...emptyResults[1]} />
            </div>

            {/* Karta 5 - scale */}
            <div 
                ref={step == 2 && values.pit && values.pitType == "scale" ? ref : undefined} 
                className={`result-card result-card-5 ${step == 2 && values.pit && values.pitType == "scale" ? "active" : ""}`}
                {...getCardProps(!!(step == 2 && values.pit && values.pitType == "scale"))}
            >
                <GreenResult setStep={setStep} {...greenResults[0]} />
            </div>

            {/* Karta 6 - lumpSum bez stawki */}
            <div 
                ref={step == 2 && values.pit && values.pitType == "lumpSum" && !values.lumpSum ? ref : undefined} 
                className={`result-card result-card-5 ${step == 2 && values.pit && values.pitType == "lumpSum" && !values.lumpSum ? "active" : ""}`}
                {...getCardProps(!!(step == 2 && values.pit && values.pitType == "lumpSum" && !values.lumpSum))}
            >
                <EmptyResult {...emptyResults[2]} />
            </div>

            {/* Karta 7 - lumpSum ze stawką */}
            <div 
                ref={step == 2 && values.pit && values.pitType == "lumpSum" && values.lumpSum ? ref : undefined} 
                className={`result-card result-card-5 ${step == 2 && values.pit && values.pitType == "lumpSum" && values.lumpSum ? "active" : ""}`}
                {...getCardProps(!!(step == 2 && values.pit && values.pitType == "lumpSum" && values.lumpSum))}
            >
                <GreenResult setStep={setStep} {...greenResults[1]} />
            </div>

            {/* Karta 8 - flat19 */}
            <div 
                ref={step == 2 && values.pit && values.pitType === "flat19" ? ref : undefined} 
                className={`result-card result-card-5 ${step == 2 && values.pit && values.pitType == "flat19" ? "active" : ""}`}
                {...getCardProps(!!(step == 2 && values.pit && values.pitType == "flat19"))}
            >
                <YellowResult setValues={setValues} values={values} setStep={setStep} />
            </div>

            {/* Karta 9 - CIT bez stawki */}
            <div 
                ref={step == 2 && values.cit && !values.citType ? ref : undefined} 
                className={`result-card result-card-6 ${step == 2 && values.cit && !values.citType ? "active" : ""}`}
                {...getCardProps(!!(step == 2 && values.cit && !values.citType))}
            >
                <EmptyResult {...emptyResults[3]} />
            </div>

            {/* Karta 10 - CIT 19% */}
            <div 
                ref={step == 2 && values.cit && values.citType == "cit19" ? ref : undefined} 
                className={`result-card result-card-5 ${step == 2 && values.cit && values.citType == "cit19" ? "active" : ""}`}
                {...getCardProps(!!(step == 2 && values.cit && values.citType == "cit19"))}
            >
                <GreenResult setStep={setStep} {...greenResults[2]} />
            </div>

            {/* Karta 11 - CIT 9% */}
            <div 
                ref={step == 2 && values.cit && values.citType == "cit9" ? ref : undefined} 
                className={`result-card result-card-5 ${step == 2 && values.cit && values.citType == "cit9" ? "active" : ""}`}
                {...getCardProps(!!(step == 2 && values.cit && values.citType == "cit9"))}
            >
                <GreenResult setStep={setStep} {...greenResults[3]} />
            </div>

            {/* Karta 12 - scale bez dochodu */}
            <div 
                ref={step == 3 && values.pit && values.pitType === "scale" && !values.income ? ref : undefined} 
                className={`result-card result-card-6 ${step == 3 && values.pit && values.pitType === "scale" && !values.income ? "active" : ""}`}
                {...getCardProps(!!(step == 3 && values.pit && values.pitType === "scale" && !values.income))}
            >
                <EmptyResult {...emptyResults[4]} />
            </div>

            {/* Karta 13 - scale z dochodem */}
            <div 
                ref={step == 3 && values.pit && values.pitType === "scale" && values.income ? ref : undefined} 
                className={`result-card result-card-7 ${step == 3 && values.pit && values.pitType === "scale" && values.income ? "active" : ""}`}
                {...getCardProps(!!(step == 3 && values.pit && values.pitType === "scale" && values.income))}
            >
                <CountResult
                    setStep={setStep}
                    count={
                        calculateForPIT2022(
                            values.incomePeriod === "monthly"
                                ? values.income! * 12
                                : values.income!,
                            values.donationAmount
                        ).donationSum
                    }
                />
            </div>

            {/* Karta 14 - lumpSum bez dochodu */}
            <div 
                ref={step == 3 && values.pit && values.pitType === "lumpSum" && !values.income ? ref : undefined} 
                className={`result-card result-card-6 ${step == 3 && values.pit && values.pitType === "lumpSum" && !values.income ? "active" : ""}`}
                {...getCardProps(!!(step == 3 && values.pit && values.pitType === "lumpSum" && !values.income))}
            >
                <EmptyResult {...emptyResults[5]} />
            </div>

            {/* Karta 15 - lumpSum z dochodem */}
            <div 
                ref={step == 3 && values.pit && values.pitType === "lumpSum" && values.income ? ref : undefined} 
                className={`result-card result-card-7 ${step == 3 && values.pit && values.pitType === "lumpSum" && values.income ? "active" : ""}`}
                {...getCardProps(!!(step == 3 && values.pit && values.pitType === "lumpSum" && values.income))}
            >
                <CountResult
                    setStep={setStep}
                    count={
                        calculateForPIT2022(
                            values.incomePeriod === "monthly"
                                ? values.income! * 12
                                : values.income!,
                            values.donationAmount
                        ).donationSum
                    }
                />
            </div>

            {/* Karta 16 - CIT bez dochodu */}
            <div 
                ref={step == 3 && values.cit && !values.income ? ref : undefined} 
                className={`result-card result-card-6 ${step == 3 && values.cit && !values.income ? "active" : ""}`}
                {...getCardProps(!!(step == 3 && values.cit && !values.income))}
            >
                <EmptyResult {...emptyResults[6]} />
            </div>

            {/* Karta 17 - CIT z dochodem */}
            <div 
                ref={step == 3 && values.cit && values.income ? ref : undefined} 
                className={`result-card result-card-7 ${step == 3 && values.cit && values.income ? "active" : ""}`}
                {...getCardProps(!!(step == 3 && values.cit && values.income))}
            >
                <CountResult
                    setStep={setStep}
                    count={
                        calculateForPPE2022(
                            values.incomePeriod === "monthly"
                                ? values.income! * 12
                                : values.income!,
                            values.citType === "cit19" ? 19 : 9,
                            0.1
                        ).donationSum
                    }
                />
            </div>

            {/* Karta 18 - Finish Result scale */}
            <div 
                ref={step == 4 && values.pit && values.pitType === "scale" ? ref : undefined} 
                className={`result-card result-card-7 ${step == 4 && values.pit && values.pitType === "scale" ? "active" : ""}`}
                {...getCardProps(!!(step == 4 && values.pit && values.pitType === "scale"))}
            >
                <FinishResult
                    taxRate={(values.income ?? 0) <= 120000 ? 12 : 32}
                    taxName="Stawka podatku"
                    values={values}
                    {...calculateForPIT2022(
                        values.incomePeriod === "monthly"
                            ? values.income! * 12
                            : values.income!,
                        values.donationAmount
                    )} 
                />
            </div>

            {/* Karta 19 - Finish Result lumpSum */}
            <div 
                ref={step == 4 && values.pit && values.pitType === "lumpSum" ? ref : undefined} 
                className={`result-card result-card-7 ${step == 4 && values.pit && values.pitType === "lumpSum" ? "active" : ""}`}
                {...getCardProps(!!(step == 4 && values.pit && values.pitType === "lumpSum"))}
            >
                <FinishResult
                    taxRate={values.lumpSum ?? 0}
                    taxName="Stawka ryczałtu"
                    values={values}
                    {...calculateForPPE2022(
                        values.incomePeriod === "monthly"
                            ? values.income! * 12
                            : values.income!,
                        values.lumpSum ?? 0,
                        values.donationAmount ?? 0
                    )} 
                />
            </div>

            {/* Karta 20 - Finish Empty Result flat19 */}
            <div 
                ref={step == 4 && values.pit && values.pitType === "flat19" ? ref : undefined} 
                className={`result-card result-card-7 ${step == 4 && values.pit && values.pitType === "flat19" ? "active" : ""}`}
                {...getCardProps(!!(step == 4 && values.pit && values.pitType === "flat19"))}
            >
                <FinisEmptyhResult values={values} />
            </div>

            {/* Karta 21 - Finish Result CIT */}
            <div 
                ref={step == 4 && values.cit ? ref : undefined} 
                className={`result-card result-card-7 ${step == 4 && values.cit ? "active" : ""}`}
                {...getCardProps(!!(step == 4 && values.cit))}
            >
                <FinishResult
                    taxRate={values.citType === "cit19" ? 19 : 9}
                    taxName="Stawka ryczałtu"
                    values={values}
                    {...calculateForPPE2022(
                        values.incomePeriod === "monthly"
                            ? values.income! * 12
                            : values.income!,
                        values.citType === "cit19" ? 19 : 9,
                        values.donationAmount ?? 0,
                        0.1
                    )} 
                />
            </div>
        </div>
    )
}

export default Result