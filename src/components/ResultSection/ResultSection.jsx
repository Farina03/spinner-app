import React from 'react'
import './resultsection.css'

const ResultSection = ({allResult}) => {
  return (
    <div className='result-outer-div'>
        <div className='result-header'>
            <div className='result-inner-div'>
                Email
            </div>
            <div className='result-inner-div'>
                Username 
            </div>
            <div className='result-inner-div'>
                Discout Result
            </div>
        </div>
        {Object.keys(allResult).map(item => {
            return (
                <div className='result-header'>
                    <div className='result-inner-div'>
                        {allResult[item].email}
                    </div>
                    <div className='result-inner-div'>
                        {allResult[item].username}
                    </div>
                    <div className='result-inner-div'>
                        {allResult[item].discount}
                    </div>
                </div>
            )
        })}
        
    </div>
  )
}

export default ResultSection