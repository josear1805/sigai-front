import { Layout, Breadcrumb } from 'antd';
import Link from 'next/link';

const { Content } = Layout;

const ContentApp = (props) => {
    const { children } = props;

    return (
        <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>
                    <Link href="/">
                        Home
                    </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>Gráficas</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            {children}
            </div>
            
        </Content>
    );
}

export default ContentApp