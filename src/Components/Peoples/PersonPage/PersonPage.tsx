import { MdLocalPhone, MdAlternateEmail, MdEmail, MdOutlineWeb } from "react-icons/md";
import { MdCoffee } from "react-icons/md";
import { API_URL, myAxios } from "../../../API/config";
// import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../../API/queryClient";

import { Footer } from "../../Footer/Footer";
import { useNavigate, useParams } from "react-router-dom";
import { getUserInfo } from "../../../API/users/users.api";
import { BackButton } from "../../UI/BackButton/BackButton";
import splashImg from '../../../assets/small-logo.png';
import { useEffect } from "react";

interface PersonPageProps {

}

export const PersonPage: React.FC<PersonPageProps> = () => {
    const params = useParams();
    const id = params.id;
    const navigate = useNavigate();
    // const [show, setShow] = useState(false);
    // const hadleReadMore = () => {
    //     setShow(!show)
    // }
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        if (!userId) {
            navigate('/');
        }
    }, [])

    const { isPending, error, data } = useQuery({
        queryFn: () => getUserInfo(Number(id)),
        queryKey: [`user${id}`]
    }, queryClient);

    const coffeeInvite = () => {
        const intite={
            userOne:userId,
            userTwo:id
        }
        myAxios.post('/coffee/',intite)
        .then(res=>console.log(res))
        .catch(err=>console.log(err))
    }

    if (isPending) return <p>Load...</p>
    if (error) return <p>Err</p>
    if (data) {
        console.log(data)
        return (

            <>
                <BackButton url="/peoples" />
                <div className="user">
                    <div className="container">

                        <div className="header-container">
                            <img className="user-avatar" src={data.avatar ? `${API_URL}/uploads/${data.avatar}` : splashImg} />

                            <p className='user-name'>{data.first_name ? data.first_name : null} {data.last_name ? data.last_name : null}</p>
                            <p className='user-status'>
                                {data.user_status ? data.user_status : null}
                            </p>

                            <p className='user-description'>
                                {data.description}
                                {/* {descr ?
                        <>
                            {show ?
                                <>
                                    {descr}...
                                    <span className="read-more" onClick={hadleReadMore}>Читать далее</span>
                                </>
                                :
                                <>
                                    {data.description}<span className="read-more" onClick={hadleReadMore}> Скрыть</span>
                                </>
                            }
                        </>
                        :
                        null
                    } */}
                            </p>
                            <ul className="ul-res flex contacts-list contacts-list contacts-list">
                                <li>{data.phone ? <a href={`tel:${data.phone}`} target="_blank" className="contacts-link"><p className="contacts-item"><MdLocalPhone />{data.phone}</p></a> : null}</li>
                                <li>{data.email ? <a href={`mailto:${data.email}`} target="_blank" className="contacts-link"><p className="contacts-item"><MdAlternateEmail />{data.email}</p></a> : null}</li>
                                <li>{data.user_name && data.user_name !== 'undefined' ? <a href={`https://t.me/${data.user_name}`} target="_blank" className="contacts-link"><p className="contacts-item"><MdEmail />@{data.user_name}</p></a> : null}</li>
                                <li>{data.site_url ? <a href={`https://${data.site_url}`} target="_blank" className="contacts-link"><p className="contacts-item"><MdOutlineWeb />{data.site_url}</p></a> : null}</li>
                            </ul>
                            <button className="btn" onClick={coffeeInvite}><MdCoffee />Пригласить на кофе</button>
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        );
    }
};

