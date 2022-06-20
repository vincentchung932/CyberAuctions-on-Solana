import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import './App.css';
import Navbar from './Views/Navbar';
import {Container} from '@material-ui/core';
import Main from './Views/Main';
import Details from './Views/Details';
import Following from './Views/Following';
import NFTCollections from './Views/Collections';
import Copyright from './Views/Copyright';
import Wallet from './Views/Wallet';
import { useEffect } from 'react';


function App() {
  
  return (
    // <ThemeProvider theme={theme}>

      <Container  className="outercontainer"  maxWidth='lg'>

        <Router>
          <Navbar  color="primary"/>

          <Switch>
            <Route exact path={'/'}>
                <Main/>
            </Route>

            <Route exact path={'/nft/:id'}>
                <Details/>
            </Route>

            <Route exact path={'/following'}>
                <Following/>
            </Route>

            <Route exact path={'/collections'}>
                <NFTCollections/>
            </Route>

            <Route exact path={'/wallets'}>
                <Wallet/>
            </Route>


          </Switch>
    
          <Copyright/>
        </Router>
        
      </Container>
    // </ThemeProvider>
  );
}

export default App;
