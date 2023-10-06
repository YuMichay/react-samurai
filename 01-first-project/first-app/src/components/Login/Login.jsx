import React from 'react';
import stylesLogin from './Login.module.css';
import { reduxForm } from 'redux-form';
import { Input } from '../Common/FormsControls/FormsControls';
import { required } from '../../utils/validators/validators';
import { connect } from 'react-redux';
import { login } from '../../redux/auth-reducer';
import { Navigate } from "react-router-dom";
import { createField } from '../Common/FormsControls/FormsControls';

const LoginForm = ({handleSubmit, error}) => {
  return (
    <form className={stylesLogin.form} onSubmit={handleSubmit}>
        {createField("Email", Input, "email", required, "email")}
        {createField("Password", Input, "password", required, "password")}
      <div className={stylesLogin.checkbox}>
        {createField(null, Input, "rememberme", null, "checkbox", "Remember me")}
      </div>
      {error && <span className={stylesLogin.error}>{error}</span>}
      <div>
        <button>Login</button>
      </div>
    </form>
  )
}

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm);

export const Login = (props) => {

  const onSubmit = (formData) => {
    props.login(formData.email, formData.password, formData.rememberMe)
  }

  if(props.isAuth) {
    return <Navigate to={"/profile"} />
  }

  return <div className={stylesLogin.login}>
    <h1>Log In</h1>
    <LoginReduxForm onSubmit={onSubmit} />
  </div>
}

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth
});

export default connect(mapStateToProps, {login})(Login);