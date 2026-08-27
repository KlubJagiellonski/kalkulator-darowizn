import "./HintMessage.scss"

interface HintMessageProps {
    title: string,
    text: string
    open?: boolean
}

function HintMessage({ title, text, open }: HintMessageProps) {
    return (
        <div className={`hint-message-wrapper ${open ? "open" : "close"}`}>
            <div className="hint-message">
                <h5 className="title">{title}</h5>
                <p className="text-hint">{text}</p>
            </div>
        </div>
    )
}
export default HintMessage