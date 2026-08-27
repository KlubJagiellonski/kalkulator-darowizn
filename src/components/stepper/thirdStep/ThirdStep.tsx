import type { ValuesProps } from "../../../types/type"
import PitInput from "./pitInput/PitInput"

function ThirdStep({ values, setValues }: ValuesProps) {

    const yearlyIncome =
        values.incomePeriod === "monthly"
            ? (values.income ?? 0) * 12
            : (values.income ?? 0)

    const taxRate = yearlyIncome > 120000 ? 32 : 12


    return (
        <div className="step-content">
            {
                values.pitType === "scale" &&
                <PitInput
                    setValues={setValues}
                    values={values}
                    taxRate={taxRate}
                    info="Potrzebny wyłącznie do wyliczenia stawki i limitu 6%."
                    textEmpty="Kwota brutto, przed odliczeniem składek."
                    text="Twoja stawka podatku:" />
            }
            {
                values.pitType === "lumpSum" &&
                <PitInput
                    setValues={setValues}
                    values={values}
                    taxRate={values.lumpSum ?? 0}
                    info="Przy ryczałcie limit 6% liczy się od przychodu, a nie od dochodu."
                    textEmpty="Kwota z ewidencji przychodów. Możesz ją później zmienić."
                    text="Twoja stawka ryczałtu:" />
            }
        </div>
    )
}

export default ThirdStep