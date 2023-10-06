import { addMessageActionCreator } from '../../redux/message-reducer';
import Messages from './Messages';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withAuthNavigate } from './../../HOC/withAuthNavigate';

let mapStateToProps = (state) => {
  
  return {
    messagePage: state.messagePage,
    isAuth: state.auth.isAuth,
  }

}

let mapDispatchToProps = (dispatch) => {

  return {
    sendMessage: (newMessage) => {
      dispatch(addMessageActionCreator(newMessage))
    }
  }

}

export default compose(connect(mapStateToProps, mapDispatchToProps), withAuthNavigate)(Messages);