import stylesProfileInfo from './ProfileInfo.module.css';

export const Contacts = ({contactTitle, contactValue}) => {
  return <div className={stylesProfileInfo.contacts}>{contactTitle}: {contactValue}</div>
}