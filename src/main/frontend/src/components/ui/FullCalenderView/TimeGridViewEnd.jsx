import React, { useState, useEffect } from 'react';
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from '@fullcalendar/timegrid';
import FullCalendar from '@fullcalendar/react';
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from '@fullcalendar/list';
import InsertDailyGoalModalForfeedback from '../FullCalenderView/InsertDailyGoalModalForfeedback';
import axios from 'axios';
import './TimeGridView.css';

export default function TimeGridViewEnd(props) {
    const [BigGoals, setBigGoals] = useState(props.BigGoals);
    const [smallGoals, setSmallGoals] = useState(props.smallGoals);
    const [isOpen, setIsOpen] = useState(false);
    const [dailyInfo, setDailyInfo] = useState([]);
    const userID = 'user1';
    console.log("TimeGridViewEnd의 프롭스 값",props);
    
    useEffect(() => {
        async function fetchGoals() {
            try {
                const response = await axios.get(`/api/user/task/ActualTask?userID=${userID}`);
                setDailyInfo(response.data);
                console.log('불러오기 요청 보냄', response.data);
            } catch (error) {
                console.error('일과 오류 발생:', error);
            }
        }

        fetchGoals();
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
            title: list.ACTUALTASK_TITLE,
            start: list.ACTUALTASK_STARTDATE,
            end: list.ACTUALTASK_ENDDATE,
            color: color
        };
    });


    function onDailyClose() {
        setIsOpen(false);
    }

    return (
        <div>

            <div className="my-calendar">
                <h2 className="calendarname">실제 일과</h2>
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                    initialView="timeGridDay"
                    headerToolbar={{
                        start: 'today',
                        center: 'title',
                        end: 'myCustomButton prev,next'
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
                    events={events}
                    nowIndicator={true}
                />
            </div>

            <div>
                {isOpen && (
                    <InsertDailyGoalModalForfeedback isOpen={isOpen} onDailyClose={onDailyClose} BigGoals={props.BigGoals} smallGoals={props.smallGoals} />
                )}
            </div>
        </div>
    );
}
