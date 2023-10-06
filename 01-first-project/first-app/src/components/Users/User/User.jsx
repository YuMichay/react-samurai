import React from "react";
import { NavLink } from 'react-router-dom';
import stylesUsers from './User.module.css';
import userPhoto from '../../../assets/images/avatardefault_92824.png';

const User = ({user, isFollowing, unfollow, follow}) => {
  return <div className={stylesUsers.user}>
          <div className={stylesUsers.userIcon}>
            <div className={stylesUsers.photo}>
              <NavLink to={`/profile/${user.id}`}>
                <img src={user.photos.small != null ? user.photos.small : userPhoto} alt=""></img>
              </NavLink>
            </div>
            <div className={stylesUsers.userInfo}>
              <div>
                <div className={stylesUsers.name}>{user.name}</div>
                <div>{user.status}</div>
              </div>
            </div>
            <div>
              {user.followed ? <button disabled={isFollowing.some(id => id === user.id)} className={stylesUsers.button} onClick={() => { unfollow(user) }}>Unfollow</button> 
              : <button disabled={isFollowing.some(id => id === user.id)} className={stylesUsers.button} onClick={() => { follow(user) }}>Follow</button>}
            </div>
          </div>
        </div>
}

export default User;