import React, { useEffect } from "react";
import { Layout, Menu, Dropdown } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { LogoutOutlined } from '@ant-design/icons';
import { logout } from "src/redux/actions/globalActions";

const { Header } = Layout;

const HeaderApp = (props) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { dataUser } = useSelector((stateData) => stateData.global)

    const handleLogout = () => {
        dispatch(logout());
    }

    const menu = (
        <Menu>
          <Menu.Item onClick={handleLogout} icon={<LogoutOutlined />}>Cerrar Sessión</Menu.Item>
        </Menu>
      );

    useEffect(() => {
        (!dataUser.nombres || !dataUser.apellidos) && router.push("/login");
    }, [dataUser])

    return (
        <Header className="site-layout-background div-header">
            <Dropdown overlay={menu}>
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                    {`${dataUser.nombres} ${dataUser.apellidos}`}
                </a>
            </Dropdown>

        </Header>
    )
}

export default HeaderApp;