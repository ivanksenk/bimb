import smallLogo from '../../../assets/small-logo.png';
import { Link } from 'react-router-dom';
import { API_URL } from '../../../API/config';

interface PeopleCardProps {
    avatar?:string,
    firstName?:string,
    lastName?:string,
    status?:string,
    tgId?:string
}

export const PeopleCard: React.FC<PeopleCardProps> = ({avatar,firstName,lastName,tgId,status}) => {
    return (
        <div className="people-card-wrapp">
            <img className="user-avatar" src={avatar ? `${API_URL}/uploads/${avatar}` : smallLogo} />
            <h3 className='people-title'>{firstName} {lastName}</h3>
            <p className='people-description'>{status}</p>
            <Link to={`/people/${tgId}`} className='people-link'>Подробнее</Link>
        </div>
    );
};

