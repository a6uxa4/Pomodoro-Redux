import React from 'react';
import css from './InfoBtn.module.css';
import InfoIcon from '@material-ui/icons/Info';

const InfoBtn = (props) => {
    return (
        <button onClick={props.onclick} className={css.btn}>
            <InfoIcon fontSize="large"/>
        </button>
    )
}

export default InfoBtn;