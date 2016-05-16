import React from 'react';

const Topbar = ({title,subtitle}) => (
    <div className="ShortTopbar" >
        <span className="ShortTitle">{title}</span>
        <span className="ShortSubtitle right unimportant">{subtitle}</span>
    </div>
);

export default Topbar;