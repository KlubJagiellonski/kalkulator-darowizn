import "./Hint.scss"

interface HintProps {
    active: boolean
    setActive: (active: boolean) => void
    id: string
}

function Hint({ active, setActive, id }: HintProps) {
    return (
        <button
            id={id}
            style={{ anchorName: `--${id}` }}
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