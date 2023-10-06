import React from 'react';
import stylesMyPosts from './Post.module.css';
import userPhoto from '../../../../assets/images/avatardefault_92824.png';

function Post(props) {
    return (
        <div className={stylesMyPosts.item}>
          <img src={props.profile !== null ? props.profile.photos.small : userPhoto} alt="avatar" />
          <div className={stylesMyPosts.post}>
            <div className={stylesMyPosts.text}>{props.message}</div>
            <div className={stylesMyPosts.like}>
              <span>&#10084; like {props.likes}</span>
            </div>
          </div>
        </div>
    )
}
export default Post;