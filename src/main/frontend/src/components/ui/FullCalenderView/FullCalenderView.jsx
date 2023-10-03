import React from 'react'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import TimeInput from '@/components/ui/TimeInput'


export default function FullCalendarView() {
    // 예시 일정 데이터
    const events = [
        {
            title: '일정 1',
            start: '2023-09-25',
            end: '2023-09-27'
        },
        {
            title: '일정 2',
            start: '2023-09-28',
            end: '2023-09-30',
        },
        // 추가 일정 데이터를 이곳에 계속 추가할 수 있습니다.
    ];

    return (
        <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            dayMaxEvents={true}
            events={events} // 일정 데이터를 전달
            height={'800px'}
            editable={true}
            views={{
                listDay: { buttonText: 'Day' },
                listWeek: { buttonText: 'Week' },
                listMonth: { buttonText: 'Month' },
            }}
        />
    );
}
