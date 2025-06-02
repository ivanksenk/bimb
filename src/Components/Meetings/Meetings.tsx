import './meeting.css';
import { MeetingsHeader } from "./Header/MeetingsHeader";
import { MeetingsList } from "./MeetingsList/MeetingsList";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { checkMe } from "../../API/auth";
import { clearStore } from '../../API/storeTokens';


interface MeetingsProps {

}

export const Meetings: React.FC<MeetingsProps> = () => {
    const navigate = useNavigate();
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
    return (
        <>
            <MeetingsHeader />
            <MeetingsList/>
        </>
    );
};

