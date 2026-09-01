import type { ValuesProps } from "../../../types/type"
import CIT from "./CIT/CIT"
import PIT from "./PIT/PIT"

function SecondStep({ values, setValues }: ValuesProps) {
    const { pit} = values

    return (
        <div className="step-content">
            {
                pit ?
                    <PIT values={values} setValues={setValues}/> :
                    <CIT values={values} setValues={setValues}/>
            }
        </div>
    )
}

export default SecondStep