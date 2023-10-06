import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { getUserProfile, getStatus, updateStatus, savePhoto, saveProfile } from '../../redux/profile-reducer';
import { useParams, useLocation, useNavigate, Navigate } from "react-router-dom";
import { compose } from 'redux';
import { withAuthNavigate } from '../../HOC/withAuthNavigate';

class ProfileContainer extends React.Component {

  refreshProfile() {
    let userId = this.props.router.params["*"];
    if (!userId){
      userId = this.props.authorizedUserId;
      if (!this.props.authorizedUserId) {
        return <Navigate to="/login" />;
      }
    }
    this.props.getUserProfile(userId);
    this.props.getStatus(userId);
  }

  componentDidMount() {
    this.refreshProfile();
  }
 
  componentDidUpdate(prevProps) {
    if (this.props.router.params["*"] !== prevProps.router.params["*"]) {
      this.refreshProfile();
    }
  }

  render() {
      return (
          <Profile {...this.props} isOwner={!this.props.router.params["*"]} profile={this.props.profile} status={this.props.status} updateStatus={this.props.updateStatus} savePhoto={this.props.savePhoto} />
      )
  }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth,
})

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

const WithUrlDataContainerComponent = withRouter(ProfileContainer);

export default compose(
  connect(mapStateToProps, { getUserProfile, getStatus, updateStatus, savePhoto, saveProfile }), withAuthNavigate)(WithUrlDataContainerComponent);