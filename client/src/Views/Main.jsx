import React, { useEffect,useState } from 'react'

import axios from 'axios'
import OnMarketNftBlock from '../components/onMarketNftBlock';
// import CHART from '../../src'
const container_style = {
  display:"flex",
  background:"#2b78e4",
  justifyContent: "space-around",
  // alignItems: "center",
  padding:"3px",
}

const l_col_style = {
  flex:3,
  margin:"10px",
  padding:"3px",
  background:"#9fc5f8",
  borderRadius:"15px",
  display:"flex",
  flexDirection:"column",
  paddingBottom:"20px"

}

const r_col_style = {
  flex:1,
  margin:"10px",
  padding:"3px",
  background:"#9fc5f8",
  height:'100px',
  borderRadius:"15px"
}



const Main = () => {
  // console.log(vaxxed_doggo_83);
  const [nfts,setNfts]=useState([])
  const [loaded,setLoaded]=useState([])
  const [hasWallet,setHasWallet] = useState(false)
  const [token,setToken] = useState('')

  useEffect(()=>{
    axios.get("http://localhost:8000/api/nfts/isonmarket")
    .then(res=>{
        // console.log(res.data);
        setNfts(res.data)
        setLoaded(true)
    }).then(
      axios.get("http://localhost:8000/api/wallet")
    .then(res=>{
        console.log(res.data[0]);
        if(res.data[0]){
          
          setHasWallet(true)
          setToken(res.data[0].token)
          setLoaded(true)
        }
        
    })
    )
    .catch(err=>console.log(err))
  },[])

  return (
    <div style={container_style}>
      <div className="l-col" style={l_col_style}>
        <h2 style={{color:'white',margin:'5px 0px 0px 20px'}}>Bid Tracker</h2>

        {
          loaded? 
          <>{
            nfts.map(nft=><OnMarketNftBlock key={nft._id} nft={nft} token={token}/>)
          }
          </>:<></>
        }
      </div>

      <div className="r-col" style={r_col_style}>
        {
          hasWallet?<>
          <h2 style={{ color: "white", margin: "5px 0px 0px 20px" }}>
              Your Balance
          </h2>
          <div style={{backgroundColor:"lightgray",width:"200px",display:"flex",height:"50px",lineHeight:"50px",borderRadius:"10px",marginLeft:"20px", justifyContent:'space-around'}}>
                  <img src={require('../img/Solana_logo.png')} alt="solana:" style={{height:"25px",margin:"12px 5px 0px 5px"}}/>
                  {loaded?<h3 style={{fontSize:"20px",margin:"0px"}}>{token?token.toFixed(3):0} SOL</h3>:<></>}
          </div>
        </>:<div>
          <h2 style={{ color: "white", margin: "5px 0px 0px 20px" }}>
              Connect Your Wallet
          </h2>
        </div>
        }

    
      </div>
      
    </div>
  )
}

export default Main