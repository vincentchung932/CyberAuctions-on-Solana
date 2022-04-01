import React from 'react'

const container_style = {
    // display:"flex",
    background:"#2b78e4",
    justifyContent: "space-around",
    // alignItems: "center",
    flexDirection:"column",
    padding:"3px",
    paddingBottom:"5px"
  }

const Copyright = () => {
  return (
    <div style={container_style}>
      <p style={{marginLeft:"20px",color:"lightgray",textAlign:"center"}}>© 2022 ChienHsin Chung. All rights reserved • Privacy • Terms </p>
    </div>
  )
}

export default Copyright