import React, { Component } from 'react'
import { useState } from 'react'
import '../WheelInput/Wheelinput.css'
import WheelComponent from '../Wheel/WheelComponent'

const WheelParent = ({setAllResult, lastUserInfo, spinBoolean, setSpinBoolean}) => {
  const [segments, setSegments] = useState([
    'better luck next time',
    'won 70',
    'won 10',
    'better luck next time',
    'won 2',
    'won uber pass',
    'better luck next time',
    'won a voucher'
  ])
  const [segColors, setSegColors] = useState([
    '#EE4040',
    '#F0CF50',
    '#815CD1',
    '#3DA5E0',
    '#34A24F',
    '#F9AA1F',
    '#EC3F3F',
    '#FF9000'
  ])
  const onFinished = (winner) => {
    //console.log(winner)
    setAllResult(prevItem => {
        return (
            // prevItem[email] ? console.log("already exists") :
            {...prevItem,
                [lastUserInfo.email] : {
                    ...lastUserInfo, discout:winner
                }
            
            // [email] : { "email": email,
            //             "username" : username}
            })
    })
    setSpinBoolean(false) 
  }
//   const [segments, setSegments] = useState(["seg 1", "seg 2", "seg 3", "seg 4"])
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
    function insertSegment() {
        // setSegments([...segments, {
        //     label: `${wheelInput.title} ${wheelInput.type}`,
        //     color: wheelInput.color
        // }])
        setSegments(prevItem => {
            return (
                [...prevItem, wheelInput.title+" "+wheelInput.type]
            )})
        setSegColors(prevItem => {
            return ([...prevItem, wheelInput.color]
            )})
        
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
        {/* onClick={insertSegment} */}
        </div>
        <WheelComponent
            spinBoolean={spinBoolean}
            segments={segments}
            segColors={segColors}
            winningSegment='won 10'
            onFinished={(winner) => onFinished(winner)}
            primaryColor='black'
            contrastColor='white'
            buttonText='Spin'
            isOnlyOnce={false}
            size={290}
            upDuration={100}
            downDuration={1000}
            fontFamily='Arial'
        />
        {/* <CustomizableWheel segments={segments} setAllResult={setAllResult}
                radius={200} indicatorSize={150} onSpin={handleSpin}/> */}
    </div>
    
  )
}
export default WheelParent