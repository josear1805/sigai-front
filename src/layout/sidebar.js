import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Link from "next/link";
import { Layout, Menu, notification } from 'antd';
import {
    DesktopOutlined,
    HomeOutlined,
    SettingOutlined,
    BarChartOutlined,
    LineChartOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import { enviroments } from 'src/config/enviroments';


const { Sider } = Layout;
const { SubMenu } = Menu;

const SidebarApp = (props) => {
    // const { dataUser } = useSelector((stateData) => stateData.global)
    // const { id_usuario, id_perfil } = dataUser;

    // const handleGetMenu = async () => {
    //     await axios.get(`${enviroments.api}/indican/menu.php?id_Usuario=${id_usuario}&id_Perfil=${id_perfil}`)
    //         .then(response => {
    //             const { data } = response;
    //             console.log(data)
    //         })
    //         .catch(error => {
    //             console.log(error)
    //         })
    // }

    // useEffect(() => {
    //     handleGetMenu()
    // }, [])


    return (

        <Sider breakpoint="sm" collapsedWidth={0} width={300}>
            <div className="div-logo">
                <Link href="/">
                    <img src="/images/cantv-white.png" alt="logo-cantv" />
                </Link>
            </div>
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                <Menu.Item key="inicio" icon={<HomeOutlined />}>
                    <Link href="/">
                        <a>Inicio</a>
                    </Link>
                </Menu.Item>

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

                <Menu.Item key="9" icon={<LineChartOutlined />}>
                    <Link href="/mis_indicadores">
                        <a>Mis Indicadores</a>
                    </Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<BarChartOutlined />}>
                    <Link href="/indicator_data">
                        <a>Datos de Indicadores</a>
                    </Link>
                </Menu.Item>
                <Menu.Item key="ficha_indicador" icon={<BarChartOutlined />}>
                    <Link href="/ficha_indicador">
                        <a>Ficha Indicador</a>
                    </Link>
                </Menu.Item>
            </Menu>
        </Sider>
    );

}

export default SidebarApp;

