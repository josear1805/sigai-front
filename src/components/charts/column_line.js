import React, { useState, useEffect } from "react";
import { DualAxes } from "@ant-design/charts";
import { Spin } from "antd";

const ChartcColumnLine = () => {
    const datosColumna = [
        {
            ejeX: "2019-03",
            ejeYDerecha: 350,
            nombre: "Primera Columna",
        },
        {
            ejeX: "2019-04",
            ejeYDerecha: 900,
            nombre: "Primera Columna",
        },
        {
            ejeX: "2019-05",
            ejeYDerecha: 300,
            nombre: "Primera Columna",
        },
        {
            ejeX: "2019-06",
            ejeYDerecha: 450,
            nombre: "Primera Columna",
        },
        {
            ejeX: "2019-07",
            ejeYDerecha: 470,
            nombre: "Primera Columna",
        },
        {
            ejeX: "2019-03",
            ejeYDerecha: 220,
            nombre: "Segunda Columna",
        },
        {
            ejeX: "2019-04",
            ejeYDerecha: 300,
            nombre: "Segunda Columna",
        },
        {
            ejeX: "2019-05",
            ejeYDerecha: 250,
            nombre: "Segunda Columna",
        },
        {
            ejeX: "2019-06",
            ejeYDerecha: 220,
            nombre: "Segunda Columna",
        },
        {
            ejeX: "2019-07",
            ejeYDerecha: 362,
            nombre: "Segunda Columna",
        },
    ];

    const datosLinea = [
        {
            ejeX: "2019-03",
            ejeYIzquierda: 800,
            nombre: "Costo",
        },
        {
            ejeX: "2019-04",
            ejeYIzquierda: 600,
            nombre: "Costo",
        },
        {
            ejeX: "2019-05",
            ejeYIzquierda: 400,
            nombre: "Costo",
        },
        {
            ejeX: "2019-06",
            ejeYIzquierda: 380,
            nombre: "Costo",
        },
        {
            ejeX: "2019-07",
            ejeYIzquierda: 220,
            nombre: "Costo",
        },
    ];

    const config = {
        data: [datosColumna, datosLinea],
        xField: "ejeX",
        yField: ["ejeYDerecha", "ejeYIzquierda"],
        geometryOptions: [
            {
                geometry: "column",
                isGroup: true,
                seriesField: "nombre",
                columnWidthRatio: 0.4,
                label: {
                    position: 'middle',
                    // rotate: 5,
                    layout: [
                        { type: 'interval-adjust-position' },
                        { type: 'interval-hide-overlap' },
                        { type: 'adjust-color' },
                    ]
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
                //     if (nombre === "a") {
                //         return {
                //             lineDash: [1, 4],
                //             opacity: 1,
                //         };
                //     }

                //     return {
                //         opacity: 0.5,
                //     };
                // },
            },
        ],
    };

    return <DualAxes {...config} />;
};

export default ChartcColumnLine;
