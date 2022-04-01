import React, {  useState } from 'react';
import Box from '@mui/material/Box';
import MyCountdown from './MyCountdown';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';
import { TextField } from '@mui/material';
import { Link} from 'react-router-dom'

const OnMarketNftBlock = (props) => {
    // console.log(props.nft.json_file)
    const [isFavorite,setisFavorite] = useState(props.nft.isFavorite)
    const [price,setPrice]=useState(props.nft.price)
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

    const onKeyPressHandler = e=>{
      if (e.key === 'Enter') {
        e.preventDefault();
        if(e.target.value>props.token){
          alert("You don't have enough money!")
        }else if(e.target.value<price){
          alert("Bid need to be higher than the current price")
        }else{
          setPrice(e.target.value)
        }
        
      }
      
    }


    return (
    
    <div>
        <Box
      sx={{
        width: "95%",
        boxShadow: 3,
        height: 140,
        mx: "auto",
        mt:2,
        p:0.8,
        display: 'flex',
        borderRadius: 3,
        backgroundColor: '#b8d6ff',
        '&:hover': {
        backgroundColor: '#d9e9ff',
        opacity: [0.9, 0.8, 0.7],
        }
      }} >
        
          <div style={{width:"120px",textAlign: 'center',marginLeft:"10px"}}>
            <Link to={"/nft/"+props.nft._id}> <img src={json_file.image} style={{height:"120px",marginTop:"10px"}} alt={json_file.name}></img> </Link> 
          </div>
          <div style={{marginLeft:"18px", width:"60%"}}>
            <h2 style={{marginTop:"10px", fontSize:"22px"}}>{props.nft.name}</h2>
            <h3 style={{ fontSize:"15px",marginTop:"40px",marginBottom:"0px"}}>Current Price</h3>
            <div style={{backgroundColor:"lightgray",width:"120px",display:"flex",height:"30px",lineHeight:"30px",borderRadius:"10px"}}>
                <img src={require('../img/Solana_logo.png')} alt="solana:" style={{height:"25px",margin:"2.5px 5px 0px 5px"}}/>
                <h3 style={{fontSize:"15px",margin:"0px"}}>{price}</h3>
            </div>
          </div>
          <div style={{display:"flex",flexDirection:"column",width:"20%"}}>
            <div style={{textAlign:"right"}}>
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
            <div style={{backgroundColor:"lightgray",height:"30px",marginTop:"5px",marginBottom:"15px",lineHeight:"30px",borderRadius:"10px",display:"flex",justifyContent:"end"}}>
                    <MyCountdown timeleft={props.nft.time_left}/>    
            </div>
            <form>
                <TextField id="place_bid" label="Place a bid" size="small" onKeyPress={(e)=>onKeyPressHandler(e)}/>
            </form>
            

              

          </div>
    </Box>
        

    </div>
  )
}

export default OnMarketNftBlock