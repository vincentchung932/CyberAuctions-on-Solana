import React from 'react';
import Box from '@mui/material/Box';
import '../static/collections.css'
import { Typography } from '@mui/material';


const DisplayColletions = (props) => {
    
    return (
    <div>
        <Box
        sx={{
        boxShadow: 3,
        height: 250,
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
            <h3 className='title'>{props.nft.name}</h3>
            <img src={props.nft.image} className="collection_img"  alt={props.nft.name}></img>
            <div className='textContainer'>
            <Typography
                sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: '2',
                    WebkitBoxOrient: 'vertical',
                    fontSize:"5px",
                    color:"white"
                }}>
                    {props.nft.description}
            </Typography>
            </div>
            
            
        </Box>

    </div>
    )
}

export default DisplayColletions