import React from 'react';
import stylesMessages from './Messages.module.css';
import MessageItem from './MessageItem/MessageItem';
import Message from './Message/Message';
import { Navigate } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { required, maxLengthCreator } from '../../utils/validators/validators';
import { Textarea } from '../Common/FormsControls/FormsControls';

const maxLength1000 = maxLengthCreator(1000);

function Messages(props) {
  
  let state = props.messagePage;

  let usersElement = state.users.map((user) => <MessageItem name={user.name} key={user.id} id={user.id} ></MessageItem>);
  let mesagesElement = state.messages.map((message) => <Message message={message.message} key={message.id} id={message.id}></Message>);
  
  let onSendMessage = (values) => {
    props.sendMessage(values.newMessage);
  }

  if(!props.isAuth) return <Navigate to="/login"></Navigate>

  return (<div className={stylesMessages.messages}>
    <div className={stylesMessages.messages__items}>
      { usersElement }
    </div>
    <div className={stylesMessages.messages__windows}>
      { mesagesElement }
      <MessageReduxForm onSubmit={onSendMessage} />
    </div>
  </div>
  )
}

const MessageForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div className={stylesMessages.new}>
        <Field component={Textarea} name="newMessage" placeholder="Enter your message" validate={[required, maxLength1000]} />
        <button>Send</button>
      </div>
    </form>
  )
}

const MessageReduxForm = reduxForm({ form: 'messageForm' })(MessageForm);

export default Messages;