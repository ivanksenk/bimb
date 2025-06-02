import { FormEvent, useState } from "react";
import { MdLocalPhone, MdAlternateEmail, MdEmail, MdOutlineWeb, MdCreate } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { API_URL, myAxios } from "../../../API/config";
import imageCompression from "browser-image-compression";
import { queryClient } from "../../../API/queryClient";
import { Loader } from "../../Loader/Loader";

export interface ViewUserProps {
    avatar?: string,
    firstName?: string,
    lastName?: string,
    userName?: string,
    userStatus?: string,
    description?: string,
    phone?: string,
    email?: string,
    siteUrl?: string
}

export const ViewUser: React.FC<ViewUserProps> = ({ avatar, firstName, lastName, userStatus, description, phone, email, siteUrl, userName }) => {
    const user = window.Telegram.WebApp.initDataUnsafe.user;
    const navigate = useNavigate();

    const [file, setFile] = useState<File | null>(null);
    const [load, setLoad] = useState(false)

    const [descr, setDescr] = useState<string>(`${description}`);
    const [usDescr, setUsDescr] = useState<string>(`${description}`);
    const [show, setShow] = useState(false);
    const [edit, setEdit] = useState(false);

    const [message, setMessage] = useState(false);

    const [name, setName] = useState<string>(`${firstName}`);
    const [status, setStatus] = useState(`${userStatus}`);
    const [nameLast, setNameLast] = useState(`${lastName}`);
    const [phoneNum, setPhoneNum] = useState(`${phone}`);
    const [usEmail, setUsEmail] = useState(`${email}`);
    const [site, setSite] = useState(`${siteUrl}`);

    const [compressionOptions] = useState({
        maxSizeMB: 1,          // Максимальный размер после сжатия (1MB)
        maxWidthOrHeight: 1024, // Максимальное разрешение по ширине/высоте
        useWebWorker: true      // Использовать WebWorker для лучшей производительности
    });

    if (descr && descr.length > 100) {
        setDescr(descr.slice(0, 100));
        setShow(true);
    }

    const hadleReadMore = () => {
        setShow(!show)
    }

    const handleEdit = () => {
        setEdit(true);
    }

    const handleCancel = () => {
        setEdit(false);
        navigate('/me');
    }
    const id = localStorage.getItem('userId');

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            const compressedFile = await imageCompression(selectedFile, compressionOptions);
            setFile(compressedFile);
        }
    };

    const handleSave = async (e: FormEvent) => {
        e.preventDefault();
        setLoad(true);

        const formData = new FormData();
        if (file) {
            formData.append('image', file);
        }
        formData.append('firstName', name);
        formData.append('telegramId', `${id}`);
        formData.append('lastName', nameLast);
        formData.append('status', status);
        if (usDescr) {
            formData.append('description', usDescr);
        }

        formData.append('phone', phoneNum);
        formData.append('email', usEmail);
        formData.append('site', site);

        const token = localStorage.getItem('token');

        myAxios.put('/users/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            }
        })
            .then(res => {
                if (res) {
                    console.log(res)
                    queryClient.invalidateQueries({ queryKey: [`user${id}`] });
                    setMessage(true);
                    setTimeout(()=>{
                        setEdit(false);
                    },1500)
                    
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    if (edit) {
        return (
            <>
                <div className="meeting-header">
                    <div className="container">
                        <div className="flex header-wrapp">
                            <h3>Редактировать профиль</h3>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <button onClick={handleCancel}>Отменить</button>
                    <form className="edit-user-form" onSubmit={handleSave}>
                        <label className='input-label flex'>
                            <span className='label-text'>Имя</span>
                            <input
                                type="text"
                                className='input'
                                defaultValue={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </label>
                        <label className='input-label flex'>
                            <span className='label-text'>Фамилия</span>
                            <input
                                type="text"
                                className='input'
                                defaultValue={nameLast}
                                onChange={e => setNameLast(e.target.value)}
                            />
                        </label>
                        <label className='input-label flex'>
                            <span className='label-text'>Статус</span>
                            <textarea
                                className='input'
                                defaultValue={status}
                                onChange={e => setStatus(e.target.value)}
                            />
                        </label>
                        <label className='input-label flex'>
                            <span className='label-text'>Телефон</span>
                            <input
                                type="text"
                                className='input'
                                defaultValue={phoneNum}
                                onChange={e => setPhoneNum(e.target.value)}
                            />
                        </label>
                        <label className='input-label flex'>
                            <span className='label-text'>Эл.Почта</span>
                            <input
                                type="text"
                                className='input'
                                defaultValue={usEmail}
                                onChange={e => setUsEmail(e.target.value)}
                            />
                        </label>

                        <label className='input-label flex'>
                            <span className='label-text'>Сайт</span>
                            <input
                                type="text"
                                className='input'
                                defaultValue={site}
                                onChange={e => setSite(e.target.value)}
                            />
                        </label>

                        <label className='input-label flex'>
                            <span className='label-text'>О себе</span>
                            <textarea
                                defaultValue={description}
                                className='input text-area'
                                placeholder='Расскажите о себе'
                                onChange={e => setUsDescr(e.target.value)}
                            />

                        </label>
                        <label className='input-label flex'>
                            <span className='label-text'>Выберите фото</span>
                            <input type="file" className='input' accept="image/*"
                                onChange={handleFileChange} />
                        </label>
                        {message ? <p className='label-text'>Успешно сохранено</p> : null}
                        {load ? <Loader /> : <button className="btn">Сохранить</button>}
                    </form>
                </div>
            </>
        )
    }


    return (
        <div className="user">
            <div className="container">
                <div className="header-container">

                    <img className="user-avatar" src={avatar ? `${API_URL}/uploads/${avatar}` : user?.photo_url} />

                    <p className='user-name'>{firstName ? firstName : user?.first_name} {lastName ? lastName : user?.last_name}</p>
                    <p className='user-status'>
                        {userStatus ? userStatus : null}
                    </p>

                    <p className='user-description'>
                        {descr ?
                            <>
                                {show ?
                                    <>
                                        {descr}...
                                        <span className="read-more" onClick={hadleReadMore}>Читать далее</span>
                                    </>
                                    :
                                    <>
                                        {description}<span className="read-more" onClick={hadleReadMore}> Скрыть</span>
                                    </>
                                }
                            </>
                            :
                            null
                        }
                    </p>
                    <ul className="ul-res flex contacts-list contacts-list contacts-list">
                        <li>{phone ? <a href={`tel:${phone}`} target="_blank" className="contacts-link"><p className="contacts-item"><MdLocalPhone />{phone}</p></a> : null}</li>
                        <li>{email ? <a href={`mailto:${email}`} target="_blank" className="contacts-link"><p className="contacts-item"><MdAlternateEmail />{email}</p></a> : null}</li>
                        <li>{userName && userName !== 'undefined' ? <a href={`https://t.me/${userName}`} target="_blank" className="contacts-link"><p className="contacts-item"><MdEmail />@{userName}</p></a> : null}</li>
                        <li>{siteUrl ? <a href={`https://${siteUrl}`} target="_blank" className="contacts-link"><p className="contacts-item"><MdOutlineWeb />{siteUrl}</p></a> : null}</li>
                    </ul>

                </div>
                <button className="edit-user-btn" onClick={handleEdit}> <MdCreate /> Редактировать</button>
            </div>
        </div>
    );
};

