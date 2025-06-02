import React from 'react';
import clubLogo from '../../assets/big-logo.png';

interface SplashScreenProps {

}

export const SplashScreen: React.FC<SplashScreenProps> = () => {
    return (
        <div>
            <img src={clubLogo} style={{width:'250px'}}/>
        </div>
    );
};

