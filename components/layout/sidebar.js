import { useState } from "react";
import { Layout, Menu } from 'antd';
import {
    DesktopOutlined,
    HomeOutlined,
    SettingOutlined,
    BarChartOutlined,
    LineChartOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;
const { SubMenu } = Menu;

const SidebarApp = (props) => {
    

    return (
        
        <Sider breakpoint="sm" collapsedWidth={0} width={300}>
            <div className="div-logo">
                <img src="/images/cantv-white.png" alt="logo-cantv" />
            </div>
            {/* <div className="logo" /> */}
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                <Menu.Item key="inicio" icon={<HomeOutlined />}>
                    Inicio
                </Menu.Item>
                
                <SubMenu key="sub1" icon={<BarChartOutlined />} title="Indicadores Iniciales">
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
                </SubMenu>
                
                <Menu.Item key="9" icon={<SettingOutlined />}>
                    Configuración
                </Menu.Item>
                <Menu.Item key="2" icon={<DesktopOutlined />}>
                    Opcional
                </Menu.Item>
            </Menu>
        </Sider>
    );

}

export default SidebarApp;