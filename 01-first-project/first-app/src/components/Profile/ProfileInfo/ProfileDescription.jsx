import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import stylesProfileInfo from './ProfileInfo.module.css';
import { Contacts } from './Contacts';

export const ProfileDescription = ({profile, isOwner, status, updateStatus, goToEditForm}) => {
  return (
  <div className={stylesProfileInfo.description}>
    <div>
      <div className={stylesProfileInfo.title}>{profile.fullName}</div>
      <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
      <div>{profile.aboutMe}</div>
      <div><b>Looking for a job:</b> {profile.lookingForAJob ? 'yes' : 'no'}</div>
      {profile.lookingForAJob && 
      <div className={stylesProfileInfo.job}>
        <div><b>My professional skills:</b> {profile.lookingForAJobDescription}</div>
        <div><b>Contacts:</b> {Object.keys(profile.contacts).map((key) => {
          return profile.contacts[key] && <Contacts key={key} contactTitle={key} contactValue={profile.contacts[key]} />
        })}</div>
      </div>
      }
    </div>
    { isOwner && <button className={stylesProfileInfo.edit} onClick={goToEditForm}>Edit</button>}
  </div>)
}
