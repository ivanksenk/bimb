import './auth.css';
import logo from '../../assets/big-logo.png'
import { useEffect, useState } from 'react';
import { myAxios } from '../../API/config';
import { useNavigate } from 'react-router-dom';
import { storeTokens } from '../../API/storeTokens';

interface loginProps {

}

export const Login: React.FC<loginProps> = () => {
    const [error, setError] = useState(false);
    const user = window.Telegram.WebApp.initDataUnsafe.user;
    const id = user?.id;
    const navigate = useNavigate();
    localStorage.setItem('userId', `${id}`)
    console.log(id);

    useEffect(() => {
        myAxios.post('/auth', { id: id })
            .then(res => {
                const data = res.data;
                if (data.auth) {
                    storeTokens(data.role, data.token, data.refreshToken);
                    setTimeout(() => { navigate('/me') }, 1000)
                }
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
                setError(true);
            })
    }, []);
    if (error) {
        return (
            <div className="err-window">
                <img src={logo} className='err-logo' alt="Логотип" />
                <p className='err-text'>К сожалению, вы не член клуба. Дальше вам нельзя(</p>
            </div>
        );
    }
    return (
        <div className="logo-container">
            <img src={logo} className="logo" alt="Логотип" />
        </div>
    );
};

