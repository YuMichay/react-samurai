import stylesProfileInfo from './ProfileInfo.module.css';
import { createField, Textarea } from './../../Common/FormsControls/FormsControls';
import { Input } from './../../Common/FormsControls/FormsControls';
import { reduxForm } from 'redux-form';
import { Contacts } from './Contacts';

const ProfileForm = ({profile, handleSubmit}) => {
  return (
    <form className={stylesProfileInfo.description} onSubmit={handleSubmit}>
      <div>
        <div className={stylesProfileInfo.title__edit}><b>Full Name:</b> {createField("Full Name", Input, "fullName", [])}</div>
        <div><b>About Me:</b> {createField("About Me", Input, "aboutMe", [])}</div>
        <div className={stylesProfileInfo.checkbox__edit}><b>Looking for a job:</b> {createField("", Input, "LookingForAJob", [], "checkbox")}</div>
        <div className={stylesProfileInfo.job__edit}>
          <div><b>My professional skills:</b> {createField("Skills", Textarea, "LookingForAJobDescription", [])}</div>
          <div><b>Contacts:</b> {Object.keys(profile.contacts).map((key) => {
            return (
              <div>
                <Contacts key={key} contactTitle={key} contactValue={profile.contacts[key]} />
                {createField("", Input, key, [])}
              </div>
            )
          })}</div>
        </div>
      </div>
      {<button className={stylesProfileInfo.edit}>Save</button>}
    </form>
  )
}

export const ProfileReduxForm = reduxForm({form: 'profile'})(ProfileForm);