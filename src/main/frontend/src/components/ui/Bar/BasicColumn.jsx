import Chart from 'react-apexcharts'
import { COLORS } from '@/constants/chart.constant'

const BasicColumn = () => {
    const data = [
        {
            name: '계획',
            data: [40, 20, 80],
        },
        {
            name: '실제',
            data: [20, 40, 60],
        }
        
    ]

    return (
        <div>
        <h5>소목표 계획 일과 개수 와 실제 실행 일과 개수 비교 그래프</h5>
        <Chart
            options={{
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: '55%',
                        borderRadius: 4,
                    },
                },
                colors: COLORS,
                dataLabels: {
                    enabled: false,
                },
                stroke: {
                    show: true,
                    width: 2,
                    colors: ['transparent'],
                },
                xaxis: {
                    categories: [
                        'SQL',
                        'Java',
                        'Spring',
                    ],
                },
                fill: {
                    opacity: 1,
                },
                tooltip: {
                    y: {
                        formatter: (val) => `$${val} thousands`,
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

export default BasicColumn