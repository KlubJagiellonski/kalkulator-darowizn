import { calculateForPIT2022 } from "../../alghorytm/2022/pit-calculations-2022"
import { calculateForPPE2022 } from "../../alghorytm/2022/ppe-calculations-2022"
import type { Values } from "../../types/type"
import ResultDetails from "./ResultDatils"
import "./ResultDatils.scss"
import ResultDetailsEmpty from "./ResultDatilsEmpty"

interface ResultDetailProps {
    open?: boolean
    setOpen: (open: boolean) => void
    values: Values
}

function ResultDetail({ open, values, setOpen }: ResultDetailProps) {

    const { pit, pitType, lumpSum, cit, citType } = values

    return (
        <>
            {pit && pitType === "scale" &&
                <ResultDetails
                    taxRate={(values.income ?? 0) <= 120000 ? 12 : 32}
                    open={open}
                    values={values}
                    taxName="skala podatkowa"
                    setOpen={setOpen}
                    {...calculateForPIT2022(
                        values.incomePeriod === "monthly"
                            ? values.income! * 12
                            : values.income!,
                        values.donationAmount
                    )} />

            }
            {pit && pitType === "lumpSum" &&
                <ResultDetails
                    taxRate={lumpSum || 0}
                    open={open}
                    values={values}
                    taxName={`ryczałt ${lumpSum}%`}
                    taxText="stawka ryczałtu"
                    setOpen={setOpen}
                    {...calculateForPPE2022(
                        values.incomePeriod === "monthly"
                            ? values.income! * 12
                            : values.income!,
                        values.lumpSum ?? 0,
                        values.donationAmount ?? 0
                    )} />
            }
            {pit && pitType === "flat19" &&
                <ResultDetailsEmpty
                    open={open}
                    values={values}
                    setOpen={setOpen} />
            }
            {cit && citType === "cit19" &&
                <ResultDetails
                    taxRate={19}
                    open={open}
                    values={values}
                    taxName={`ryczałt 19%`}
                    setOpen={setOpen}
                    {...calculateForPPE2022(
                        values.incomePeriod === "monthly"
                            ? values.income! * 12
                            : values.income!,
                        19,
                        values.donationAmount ?? 0
                    )} />
            }
            {cit && citType === "cit9" &&
                <ResultDetails
                    taxRate={9}
                    open={open}
                    values={values}
                    taxName={`ryczałt 9%`}
                    setOpen={setOpen}
                    {...calculateForPPE2022(
                        values.incomePeriod === "monthly"
                            ? values.income! * 12
                            : values.income!,
                        9,
                        values.donationAmount ?? 0
                    )} />
            }
        </>

    )
}

export default ResultDetail