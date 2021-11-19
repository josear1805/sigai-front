import Link from "next/link";
import { PageHeader, Card, Breadcrumb } from "antd";
import { HomeOutlined, RedoOutlined } from "@ant-design/icons";
import { ButtonComponent } from "@components";

/*
 *   title (text)
 *   reload (bool)
 *   handleReload (calback)
 *   button (bool)
 *   dataButton (array)
 *   loading
 */
const PageHeaderComponent = (props) => {
    const handleGetExtra = () => {
        let response = [];

        props.reload &&
            response.push(
                <ButtonComponent
                    key="reload"
                    type="text"
                    shape="circle"
                    icon={<RedoOutlined />}
                    onClick={props.handleReload}
                    loading={props.loading}
                    disabled={props.loading}
                />
            );

        props.button &&
            props.dataButton.map((item, key) => {
                item.href
                    ? response.push(
                        <ButtonComponent
                            key={key}
                            type={item.type}
                            title={item.name}
                            path={item.href}
                            className={item.className}
                            loading={props.loading}
                            disabled={item.disabled || props.loading}
                        />
                      )
                    : response.push(
                        <ButtonComponent
                            key={key}
                            type={item.type}
                            title={item.name}
                            onClick={() => props.handleOnClick(item.identifier)}
                            className={item.className}
                            loading={props.loading}
                            disabled={item.disabled || props.loading}
                        />
                      );
            });

        return response;
    };

    return (
        <Card className="mb-3">
            {props.navigation && (
                <Breadcrumb>
                    <Breadcrumb.Item key="001">
                        <Link href="/">
                            <a>
                                <HomeOutlined /> Inicio
                            </a>
                        </Link>
                    </Breadcrumb.Item>
                    {props.navigation?.map((item) => {
                        return (
                            <Breadcrumb.Item key={item.key}>
                                <Link href={item.path}>
                                    <a>{item.breadcrumbName}</a>
                                </Link>
                            </Breadcrumb.Item>
                        );
                    })}
                </Breadcrumb>
            )}
            <PageHeader
                title={props.title}
                subTitle={props.subTitle || null}
                extra={handleGetExtra()}
            />
            {props.children}
        </Card>
    );
};

export default PageHeaderComponent;
