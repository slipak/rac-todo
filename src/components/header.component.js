import React from 'react';

import './../scss/header.component.scss';

const Header = (props) => {
    const { user, signOut } = props;
    const {photoURL, email} = user;
    return (
        <header className="header">
            <div className="header__user">
                { photoURL ?
                    <div className="header__user-media">
                        <img src={photoURL} alt="" width="32" height="32"/>
                    </div>
                    :
                    ''
                }

                <div className="header__user-content">
                    <span className="header__user-email">{email}</span>
                </div>
            </div>

            <div className="header__controls">
                <button className="btn btn-xs btn-default" onClick={signOut}>Logout with Github</button>
            </div>
        </header>

    )
}

export default Header;