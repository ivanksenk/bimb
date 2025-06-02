
interface ContactCardProps {
    title:string,
    description?:string,
    phone?:string,
    url?:string
}

export const ContactCard: React.FC<ContactCardProps> = ({title,description,phone,url}) => {
    return (
        <div className="contacts-card flex">
            <div className="card-left">
                <div className="contacts-img"></div>
            </div>
            <div className="card-right">
                <h3 className="contacts-card-title">{title}</h3>
                <p className="contacts-card-desrc">{description}</p>
                <div className="contacts-contacts flex">
                    <span>{phone}</span><span>{url}</span>
                </div>
            </div>
            
        </div>
    );
};

