import { Layout, Row, Col } from 'antd';

const { Content } = Layout;

const ContentApp = (props) => {
    const { children } = props;

    return (
        <Content className="p-3">
            <Row>
                <Col span={24}>
                    {children}
                </Col>
            </Row>
        </Content>
    );
}

export default ContentApp