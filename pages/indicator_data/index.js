import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import LayoutApp from 'src/layout';
import dynamic from 'next/dynamic'
import { Row, Col, Card, Select, Spin, Button, Tooltip, notification, Tag } from 'antd';
import { EyeOutlined, EditOutlined } from '@ant-design/icons';
import axios from 'axios';
import Link from 'next/link'
import { enviroments } from 'src/config/enviroments';
import { makeRequest } from 'src/helpers';
import { TableComponent } from '@components';

// const ChartColumn = dynamic(() => import('src/components/charts/column'), { ssr: false })

const initialState = {
    loading: true,
    listaVicePresidencias: [],
    idVicePresidencia: 0,
    listaGerencias: [],
    listaGerenciasMostrar: [],
    idGerencia: 0,
    listaIndicadores: [],
    listaIndicadoresMostrar: [],
}

const DataIndicators = () => {
    const { dataUser } = useSelector((stateData) => stateData.global)
    const { id_usuario, id_perfil } = dataUser;

    const [state, setState] = useState(initialState);
    
    const navigation = [
        {
            key: '1',
            path: `/indicator_data`,
            breadcrumbName: 'Datos de Indicadores',
        }
    ]

    const columns = [
        {
            title: "Nombre",
            dataIndex: "nb_indicador",
            key: "nb__idindicador",
            search: true,
        },
        {
            title: "Acción",
            dataIndex: "id",
            key: "id",
            search: false,
            width: "400px",
            render: (text, record) => {
                return (
                    <Row gutter={[4, 0]} justify="space-around" align="middle">
                        {
                            (record.permiso === "1" || record.permiso === "2") && (
                                <Col span={8}>
                                    <Tooltip
                                        title="Ver datos de usuario"
                                        color={"blue"}
                                    >
                                        <Tag icon={<EyeOutlined />} color="success" style={{ width: "100%", textAlign: "center"}}>
                                            Ver
                                        </Tag>
                                    </Tooltip>
                                </Col>
                            )
                        }
                        {
                            record.permiso === "2" && (
                                <Col span={8} style={{ cursor: 'pointer' }}>
                                    <Tooltip
                                        title="Restablecer la contraseña del usuario"
                                        color={"red"}
                                    >
                                        <Tag icon={<EditOutlined />} color="processing" style={{ width: "100%", textAlign: "center"}}>
                                            Meta
                                        </Tag>
                                    </Tooltip>
                                </Col>
                            )
                        }
                        {
                            record.permiso === "2" && (
                                <Col span={8} style={{ cursor: 'pointer' }}>
                                    <Tooltip
                                        title="Eliminar datos de usuario"
                                        color={"red"}
                                    >
                                        <Tag icon={<EditOutlined />} color="processing" style={{ width: "100%", textAlign: "center"}}>
                                            Resultados
                                        </Tag>
                                    </Tooltip>
                                </Col>
                            )
                        }
                    </Row>
                );
            },
        },
    ];
    
    const handleGetData = async () => {
        const response = await makeRequest({
            method: "POST",
            path: "/indican/listavpgmetaresul.php",
            body: {
                idUsuario: 1,
                idPerfil: 1
            }
        })
        console.log(response)

        if (response.estatus) {
            setState((prevState) => ({
                ...prevState,
                loading: false,
                listaIndicadores: response.indicadores,
                listaGerencias: response.listagerencias,
                listaVicePresidencias: response.listavicepresidencias,
            }))
        }
    }

    const handleChangueVicePresidencia = (idVP) => {
        const { listaGerencias } = state;
        let listaGerenciasMostrar = listaGerencias.filter((item, index) => item.id_vice_presidencia == idVP )

        setState((prevState) => ({
            ...prevState,
            idVicePresidencia: idVP,
            listaGerenciasMostrar,
            idGerencia: 0,
            listaIndicadoresMostrar: [],
        }))
    }

    const handleChangueGerencia = (idGerencia) => {
        const { listaIndicadores } = state;
        let listaIndicadoresMostrar = listaIndicadores.filter((item, index) => item.id_gerencia == idGerencia )
        
        setState((prevState) => ({
            ...prevState,
            idGerencia,
            listaIndicadoresMostrar
        }))
    }

    useEffect(() => {
        handleGetData()
    }, [])

    return (
        <LayoutApp navigation={navigation}>
            <Spin tip="Cargando..." spinning={state.loading}>
                {!state.loading &&
                    <Row gutter={[24, 24]}>
                        <Col span={24} >
                            <Card >
                                <Row gutter={[24, 24]} justify="start">
                                    <Col span={6} >
                                        <label>Vice Presidencia</label>
                                        <Select value={state.idVicePresidencia} onChange={handleChangueVicePresidencia} style={{ width: "100%" }}>
                                            <Option value={0} key={999}>Seleccione</Option>
                                            {
                                                state.listaVicePresidencias && state.listaVicePresidencias.map((item, index) => (
                                                    <Option value={parseInt(item.id_vice_presidencia)} key={index}>{ item.nb_vicepresidencia }</Option>
                                                ))
                                            }
                                        </Select>
                                    </Col>

                                    <Col span={6} >
                                        <label>Gerencia</label>
                                        <Select 
                                            value={state.idGerencia} 
                                            style={{ width: "100%" }} 
                                            disabled={!state.idVicePresidencia}
                                            onChange={(value) => handleChangueGerencia(value)}
                                        >
                                            <Option value={0} key={999}>Seleccione</Option>
                                            {
                                                state.listaGerenciasMostrar && state.listaGerenciasMostrar.map((item, index) => (
                                                    <Option value={parseInt(item.id_gerencia)} key={index}>{ item.nb_gerencia }</Option>
                                                ))
                                            }
                                        </Select>
                                    </Col>
                                    
                                </Row>
                            </Card>
                        </Col>

                        <Col span={24} >
                            <Card >
                                <TableComponent
                                    columns={columns}
                                    data={state.listaIndicadoresMostrar}
                                    loading={false}
                                />
                            </Card>
                        </Col>
                    
                    </Row>
                }
            </Spin>
        </LayoutApp>
    );
}

export default DataIndicators;
