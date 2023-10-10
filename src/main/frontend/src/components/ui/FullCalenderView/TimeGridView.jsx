import React, { useState, useEffect } from 'react';
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from '@fullcalendar/timegrid';
import FullCalendar from '@fullcalendar/react';
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from '@fullcalendar/list';
import axios from 'axios';
import './TimeGridView.css';
import InsertDailyGoalModal from '../FullCalenderView/InsertDailyGoalModal'

export default function TimeGridView(props) {


    const [BigGoals, setBigGoals] = useState(props.BigGoals || []);
    const [smallGoals, setSmallGoals] = useState(props.smallGoals || []);
    const [isOpen, setIsOpen] = useState(false);
    const [dailyInfo, setDailyInfo] = useState([]);

    const userID = 'user1';

    // 모달에서 목표를 저장할 때 호출되는 함수
    const handleModalSave = (newtask) => {
        // 새로운 목표를 목록에 추가
        const newdailyInfo = [...dailyInfo, newtask]; // 새로운 배열 생성
        setDailyInfo(newdailyInfo); // 상태 업데이트
        console.log("handleModalSave 실행", dailyInfo);

    };

    //일과 조회
    useEffect(() => {
        async function fetchGoals() {
            try {
                const response = await axios.get(`/api/user/task/getTasksFormonth?userID=${userID}`);
                setDailyInfo(response.data);

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
            title: list.TASK_TITLE,
            start: list.TASK_STARTDATE,
            end: list.TASK_ENDDATE,
            color: color
        };
    });


    function onDailyClose() {
        setIsOpen(false);
    }

    return (
        <div>
            <div className="my-calendar">
                <h2 className="calendarname">계획 일과</h2>
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
                            text: '일과 등록',
                            click: function () {
                                setIsOpen(true);
                            }
                        }
                    }}
                    title={'계획일과'}
                    height={'800px'}
                    events={events}
                    nowIndicator={true}
                />
            </div>

            <div>
                {isOpen && (
                    <InsertDailyGoalModal isOpen={isOpen} onDailyClose={onDailyClose} smallGoals={props.smallGoals} BigGoals={props.BigGoals} onSave={handleModalSave}/>
                )}
            </div>
        </div>
    );
}
