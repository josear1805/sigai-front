import { Bar } from '@ant-design/charts'

const ChartBar = () => {
    const data = [
        {
          year: '1951',
          value: 38,
        },
        {
          year: '1952',
          value: 52,
        },
        {
          year: '1956',
          value: 61,
        },
        {
          year: '1957',
          value: 145,
        },
        {
          year: '1958',
          value: 48,
        },
      ];
      const config = {
        data: data,
        height: 200,
        xField: 'value',
        yField: 'year',
        seriesField: 'year',
        legend: { position: 'top-left' },
      };

    return (
        <Bar {...config} />
    )
}

export default ChartBar