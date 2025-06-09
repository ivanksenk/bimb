import './newMeeting.css'
import { BackButton } from "../UI/BackButton/BackButton";
import { FormEvent, useEffect, useState } from 'react';

import "react-datepicker/dist/react-datepicker.css";

import { NewMeetingInterface } from '../../Interfaces/Meeting.interface';
import { newMeetingSave } from '../../API/meetings/meetings.api';
import { useNavigate } from 'react-router-dom';
import { Loader } from '../Loader/Loader';
import { Footer } from '../Footer/Footer';

interface NewMeetingProps {

}

export const NewMeeting: React.FC<NewMeetingProps> = () => {
    const hoursArray = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']
    const [date, setDate] = useState<string>('');
    const [hour, setHour] = useState('00');
    const [minuts, setMinuts] = useState('00');
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
        // setLoader(true);

        if (organizerId) {
            const newMeeting: NewMeetingInterface = {
                title: title,
                description: description,
                date: date,
                time: `${hour}:${minuts}`,
                organizerId: organizerId
            }
            console.log(newMeeting);

            newMeetingSave(newMeeting)
                .then(res => {
                    if (res.data) {
                        setMessage(res.data.message);
                        setLoader(false);
                        setTimeout(() => { navigate('/meetings') }, 1000)
                    }
                })
                .catch(err => {
                    console.log(err);
                    setMessage('Произошла ошибка, попробуйте позднее...');
                    setLoader(false);
                })

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
                        <div className="flex time-wrapp">
                            <input type='date' className='input' onChange={e => setDate(e.target.value)} />
                            <select className='input' onChange={e => setHour(e.target.value)}>
                                {hoursArray.map(hour => {
                                    return (
                                        <option key={hour} value={hour}>{hour}</option>
                                    )
                                })}
                            </select>
                            <select className='input' onChange={e => setMinuts(e.target.value)}>
                                <option value={'00'}>00</option>
                                <option value={'15'}>15</option>
                                <option value={'30'}>30</option>
                                <option value={'45'}>45</option>
                            </select>
                        </div>

                    </label>
                    {message ? <span className='message'>{message}</span> : null}
                    {loader ?
                        <Loader />
                        :
                        <button className='btn'>Создать</button>
                    }

                </form>
            </div>
            <Footer />
        </>
    );
};