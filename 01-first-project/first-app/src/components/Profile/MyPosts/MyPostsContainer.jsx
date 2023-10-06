import { addPostActionCreator } from './../../../redux/profile-reducer';
import MyPosts from './MyPosts';
import React from "react";
import { compose } from 'redux';
import { connect } from 'react-redux';
import { useParams, useLocation, useNavigate } from "react-router-dom";

class MyPostsContainer extends React.Component {

  render() {
    return (
      <MyPosts profile={this.props.profile} posts={this.props.posts} addPost={this.props.addPost} />
    )
  }
}

let mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile,
    posts: state.profilePage.posts,
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    addPost: (newPost) => {
      dispatch(addPostActionCreator(newPost))
    },
  }
}

const withRouter = (Component) => {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return (
      <Component {...props} router={{location, navigate, params}} />
    )
  }
  return ComponentWithRouterProp;
}

const WithUrlDataContainerComponent = withRouter(MyPostsContainer);

export default compose(
  connect(mapStateToProps, mapDispatchToProps))(WithUrlDataContainerComponent);
