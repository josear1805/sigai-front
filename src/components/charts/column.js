import { Column } from '@ant-design/charts'
import { useEffect, useState } from 'react';
import { Spin } from 'antd';

const ChartColumn = (props) => {
    const { height, data, unidadMedidaOperativa = ""} = props

    const [loading, setLoading] = useState(false)
    const [config, setConfig] = useState({
        height: 400,
        data: [],
        isGroup: true,
        xField: 'mes',
        yField: 'valor',
        seriesField: 'nombre',
        dodgePadding: 1,
        // label: false,
        label: {
            position: 'middle',
            // rotate: 5,
            layout: [
                { type: 'interval-adjust-position' },
                { type: 'interval-hide-overlap' },
                { type: 'adjust-color' },
            ]
        },
        tooltip: {
            formatter: (item) => ({
                name: `${item.nombre}`,
                value: `${item.valor} ${unidadMedidaOperativa}`,
            }),
        },
        scrollbar: { type: 'horizontal' },
    })

    useEffect(() => {
        setLoading(true);
        let aux = data.filter((item) => item.nombre != "metaFinancieraEjecutada" && item.nombre != "metaFinancieraPlanificada")

        setConfig((prevState) => ({
            ...prevState,
            height,
            data: aux
        }))
        setTimeout(() => {
            setLoading(false);
        }, 200);
    }, [props])

    return (
        <Spin tip="Cargando gráfica...  " spinning={loading} style={{ height: config.height }}>
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