import { useState, useRef } from 'react'
import { Column } from '@ant-design/charts'

const ChartColumn = () => {
    var data = [ 
        {
          nombre : 'Meta' , 
          mes : 'Enero' , 
          valor : 2000 , 
        } ,
        {
          nombre : 'Meta' , 
          mes : 'Febrero' , 
          valor : 28.8 , 
        } ,
        {
          nombre : 'Meta' , 
          mes : 'Mar.' , 
          valor : 39.3 , 
        } ,
        {
          nombre : 'Meta' , 
          mes : 'Abril' , 
          valor : 81.4 , 
        } ,
        {
          nombre : 'Meta' , 
          mes : 'mayo' , 
          valor : 47 , 
        } ,
        {
          nombre : 'Meta' , 
          mes : 'Jun.' , 
          valor : 20.3 , 
        } ,
        {
          nombre : 'Meta' , 
          mes : 'Jul.' , 
          valor : 24 , 
        } ,
        {
          nombre : 'Meta' , 
          mes : 'Agosto' , 
          valor : 35.6 , 
        } ,
        {
          nombre : 'Ejecutado' , 
          mes : 'Enero' , 
          valor : 500 , 
        } ,
        {
          nombre : 'Ejecutado' , 
          mes : 'Febrero' , 
          valor : 23.2 , 
        } ,
        {
          nombre : 'Ejecutado' , 
          mes : 'Mar.' , 
          valor : 34.5 , 
        } ,
        {
          nombre : 'Ejecutado' , 
          mes : 'Abril' , 
          valor : 99.7 , 
        } ,
        {
          nombre : 'Ejecutado' , 
          mes : 'mayo' , 
          valor : 52.6 , 
        } ,
        {
          nombre : 'Ejecutado' , 
          mes : 'Jun.' , 
          valor : 35.5 , 
        } ,
        {
          nombre : 'Ejecutado' , 
          mes : 'Jul.' , 
          valor : 37.4 , 
        } ,
        {
          nombre : 'Ejecutado' , 
          mes : 'Agosto' , 
          valor : 42.4 , 
        } ,
    ] ;

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