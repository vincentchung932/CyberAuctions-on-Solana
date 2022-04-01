import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import '../static/details.css'
import { Button } from '@mui/material'
import { styled } from "@mui/material/styles";
import { makeStyles } from '@material-ui/core/styles';

const container_style = {
    display:"flex",
    background:"#2b78e4",
    justifyContent: "center",
    padding:"3px",
  }

const inner_container_style = {
    width:"90%",
    margin:"10px",
    padding:"3px",
    background:"#9fc5f8",
    borderRadius:"15px",
    display:"flex",
    paddingBottom:"20px",
  }

  const useStyles = makeStyles({
    root: {
      width: 120,
      color:"black",
    },
  });



const Details = () => {
    const classes = useStyles()
    const {id}=useParams()    
    const [nft,setNft] = useState({})
    const [json_file,setImageURL] = useState("")
    const [loaded,setLoaded]=useState(false)
    const [isfollowed,setisfollowed] = useState(false)
    
    
    
    useEffect(()=>{
        axios.get('http://localhost:8000/api/nfts/'+id)
        .then(res=>{setNft(res.data)
            const json_file1 = JSON.parse(res.data.json_file)
            setImageURL(json_file1)
            setisfollowed(res.data.isFollowed)
            setLoaded(true)
            console.log(res.data.json_file);
        })
    },[id])

    const clickHandler = () =>{
        const isFollowed = !isfollowed
        axios.put('http://localhost:8000/api/nfts/'+id,{isFollowed})
            .then(res=>{
                setisfollowed(isFollowed)
            })

        
    }
  
  return (
      
    <div style={container_style}>
        <div style={inner_container_style}>
            <div className='col1'>
                <h2>{nft.name}</h2>
                <img src={json_file.image}  alt={123}></img>
            </div>

            <div className='col2'>
                
                <div className="rowbox" style={{marginTop:"50px"}}>
                    <p >Description: </p>
                    <p>{json_file.description}</p>
                </div>

                <div className="rowbox">
                    <p >Attributes: </p>
                    
                    {loaded?<div className='attribute_container'>{json_file.attributes.map(({value,trait_type},index)=>{
                        return(
                            <div key={trait_type} className="attribute_box">
                            <p>{trait_type}:{value}</p>
                            </div>
                        )
                        
                    })}</div>:<></>}
                    
                </div>

                <div style={{marginTop:"20px",alignSelf:"right"}}>
                    {isfollowed? <Button className={classes.root} variant="contained" onClick={clickHandler}>Followed</Button>:
                    <Button  variant="contained" color="success" onClick={clickHandler} >Follow</Button>}
                </div>

            </div>
        </div>
        
    </div>
  )
}

export default Details