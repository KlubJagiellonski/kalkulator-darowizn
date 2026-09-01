import type { ValuesProps } from "../types/type"

interface Back extends ValuesProps {
    step: number
    setStep: (step: number) => void
}

export const back = ({ step, setStep, setValues, values }: Back) => {
    let newStep = step
    if(values.pitType === "flat19" && values.pit && step === 3){
        newStep = 2
    }

    if (newStep === 1) {
        setValues({
            ...values,
            citType: undefined,
            pitType: undefined,
            donationPerid: "once",
            income: undefined,
            incomePeriod: "yearly",
            lumpSum: undefined,
            donationAmount: 500
        })
    } else if (newStep === 2) {
        setValues({
            ...values,
            donationPerid: "once",
            income: undefined,
            incomePeriod: "yearly",
            donationAmount: 500
        })
    } else if (newStep === 3) {
        setValues({
            ...values,
            donationPerid: "once",
            lumpSum: undefined,
            donationAmount: 500
        })
    }

    setStep(newStep)
}