import { useState } from "react";
import { MdAddCircle } from "react-icons/md";
import ReactMarkdown from 'react-markdown';
import { myAxios } from "../../../API/config";
import { queryClient } from "../../../API/queryClient";
import { Loader } from "../../Loader/Loader";

interface MeetingCardProps {
    id: number;
    title: string;
    description?: string;
    date: string;
    time: string;
    partipiants?: any[]
}

export const MeetingCard: React.FC<MeetingCardProps> = ({ title, description, date, id, partipiants, time }) => {
    const [descr, setDescr] = useState(description);
    const [show, setShow] = useState(false);
    const [load, setLoad] = useState(false);
    console.log(date)
    let days: any = date.split('T');
    days = days[0].split('-');

    const userId = localStorage.getItem('userId');
    let text = '';
    if (descr && descr.length > 200) {
        setDescr(descr?.slice(0, 200));
        setShow(true);
    }

    if (partipiants && partipiants.length) {

        partipiants.map(user => {

            text = text + user.first_name + ', ';
        })

    }

    const handleShow = () => {
        setShow(!show);
    }

    const handleFollow = () => {
        setLoad(true);
        if (userId && id) {
            const data = {
                userId: userId,
                meetingId: id
            }
            const token = localStorage.getItem('token');
            myAxios.post('/meeting/follow', data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
                .then(res => {
                    if (res)
                        queryClient.invalidateQueries({ queryKey: ['meetings'] });
                    setLoad(false);
                })
                .catch(err => console.log(err))
        }

    }

    return (
        <div className="meeting-card">
            <div className="card-header flex">
                <div className="meeting-date">
                    <span className="meeting-1">{Number(days[2])+1}.{days[1]}</span>
                    <span className="meeting-2">{time}</span>
                </div>
                <div className="btn-wrapp">
                    {partipiants?.filter(item => item.user_id === userId).length ?
                        <p className="follow-text">Вы учавствуете</p>
                        :
                        <>
                            {load ?
                                <Loader />
                                :
                                <button className="flex add-btn" onClick={handleFollow}><MdAddCircle />Присоединиться</button>
                            }

                        </>
                    }

                </div>
            </div>
            <div className="card-body">
                <h3 className="card-title">{title}</h3>
                <div className="card-descr">
                    {show ?
                        <>
                            <ReactMarkdown>{descr}</ReactMarkdown>...
                            <span className="read-more" onClick={handleShow}>Читать далее</span>
                        </>
                        :
                        <>
                            <ReactMarkdown>{description}</ReactMarkdown>
                            <span className="read-more" onClick={handleShow}>Скрыть</span>
                        </>
                    }
                </div>

                {/* <div className="card-speakers flex">
                    <span className="speakers-title">Спикеры:</span>
                    <ul className="ul-res flex">
                        <li className="speaker flex"> <p>..Джордан Белфорд</p></li>
                    </ul>
                </div> */}
                <div className="flex">
                    <div className="card-followers flex">
                        <div className="tmp-logo"></div><div className="tmp-logo2"></div><div className="tmp-logo3"></div>
                    </div>
                    {text ?
                        <p className="folowers-text">{text} {partipiants && partipiants.length > 1 ?
                            `уже присоединились`
                            :
                            null
                        }
                            {partipiants && partipiants.length === 1 ?
                                `уже присоединился(лась)`
                                :
                                null
                            }

                        </p>
                        :
                        <p className="folowers-text">Еще никто не присоединился, будь первым!</p>
                    }
                </div>
            </div>
        </div>
    );
};
