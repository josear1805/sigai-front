import React, { useState } from 'react';
import Link from "next/link";
import { Layout, Menu } from 'antd';
import {
    DesktopOutlined,
    HomeOutlined,
    SettingOutlined,
    BarChartOutlined,
    LineChartOutlined,
    RightOutlined,
    FileProtectOutlined,
    UserOutlined,
    ProfileOutlined
} from '@ant-design/icons';

const { Sider } = Layout;
const { SubMenu } = Menu;

const SidebarApp = ({ listaMenu }) => {
    const handleGetIcon = (icon) => {
        let response = null;
        switch (icon) {
            case "<HomeOutlined />":
                response = <HomeOutlined />;
                break;
            case "<LineChartOutlined />":
                response = <LineChartOutlined />;
                break;
            case "<BarChartOutlined />":
                response = <BarChartOutlined />;
                break;
            case "<FileProtectOutlined />":
                response = <FileProtectOutlined />;
                break;
            case "<UserOutlined />":
                response = <UserOutlined />;
                break;
            case "<ProfileOutlined />":
                response = <ProfileOutlined />;
                break;
            default:
                response = <RightOutlined />;
                break;
        }
        return response;
    }

    return (
        <Sider breakpoint="sm" collapsedWidth={0} width={300}>
            <div className="div-logo">
                <Link href="/">
                    <img src="/images/cantv-white.png" alt="logo-cantv" />
                </Link>
            </div>
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                {listaMenu.length >= 1 && listaMenu.map((item) => (
                    <Menu.Item key={item.idMenu} icon={handleGetIcon(item.icono)}>
                        <Link href={item.url}>
                            <a>{item.nombre}</a>
                        </Link>
                    </Menu.Item>
                ))}
                {/* <Menu.Item key="inicio" icon={<HomeOutlined />}>
                    <Link href="/">
                        <a>Inicio</a>
                    </Link>
                </Menu.Item> */}
                {/* <SubMenu key="sub1" icon={<BarChartOutlined />} title="Indicadores Iniciales">
                    <Menu.Item key="sub1_1">Team 1</Menu.Item>
                    <Menu.Item key="sub1_2">Team 2</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<LineChartOutlined />} title="Mis Indicadores">
                    <Menu.Item key="sub2_1">Finanzas</Menu.Item>
                    <Menu.Item key="sub2_2">Empresas e instituciones privadas</Menu.Item>
                    <Menu.Item key="sub2_3">Instituciones publicas</Menu.Item>
                    <Menu.Item key="sub2_4">Mercados masivos</Menu.Item>
                    <Menu.Item key="sub2_5">Energía y climatización</Menu.Item>
                    <Menu.Item key="sub2_6">Operaciones centralizadas</Menu.Item>
                    <Menu.Item key="sub2_7">Proyectos mayores</Menu.Item>
                    <Menu.Item key="sub2_8">Sistemas</Menu.Item>
                    <Menu.Item key="sub2_9">Tecnología y operaciones</Menu.Item>
                </SubMenu> */}
                {/* <Menu.Item key="9" icon={<LineChartOutlined />}>
                    <Link href="/mis_indicadores">
                        <a>Mis Indicadores</a>
                    </Link>
                </Menu.Item> */}
                {/* <Menu.Item key="2" icon={<BarChartOutlined />}>
                    <Link href="/datos_indicadores">
                        <a>Datos de Indicadores</a>
                    </Link>
                </Menu.Item> */}
                {/* <Menu.Item key="ficha_indicador" icon={<BarChartOutlined />}>
                    <Link href="/ficha_indicador">
                        <a>Ficha Indicador</a>
                    </Link>
                </Menu.Item> */}
            </Menu>
        </Sider>
    );

}

export default SidebarApp;

