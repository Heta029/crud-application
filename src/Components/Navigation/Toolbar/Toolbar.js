import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import navClass from '../../Navigation/NavigationItems.css';
import navClasses from '../../Navigation/NavigationItem.css';

const toolbar =(props)=>(
    <header className={classes.Toolbar}>
        <div>MENU</div>
        <Logo/>
        <nav>            
            <li className={navClasses.NavigationItem} ><a href="/">Login</a></li>
            <li className={navClasses.NavigationItem}><a href="/">CRUDApp</a></li>                        
        </nav>
    </header>
)

export default toolbar;