import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LayoutApp from "src/layout";
import { Row, Col, Card, Select, Spin, Tag } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { makeRequest } from "src/helpers";
import { TableComponent, PageHeaderComponent, SelectCategoriasComponent } from "@components";
import Link from 'next/link'
import { setFichaIndicador } from "src/redux/reducers/fichaIndicadorSlice";

const { Option } = Select;

const initialState = {
    listaVicePresidencias: [],
    idVicePresidencia: 0,
    listaGerencias: [],
    listaGerenciasMostrar: [],
    idGerencia: 0,
    listaIndicadores: [],
    listaIndicadoresMostrar: [],
};

const FichaIndicador = () => {
    const dispatch = useDispatch();
    const { dataUser, loadingGeneral } = useSelector((stateData) => stateData.global)
    const { fichaIndicador } = useSelector((stateData) => stateData);

    const [state, setState] = useState(initialState);
    const [loading, setLoading] = useState(true);

    const buttonsHeader = [
        {
            href: "/ficha_indicador/agregar",
            type: "primary",
            name: "Nueva Ficha",
        },
    ];

    const navigation = [
        {
            key: "1",
            path: `/ficha_indicador`,
            breadcrumbName: "Fichas de indicadores",
        },
    ];

    const columns = [
        {
            title: "Nombre",
            dataIndex: "nombreInd",
            key: "nombreInd",
            search: true,
        },
        {
            title: "Acción",
            dataIndex: "idIndicador",
            key: "idIndicador",
            search: false,
            width: "75px",
            render: (text, record) => (
                // <Row gutter={[4, 0]} justify="end" align="middle">
                    <Col style={{ width: "75px" }}>
                        {/* <Link
                            key={1}
                            href={`/charts/${record.idIndicador}`}
                        > */}
                            <Tag
                                icon={<EditOutlined />}
                                color="success"
                                className="tag-table"
                            >
                                Editar
                            </Tag>
                        {/* </Link> */}
                    </Col>
                // </Row>
            )
        },
    ];

    const handleGetData = async () => {
        setLoading(true);
        const response = await makeRequest({
            method: "POST",
            path: "/indican/listafichaindicador.php",
            body: {
                idCategoria: 1
            },
        });

        if (response.estatus == 1) {
            setState({
                listaVicePresidencias: [...response.listaVicePresidencias],
                idVicePresidencia: 0,
                listaGerencias: [...response.listaGerencias],
                listaGerenciasMostrar: [],
                idGerencia: 0,
                listaIndicadores: [...response.indicadores],
                listaIndicadoresMostrar: [],
            });
            setLoading(false);
        } else {
            setLoading(false);
        }
    };

    const handleChangueVicePresidencia = (idVP, setGerencia = true) => {
        const { listaGerencias } = state;
        let listaGerenciasMostrar = listaGerencias.filter(
            (item) => item.idVicePresidencia == idVP
        );

        setState((prevState) => ({
            ...prevState,
            idVicePresidencia: idVP,
            listaGerenciasMostrar,
            idGerencia: 0,
            listaIndicadoresMostrar: [],
        }));
        
        dispatch(setFichaIndicador({
            listaIndicadores: state.listaIndicadores,
            listaGerencias: state.listaGerencias,
            listaVicePresidencias: state.listaVicePresidencias,
            idVicePresidencia: idVP,
            listaGerenciasMostrar,
            idGerencia: 0,
            listaIndicadoresMostrar: [],
        }));
    };

    const handleChangueGerencia = (idGerencia) => {
        const { listaIndicadores } = state;
        let listaIndicadoresMostrar = listaIndicadores.filter(
            (item) => item.idGerencia == idGerencia
        );

        setState((prevState) => ({
            ...prevState,
            idGerencia,
            listaIndicadoresMostrar,
        }));

        dispatch(setFichaIndicador({
            listaIndicadores: state.listaIndicadores,
            listaGerencias: state.listaGerencias,
            listaVicePresidencias: state.listaVicePresidencias,
            idVicePresidencia: state.idVicePresidencia,
            listaGerenciasMostrar: state.listaGerenciasMostrar,
            idGerencia,
            listaIndicadoresMostrar,
        }));
    };

    const handleSetInit = () => {
        setLoading(true);
        if (fichaIndicador.idVicePresidencia > 0 && fichaIndicador.idGerencia > 0) {
            setState((prevState) => ({
                ...prevState,
                listaIndicadores: fichaIndicador.listaIndicadores,
                listaGerencias: fichaIndicador.listaGerencias,
                listaVicePresidencias: fichaIndicador.listaVicePresidencias,
                idVicePresidencia: fichaIndicador.idVicePresidencia,
                listaGerenciasMostrar: fichaIndicador.listaGerenciasMostrar,
                idGerencia: fichaIndicador.idGerencia,
                listaIndicadoresMostrar: fichaIndicador.listaIndicadoresMostrar,
            }));
            setLoading(false)
        } else {
            handleGetData();
        }
    }

    useEffect(async () => {
        !loadingGeneral && handleSetInit();
    }, [loadingGeneral]);

    return (
        <LayoutApp navigation={navigation}>
            <PageHeaderComponent
                title="Fichas de indicadores"
                reload={true}
                handleReload={handleGetData}
                button={true}
                dataButton={buttonsHeader}
                loading={loading}
                navigation={navigation}
            >
                {/* <Row gutter={[24, 24]}>
                    <Col xs={24} md={12} lg={6}>
                        <SelectCategoriasComponent handleSuccess={handleGetData} />
                    </Col>
                </Row> */}
            </PageHeaderComponent>

            <Spin tip="Cargando..." spinning={loading}>
                {!loading && (
                    <Card>
                        <Row gutter={[24, 24]} justify="start" className="mb-3">
                            <Col xs={24} md={12} lg={6}>
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
                                                        item.idVicePresidencia
                                                    )}
                                                    key={index}
                                                >
                                                    {
                                                        item.nbVicePresidencia
                                                    }
                                                </Option>
                                            )
                                        )}
                                </Select>
                            </Col>

                            <Col xs={24} md={12} lg={6}>
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
                                                        item.idGerencia
                                                    )}
                                                    key={index}
                                                >
                                                    {item.nbGerencia}
                                                </Option>
                                            )
                                        )}
                                </Select>
                            </Col>
                        </Row>
                        
                        <TableComponent
                            columns={columns}
                            data={state.listaIndicadoresMostrar}
                            loading={false}
                        />
                    </Card>
                )}
            </Spin>
        </LayoutApp>
    );
};

export default FichaIndicador;
