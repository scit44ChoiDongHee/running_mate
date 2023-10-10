import Chart from 'react-apexcharts'
import { COLORS } from '@/constants/chart.constant'

const GroupedBar = () => {
    const data = [
        {   
            name: "계획",
            data: [40, 20, 80],
        },
        {   
            name: "실제",
            data: [20, 40, 60],
        },
    ]

    return (

        <div>
        <h5>소목표 계획 시간과 실제 실행 시간 비교 그래프</h5>
        <Chart
            options={{
                plotOptions: {
                    bar: {
                        horizontal: true,
                        dataLabels: {
                            position: 'top',
                        },
                    },
                },
                colors: COLORS,
                dataLabels: {
                    enabled: true,
                    offsetX: -6,
                    style: {
                        fontSize: '12px',
                        colors: ['#fff'],
                    },
                },
                stroke: {
                    show: true,
                    width: 1,
                    colors: ['#fff'],
                },
                xaxis: {
                    categories: ["SQL", "Java", "Spring"],
                },
                tooltip: {
                    y: {
                        formatter: (val) => `${val} 시간`,
                    },
                },
            }}
            series={data}
            height={300}
            width={600}
            type="bar"
        />
        </div>
    )
}

export default GroupedBar