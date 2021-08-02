import { useState, useRef } from 'react'
import { Column } from '@ant-design/charts'

const ChartColumn = () => {
    var data = [ 
        {
          nombre : 'Londres' , 
          mes : 'Enero' , 
          PrecipitaciónMediaMensual : 18.9 , 
        } ,
        {
          nombre : 'Londres' , 
          mes : 'Febrero' , 
          PrecipitaciónMediaMensual : 28.8 , 
        } ,
        {
          nombre : 'Londres' , 
          mes : 'Mar.' , 
          PrecipitaciónMediaMensual : 39.3 , 
        } ,
        {
          nombre : 'Londres' , 
          mes : 'Abril' , 
          PrecipitaciónMediaMensual : 81.4 , 
        } ,
        {
          nombre : 'Londres' , 
          mes : 'mayo' , 
          PrecipitaciónMediaMensual : 47 , 
        } ,
        {
          nombre : 'Londres' , 
          mes : 'Jun.' , 
          PrecipitaciónMediaMensual : 20.3 , 
        } ,
        {
          nombre : 'Londres' , 
          mes : 'Jul.' , 
          PrecipitaciónMediaMensual : 24 , 
        } ,
        {
          nombre : 'Londres' , 
          mes : 'Agosto' , 
          PrecipitaciónMediaMensual : 35.6 , 
        } ,
        {
          nombre : 'Berlín' , 
          mes : 'Enero' , 
          PrecipitaciónMediaMensual : 12.4 , 
        } ,
        {
          nombre : 'Berlín' , 
          mes : 'Febrero' , 
          PrecipitaciónMediaMensual : 23.2 , 
        } ,
        {
          nombre : 'Berlín' , 
          mes : 'Mar.' , 
          PrecipitaciónMediaMensual : 34.5 , 
        } ,
        {
          nombre : 'Berlín' , 
          mes : 'Abril' , 
          PrecipitaciónMediaMensual : 99.7 , 
        } ,
        {
          nombre : 'Berlín' , 
          mes : 'mayo' , 
          PrecipitaciónMediaMensual : 52.6 , 
        } ,
        {
          nombre : 'Berlín' , 
          mes : 'Jun.' , 
          PrecipitaciónMediaMensual : 35.5 , 
        } ,
        {
          nombre : 'Berlín' , 
          mes : 'Jul.' , 
          PrecipitaciónMediaMensual : 37.4 , 
        } ,
        {
          nombre : 'Berlín' , 
          mes : 'Agosto' , 
          PrecipitaciónMediaMensual : 42.4 , 
        } ,
    ] ;

    var config = {
        data: data,
        width: '100%',
        isGroup: true,
        xField: 'mes',
        yField: 'PrecipitaciónMediaMensual',
        seriesField: 'nombre',
        dodgePadding: 2,

        label: {
          position: 'middle',
          layout: [
            { type: 'interval-adjust-position' },
            { type: 'interval-hide-overlap' },
            { type: 'adjust-color' },
          ] 
        },
      };

    return (
        <Column
            {...config}
        />

    )
}

export default ChartColumn