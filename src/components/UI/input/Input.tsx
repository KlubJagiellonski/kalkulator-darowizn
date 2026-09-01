import "./Input.scss"

interface InputProps {
    value: string | number
    onChange: (value: string | number) => void
    prefix?: string
    placeholder?: string
    ariaLabel?: string
}

function Input({ prefix, onChange, value, placeholder, ariaLabel }: InputProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) =>{
        onChange(e.target.value)
    }

    return (
        <div className="input-wrapper">
            <input aria-label={ariaLabel} placeholder={placeholder} className="input" value={value} onChange={handleChange}></input>
            {
                prefix &&
                <p className="prefix">{prefix}</p>
            }
        </div>
    )
}

export default Input