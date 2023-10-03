import React from 'react'
import CalendarView from '../../components/shared/CalendarView'
import FullCalendarView from '../../components/ui/FullCalenderView/FullCalenderView'
import InsertDailyGoalPlanModal from '../../components/ui/InsertDailyGoalPlanModal/InsertDailyGoalPlanModal'
import calendar from '../../components/ui/FullCalenderView/TimeGridView'
import TimeGridView from '../../components/ui/FullCalenderView/TimeGridView'


export default function daily() {

    return (

      <div>
        <TimeGridView></TimeGridView>
      </div>

    )
  }
