import React from 'react';
import css from './SettingsBtn.module.css';
import SettingsIcon from '@material-ui/icons/Settings';

const SettingsBtn = (props) => {
    return (
        <button onClick={props.onclick} className={css.btn}>
            <SettingsIcon fontSize="large"/>
        </button>
    )
}

export default SettingsBtn;