import { useState, useRef } from 'react'
import { Column } from '@ant-design/charts'

const ChartColumn = () => {
    var data = [
        // {
        //     nombre: 'Real',
        //     mes: 'Enero',
        //     valor: 100,
        // },
        // {
        //     nombre: 'Real',
        //     mes: 'Febrero',
        //     valor: 99,
        // },
        {
            nombre: 'Meta',
            mes: 'Enero',
            valor: 50,
        },
        {
            nombre: 'Meta',
            mes: 'Febrero',
            valor: 28.8,
        },
        {
            nombre: 'Ejecutado',
            mes: 'Enero',
            valor: 60,
        },
        {
            nombre: 'Ejecutado',
            mes: 'Febrero',
            valor: 23.2,
        }
    ];

    var config = {
        height: 200,
        data: data,
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