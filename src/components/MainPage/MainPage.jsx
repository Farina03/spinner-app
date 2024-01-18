import React, { useState } from 'react'
import InputForm from '../InputForm/InputForm'
import ResultSection from '../ResultSection/ResultSection'
import './mainpage.css'
import WheelInput from '../WheelInput/WheelInput'
import WheelParent from '../WheelParent/WheelParent'

const MainPage = () => {
  const [allResult, setAllResult] = useState({})
  const [spinBoolean, setSpinBoolean] = useState(false)
  const [lastUserInfo, setLastUserInfo] = useState({
    email:"",
    username:""
  })
  return (
    <div className='main-div'>
        
        <div className='input-output-flexbox'>
        <InputForm setLastUserInfo={setLastUserInfo} setSpinBoolean={setSpinBoolean} allResult={allResult} setAllResult={setAllResult} />
        <ResultSection allResult={allResult}/>
        </div>
        <WheelParent spinBoolean={spinBoolean} setSpinBoolean={setSpinBoolean} lastUserInfo={lastUserInfo} setAllResult={setAllResult}/>
        {/* <WheelInput setSpinBoolean={setSpinBoolean} spinBoolean={spinBoolean} setAllResult={setAllResult} /> */}
    </div>
  )
}

export default MainPage