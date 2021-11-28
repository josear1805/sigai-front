import React from "react";
import { useRouter } from "next/router";
import { Layout, Menu, Dropdown } from "antd";
import { LogoutOutlined } from "@ant-design/icons";

const { Header } = Layout;

const HeaderApp = (props) => {
    const { dataUser } = props.state.global;
    const router = useRouter();

    const handleLogout = () => {
        if (process.browser) {
            localStorage.removeItem("token_sigai");
            router.push("/login");
        }
    };

    const menu = (
        <Menu>
            <Menu.Item onClick={handleLogout} icon={<LogoutOutlined />}>
                Cerrar Sessión
            </Menu.Item>
        </Menu>
    );

    return (
        <Header className="site-layout-background div-header">
            <Dropdown overlay={menu}>
                <a
                    className="ant-dropdown-link"
                    onClick={(e) => e.preventDefault()}
                >
                    { `${dataUser?.nombres} ${dataUser?.apellidos}` }
                </a>
            </Dropdown>
        </Header>
    );
};

export default HeaderApp;
