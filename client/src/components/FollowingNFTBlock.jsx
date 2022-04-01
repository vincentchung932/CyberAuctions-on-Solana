import React, { useState } from 'react';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';
import { Link} from 'react-router-dom'

const FollowingNFTBlock = (props) => {
    console.log(props.nft)
    const [isFavorite,setisFavorite] = useState(props.nft.isFavorite)

    // const [loaded,setLoaded]=useState([])

    const json_file = JSON.parse(props.nft.json_file)
    // console.log(props.nft)

    const onClickhandler = () =>{
      const new_fav = !isFavorite
      axios.put("http://localhost:8000/api/nfts/"+props.nft._id,{isFavorite:new_fav})
      .then(res=>{
        setisFavorite(new_fav)
    })
    }



    return (
    
    <div>
        <Box
      sx={{
        width: "95%",
        boxShadow: 3,
        height: 70,
        mx: "auto",
        mt:2,
        p:0.8,
        display: 'flex',
        borderRadius: 3,
        backgroundColor: '#b8d6ff',
        '&:hover': {
        backgroundColor: '#d9e9ff',
        opacity: [0.9, 0.8, 0.7],
        },
      }} >
        
          <div style={{width:"120px",textAlign: 'center',marginLeft:"10px"}}>
            <Link to={"/nft/"+props.nft._id}> <img src={json_file.image} style={{height:"60px",marginTop:"5px"}} alt={json_file.name}></img> </Link> 
          </div>
          <div style={{marginLeft:"18px", width:"50%"}}>
            <h2 style={{marginTop:"22px", fontSize:"20px"}}>{props.nft.name}</h2>
          </div>
          <div>
              {
                  props.nft.isOnMarket?<h3 style={{color:"green",fontSize:"16px",marginTop:"25px"}}>On Market</h3>:<h3 style={{color:"white",fontSize:"16px",marginTop:"25px"}}>Not Listed</h3>
              }
          </div>
          <div style={{display:"flex",flexDirection:"column",width:"20%"}}>
            <div style={{textAlign:"right", marginTop:"18px",height:"100%"}}>
              {
                isFavorite? 
                <IconButton aria-label="fav" onClick={()=>onClickhandler()}>
                  <StarIcon />
                </IconButton>:
              <IconButton aria-label="fav" onClick={()=>onClickhandler()}>
                <StarBorderIcon />
              </IconButton>
              }
            </div>

          </div>
    </Box>
        

    </div>
  )
}

export default FollowingNFTBlock