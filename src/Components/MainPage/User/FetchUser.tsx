import React from 'react';
import './user.css';
import { queryClient } from '../../../API/queryClient';
import { useQuery } from '@tanstack/react-query';
import { getUserInfo } from '../../../API/users/users.api';
import { ViewUser } from './ViewUser';

interface UserProps {

}

export const FetchUser: React.FC<UserProps> = () => {
    const user = window.Telegram.WebApp.initDataUnsafe.user;
    const id = user?.id;
    localStorage.setItem('userId',`${id}`)
    console.log(user)
    const { isPending, error, data } = useQuery({
        queryKey: [`user${id}`],
        queryFn: () => getUserInfo(Number(id)),
    }, queryClient)
    if (isPending) return 'Load....'
    if (error) return 'Error'
    if (data) {
        const dbUser = data;
        console.log(dbUser)
        return (
            <ViewUser
                avatar={dbUser.avatar}
                firstName={dbUser.first_name}
                lastName={dbUser.last_name} 
                userStatus={dbUser.user_status}
                description={dbUser.description}
                phone={dbUser.phone}
                email={dbUser.email}
                siteUrl={dbUser.site_url}
                userName={dbUser.user_name}
            />
        );
    }
};
