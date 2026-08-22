import "./Toggle.scss"

interface ToggleProps{
    position: "first" | "second",
    setPosition: (position: "first" | "second")=>void
}

function Toggle({position, setPosition}: ToggleProps) {

    const handleClick = (position: "first" | "second") =>{
        setPosition(position)
    }

    return (
        <div className={`toggle-wrapper ${position}`}>
            <div className="toggle-cover"></div>
            <button className="toggle-item toggle-item-1" onClick={()=>{handleClick("first")}}>Tryb prosty</button>
            <button className="toggle-item toggle-item-2" onClick={()=>{handleClick("second")}}>Tryb rozszerzony</button>
        </div>
    )
}

export default Toggle