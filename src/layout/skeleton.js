import { Layout, Skeleton, Row, Col } from "antd";

const { Sider, Header, Content } = Layout;

const SkeletonApp = () => {
    return (
        <>
            <Sider width={300}>
                <Skeleton.Button active style={{ width: "100%", height: "40px" }} />
                <Skeleton.Button active style={{ width: "100%", height: "50vh" }} />
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: "0 12px" }}>
                    <Row justify="end">
                        <Col md={10}>
                            <Skeleton.Button active style={{ width: "100%", height: "40px" }} />
                        </Col>
                    </Row>
                </Header>
                <Content style={{ padding: "12px" }}>
                    <Skeleton.Button active style={{ width: "100%", height: "14vh" }} />
                    <Skeleton.Button active style={{ width: "100%", height: "60vh" }} />
                </Content>
            </Layout>
        </>
    );
};

export default SkeletonApp;
