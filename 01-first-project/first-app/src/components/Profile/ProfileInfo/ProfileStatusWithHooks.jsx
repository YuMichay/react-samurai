import React, { useState, useEffect } from 'react';
import stylesProfileStatus from './ProfileStatus.module.css';

const ProfileStatusWithHooks = (props) => {

  let [editMode, setEditMode] =  useState(false);
  let [status, setStatus] =  useState(props.status);

  useEffect(() => {
    setStatus(props.status);
  }, [props.status])
  
  const activateEditMode = () => {
    setEditMode(true);
  }

  const deactivateEditMode = () => {
    setEditMode(false);
    props.updateStatus(status);
  }

  const onStatusChange = (e) => {
    setStatus(e.currentTarget.value);
  }

  return (
    <div className={stylesProfileStatus.status}>

      {!editMode && 
      <div>
        <span onDoubleClick={activateEditMode}>{status || "No status"}</span>
      </div>}

      {editMode && 
      <div>
        <input onChange={onStatusChange} autoFocus={true} value={status} onBlur={deactivateEditMode}></input>
      </div>}
      
    </div>
  )

}
export default ProfileStatusWithHooks;