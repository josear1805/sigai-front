import React from 'react';
import LayoutApp from '@components/layout';
import dynamic from 'next/dynamic'
import { Row, Col } from 'antd';


const ChartLine = dynamic(() => import('@components/charts/line'), { ssr: false })
const ChartColumn = dynamic(() => import('@components/charts/column'), { ssr: false })
const ChartBar = dynamic(() => import('@components/charts/bar'), { ssr: false })
const ChartPie = dynamic(() => import('@components/charts/pie'), { ssr: false })

const Home = () => {

    return (
      <LayoutApp>

        <Row gutter={[24, 24]}>
            <Col sm={24} md={12} >
                <ChartColumn />
            </Col>
            <Col sm={24} md={12} >
                <ChartLine />
            </Col>

            <Col sm={24} md={12} >
                <ChartBar />
            </Col>
            <Col sm={24} md={12} >
                <ChartPie />
            </Col>
        </Row>

          

      </LayoutApp>
    );
}

export default Home;
