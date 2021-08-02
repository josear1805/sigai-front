import { Layout, Breadcrumb } from 'antd';

const { Content } = Layout;

const ContentApp = (props) => {
    const { children } = props;

    return (
        <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>prueba</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            {children}
            </div>
            
        </Content>
    );
}

export default ContentApp