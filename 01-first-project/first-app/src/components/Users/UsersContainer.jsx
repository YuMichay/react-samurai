import React from 'react';
import Users from './Users';
import { connect } from 'react-redux';
import Preloader from '../Common/Preloader/Preloader';
import { follow, unfollow, setPages, toggleIsFetching, toggleIsFollowing, requestUsers } from '../../redux/users-reducer';
import { compose } from 'redux';
import { getUsers, getPageSize, getTotalUsersCount, getCurrentPage, getIsFetching, getIsFollowing } from '../../redux/users-selectors';

class UsersContainer extends React.Component {

  componentDidMount() {
    const {currentPage, pageSize} = this.props;
    this.props.requestUsers(currentPage, pageSize);
  }

  onPageCHanged = (page) => {
    const {pageSize} = this.props;
    this.props.setPages(page);
    this.props.requestUsers(page, pageSize);
  }

  render () {
    return <>
      { this.props.isFetching ? <Preloader /> : null }
      <Users totalUsersCount={this.props.totalUsersCount} pageSize={this.props.pageSize} currentPage={this.props.currentPage} onPageCHanged={this.onPageCHanged} users={this.props.users} follow={this.props.follow} unfollow={this.props.unfollow} toggleIsFollowing={this.props.toggleIsFollowing} isFollowing={this.props.isFollowing} />
    </>
  }
}     

// let mapStateToProps = (state) => {
//   return {
//     users: state.usersPage.users,
//     pageSize: state.usersPage.pageSize,
//     totalUsersCount: state.usersPage.totalUsersCount,
//     currentPage: state.usersPage.currentPage,
//     isFetching: state.usersPage.isFetching,
//     isFollowing: state.usersPage.isFollowing,
//   }
// }

let mapStateToProps = (state) => {
  return {
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    isFollowing: getIsFollowing(state),
  }
}

export default compose(connect(mapStateToProps, { follow, unfollow, setPages, toggleIsFetching, toggleIsFollowing, requestUsers }))(UsersContainer);