import type { ValuesProps } from "../../../types/type"
import Scale from "./scala/Scale"

function ThirdStep({values, setValues} : ValuesProps) {

    return (
        <div className="step-content">
            <Scale values={values} setValues={setValues}/>
        </div>
    )
}

export default ThirdStep