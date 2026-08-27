import type { ValuesProps } from "../types/type"

interface Back extends ValuesProps {
    step: number
    setStep: (step: number) => void
}

export const back = ({ step, setStep, setValues, values }: Back) => {
    if (step === 1) {
        setValues({
            ...values,
            citType: undefined,
            pitType: undefined,
            donationPerid: "once",
            income: undefined,
            incomePeriod: "yearly",
            lumpSum: undefined,
        })
    } else if (step === 2) {
        setValues({
            ...values,
            donationPerid: "once",
            income: undefined,
            incomePeriod: "yearly",
            lumpSum: undefined,
        })
    } else if (step === 3) {
        setValues({
            ...values,
            donationPerid: "once",
            lumpSum: undefined,
        })
    }

    setStep(step)
}