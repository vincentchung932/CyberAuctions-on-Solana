import React, { useEffect,useState } from 'react'
import FollowingNFTBlock from '../components/FollowingNFTBlock'
import axios from 'axios'


const container_style = {
    display:"flex",
    background:"#2b78e4",
    justifyContent: "space-around",
    // alignItems: "center",
    flexDirection:"column",
    padding:"3px",
    paddingBottom:"30px"
  }

  const l_col_style = {

    margin:"10px",
    padding:"3px",
    background:"#9fc5f8",
    borderRadius:"15px",
    paddingBottom:"20px"
  
  }

const Following = () => {
    const [nfts,setNfts]=useState([])
    const [loaded,setLoaded]=useState(false)
    

    

    useEffect(()=>{
        axios.get("http://localhost:8000/api/nfts/followed")
        .then(res=>{
            // console.log(res.data);
            setNfts(res.data)
            setLoaded(true)
        })
        .catch(err=>console.log(err))
      },[])


  return (
    <div style={container_style}>
      <div className="l-col" style={l_col_style}>
        <h2 style={{color:'white',margin:'5px 0px 0px 20px'}}>Your Following</h2>

        {
          loaded? 
          <>{
            nfts.map(nft=><FollowingNFTBlock key={nft._id} nft={nft}/>)
          }
          </>:<></>
        }

        </div>
    </div>
  )
}

export default Following