import React, { useState } from 'react'
import './inputform.css'

const InputForm = ({allResult, setAllResult, setSpinBoolean, setLastUserInfo}) => {
    const [emailData, setEmailData] = useState({
        email: "",
        username: ""
    })
    function handleChange(event) {
        const {name, value} = event.target
        setEmailData(prevData => {
            return (
                {
                    ...prevData,
                    [name] : value
                }
            )
        })
    }
    
    function handleEmailSubmit() {
        let {email, username} = emailData
        if(email === "" || username === "")
        {
            alert("fill out first")
        }
        else if(allResult[email])
            alert("Already exists")
        else {
        setSpinBoolean(true)
        setLastUserInfo(emailData)
        }
        setEmailData({
            email:"",
            username:""
        })
    }
    console.log(allResult)
    //"discount" : 40 
  return (
    <div className='user-input-outer-div'>
        <input className='useremail' type='email' name="email" value={emailData.email} placeholder='Enter your email'
                onChange={handleChange} />
        <input type='text' name="username" value={emailData.username} placeholder='Enter your name'
                onChange={handleChange} />
        <button className='inputsubmit' onClick={handleEmailSubmit}>Spin</button>
    </div>
  )
}

export default InputForm