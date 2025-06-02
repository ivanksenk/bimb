import { Link, useNavigate } from "react-router-dom";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import { MdOutlineAddCircle } from "react-icons/md";
import { queryClient } from "../../API/queryClient";
import { useQuery } from "@tanstack/react-query";
import { getContacts } from "../../API/contacts/contacts.api";
import { useEffect } from "react";
import { clearStore } from "../../API/storeTokens";
import { checkMe } from "../../API/auth";
import { ContactCard } from "./ContactCard";

interface ContactsProps {

}

export const ContactsList: React.FC<ContactsProps> = () => {
    const navigate = useNavigate()

    useEffect(() => {
        checkMe()
        .then(res=>{
            if(res.status === 403){
                clearStore();
                navigate('/');
            }
        })
        .catch(err=>{
            console.log(err);
            clearStore();
            navigate('/');
        })
       
        }, [])


    const { isPending, error, data } = useQuery({
        queryFn: () => getContacts(),
        queryKey: ['contacts']
    }, queryClient)
    if (isPending) return <p>Load...</p>
    if (error) return <p>Err...</p>
    if (data && Array.isArray(data)) {
        console.log(data);
        return (
            <>
                <Header title="Проверенные контакты" />
                <div className="container cont-relative mb50">
                    <ul className="ul-res contacts-list">
                        {data.map(item=>{
                           return <li key={item.id}>
                            <ContactCard
                            title={item.title}
                            description={item.description}
                            phone={item.phone}
                            url={item.url}
                           /></li> 
                        })}
                    </ul>
                    <Link to={'/contacts/new'} className="contacts-add-button"><MdOutlineAddCircle /></Link>
                </div>

                <Footer />
            </>
        );
    }
};

