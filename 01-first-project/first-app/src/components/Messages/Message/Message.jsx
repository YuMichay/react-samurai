import React from 'react';
import stylesMessage from './Message.module.css';

function Message(props) {
  return(<div className={stylesMessage.window}>{props.message}</div>)
}

export default Message;