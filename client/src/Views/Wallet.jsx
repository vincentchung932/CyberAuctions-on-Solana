import React, { useState,useEffect } from 'react'
import axios from 'axios'
import DisplayWalletNFT from '../components/DisplayWalletNFT'
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
const theblockchainapi = require('theblockchainapi')

const container_style = {
 
  background:"#2b78e4",
  justifyContent: "space-around",
  padding:"3px",
}

const inner_container_style = {
  width: "70%",
  margin: "10px",
  padding: "3px",
  background: "#9fc5f8",
  borderRadius: "15px",
  paddingBottom: "20px",

};

const r_col_style = {
  flex:1,
  margin:"10px",
  padding:"3px",
  background:"#9fc5f8",
  height:'100px',
  borderRadius:"15px"
}


const Wallet = () => {
  const [hasWallet,setHasWallet] = useState(false)
  const [nft_meta,setNft_meta] = useState([])
  const [token,setToken] = useState('')
  const [loaded,setLoaded] = useState(false)
  const [id,setId] = useState('')

  useEffect(()=>{
    axios.get("http://localhost:8000/api/wallet")
    .then(res=>{
        console.log(res.data[0]);
        if(res.data){
          setId(res.data[0]._id)
          setHasWallet(true)
          setNft_meta(res.data[0].nft_meta)
          setToken(res.data[0].token)
          setLoaded(true)
        }
        
    })
    .catch(err=>console.log(err))
  },[])

  const onKeyPressHandler = e=>{
    if (e.key === 'Enter') {
      // Do code here
      e.preventDefault();
      console.log(e.target.value)
      getNFTinWallet(e.target.value)
    }
    
  }
  ////////////////////////////////////   API   //////////////////////////////////////////////////
  let defaultClient = theblockchainapi.ApiClient.instance;


  let APIKeyID = defaultClient.authentications['APIKeyID'];
  APIKeyID.apiKey = 'YOURAPIKEYHERE';
  
  let APISecretKey = defaultClient.authentications['APISecretKey'];
  APISecretKey.apiKey = 'YOURAPIKEYHERE';
  
  let apiInstance = new theblockchainapi.SolanaWalletApi();
  let network = 'mainnet-beta'; // String | The network ID (devnet, mainnet-beta)
  
  
  async function getNFTinWallet(publicKey) {
    console.log("start")
    await apiInstance.solanaGetNFTsBelongingToWallet(network, publicKey).then((data) => {
        console.log('API called successfully.');
        console.log(data.nfts_metadata)
        getTokeninWallet(publicKey,data.nfts_metadata)
        setNft_meta(data.nfts_metadata)
        return data;
      }, (error) => {
        console.error(error);
        return error;
      });    
  }

  async function getTokeninWallet(publicKey,nft_meta){
    let apiInstance = new theblockchainapi.SolanaWalletApi();
    const balance_request = new theblockchainapi.BalanceRequest(); // BalanceRequest | 
    balance_request.public_key = publicKey;
    balance_request.network = 'mainnet-beta';
    balance_request.unit = 'sol';

    let opts = {
      'balanceRequest': balance_request
    };

    await apiInstance.solanaGetBalance(opts).then((data) => {
      console.log('API called successfully2.');
      console.log(data)
      axios.post("http://localhost:8000/api/wallet/new",{public_key:publicKey,nft_meta,token:data.balance})
      setToken(data.balance)
      setHasWallet(true)
      setLoaded(true)
      return data;
    }, (error) => {
      console.error(error);
      return error;
    })
  }

  const onClickHandler = e=>{
    axios.delete("http://localhost:8000/api/wallet/"+id)
    .then(
      console.log(id),
      setHasWallet(false),
      setNft_meta([]),
      setToken(''),
      setId('')

    )
  }
  /////////////////////////////////////////////////////////////////////////////////////////
  return (
    <>
      
      <div style={container_style}>
      <div style={{textAlign: "right",marginTop:"5px",marginRight:"15px"}}>
        {
          
          hasWallet? <Button variant="contained" color="success" onClick={onClickHandler} >Disconnect</Button>:<form>
          <TextField id="place_bid" label="Add Your Wallet" size="small" onKeyPress={(e)=>onKeyPressHandler(e)}/>
          </form>
        }
          
      </div>


      <div style={{display:"flex"}}>

        <div style={inner_container_style}>
        <h2 style={{ color: "white", margin: "5px 0px 0px 20px" }}>
            Your Collections
        </h2>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {
            loaded? nft_meta.map((nft,idx)=>{
              return(
                // <div key={idx}>
                //   <p>{nft.data.name}</p>
                // </div>
                <DisplayWalletNFT key={idx} nft={nft}/>
              )
            }):<></>
          }
          </div>
        </div>
        <div className="r-col" style={r_col_style}>
        <h2 style={{ color: "white", margin: "5px 0px 0px 20px" }}>
            Your Balance
        </h2>
        <div style={{backgroundColor:"lightgray",width:"200px",display:"flex",height:"50px",lineHeight:"50px",borderRadius:"10px",marginLeft:"20px", justifyContent:'space-around'}}>
                <img src={require('../img/Solana_logo.png')} alt="solana:" style={{height:"25px",margin:"12px 5px 0px 5px"}}/>
                {loaded?<h3 style={{fontSize:"20px",margin:"0px"}}>{token?token.toFixed(3):0} SOL</h3>:<></>}
        </div>
    
        </div>
      </div>
      </div>
    </>
  )
}

export default Wallet