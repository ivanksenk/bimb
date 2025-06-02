import { MdOutlineAddCircle } from "react-icons/md";
import { Link } from "react-router-dom";
interface MeetingsHeaderProps {

}

export const MeetingsHeader: React.FC<MeetingsHeaderProps> = () => {
    return (
        <div className="meeting-header">
            <div className="container">
                <div className="flex header-wrapp">
                    <h3>Список встреч</h3>
                    <Link to={'/meetings/new'} className="add-button"><MdOutlineAddCircle /></Link>
                </div>
            </div>

        </div>
    );
};

