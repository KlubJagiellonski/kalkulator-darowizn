import { useEffect, useRef, useState } from "react"
import "./Stepper.scss"

interface StepperProps {
    items: {
        children: React.ReactNode
        title: string
        subtitle: string
        name: string
    }[],
    step: number,
    setStep: (step: number) => void
}

function Stepper({ items, step, setStep }: StepperProps) {
    const [height, setHeight] = useState(0)
    const [ready, setready] = useState(false)
    const activeStepRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (activeStepRef.current) {
            setHeight(activeStepRef.current.scrollHeight)
        }
    }, [step])

    const changeStep = (step: number) => {
        setready(true)
        setStep(step)
    }

    return (
        <div className={`stepper-wrapper`}>
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
                            clipPath: `inset(0 ${(items.length - step) / items.length * 100}% 0 0 round 999px)`
                        }}
                    >
                        {items.map((_, id) => (
                            <div
                                key={id}
                                className={`dot`}
                            />
                        ))}
                    </div>
                    {items.map((el, id) => (
                        <div className="dot-box" data-testid={`step-${id + 1}`} key={id} onClick={() => changeStep(id + 1)}
                        >
                            <div className={`dot`} />
                            <p className={`dot-title ${step === id + 1 ? "active" : ""}`}>{id + 1} · {el.name}</p>
                        </div>
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
                <div className={`steps-box ${ready ? "ready" : ""}`} style={{ height, width: `${100 * items.length}%`, transform: `translateX(${-(step - 1) * 100 / items.length}%)` }}>
                    {items.map((item, id) =>
                        <div key={id} className={`step`} ref={step === id + 1 ? activeStepRef : undefined}>
                            {item.children}
                        </div>
                    )}
                </div>
            </div>
            <div className="btns">
                <button disabled={step == 1} className="button button--ghost button-stepper" onClick={() => changeStep(step - 1)}>← Wstecz</button>
                <button disabled={step == items.length} className="button button--dark button-stepper" onClick={() => changeStep(step + 1)}>Dalej →</button>
            </div>
        </div>
    )
}

export default Stepper