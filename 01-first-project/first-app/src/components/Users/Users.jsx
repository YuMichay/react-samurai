import React from "react";
import stylesUsers from './Users.module.css';
import Paginator from "../Common/Paginator/Paginator";
import User from "./User/User";

const Users = ({totalUsersCount, pageSize, currentPage, onPageCHanged, users, isFollowing, follow, unfollow}) => {
  return <div className={stylesUsers.usersPage}>
      <Paginator totalUsersCount={totalUsersCount} pageSize={pageSize} currentPage={currentPage} onPageCHanged={onPageCHanged} />
      <div className={stylesUsers.users}>
      {
        users.map((user) => <User key={user.id} user={user} isFollowing={isFollowing} follow={follow} unfollow={unfollow} />)
      }
      </div>
    </div>
}

export default Users;