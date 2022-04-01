import React from 'react'
import Countdown from 'react-countdown';




const MyCountdown = (props) => {
  const Completionist = () => <span>Time out</span>;
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <Completionist />;
    } else {
      // Render a countdown
      return <span style={{marginRight:"5px"}}>{hours}hr {minutes}min {seconds}s</span>;
    }
  };

  return (
    <Countdown
    date={Date.now() + props.timeleft*1000}
    renderer={renderer}
 
  />
  )
}

export default MyCountdown