import { Column } from '@ant-design/charts'
import { useEffect, useState } from 'react';
import { Spin } from 'antd';

const initialConfig = {
    height: 400,
    data: [],
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

const ChartColumn = (props) => {
    const { height, data } = props

    const [loading, setLoading] = useState(false)
    const [config, setConfig] = useState(initialConfig)

    useEffect(() => {
        setLoading(true);
        setConfig((prevState) => ({
            ...prevState,
            height,
            data
        }))
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, [props])

    return (
        <Spin tip="Cargando gráfica..." spinning={loading} style={{ height: config.height }}>
            {
                !loading && (
                    <Column
                        {...config}
                    />
                )
            }
        </Spin>
    )
}

export default ChartColumn