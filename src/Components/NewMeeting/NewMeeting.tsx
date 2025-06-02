import './newMeeting.css'
import { BackButton } from "../UI/BackButton/BackButton";
import { FormEvent, useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ru } from 'date-fns/locale';
import { NewMeetingInterface } from '../../Interfaces/Meeting.interface';
import { newMeetingSave } from '../../API/meetings/meetings.api';
import { useNavigate } from 'react-router-dom';
import { Loader } from '../Loader/Loader';
import { Footer } from '../Footer/Footer';

interface NewMeetingProps {

}

export const NewMeeting: React.FC<NewMeetingProps> = () => {
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [loader, setLoader] = useState(false);
    const [message, setMessage] = useState('');

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const navigate = useNavigate();

    const organizerId = localStorage.getItem('userId');
    useEffect(() => {
        if (!organizerId) {
            navigate('/');
        }

    }, [])


    const createNewMeeting = (e: FormEvent) => {
        e.preventDefault();
        setLoader(true);
        if (startDate && typeof organizerId === 'string') {
            const saveDate = startDate.toISOString().slice(0, 19).replace('T', ' ');
            const newMeeting: NewMeetingInterface = {
                title: title,
                description: description,
                date: saveDate,
                organizerId: organizerId
            }
            newMeetingSave(newMeeting)
                .then(res => {
                    if (res.data) {
                        setMessage(res.data.message);
                        setLoader(false);
                        setTimeout(()=>{navigate('/meetings')},1000)
                    }
                })
                .catch(err => {
                    console.log(err);
                    setMessage('Произошла ошибка, попробуйте позднее...');
                    setLoader(false);
                })
            console.log(newMeeting);
        }
    }

    return (
        <>
            <div className='new-meeting-header'>
                <div className="container flex new-meeting-heder-container">
                    <BackButton url="/meetings" />
                    <h3>Новая встреча</h3>
                </div>
            </div>
            <div className="container">
                <form onSubmit={createNewMeeting} className="new-meeting-form flex">
                    <label className='input-label flex'>
                        <span className='label-text'>Заголовок*</span>
                        <input type='text'
                            defaultValue={title}
                            placeholder='Введите заголовок'
                            className='input'
                            onChange={e => setTitle(e.target.value)}
                            required
                        />
                    </label>
                    <label className='input-label flex'>
                        <span className='label-text'>Описание</span>
                        <textarea
                            defaultValue={description}
                            className='input text-area'
                            placeholder='Введите описание'
                            onChange={e => setDescription(e.target.value)}
                        />
                    </label>
                    <label className='input-label flex'>
                        <span className='label-text'>Выберите дату и время*</span>
                        <DatePicker
                            className='input input-date'
                            selected={startDate}
                            locale={ru}
                            onChange={(date) => setStartDate(date)}
                            minDate={new Date()}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15} // Шаг времени (15 минут)
                            dateFormat="dd.MM.yyyy HH:mm"
                            placeholderText="Выберите дату и время"
                        />
                    </label>
                    {message ? <span className='message'>{message}</span> : null}
                    {loader ?
                        <Loader />
                        :
                        <button className='btn'>Создать</button>
                    }

                </form>
            </div>
            <Footer/>
        </>
    );
};