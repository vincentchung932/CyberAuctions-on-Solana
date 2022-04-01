import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios'
import { useEffect,useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function Searchbar() {
    const [searchNFT,setSearchNFT] = useState([])
    const [loaded,setLoaded] = useState(false)
    const history = useHistory()

    useEffect(()=>{
        axios.get("http://localhost:8000/api/nfts")
        .then(res=>{
            // console.log(res.data);
            setSearchNFT(res.data)
            setLoaded(true)
        })
        .catch(err=>console.log(err))
      },[])

      const searchHandler=(e,value)=>{
          if(value){
            history.push('/nft/'+value._id)
          }
          
      }

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={searchNFT}
      getOptionLabel={option => option.name}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Search NFT" variant="outlined"/>}
      onChange={(e, value) => searchHandler(e, value)}
    />
  );
}

