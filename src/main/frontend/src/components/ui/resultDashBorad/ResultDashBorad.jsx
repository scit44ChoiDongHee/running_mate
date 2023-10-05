import Card from '@/components/ui/Card'
import React from 'react'
import styles from './ResultDashBorad.module.css'
import BasicBar from '../Bar/BasicBar'
import GroupedBar from '../Bar/GroupedBar'
import BasicColumn from '../Bar/BasicColumn'
import BasicArea from '../Bar/BasicArea'

export default function ResultDashBorad() {
  return (
    <div className={styles.container}>
      <div className={styles.topbox}>
        <h1>대목표 : Learn SQL</h1>
        <br />
        <hr />
        <br />
        <div className={styles.cardwarp}>
          <Card
            header="대목표 산하 소목표 이름"
            headerBorder={false}
            className={styles.Card}
            headerClass="text-xl"
          >
            <p>Study SQL Basics</p>
            <p>Study Java Basics</p>
            <p>Study Spring Boot Basics</p>
          </Card>

          <Card
            header="소목표 산하 등록한 일과 수"
            headerBorder={false}
            className={styles.Card}
          >
            <p>Study SQL Basics : 20개</p>
            <p>Study Java Basics : 40개</p>
            <p>Study Spring Boot Basics: 60개</p>
          </Card>

          <Card
            header="소목표 마다 사용한 시간 및 총합"
            headerBorder={false}
            className={styles.Card}
          >
            <p>Study SQL Basics : 20H</p>
            <p>Study Java Basics : 40H</p>
            <p>Study Spring Boot Basics: 60H</p>
            <br></br>
            <h3>Total Hour : 120H</h3>
          </Card>

          <Card
            header="총 투자 시간"
            headerBorder={false}
            className={styles.Card}
          >
            <p>850H</p>
          </Card>
        </div>

      </div>


      <div className={styles.bouttombox}>
        <BasicBar />
        <GroupedBar />
        <BasicColumn />
        <BasicArea />

      </div>

      <div>

      </div>

    </div>
  )
}
