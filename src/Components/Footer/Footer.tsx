import React from 'react';
import './footer.css';
import { Link } from 'react-router-dom';
import { MdHome, MdMenu, MdCalendarMonth, MdOutlinePermIdentity } from "react-icons/md";

interface FooterProps {

}

export const Footer: React.FC<FooterProps> = () => {
    return (
        <footer className='footer'>
            <div className="container">
                <ul className='ul-res flex footer-menu'>
                    <li className='menu-item'><Link to={'/me'}><MdHome /></Link></li>
                    <li className='menu-item'><Link to={'/peoples'}><MdOutlinePermIdentity /></Link></li>
                    <li className='menu-item'><Link to={'/meetings'}><MdCalendarMonth /></Link></li>
                    <li className='menu-item'><Link to={'/menu'}><MdMenu /></Link></li>
                </ul>
            </div>
        </footer>
    );
};

