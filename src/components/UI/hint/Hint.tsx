import "./Hint.scss"

interface HintProps {
    active: boolean
    setActive: (active: boolean) => void
    label: string
}

function Hint({ active, setActive, label }: HintProps) {
    return (
        <button
            aria-label={label}
            onPointerDown={() => setActive(true)}
            onPointerUp={() => setActive(false)}
            onPointerCancel={() => setActive(false)}
            onPointerLeave={() => setActive(false)}
            onPointerEnter={() => setActive(true)}
            className={`hint-wrapper ${active ? "active" : ""}`}>
            ?
        </button>
    )
}

export default Hint