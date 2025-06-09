import './addButton.css'
import { Link } from "react-router-dom";
import { MdOutlineAddCircle } from "react-icons/md";

interface AddButtonProps {
    link:string
}

export const AddButton: React.FC<AddButtonProps> = ({link}) => {
    return (

        <Link to={link} className="add__button"><MdOutlineAddCircle /></Link>

    );
};

