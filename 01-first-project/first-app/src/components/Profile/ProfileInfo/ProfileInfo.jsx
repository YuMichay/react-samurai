import React, { useState } from 'react';
import stylesProfileInfo from './ProfileInfo.module.css';
import userPhoto from '../../../assets/images/avatardefault_92824.png';
import Preloader from '../../Common/Preloader/Preloader';
import { ProfileDescription } from './ProfileDescription';
import { ProfileReduxForm } from './ProfileForm';

function ProfileInfo({isOwner, profile, status, updateStatus, savePhoto, saveProfile}) {
  let [editMode, setEditMode] =  useState(false);

  if (!profile) {
    return <Preloader />
  }

  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
      savePhoto(e.target.files[0]);
    }
  }

  const onSubmit = (formData) => {
    saveProfile(formData);
  }

  return (
    <div>
      <div className={stylesProfileInfo.content__background}>
        <img src="https://c.neh.tw/thumb/f/720/61496e748d3a4e03b116.jpg" alt="background"></img>
      </div>
      <div className={stylesProfileInfo.user__container}>
        <div className={stylesProfileInfo.user}>
          <img src={profile.photos.large !== null ? profile.photos.large : userPhoto} alt="avatar"></img>
          {isOwner && <input className={stylesProfileInfo.input_file} type={"file"} accept=".jpg, .jpeg, .png, .gif" onChange={onMainPhotoSelected} />}
        </div>
        {editMode ? <ProfileReduxForm profile={profile} onSubmit={onSubmit} /> : <ProfileDescription profile={profile} isOwner={isOwner} status={status} updateStatus={updateStatus} goToEditForm={() => {setEditMode(true)}}/>}
      </div>
    </div>
  )
}



export default ProfileInfo;