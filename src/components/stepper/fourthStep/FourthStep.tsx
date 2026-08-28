import type { ValuesProps } from "../../../types/type"
import "./FourthStep.scss"
import { calculateForPIT2022 } from "../../../alghorytm/2022/pit-calculations-2022"
import LastStep from "./last-step/LastStep"
import { calculateForPPE2022 } from "../../../alghorytm/2022/ppe-calculations-2022"

function FourthStep({ values, setValues }: ValuesProps) {

    const { incomePeriod, income, pit, pitType, cit, citType } = values

    return (
        <>
            {
                pit && pitType === "scale" &&
                <LastStep
                    setValues={setValues}
                    values={values}
                    donationSum={
                        calculateForPIT2022(
                            incomePeriod === "monthly"
                                ? income! * 12
                                : income!,
                            values.donationAmount
                        ).donationSum} />
            }
            {
                pit && pitType === "lumpSum" &&
                <LastStep
                    setValues={setValues}
                    values={values}
                    donationSum={
                        calculateForPPE2022(
                            incomePeriod === "monthly"
                                ? income! * 12
                                : income!,
                            values.lumpSum ?? 0,
                            values.donationAmount ?? 0
                        ).donationSum} />
            }
            {
                pit && pitType === "flat19" &&
                <LastStep
                    setValues={setValues}
                    values={values}
                />
            }
            {
                cit &&
                <LastStep
                    setValues={setValues}
                    values={values}
                    donationSum={
                        calculateForPPE2022(
                            incomePeriod === "monthly"
                                ? income! * 12
                                : income!,
                            citType === "cit19" ? 19 : 9,
                            values.donationAmount ?? 0,
                            0.1
                        ).donationSum}
                />
            }
        </>
    )
}

export default FourthStep