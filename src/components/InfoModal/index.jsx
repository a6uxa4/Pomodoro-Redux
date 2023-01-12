import React from 'react';
import css from './Info.module.css';

function Info({ title, active, children, onChange }) {
  if (!active) {
    return null;
  }
  return (
    <div className={css.backdrop} >
      <div className={css.modal}>
        {title && <h2 className={css.title}>{title}</h2>}
        <div className={css.content}>{children}</div>
      </div>
    </div>
  );
}

export default Info;
