import React from 'react'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import TimeInput from '@/components/ui/TimeInput'
import timeGridPlugin from '@fullcalendar/timegrid'

export default function TimeGridView() {


    const todayDate = new Date();
    const dateString = todayDate.toJSON();
    const dateStringSub = dateString.substring(0, dateString.indexOf("T"));




    // 예시 일정 데이터
    // const events = [
    //     {
    //         title: '운동하기',
    //         start: `${dateStringSub}T10:00:00`,
    //         end: `${dateStringSub}T12:00:00`
    //     },
    //     {
    //         title: '밥머기',
    //         start: '2023-10-04T14:00:00',
    //         end: '2023-10-04T16:30:00'
    //     },
    // ]

    
    return (
        <FullCalendar
            plugins={[timeGridPlugin]}
            initialView="timeGridDay"
            events={events}
            height={'800px'}
            editable={true}
            nowIndicator={true}
        />
    );
}
