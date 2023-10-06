import React from 'react';
import { NavLink } from 'react-router-dom';
import stylesHeader from './Header.module.css';

const Header = (props) => {
    return (
        <header className={stylesHeader.header}>
            <div className={stylesHeader.logo}>
                <div className={stylesHeader.img}></div>
                <div className={stylesHeader.title}>Not?</div>
            </div>

            <div className={stylesHeader.login}>
                { props.isAuth 
                ? <div>{props.login} - <button onClick={props.logout}>Log out</button></div> : <NavLink to={"/login"}>Login</NavLink> }
            </div>
        </header>
    )
}
export default Header;