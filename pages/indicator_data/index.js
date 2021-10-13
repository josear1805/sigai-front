import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LayoutApp from "src/layout";
import { Row, Col, Card, Select, Spin, Tag } from "antd";
import { EyeOutlined, EditOutlined } from "@ant-design/icons";
import { makeRequest } from "src/helpers";
import { TableComponent } from "@components";
import Link from 'next/link'

const initialState = {
    loading: true,
    listaVicePresidencias: [],
    idVicePresidencia: 0,
    listaGerencias: [],
    listaGerenciasMostrar: [],
    idGerencia: 0,
    listaIndicadores: [],
    listaIndicadoresMostrar: [],
};

const DataIndicators = () => {
    const dataUser = process.browser && JSON.parse(localStorage.getItem("user"));

    const [state, setState] = useState(initialState);

    const navigation = [
        {
            key: "1",
            path: `/indicator_data`,
            breadcrumbName: "Datos de Indicadores",
        },
    ];

    const columns = [
        {
            title: "Nombre",
            dataIndex: "nb_indicador",
            key: "nb_idindicador",
            search: true,
        },
        {
            title: "Acción",
            dataIndex: "id_indicador",
            key: "id_indicador",
            search: false,
            width: "400px",
            render: (text, record) => {
                return (
                    <Row gutter={[4, 0]} justify="space-around" align="middle">
                        <Col span={8}>
                            {(record.permiso === "1" ||
                                record.permiso === "2") && (
                                <Link
                                    key={1}
                                    href="/charts/[idIndicador]"
                                    as={`/charts/${record.id_indicador}`}
                                    passHref
                                >
                                    <Tag
                                        icon={<EyeOutlined />}
                                        color="success"
                                        className="tag-table"
                                    >
                                        Ver
                                    </Tag>
                                </Link>
                            )}
                        </Col>
                        <Col span={8}>
                            {record.permiso === "2" && (
                                <Link
                                    key={2}
                                    href="/indicator_data/goals/[idIndicador]"
                                    as={`/indicator_data/goals/${record.id_indicador}`}
                                    passHref
                                >
                                    <Tag
                                        icon={<EditOutlined />}
                                        color="processing"
                                        className="tag-table"
                                    >
                                        M. F. planificada
                                    </Tag>
                                </Link>
                            )}
                        </Col>
                        <Col span={8}>
                            {record.permiso === "2" && (
                                <Tag
                                    icon={<EditOutlined />}
                                    color="processing"
                                    className="tag-table"
                                >
                                    M. F. ejecutada
                                </Tag>
                            )}
                        </Col>
                    </Row>
                );
            },
        },
    ];

    const handleGetData = async () => {
        const { id_usuario, id_perfil } = dataUser;
        const response = await makeRequest({
            method: "POST",
            path: "/indican/listavpgmetaresul.php",
            body: {
                idUsuario: id_usuario,
                idPerfil: id_perfil,
            },
        });

        if (response.Estatus) {
            setState((prevState) => ({
                ...prevState,
                loading: false,
                listaIndicadores: response.Indicadores,
                listaGerencias: response.ListaGerencias,
                listaVicePresidencias: response.ListaVicePresidencias,
            }));
        }
    };

    const handleChangueVicePresidencia = (idVP) => {
        const { listaGerencias } = state;
        let listaGerenciasMostrar = listaGerencias.filter(
            (item, index) => item.id_vice_presidencia == idVP
        );

        setState((prevState) => ({
            ...prevState,
            idVicePresidencia: idVP,
            listaGerenciasMostrar,
            idGerencia: 0,
            listaIndicadoresMostrar: [],
        }));
    };

    const handleChangueGerencia = (idGerencia) => {
        const { listaIndicadores } = state;
        let listaIndicadoresMostrar = listaIndicadores.filter(
            (item, index) => item.id_gerencia == idGerencia
        );

        setState((prevState) => ({
            ...prevState,
            idGerencia,
            listaIndicadoresMostrar,
        }));
    };

    useEffect(() => {
        dataUser && handleGetData();
    }, []);

    return (
        <LayoutApp navigation={navigation}>
            <Spin tip="Cargando..." spinning={state.loading}>
                {!state.loading && (
                    <Row gutter={[24, 24]}>
                        <Col span={24}>
                            <Card>
                                <Row gutter={[24, 24]} justify="start">
                                    <Col span={6}>
                                        <label>Unidad organizativa</label>
                                        <Select
                                            value={state.idVicePresidencia}
                                            onChange={
                                                handleChangueVicePresidencia
                                            }
                                            style={{ width: "100%" }}
                                        >
                                            <Option value={0} key={999}>
                                                Seleccione
                                            </Option>
                                            {state.listaVicePresidencias &&
                                                state.listaVicePresidencias.map(
                                                    (item, index) => (
                                                        <Option
                                                            value={parseInt(
                                                                item.id_vice_presidencia
                                                            )}
                                                            key={index}
                                                        >
                                                            {
                                                                item.nb_vicepresidencia
                                                            }
                                                        </Option>
                                                    )
                                                )}
                                        </Select>
                                    </Col>

                                    <Col span={6}>
                                        <label>Gerencia</label>
                                        <Select
                                            value={state.idGerencia}
                                            style={{ width: "100%" }}
                                            disabled={!state.idVicePresidencia}
                                            onChange={(value) =>
                                                handleChangueGerencia(value)
                                            }
                                        >
                                            <Option value={0} key={999}>
                                                Seleccione
                                            </Option>
                                            {state.listaGerenciasMostrar &&
                                                state.listaGerenciasMostrar.map(
                                                    (item, index) => (
                                                        <Option
                                                            value={parseInt(
                                                                item.id_gerencia
                                                            )}
                                                            key={index}
                                                        >
                                                            {item.nb_gerencia}
                                                        </Option>
                                                    )
                                                )}
                                        </Select>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>

                        <Col span={24}>
                            <Card>
                                <TableComponent
                                    columns={columns}
                                    data={state.listaIndicadoresMostrar}
                                    loading={false}
                                />
                            </Card>
                        </Col>
                    </Row>
                )}
            </Spin>
        </LayoutApp>
    );
};

export default DataIndicators;
