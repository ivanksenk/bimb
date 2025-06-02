import './header.css';

interface HeaderProps {
    title:string
}

export const Header: React.FC<HeaderProps> = ({title}) => {
    return (
        <div className="main-header">
        <div className="container">
            <div className="flex main-wrapp">
                <h3>{title}</h3>
            </div>
        </div>
    </div>
    );
};

