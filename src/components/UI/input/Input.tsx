import "./Input.scss"

interface InputProps {
    value: string | number
    onChange: (value: string | number) => void
    prefix?: string
    placeholder?: string
}

function Input({ prefix, onChange, value, placeholder }: InputProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) =>{
        onChange(e.target.value)
    }

    return (
        <div className="input-wrapper">
            <input placeholder={placeholder} className="input" value={value} onChange={handleChange}></input>
            {
                prefix &&
                <p className="prefix">{prefix}</p>
            }
        </div>
    )
}

export default Input