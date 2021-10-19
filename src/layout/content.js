import { Layout, Breadcrumb, Row, Col } from 'antd';
import { HomeOutlined } from '@ant-design/icons';

import Link from 'next/link';

const { Content } = Layout;

const ContentApp = (props) => {
    const { navigation, children } = props;

    return (
        <Content className="p-3">
            {/* <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item key='001'>
                    <Link href="/">
                        <a>
                            <HomeOutlined /> Inicio
                        </a>
                    </Link>
                </Breadcrumb.Item>
                    {navigation?.map((item) => {
                        return (
                            <Breadcrumb.Item key={ item.key }>
                                <Link href={ item.path }>
                                    <a>
                                        { item.breadcrumbName }
                                    </a>
                                </Link>
                            </Breadcrumb.Item>
                        );
                    })}
            </Breadcrumb> */}
            {/* <div className="site-layout-background" style={{ padding: 24, minHeight: "75vh" }}> */}
                {/* {children} */}
            {/* </div> */}
            <Row>
                <Col span={24}>{children}</Col>
            </Row>
            
        </Content>
    );
}

export default ContentApp