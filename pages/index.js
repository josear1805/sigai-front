import React from 'react';
import LayoutApp from 'src/components/layout';
import dynamic from 'next/dynamic'
import { Row, Col, Card, Select } from 'antd';

const ChartLine = dynamic(() => import('src/components/charts/line'), { ssr: false })
const ChartColumn = dynamic(() => import('src/components/charts/column'), { ssr: false })
const ChartBar = dynamic(() => import('src/components/charts/bar'), { ssr: false })
const ChartPie = dynamic(() => import('src/components/charts/pie'), { ssr: false })

const { Option } = Select;

const Home = () => {
    return (
        <LayoutApp>
            <Row gutter={[24, 24]}>
                <Col xs={24} sm={24} md={12} >
                    <Card>
                        <Row gutter={[24, 24]}>
                            <Col span={24} style={{ textAlign: "right" }}>
                                <Select defaultValue="lucy" style={{ width: 120 }}>
                                    <Option value="jack">Jack</Option>
                                    <Option value="lucy">Lucy</Option>
                                    <Option value="disabled" disabled>
                                        Disabled
                                    </Option>
                                    <Option value="Yiminghe">yiminghe</Option>
                                </Select>
                            </Col>
                            <Col span={24}>
                                <ChartColumn />
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col xs={24} sm={24} md={12} >
                    <Card>
                        <Row gutter={[24, 24]}>
                            <Col span={24} style={{ textAlign: "right" }}>
                                <Select defaultValue="lucy" style={{ width: 120 }}>
                                    <Option value="jack">Jack</Option>
                                    <Option value="lucy">Lucy</Option>
                                    <Option value="disabled" disabled>
                                        Disabled
                                    </Option>
                                    <Option value="Yiminghe">yiminghe</Option>
                                </Select>
                            </Col>
                            <Col span={24}>
                            <ChartColumn />
                                {/* <ChartLine /> */}
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col xs={24} sm={24} md={12} >
                    <Card>
                        <Row gutter={[24, 24]}>
                            <Col span={24} style={{ textAlign: "right" }}>
                                <Select defaultValue="lucy" style={{ width: 120 }}>
                                    <Option value="jack">Jack</Option>
                                    <Option value="lucy">Lucy</Option>
                                    <Option value="disabled" disabled>
                                        Disabled
                                    </Option>
                                    <Option value="Yiminghe">yiminghe</Option>
                                </Select>
                            </Col>
                            <Col span={24}>
                            <ChartColumn />
                                {/* <ChartBar /> */}
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col xs={24} sm={24} md={12} >
                    <Card>
                        <Row gutter={[24, 24]}>
                            <Col span={24} style={{ textAlign: "right" }}>
                                <Select defaultValue="lucy" style={{ width: 120 }}>
                                    <Option value="jack">Jack</Option>
                                    <Option value="lucy">Lucy</Option>
                                    <Option value="disabled" disabled>
                                        Disabled
                                    </Option>
                                    <Option value="Yiminghe">yiminghe</Option>
                                </Select>
                            </Col>
                            <Col span={24}>
                            <ChartColumn />
                                {/* <ChartPie /> */}
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </LayoutApp>
    );
}

export default Home;
