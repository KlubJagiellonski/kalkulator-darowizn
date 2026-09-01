import "./Alert.scss"

interface AlertProps {
    title: string
    text: string
    shortText: string
    shortTitle?: string
    show?: boolean
}

function Alert({ title, text, shortText, show, shortTitle }: AlertProps) {
    return (
        <div className={`alert-wrapper ${show ? "open" : "close"}`} data-testid="alert">
            <div className="alert" >
                <h5 className="alert-title">{title}</h5>
                <h5 className="alert-title alert-title-short">{shortTitle ?? title}</h5>
                <p className="alert-text">{text}</p>
                <p className="alert-short-text">{shortText}</p>
            </div>
        </div>
    )
}

export default Alert