import "./Input.scss"

interface InputProps {
    value: string | number
    onChange: (value: string | number) => void
    prefix?: string
}

function Input({ prefix, onChange, value }: InputProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) =>{
        onChange(e.target.value)
    }

    return (
        <div className="input-wrapper">
            <input className="input" value={value} onChange={handleChange}></input>
            {
                prefix &&
                <p className="prefix">{prefix}</p>
            }
        </div>
    )
}

export default Input