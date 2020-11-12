import Layout from './Components/Layout/Layout'
import CRUDApp from './Containers/CRUDApp/CRUDApp';
import classes from '../src/Components/Navigation/Toolbar/Toolbar.css';
import React,{Component} from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import Login from '../src/Components/Login/Login';
import navClasses from '../src/Components/Navigation/NavigationItem.css';
import {getUser} from '../src/Utils/Common';

class App extends Component {
  render(){
    const user =getUser();
    return(    
        <Layout>
        <BrowserRouter>
        <div>
          <header className={classes.Toolbar}>
            <span>
            <NavLink activeClassName="active" to="/" className={navClasses.NavigationItemancor}>Login</NavLink>
            <NavLink activeClassName="active" to="/CRUDApp" className={navClasses.NavigationItemancor}>CRUDApp</NavLink>        
            </span>
          </header>
          <div className="content">
            <Switch>
              <Route exact path="/" component={Login} />
              {
                user!=null?<Route path="/CRUDApp" component={CRUDApp} />:<Route path="/CRUDApp" component={Login} />
              }
              
            </Switch>
          </div>
        </div>
        </BrowserRouter>
        </Layout>     
    );
  }
}

export default App;

