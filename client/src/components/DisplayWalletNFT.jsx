import React, { useEffect, useState } from 'react'
import '../static/collections.css'
import Box from '@mui/material/Box';
import axios from 'axios';

const DisplayWalletNFT = (props) => {
    const [imgURL,setImgURL] = useState('')

    useEffect(()=>{
        axios.get(props.nft.data.uri)
        .then(res=>{
            console.log(res.data.image)
            setImgURL(res.data.image)
        })
        .catch(err=>console.log(err))
      },[])
    
  return (
    <div>
        <Box
        sx={{
        boxShadow: 3,
        height: 200,
        width:220,
        mx: "auto",
        m:3,
        display: 'flex',
        borderRadius: 3,
        flexDirection:"column",
        alignItems:"center",
        backgroundColor: '#b8d6ff',
        '&:hover': {
        backgroundColor: '#d9e9ff',
        opacity: [0.9, 0.8, 0.7],
        },
        }} >
            <h3 className='title'>{props.nft.data.name}</h3>
            <img src={imgURL} className="collection_img"  alt={props.nft.name}></img>
            <div className='textContainer'>
            
            </div>
            
            
        </Box>

    </div>
  )
}

export default DisplayWalletNFT