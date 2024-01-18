// import React, { useRef, useState, useEffect } from 'react';

// const CustomizableWheel = ({ segments }) => {
//   const canvasRef = useRef();
//   const [spinResult, setSpinResult] = useState(null);

//   useEffect(() => {
//     drawWheel();
//     drawNeedle();
//   }, []);

//   const drawWheel = () => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const context = canvas.getContext('2d');
//     if (!context) return;

//     const centerX = canvas.width / 2;
//     const centerY = canvas.height / 2;

//     // Draw wheel segments
//     const segmentAngle = (2 * Math.PI) / segments.length;
//     segments.forEach((segment, index) => {
//       const startAngle = index * segmentAngle;
//       const endAngle = (index + 1) * segmentAngle;

//       context.beginPath();
//       context.moveTo(centerX, centerY);
//       context.arc(centerX, centerY, centerY, startAngle, endAngle);
//       context.fillStyle = segment.color;
//       context.fill();
//       context.closePath();

//       // Draw label
//       const labelAngle = startAngle + (segmentAngle / 2);
//       const labelRadius = centerY * 0.8;
//       const labelX = centerX + labelRadius * Math.cos(labelAngle);
//       const labelY = centerY + labelRadius * Math.sin(labelAngle);

//       context.font = '12px Arial';
//       context.fillStyle = '#000';
//       context.textAlign = 'center';
//       context.textBaseline = 'middle';
//       context.fillText(segment.label, labelX, labelY);
//     });
//   };

//   const drawNeedle = () => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const context = canvas.getContext('2d');
//     if (!context) return;

//     const centerX = canvas.width / 2;
//     const centerY = canvas.height / 2;

//     // Draw fixed needle at the center
//     context.beginPath();
//     context.moveTo(centerX, centerY + 20);
//     context.lineTo(centerX - 5, centerY);
//     context.lineTo(centerX + 5, centerY);
//     context.fillStyle = '#000'; // Black color for needle
//     context.fill();
//     context.closePath();
//   };

//   const handleSpin = () => {
//     const spinDuration = Math.random() * (5000 - 3000) + 3000; // Random duration between 3 to 5 seconds
//     const spinSpeed = Math.random() * 500 + 250; // Random speed between 250 to 750 degrees per frame

//     const startTime = performance.now();

//     const animateSpin = (timestamp) => {
//       const elapsedTime = timestamp - startTime;

//       const canvas = canvasRef.current;
//       if (!canvas) return;

//       const context = canvas.getContext('2d');
//       if (!context) return;

//       context.clearRect(0, 0, canvas.width, canvas.height);

//       // Rotate the wheel
//       const centerX = canvas.width / 2;
//       const centerY = canvas.height / 2;
//       const rotation = (elapsedTime / spinDuration) * spinSpeed;

//       context.save(); // Save the current context state
//       context.translate(centerX, centerY);
//       context.rotate((rotation * Math.PI) / 180);
//       context.translate(-centerX, -centerY);

//       drawWheel(); // Redraw the wheel and labels

//       context.restore(); // Restore the saved context state

//       drawNeedle(); // Redraw the needle

//       // Request animation frame
//       if (elapsedTime < spinDuration) {
//         requestAnimationFrame(animateSpin);
//       } else {
//         // Spin has ended, determine the result using the lower edge of the needle
//         const currentSegmentIndex = Math.floor((rotation % (360 * (segments.length / 2))) / 360 * segments.length);
//         const result = segments[currentSegmentIndex]?.label || 'Unknown';
//         setSpinResult(result);
//       }
//     };

//     requestAnimationFrame(animateSpin);
//   };

//   return (
//     <div>
//       <canvas
//         ref={canvasRef}
//         width={400}
//         height={400}
//         style={{ border: '2px solid black' }}
//       ></canvas>
//       <button onClick={handleSpin}>Spin</button>
//       {spinResult !== null && (
//         <p style={{ marginLeft: '10px', fontWeight: 'bold' }}>Result: {spinResult}</p>
//       )}
//     </div>
//   );
// };

// export default CustomizableWheel;

import React, { useRef, useState, useEffect, spinBoolean, setSpinBoolean } from 'react';

const CustomizableWheel = ({ segments, setAllResult }) => {
  const canvasRef = useRef();
  const [spinResult, setSpinResult] = useState(null);

  useEffect(() => {
    drawWheel();
    drawNeedle();
  }, [segments]);

  const drawWheel = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Draw wheel segments
    const segmentAngle = (2 * Math.PI) / segments.length;
    segments.forEach((segment, index) => {
      const startAngle = index * segmentAngle;
      const endAngle = (index + 1) * segmentAngle;

      context.beginPath();
      context.moveTo(centerX, centerY);
      context.arc(centerX, centerY, centerY, startAngle, endAngle);
      context.fillStyle = segment.color;
      context.fill();
      context.closePath();

      // Draw label
      const labelAngle = startAngle + (segmentAngle / 2);
      const labelRadius = centerY * 0.8;
      const labelX = centerX + labelRadius * Math.cos(labelAngle);
      const labelY = centerY + labelRadius * Math.sin(labelAngle);

      context.font = '12px Arial';
      context.fillStyle = '#000';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(segment.label, labelX, labelY);
    });
  };

  const drawNeedle = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Draw fixed needle at the center with the pointy side facing upwards
    context.beginPath();
    context.moveTo(centerX, centerY - 50); // Increased needle height to 30
    context.lineTo(centerX - 8, centerY);
    context.lineTo(centerX + 8, centerY);
    context.fillStyle = '#000'; // Black color for needle
    context.fill();
    context.closePath();
  };

  const handleSpin = () => {
    const spinDuration = Math.random() * (6000 - 3000) + 3000; // Random duration between 3 to 5 seconds
    const spinSpeed = Math.random() * 500 + 750; // Random speed between 250 to 750 degrees per frame

    const startTime = performance.now();

    const animateSpin = (timestamp) => {
      const elapsedTime = timestamp - startTime;

      const canvas = canvasRef.current;
      if (!canvas) return;

      const context = canvas.getContext('2d');
      if (!context) return;

      context.clearRect(0, 0, canvas.width, canvas.height);

      // Rotate the wheel
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const rotation = (elapsedTime / spinDuration) * spinSpeed;

      context.save(); // Save the current context state
      context.translate(centerX, centerY);
      context.rotate((rotation * Math.PI) / 180); //radian cone for rotation
      context.translate(-centerX, -centerY);

      drawWheel(); // Redraw the wheel and labels

      context.restore(); // Restore the saved context state

      drawNeedle(); // Redraw the needle

      // Request animation frame
      if (elapsedTime < spinDuration) {
        requestAnimationFrame(animateSpin);
      } else {
        // Spin has ended, determine the result using the lower edge of the needle
        // const currentSegmentIndex = Math.floor((rotation % (360 * (segments.length / 2))) / 360 * segments.length);
        //const result = segments[currentSegmentIndex]?.label || 'Unknown';
        const currentSegmentIndex = (rotation*360)/segments.length
        const result = segments[(currentSegmentIndex+1) % segments.length]?.label || 'unknown'
        //const result = segments[(currentSegmentIndex + segments.length) % segments.length]?.label || 'Unknown'
        setSpinResult(result);
        // setAllResult(prevItem => {
        //     return (
        //         {
        //             ...prevItem,
        //             [spinBoolean]:{...prevItem[spinBoolean],
        //                             discount:result}
        //         }
        //     )
        // })
        // setSpinBoolean("")
      }
    };

    requestAnimationFrame(animateSpin);
  };

  return (
    <div className='canvar-outer-div'>
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        style={{ padding:'20px' }}
      ></canvas>
      {/* {spinBoolean !== "" && handleSpin()} */}
      <button onClick={handleSpin}>Spin</button>
      {spinResult !== null && (
        <p style={{ marginLeft: '10px', fontWeight: 'bold' }}>Result: {spinResult}</p>
      )}
    </div>
  );
};

export default CustomizableWheel;

















