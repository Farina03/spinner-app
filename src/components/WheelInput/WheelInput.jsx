import React from 'react'
import { useState } from 'react'
import './Wheelinput.css'
import CustomizableWheel from '../CustomizableWheel/CustomizableWheel'

const WheelInput = ({setAllResult}) => {
    // const [segments, setSegments] = useState([
    //     {label: "Segment 1", color: "#FF5733"},
    //     {label: "Segment 2", color: "#33FF57"},
    //     {label: "Segment 3", color: "#9DBC98"},
    //     {label: "Segment 4", color: "#86A7FC"}
    // ])
    const [segments, setSegments] = useState(["seg 1", "seg 2", "seg 3", "seg 4"])
    const [wheelInput, setWheelInput] = useState({
        title:"",
        type:"",
        color:"#FF6868"
    })
    function handleChange(event) {
        const {name, value} = event.target
        setWheelInput({
            ...wheelInput,
            [name] : value
        })
    }
    // function handleSpin() {
    //   console.log("spinning!")
    // }
    function insertSegment() {
        setSegments([...segments, {
            label: `${wheelInput.title} ${wheelInput.type}`,
            color: wheelInput.color
        }])
        setWheelInput({
            title: "",
            type: "",
            color: ""
        })
    }
    const handleSpin = (result) => {
        console.log("spinned result: ", result)
    }
  return (
    <div className='wheel-input-page'>
        <div className='input-div'>
        <input type="text" name="title" value={wheelInput.title}
                placeholder="Insert discout amount" onChange={handleChange} />
        <label>Select a discount type</label>
        <select name="type" value={wheelInput.type} onChange={handleChange} className='dropdown-div'>
            <option>Fixed</option>
            <option>Percent</option>
        </select>
        <label for="color">Pick a color</label>
        <input className="color-input" type="color" name="color" value={wheelInput.color}
                placeholder="Pick a color" onChange={handleChange}/>
        <button onClick={insertSegment}>Add Segment</button>
        </div>
        <CustomizableWheel segments={segments} setAllResult={setAllResult}
                radius={200} indicatorSize={150} onSpin={handleSpin}/>
    </div>
  )
}

export default WheelInput