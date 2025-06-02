import './people.css'
import { Footer } from "../Footer/Footer";
import { PeopleCard } from "./PeopleCard/PeopleCard";
import { queryClient } from '../../API/queryClient';
import { useQuery } from '@tanstack/react-query';
import { getAllUsers } from '../../API/users/users.api';



interface FetchPeoplesListProps {

}

export const FetchPeoplesList: React.FC<FetchPeoplesListProps> = () => {
    const {isPending,error,data} = useQuery({
        queryFn:()=>getAllUsers(),
        queryKey:['peoples']
    },queryClient)
    if (isPending) return <p>Load...</p>
    if (error) return <p>Err...</p>

    if (data && Array.isArray(data)) {
        console.log(data);
    return (
        <>
            <div className="meeting-header">
                <div className="container">
                    <div className="flex header-wrapp">
                        <h3>Список клуба</h3>
                    </div>
                </div>
            </div>
            <div className="container mb50">
                <ul className="ul-res flex peoples-list peoples-list">
                    {data.map(user=>{
                        return<li key={user.id} className='people-card'>
                            <PeopleCard 
                            avatar={user.avatar}
                            firstName={user.first_name}
                            lastName={user.last_name}
                            tgId={user.telegram_id }
                            status={user.user_status}
                            />
                            </li>
                    })}
                    <li className='people-card'><PeopleCard /></li>
                    <li className='people-card'><PeopleCard /></li>
                    <li className='people-card'><PeopleCard /></li>
                    <li className='people-card'><PeopleCard /></li>
                    <li className='people-card'><PeopleCard /></li>
                </ul>
            </div>
            <Footer />
        </>
    );
}
};

