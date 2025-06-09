import { MeetingCard } from "./MeetingCard";
import { CardSkeleton } from "./Skeletons/CardSkeleton";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../../API/queryClient";
import { getAllMeetings } from "../../../API/meetings/meetings.api";
import { Footer } from "../../Footer/Footer";
import { useState } from "react";
import { AddButton } from "../../UI/AddButton/AddButton";



interface MeetingsListProps {

}

export const MeetingsList: React.FC<MeetingsListProps> = () => {
    const [all, setAll] = useState(true);
    const [follow, setFollow] = useState(false);
    const [noFollow, setNoFollow] = useState(false);
    const userId = localStorage.getItem('userId');

    const { isPending, error, data } = useQuery({
        queryFn: () => getAllMeetings(),
        queryKey: ['meetings']
    }, queryClient);

    const handleAll = () => {
        setAll(true);
        setFollow(false);
        setNoFollow(false)
    }

    const handleFollow = () => {
        setAll(false);
        setFollow(true);
        setNoFollow(false)
    }

    const handleNoFollow = () => {
        setAll(false);
        setFollow(false);
        setNoFollow(true)
    }

    if (isPending) {
        return (
            <ul className=" ul-res flex meeting-items" style={{ flexDirection: 'column' }}>
                <li className="meeting-item"><CardSkeleton /></li>
                <li className="meeting-item"><CardSkeleton /></li>
                <li className="meeting-item"><CardSkeleton /></li>
            </ul>
        )
    }

    if (error) {
        return (<p>Произошла ошибка попробуйте позднее</p>)
    }
    if (data.data) {
        const cards = data.data;
        if (Array.isArray(cards)) {
            const iParts = cards.filter(item => item.participants.length);
            let iFollow: any = [];
            for (let i = 0; i < iParts.length; i++) {
                const temp = iParts[i].participants;
                temp.map((card: any) => {
                    if (card.user_id === userId) {
                        iFollow.push(iParts[i]);
                    }

                })
            }
            const iNoFollow: any[] = cards.filter(el_A => !iFollow.includes(el_A))
            return (
                <>
                    <div className="container cont-relative">
                        <div className="meetings-filter">
                            <ul className="ul-res flex button-container">
                                <li><button onClick={handleAll} className={all ? 'filter-button filter-button-active' : 'filter-button'}>Все</button></li>
                                <li><button onClick={handleFollow} className={follow ? 'filter-button filter-button-active' : 'filter-button'}>Я учавствую</button></li>
                                <li><button onClick={handleNoFollow} className={noFollow ? 'filter-button filter-button-active' : 'filter-button'}>Я не учавствую</button></li>
                            </ul>
                        </div>
                        {all ?
                            <ul className=" ul-res flex meeting-items" style={{ flexDirection: 'column' }}>
                                {cards.map(card => {
                                    return (
                                        <li className="meeting-item" key={card.id}>
                                            <MeetingCard
                                                id={card.id}
                                                title={card.title}
                                                description={card.description}
                                                date={card.date}
                                                time={card.time}
                                                partipiants={card.participants}
                                            />
                                        </li>
                                    )
                                })}
                            </ul>
                            :
                            null
                        }
                        {follow ?
                            <ul className=" ul-res flex meeting-items" style={{ flexDirection: 'column' }}>
                                {iFollow.length ?
                                    <>
                                        {iFollow.map((cardFollow: any) => {
                                            return (
                                                <li className="meeting-item" key={cardFollow.id}>
                                                    <MeetingCard
                                                        id={cardFollow.id}
                                                        title={cardFollow.title}
                                                        description={cardFollow.description}
                                                        date={cardFollow.date}
                                                        time={cardFollow.time}
                                                        partipiants={cardFollow.participants}
                                                    />
                                                </li>
                                            )
                                        })}
                                    </>
                                    :
                                    <p>Тут пусто...</p>
                                }

                            </ul>
                            :
                            null
                        }
                        {noFollow ?
                            <ul className=" ul-res flex meeting-items" style={{ flexDirection: 'column' }}>
                                {iNoFollow.length ?
                                    <>
                                        {iNoFollow.map((cardFollow: any) => {
                                            return (
                                                <li className="meeting-item" key={cardFollow.id}>
                                                    <MeetingCard
                                                        id={cardFollow.id}
                                                        title={cardFollow.title}
                                                        description={cardFollow.description}
                                                        time={cardFollow.time}
                                                        date={cardFollow.date}
                                                        partipiants={cardFollow.participants}
                                                    />
                                                </li>
                                            )
                                        })}
                                    </>
                                    :
                                    <p>Тут пусто...</p>
                                }
                            </ul>
                            :
                            null
                        }
                        <AddButton link="/meetings/new"/>
                    </div>
                    <Footer />
                </>
            );
        }

    }

};

