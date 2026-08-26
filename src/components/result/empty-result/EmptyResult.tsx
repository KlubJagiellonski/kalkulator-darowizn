import "./EmptyResult.scss"

interface EmptyResultProps {
    char: string
    text: string
    smallText?: string
    smallTextLonger?: string
}

function EmptyResult({ char, text, smallText, smallTextLonger }: EmptyResultProps) {
    return (
        <div className="empty-result">
            <div className="icon">{char}</div>
            <p className="text text-1">{text}</p>
            {
                smallText || smallTextLonger &&
                <p className="text text-2">{smallText}<span> {smallTextLonger}</span></p>
            }
        </div>
    )
}

export default EmptyResult

