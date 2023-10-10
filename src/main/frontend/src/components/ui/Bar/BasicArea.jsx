import Chart from 'react-apexcharts'
import { COLOR_1 } from '@/constants/chart.constant'

const BasicArea = () => {
    const data = [
        {
            name: '총 시간',
            data: [
                20, 40, 50, 60,
            ],
        },
    ]

    return (
        <div>
        <h5>계획시간과 실제 수행 시간의 차 절대값 그래프</h5>
        <Chart
            options={{
                chart: {
                    zoom: {
                        enabled: false,
                    },
                },
                colors: [COLOR_1],
                fill: {
                    type: 'gradient',
                    gradient: {
                        shadeIntensity: 1,
                        opacityFrom: 0.7,
                        opacityTo: 0.9,
                        stops: [0, 80, 100],
                    },
                },
                dataLabels: {
                    enabled: false,
                },
                stroke: {
                    curve: 'smooth',
                    width: 3,
                },
                labels: [
                    
                    '13 Nov 2023',
                    '14 Nov 2023',
                    '18 Nov 2023',
                    '15 Dec 2023',
                ],
                xaxis: {
                    type: 'datetime',
                },
                yaxis: {
                    opposite: true,
                },
                legend: {
                    horizontalAlign: 'left',
                },
                tooltip: {
                    y: {
                        formatter: (val) => `${val} 시간`,
                    },
                },
            }}
            type="area"
            series={data}
            height={300}
            width={600}

        />
        </div>
    )
}

export default BasicArea