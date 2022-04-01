import axios from "axios";
import React, { useEffect, useState } from "react";
import DisplayColletions from "../components/DisplayColletions";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FormControl,InputLabel,Select,MenuItem } from "@mui/material";

const container_style = {
  display: "flex",
  background: "#2b78e4",
  justifyContent: "center",
  padding: "3px",
};

const inner_container_style = {
  width: "90%",
  margin: "10px",
  padding: "3px",
  background: "#9fc5f8",
  borderRadius: "15px",

  paddingBottom: "20px",
};

const NFTCollections = () => {
  const [nfts, setNfts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [show_nfts, setShow_nfts] = useState([]);
  const [sortBy,setSortBy] = useState('name')

  const sortbyname = (items) => {
    items.sort(function (a, b) {
      const nameA = a.name.toUpperCase(); // ignore upper and lowercase
      const nameB = b.name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      return 0;
    });
    return items;
  };

  const sortbytime_NO = (items) => {
    items.sort(function (a, b) {
      const timeA = a.launchDatetime; // ignore upper and lowercase
      const timeB = b.launchDatetime; // ignore upper and lowercase
      if (timeA < timeB) {
        return -1;
      }
      if (timeA > timeB) {
        return 1;
      }

      return 0;
    });
    return items;
  };

  const sortbytime_ON = (items) => {
    items.sort(function (a, b) {
      const timeA = a.launchDatetime; // ignore upper and lowercase
      const timeB = b.launchDatetime; // ignore upper and lowercase
      if (timeA > timeB) {
        return -1;
      }
      if (timeA < timeB) {
        return 1;
      }

      return 0;
    });
    return items;
  };


  useEffect(() => {
    axios
      .get(
        "https://api-mainnet.magiceden.dev/v2/launchpad/collections?offset=0&limit=200"
      )
      .then((res) => {
        const sorteddata = sortbyname(res.data);
        setNfts(sorteddata);
        setShow_nfts(sorteddata.slice(0, 8));
        setLoaded(true);
      });
  }, []);

  const onClickHandler = () => {
    let end = show_nfts.length + 8;
    setShow_nfts(nfts.slice(0, end));
    console.log(show_nfts);
  };

  const selectHandler=e=>{
        console.log(e.target.value)

        axios.get("https://api-mainnet.magiceden.dev/v2/launchpad/collections?offset=0&limit=200")
      .then((res) => {
        let sorteddata = []
        
        if(e.target.value==='name'){
            sorteddata = sortbyname(res.data);
        }else if(e.target.value ==='LT_NO'){
            const new_array = res.data.filter(item => item.hasOwnProperty("launchDatetime"))
            sorteddata = sortbytime_NO(new_array);
        }else{
            const new_array = res.data.filter(item => item.hasOwnProperty("launchDatetime"))
            sorteddata = sortbytime_ON(new_array);
        }
        console.log(sorteddata);
        setNfts(sorteddata);
        setSortBy(e.target.value)
        setShow_nfts(sorteddata.slice(0, 8));
        setLoaded(true);
      })
        
  }

  return (
    <div style={container_style}>
      <div style={inner_container_style}>
        <div className="top_row">
            <h2 style={{ color: "white", margin: "5px 0px 0px 20px" }}>
            Explore Collections
            </h2>
            <div className="sort_form">
                <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">Sort by:</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Sort by:"
                    value={sortBy}
                    onChange={e=>selectHandler(e)}
                >
                    <MenuItem value='name'>Name</MenuItem>
                    <MenuItem value="LT_NO">Launch Time (new-old)</MenuItem>
                    <MenuItem value='LT_ON'>Launch Time (old-new)</MenuItem>
                </Select>
                </FormControl>
            </div>
        </div>
        

        {loaded ? (
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {show_nfts.map((nft, idx) => (
              <DisplayColletions key={idx} nft={nft} />
            ))}
          </div>
        ) : (
          <></>
        )}
        <div className="IconButton_container">
          <IconButton aria-label="fav" onClick={() => onClickHandler()}>
            <ExpandMoreIcon sx={{ fontSize: 40 }} />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default NFTCollections;
