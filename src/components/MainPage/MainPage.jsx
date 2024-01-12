import React, { useState } from 'react'
import InputForm from '../InputForm/InputForm'
import ResultSection from '../ResultSection/ResultSection'
import './mainpage.css'

const MainPage = () => {
    const [allResult, setAllResult] = useState({})
  return (
    <div className='main-div'>
        <InputForm allResult={allResult} setAllResult={setAllResult} />
        <ResultSection allResult={allResult}/>
    </div>
  )
}

export default MainPage