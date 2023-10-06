import React from 'react';
import stylesForms from './FormsControls.module.css';
import { Field } from 'redux-form';

const FormControls = ({input, meta: {touched, error}, children}) => {
  const hasError = touched && error;
  return (
    <div className={stylesForms.form + " " + (hasError ? stylesForms.error : "")}>
      { children }
      {hasError && <span>{error}</span>}
    </div>
  )
}

export const Textarea = (props) => {
  const {input, meta, child, ...restProps} = props;
  return <FormControls {...props}><textarea {...input} {...restProps}></textarea></FormControls>
}

export const Input = (props) => {
  const {input, meta, child, ...restProps} = props;
  return <FormControls {...props}><input {...input} {...restProps}></input></FormControls>
}

export const createField = (placeholder, component, name, validators, type, text = "") => {
  return <div>
    <Field placeholder={placeholder} component={component} name={name} validate={validators} type={type} /> <span>{text}</span>
    </div>
}