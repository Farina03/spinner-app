import React from 'react'
import { useState } from 'react'
import Wheel from '../Wheel/Wheel'

const WheelInput = ({setAllResult}) => {
    const [segments, setSegments] = useState([
        {label: "Segment 1", color: "#FF5733"},
        {label: "Segment 2", color: "#33FF57"},
        {label: "Segment 3", color: "#9DBC98"},
        {label: "Segment 4", color: "#86A7FC"}
    ])
    const [wheelInput, setWheelInput] = useState({
        title:"",
        type:"",
        color:""
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
  return (
    <div>
        <input type="text" name="title" value={wheelInput.title}
                onChange={handleChange} />
        <input type="text" name="type" value={wheelInput.type}
                onChange={handleChange} />
        <input type="text" name="color" value={wheelInput.color}
                onChange={handleChange}/>
        <button onClick={insertSegment}>Add Segment</button>
        <Wheel segments={segments} setAllResult={setAllResult}
                radius={200}/>
    </div>
  )
}

export default WheelInput