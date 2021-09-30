import dynamic from 'next/dynamic'
import TableComponent from './table'

const ChartColumn = dynamic(() => import('src/components/charts/column'), { ssr: false })

export {
    TableComponent,
    ChartColumn
}