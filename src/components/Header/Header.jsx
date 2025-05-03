import React from 'react';
import './Header.css';
import Button from '../Button/Button';

const Header = (props) => {
    const tg = window.Telegram.WebApp;
    const onClose = () =>{
        tg.close()
      }
    return (
        <div {...props} className={`header`}>
            <Button onClick={onClose}>Закрыть</Button>
            <span className={'username'}>
                {tg.initDataUnsafe?.user?.username ? `@${tg.initDataUnsafe.user.username}` : 'Гость'}
            </span>
        </div>
    );
};


export default Header;