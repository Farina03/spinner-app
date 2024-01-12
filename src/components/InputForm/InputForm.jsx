import React, { useState } from 'react'

const InputForm = ({allResult, setAllResult}) => {
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
            console.log("fill out first")
        }
        else if(allResult[email])
            console.log("Already exists")
        else {
        setAllResult(prevItem => {
            return (
                // prevItem[email] ? console.log("already exists") :
                {...prevItem,
                [email] : { "email": email,
                            "username" : username,
                            "discount" : 40 }}
            )
        }) }
        setEmailData({
            email:"",
            username:""
        })
    }
    console.log(allResult)
  return (
    <div>
        <input className='useremail' type='email' name="email" value={emailData.email} placeholder='Enter your email'
                onChange={handleChange} />
        <input type='text' name="username" value={emailData.username} placeholder='Enter your name'
                onChange={handleChange} />
        <button className='inputsubmit' onClick={handleEmailSubmit}>Spin</button>
    </div>
  )
}

export default InputForm