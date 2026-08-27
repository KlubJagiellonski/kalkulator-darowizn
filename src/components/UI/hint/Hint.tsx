import "./Hint.scss"

interface HintProps {
    active: boolean
    setActive: (active: boolean) => void
}

function Hint({ active, setActive }: HintProps) {
    return (
        <button
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