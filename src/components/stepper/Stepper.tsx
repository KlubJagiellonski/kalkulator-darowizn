import "./Stepper.scss"
import { useElementHeight } from "../../hooks/useElementHeight"

interface StepperProps {
    items: {
        children: React.ReactNode
        title: string
        subtitle: string
        name: string
        isValid?: boolean
        isBlock?: boolean
    }[],
    step: number,
    setStep: (step: number) => void
}

function Stepper({ items, step, setStep }: StepperProps) {
    const { ref: activeStepRef, height } = useElementHeight<HTMLDivElement>()

    const changeStep = (step: number) => {
        setStep(step)
    }

    const rightMarg = items[step - 1].isValid ?
        (items.length - step) / items.length * 100 :
        (items.length - step + 1) / items.length * 100 - 5

    return (
        <div className="stepper-box">
            <div className="stepper-count">
                <div className="text">
                    KROK {step} Z {items.length}
                </div>
                <div
                    className="dots-wrapper"
                    style={{
                        "--steps": items.length,
                    } as React.CSSProperties}
                >
                    <div
                        className="progress-line"
                        style={{
                            clipPath: `inset(0 ${rightMarg}% 0 0 round 999px)`
                        }}
                    >
                        {items.map((el, id) => (
                            <div
                                key={id}
                                className={`dot ${el.isBlock ? "block" : ""}`}
                            />
                        ))}
                    </div>
                    {items.map((el, id) => (
                        <button
                            className={`dot-box ${el.isBlock ? "block" : ""}`}
                            data-testid={`step-${id + 1}`}
                            key={id}
                            onClick={() => changeStep(id + 1)}
                            disabled={!(items[id - 1]?.isValid || step > id + 1) || step === id + 1}
                            aria-current={step === 1 ? "step" : undefined}
                            aria-label={`Krok ${id+1}: ${el.title}`}
                        >
                            <span className={`dot`} />
                            <span className={`dot-title ${(id + 1 < step || (id + 1 === step && items[step - 1].isValid)) && !el.isBlock ? "checked" : id + 1 === step ? "active" : ""}`}>
                                <span>{id + 1}</span>
                                <span className="title-extend"> · {el.name}</span>
                                <span className="block-text"> · Pominięty</span>
                            </span>
                        </button>
                    ))}
                </div>
                <div className="title-wrapper">
                    {items.map((item, id) =>
                        <h3 key={id} className={`title ${id + 1 === step ? "" : id + 1 >= step ? "r" : "l"}`}>
                            {item.title}
                        </h3>
                    )}
                </div>
                <div className="subtitle-wrapper">
                    {items.map((item, id) =>
                        <p key={id} className={`subtitle ${id + 1 === step ? "" : id + 1 >= step ? "r" : "l"}`}>
                            {item.subtitle}
                        </p>
                    )}
                </div>
            </div>
            <div className="steps">
                <div className={`steps-box`} style={{ height, width: `${100 * items.length}%`, transform: `translateX(${-(step - 1) * 100 / items.length}%)` }}>
                    {items.map((item, id) =>
                        <div key={id} className={`step`} ref={step === id + 1 ? activeStepRef : undefined}>
                            {item.children}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Stepper