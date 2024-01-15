import React, { useState } from 'react'
import InputForm from '../InputForm/InputForm'
import ResultSection from '../ResultSection/ResultSection'
import './mainpage.css'
import Wheel from '../Wheel/Wheel'
import WheelInput from '../WheelInput/WheelInput'

const MainPage = () => {
  const [allResult, setAllResult] = useState({})
  return (
    <div className='main-div'>
        {/* <InputForm allResult={allResult} setAllResult={setAllResult} />
        <ResultSection allResult={allResult}/> */}
        <WheelInput setAllResult={setAllResult} />
    </div>
  )
}

export default MainPage