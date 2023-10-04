import React, { useState, useEffect } from 'react';
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from '@fullcalendar/timegrid';
import FullCalendar from '@fullcalendar/react';
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from '@fullcalendar/list';
import InsertDailyGoalModalForCalendar from '../FullCalenderView/InsertDailyGoalModalForCalendar';
import axios from 'axios';
import './TimeGridView.module.css';

export default function TimeGridView(props) {
    const [BigGoals, setBigGoals] = useState(props.BigGoals);
    const [smallGoals, setSmallGoals] = useState(props.smallGoals);
    const [isOpen, setIsOpen] = useState(false);
    const [dailyInfo, setDailyInfo] = useState([]);
    const userID = 'user1';

    useEffect(() => {
        async function fetchGoals() {
            try {
                const response = await axios.get(`/api/user/task/getTasks?userID=${userID}`);
                setDailyInfo(response.data);
                console.log("조회 넘어온 데이터", response.data);
            } catch (error) {
                console.error('일과 오류 발생:', error);
            }
        }

        fetchGoals();
        console.log("dailyInfo 값 확인 ", dailyInfo);
    }, []);

    const events = dailyInfo.map((list) => {
        function getRandomColor() {
            const letters = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }

        const color = getRandomColor();
        return {
            title: list.TASK_TITLE,
            start: list.TASK_STARTDATE,
            end: list.TASK_ENDDATE,
            color: color
        };
    });

    console.log("이벤트 값 확인", events);

    function onDailyClose() {
        setIsOpen(false);
    }

    return (
        <div>
            {dailyInfo ? (
                <div className="my-calendar">
                    <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                        initialView="timeGridDay"
                        events={events}
                        headerToolbar={{
                            start: 'today',
                            center: 'title',
                            end: 'myCustomButton dayGridMonth,listWeek,prev,next'
                        }}
                        customButtons={{
                            myCustomButton: {
                                text: '일과 피드백',
                                click: function () {
                                    setIsOpen(true);
                                }
                            }
                        }}
                        height={'800px'}
                        editable={true}
                        nowIndicator={true}
                    />
                </div>
            ) : (
                <p>Loading...</p>
            )}
            <div>
                {isOpen && (
                    <InsertDailyGoalModalForCalendar isOpen={isOpen} onDailyClose={onDailyClose} BigGoals={BigGoals} smallGoals={smallGoals} />
                )}
            </div>
        </div>
    );
}
