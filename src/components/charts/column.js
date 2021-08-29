import { Column } from '@ant-design/charts'

const ChartColumn = (props) => {
    const { height, data } = props

    var config = {
        height,
        data,
        isGroup: true,
        xField: 'mes',
        yField: 'valor',
        seriesField: 'nombre',
        dodgePadding: 2,
        label: {
            //   position: 'middle',
            layout: [
                { type: 'interval-adjust-position' },
                { type: 'interval-hide-overlap' },
                { type: 'adjust-color' },
            ]
        },
        scrollbar: { type: 'horizontal' }
    };

    return (
        <Column
            {...config}
        />

    )
}

export default ChartColumn