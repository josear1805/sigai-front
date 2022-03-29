import React, { useState, useEffect } from "react";
import { DualAxes } from "@ant-design/charts";
import { Spin } from "antd";

const initialConfig = {
    data: [[], []],
    xField: "ejeX",
    yField: ["ejeYDerecha", "ejeYIzquierda"],
    geometryOptions: [
        {
            geometry: "column",
            isGroup: true,
            seriesField: "nombre",
            columnWidthRatio: 0.4,
            label: {
                // formatter: (item) => `${item.ejeYDerecha} Bs`,
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
                    value: `${item.ejeYDerecha} Bs`,
                }),
            },
        },
        {
            geometry: "line",
            seriesField: "nombre",
            tooltip: {
                formatter: (item) => ({
                    name: `${item.nombre}`,
                    value: `${item.ejeYIzquierda} Bs`,
                }),
            },
            // lineStyle: ({ nombre }) => {
            //     if (nombre === "metaOperativaEjecutada") {
            //         return {
            //             lineDash: [1, 4],
            //             opacity: 1,
            //         };
            //     }

            //     return {
            //         opacity: 0.5,
            //     };
            // },
            point: {
                shape: 'circle',
                size: 4,
                // style: {
                //   opacity: 0.5,
                //   stroke: '#5AD8A6',
                //   fill: '#fff',
                // },
            },
        },
    ],
};

const ChartcColumnLine = (props) => {
    const { data, height } = props

    const [loading, setLoading] = useState(false);
    const [config, setConfig] = useState(initialConfig);

    // const datosColumna = [
    //     {
    //         ejeX: "2019-03",
    //         ejeYDerecha: 350,
    //         nombre: "Primera Columna",
    //     },
    // ];

    // const datosLinea = [
    //     {
    //         ejeX: "2019-03",
    //         ejeYIzquierda: 800,
    //         nombre: "Costo",
    //     },
    // ];

    useEffect(() => {
        setLoading(true);

        let dataColumn = [];
        let dataLine = [];

        data.map((item) => {
            let aux = {
                ejeX: item.mes,
                nombre: item.nombre
            }
            if (item.nombre === "metaFinancieraPlanificada" || item.nombre === "metaFinancieraEjecutada" || item.nombre === "valorReal") {
                aux.ejeYDerecha = item.valor
                dataColumn.push(aux);
            } else {
                aux.ejeYIzquierda = item.valor
                dataLine.push(aux);
            }
        });

        setConfig((prevState) => ({
            ...prevState,
            height,
            data: [
                dataColumn,
                dataLine
            ]
        }));

        setTimeout(() => {
            setLoading(false);
        }, 200);
        
    }, [props]);

    return (
        <Spin tip="Cargando gráfica...  " spinning={loading} style={{ height: config.height }}>
            {
                !loading && (
                    <DualAxes
                        {...config}
                    />
                )
            }
        </Spin>
    );
};

export default ChartcColumnLine;
