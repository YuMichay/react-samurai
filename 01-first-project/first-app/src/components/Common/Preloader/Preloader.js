import React from 'react';
import stylesPreloader from './Preloader.module.css';
import preloader from '../../../assets/images/Rolling-1s-200px.svg';

let Preloader = (props) => {
  return <div className={stylesPreloader.loading}>
    <img src={preloader} alt="loading"></img>
  </div>
}

export default Preloader;