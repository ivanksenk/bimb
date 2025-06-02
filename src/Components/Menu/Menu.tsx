import './menu.css';
import {MdCalendarMonth, MdOutlinePermIdentity } from "react-icons/md";
import { Link } from "react-router-dom";
import { Footer } from "../Footer/Footer";


interface MenuProps {

}

export const Menu: React.FC<MenuProps> = () => {
    return (
        <>
            <div className="meeting-header">
                <div className="container">
                    <div className="flex header-wrapp">
                        <h3>Список встреч</h3>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="main-menu-cards">
                    <ul className="ul-res flex main-menu-list">
                        <li>
                            <Link to={'/meetings'} className='main-item-link'>
                                <div className="main-menu-item flex">
                                   <span className='main-item-icon'><MdCalendarMonth /></span> 
                                    <span className='item-descr'>Встречи</span>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link to={'/peoples'} className='main-item-link'>
                                <div className="main-menu-item flex">
                                   <span className='main-item-icon'><MdOutlinePermIdentity /></span> 
                                    <span>Люди</span>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link to={'/contacts'} className='main-item-link'>
                                <div className="main-menu-item flex">
                                   <span className='main-item-icon'><MdOutlinePermIdentity /></span> 
                                    <span>Контакты</span>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link to={'/peoples'} className='main-item-link'>
                                <div className="main-menu-item flex">
                                   <span className='main-item-icon'><MdOutlinePermIdentity /></span> 
                                    <span>Книги</span>
                                </div>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>


            <Footer />
        </>
    );
};

