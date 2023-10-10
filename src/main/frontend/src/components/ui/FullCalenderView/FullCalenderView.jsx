import React, { useState, useEffect } from 'react'
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import FullCalendar from '@fullcalendar/react';
import interactionPlugin from "@fullcalendar/interaction";
import axios from 'axios';
import listPlugin from '@fullcalendar/list';
import './MyCalendar.css'
import InsertDailyGoalModalForfeedback from './InsertDailyGoalModalForfeedback';

export default function FullCalendarView(props) {

  const [BigGoals, setBigGoals] = useState(props.BigGoals);
  const [smallGoals, setSmallGoals] = useState(props.smallGoals);
  const [isOpen, setIsOpen] = useState(false); // 초기값 설정
  const [dailyInfo, setDailyInfo] = useState([]); // dailyInfo 상태 추가
  const userID = 'user1';



  // 컴포넌트가 마운트될 때, 서버에서 일과 목록을 가져와서 상태에 저장합니다.
  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await axios.get(`/api/user/task/getTasksFormonth?userID=${userID}`);
        setDailyInfo(response.data);
        console.log("달력 쪽 조회 넘어온 데이터", response.data);
      } catch (error) {
        console.error('일과 오류 발생:', error);
      }
    }

    fetchTasks();
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
    }
  })


  // 임시로 만든 함수입니다. 실제 필요한 로직으로 대체해야 합니다.
  function onDailyClose() {
    setIsOpen(false);
  }

  return (
    <div className="my-calendar">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        initialView={'dayGridMonth'}
        headerToolbar={
          {
            start: 'today',
            center: 'title',
            end: 'myCustomButton dayGridMonth,listWeek,prev,next'
          }
        }
        customButtons={{
          myCustomButton: {
            text: '일과 피드백',
            click: function () {
              setIsOpen(true); // 모달을 열도록 상태를 변경합니다.
            }
          }
        }}
        height={"85vh"}
        events={events}
        views={{
          dayGridMonth: { buttonText: '월별' },
          listWeek: { buttonText: '주별' },
        }}
      />
      <div>
        {
          isOpen && (
            <InsertDailyGoalModalForfeedback isOpen={isOpen} onDailyClose={onDailyClose} BigGoals={BigGoals} smallGoals={smallGoals} />)
        }
      </div>
    </div>

  );
}
