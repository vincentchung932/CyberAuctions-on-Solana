// import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import * as React from 'react';
import {Button} from '@material-ui/core';
import { Box} from '@mui/system';
import BottomNavigation from '@material-ui/core/BottomNavigation'
// import BottomNavigationAction  from '@material-ui/core/BottomNavigationAction';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MuiBottomNavigationAction from "@mui/material/BottomNavigationAction";
import { styled } from "@mui/material/styles";
import Searchbar from '../components/Searchbar';


const Navabr_style = {
    height:"60px",
    display:"flex",
    background:"#2b78e4",
    justifyContent: "space-around",
    alignItems: "center",
    padding:"3px",
    borderBottom: '1px solid #a4e9fc'
}

const mid_style = {
    width:"40%",
    display:"flex",
    justifyContent: "space-between",
    alignItems: "center"
}

const useStyles = makeStyles({
    root: {
      width: 500,
      backgroundColor:"#2b78e4",
      
    },
  });

  const BottomNavigationAction = styled(MuiBottomNavigationAction)(`
  color: #c2c3c4;
  &.Mui-selected {
    color: white;
  }
`);

//////////////////////////////////////////////////////////////////////////////

const Navbar = () => {
    const classes = useStyles()
    const [value, setValue] = useState(-1);
    const labelArray = ['following','wallets','collections']
    const history = useHistory()

    const handleOnChange = (e,newValue) =>{
        setValue(newValue);
        history.push('/'+labelArray[newValue])
    }

    const backhomehandler = (e) =>{
        setValue(-1)
        history.push('/')
    }

    return (
        
        <div style={Navabr_style}>
            <Link to={'/'}> <img src={require('../img/icon/164850292837942.png')} alt="icon" style={{height:"80px"}} onClick={()=>backhomehandler()}/></Link>
             
            <div  style={mid_style}>
                <BottomNavigation
                    className={classes.root}
                    showLabels
                    value={value}
                    onChange={(e,newValue)=>handleOnChange(e,newValue)}>
                            <BottomNavigationAction label="Following"  />
                            <BottomNavigationAction label="Wallets"  />
                            <BottomNavigationAction label="Collections"  />
                </BottomNavigation>
                
            </div>
            <Searchbar/>
            <Box component="span" >
                <Button> <p style={{color:"white"}}>Login</p></Button>
            </Box>
        </div>
  )
}



export default Navbar