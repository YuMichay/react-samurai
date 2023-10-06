import React from 'react';
import { NavLink } from 'react-router-dom';
import stylesMessageItem from './MessageItem.module.css';

function MessageItem(props) {
  let path = "/messages/" + props.id;
  return (<div className={stylesMessageItem.item}>
    <NavLink to={path}>{props.name}</NavLink>
  </div>)
}

export default MessageItem;