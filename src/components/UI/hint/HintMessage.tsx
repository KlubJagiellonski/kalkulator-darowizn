import "./HintMessage.scss"

interface HintMessageProps {
    title: string,
    text: string
    open?: boolean
    className?: string;
}

function HintMessage({ title, text, open, className }: HintMessageProps) {
    return (
        <div data-testid="hint-message" className={`hint-message-wrapper ${className} ${open ? "open" : "close"}`}>
            <div className="hint-message">
                <h5 className="title">{title}</h5>
                <p className="text-hint">{text}</p>
            </div>
        </div>
    )
}
export default HintMessage