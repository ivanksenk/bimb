import React, { useEffect } from 'react';
import { FetchUser } from './User/FetchUser';
import { Footer } from '../Footer/Footer';
import { checkMe } from '../../API/auth';
import { useNavigate } from 'react-router-dom';
import { clearStore } from '../../API/storeTokens';
   

interface MainPageProps {

}

export const MainPage: React.FC<MainPageProps> = () => {
    const navigate = useNavigate();
    useEffect(() => {
    checkMe()
    .then(res=>{
        if(res.status === 403){
            clearStore();
            navigate('/');
        }
    })
    .catch(err=>console.log(err))
   
    }, [])
    return (
        <>
            <FetchUser />
            <Footer />
        </>
    );
};

