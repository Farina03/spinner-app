import React, { useState } from 'react'
import { useRef, useEffect } from 'react'

const Wheel = ({segments, radius}) => {
    const canvasRef = useRef()
    const indicatorRef = useRef()
    const [spinResult, setSpinResult] = useState(null)

    const handleSpin = () => {
        const spinDuration = Math.random() * (6000-3000) + 3000
        const spinResultAngle = Math.random() * 360
        const startTime = performance.now()

        const animateSpin = (timestamp) => {
            const elapsedTime = timestamp - startTime
            //calculate the rotation angle based on elapsed time
            const rotation = (elapsedTime/spinDuration)*720

            // if(elapsedTime < spinDuration) {

                //update canvas rotation
                const canvas = canvasRef.current
                const context = canvas.getContext('2d')
                context.clearRect(0, 0, canvas.width, canvas.height)

                segments.forEach((segment, index) => {
                    const startAngle = (index/segments.length)*360 + rotation
                    const endAngle = ((index+1)/segments.length)*360 + rotation

                    //Draw segment
                    context.beginPath()
                    context.moveTo(radius, radius)
                    context.arc(radius, radius, radius, (startAngle*Math.PI)/180, (endAngle*Math.PI)/180)
                    context.fillStyle = segment.color
                    context.fill()
                    context.closePath()

                    //Draw Labels
                    const labelRadius = radius*.8
                    const labelAngle = (startAngle+endAngle)/2
                    const labelX = radius+labelRadius*Math.cos(labelAngle*(Math.PI/180))
                    const labelY = radius+labelRadius*Math.sin(labelAngle*(Math.PI/180))
                    context.fillStyle = "#000"
                    context.textAlign = "center"
                    context.textBaseline = "middle"
                    context.fillText(segment.label, labelX, labelY)

                })

                //Draw indicator pin
                const indicatorCanvas = indicatorRef.current
                const indicatorContext = indicatorCanvas.getContext('2d')
                indicatorContext.clearRect(0,0, indicatorCanvas.width, indicatorCanvas.height)

                const indicatorStartAngle = (spinResultAngle+rotation)%360
                const indicatorEndAngle = ((spinResultAngle+rotation)%360) + 20

                indicatorContext.beginPath()
                indicatorContext.moveTo(radius, radius)
                indicatorContext.arc(
                    radius,
                    radius,
                    radius,
                    (indicatorStartAngle * Math.PI)/180,
                    (indicatorEndAngle*Math.PI)/180
                )
                indicatorContext.fillStyle = "#FF0000"
                indicatorContext.fill()
                indicatorContext.closePath()

                if(elapsedTime < spinDuration)
                    requestAnimationFrame(animateSpin)
                else 
                    setSpinResult((spinResultAngle+rotation)%360)
            // } else {
            //     setSpinResult((spinResultAngle + rotation) % 360)
            // }
        }
        //start the animation
        requestAnimationFrame(animateSpin)
    }

    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')

            segments.forEach((segment, index) => {
                const startAngle = (index/segments.length)*360
                const endAngle = ((index+1)/segments.length)*360
                //Draw Slices
                context.beginPath();
                context.moveTo(radius, radius)
                context.arc(radius, radius, radius, (startAngle*Math.PI)/180, (endAngle*Math.PI)/180)
                context.fillStyle = segment.color
                context.fill()
                context.closePath()
                
                //Draw labels
                const labelRadius = radius * 0.8
                const labelAngle = (startAngle+endAngle)/2
                const labelX = radius + labelRadius * Math.cos(labelAngle*(Math.PI/180))
                const labelY = radius + labelRadius * Math.sin(labelAngle*(Math.PI/180))
                context.fillStyle = "#000"
                context.textAlign = "center"
                context.textBaseline = "middle"
                context.fillText(segment.label, labelX, labelY)
                
            })
    }, [segments, radius])

  return (
    <div style={{display:"flex"}}>
        <canvas ref={canvasRef}
                width={2*radius}
                height={2*radius}
                style={{border:"1 px solid black"}}
                // onClick={onSpin}
        >
        </canvas>
        <canvas
            ref={indicatorRef}
            width={2*radius}
            height={2*radius}
            style={{border:"1px solid black", marginLeft:"10px"}}>
        </canvas>
        {spinResult !== null && (
            <p style={{marginLeft:"10px"}}>Result: {Math.floor(spinResult)}</p>
        )}
        <button onClick={handleSpin}>Spin</button>

    </div>
  )
}

export default Wheel