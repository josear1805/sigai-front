import React, { useEffect } from "react";
import { Layout, Menu, Dropdown } from "antd";
import { useDispatch, useSelector, connect } from 'react-redux';

import { useRouter } from "next/router";
import { LogoutOutlined } from "@ant-design/icons";
import { setUser, logout } from "src/redux/actions/globalActions";

const { Header } = Layout;

const HeaderApp = (props) => {
    const { dataUser } = props.state.global;
    const router = useRouter();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        if (process.browser) {
            localStorage.removeItem("user");
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
                    {
                        `${dataUser?.nombres} ${dataUser?.apellidos}`
                    }
                </a>
            </Dropdown>
        </Header>
    );
};

export default HeaderApp;
