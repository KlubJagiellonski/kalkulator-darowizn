import "./Toggle.scss"

interface ToggleProps{
    position: "first" | "second",
    setPosition: (position: "first" | "second")=>void
    firstItem: string
    secondItem: string
}

function Toggle({position, setPosition, firstItem, secondItem}: ToggleProps) {

    const handleClick = (position: "first" | "second") =>{
        setPosition(position)
    }

    return (
        <div className={`toggle-wrapper ${position}`}>
            <div className="toggle-cover"></div>
            <button className="toggle-item toggle-item-1" onClick={()=>{handleClick("first")}}>{firstItem}</button>
            <button className="toggle-item toggle-item-2" onClick={()=>{handleClick("second")}}>{secondItem}</button>
        </div>
    )
}

export default Toggle