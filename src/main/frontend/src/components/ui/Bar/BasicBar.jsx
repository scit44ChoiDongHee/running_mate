import Chart from 'react-apexcharts'
import { COLORS } from '@/constants/chart.constant'

const BasicBar = () => {
    const data = [
        {
            data: [20, 40, 60],
        },
    ]

    return (
        <div>        
        <h5>소목표 별 총 소요시간 비교 그래프</h5>
        <Chart
            options={{
                plotOptions: {
                    bar: {
                        horizontal: true,
                    },
                },
                colors: COLORS,
                dataLabels: {
                    enabled: false,
                },
                xaxis: {
                    categories: [
                        'Study SQL Basics',
                        'Study Java Basics',
                        'Study Spring Boot Basics'
                        
                    ],
                },
                tooltip: {
                    y: {
                        formatter: (val) => `${val} 시간`,
                    },
                },
            }}
            series={data}
            type="bar"
            height={300}
            width={600}

        />
        </div>
    )
    

}

export default BasicBar