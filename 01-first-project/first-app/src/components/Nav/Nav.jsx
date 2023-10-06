import React from 'react';
import { NavLink } from 'react-router-dom';
import stylesNav from './Nav.module.css';

function Messages() {
    return (
    <nav className={stylesNav.nav}>
        <ul>
            <li><NavLink to="/profile" className={navData => navData.isActive ? stylesNav.activeLink : stylesNav.item }>Profile</NavLink></li>
            <li><NavLink to="/friends" className={navData => navData.isActive ? stylesNav.activeLink : stylesNav.item }>Friends</NavLink></li>
            <li><NavLink to="/messages" className={navData => navData.isActive ? stylesNav.activeLink : stylesNav.item }>Messages</NavLink></li>
            <li><NavLink to="/users" className={navData => navData.isActive ? stylesNav.activeLink : stylesNav.item }>Users</NavLink></li>
            <li><NavLink to="/news" className={navData => navData.isActive ? stylesNav.activeLink : stylesNav.item }>News</NavLink></li>
            <li><NavLink to="/music" className={navData => navData.isActive ? stylesNav.activeLink : stylesNav.item }>Music</NavLink></li>
            <li><NavLink to="/settings" className={navData => navData.isActive ? stylesNav.activeLink : stylesNav.item }>Settings</NavLink></li>
        </ul>
    </nav>
    )
}
export default Messages;