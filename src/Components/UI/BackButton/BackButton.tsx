import { useNavigate } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import './backbutton.css'

interface BackButtonProps {
    url: string;
}

export const BackButton: React.FC<BackButtonProps> = ({ url }) => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(url);
    }

    return <span onClick={handleNavigate} className="back-button"><MdArrowBack /></span>

};

