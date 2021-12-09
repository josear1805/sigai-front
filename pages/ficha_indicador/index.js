import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LayoutApp from "src/layout";
import { Row, Col, Card, Select, Spin, Tag, Tooltip } from "antd";
import { 
    EyeOutlined, 
    BarChartOutlined,
    LineChartOutlined,
    AreaChartOutlined
} from "@ant-design/icons";
import { makeRequest } from "src/helpers";
import { TableComponent, PageHeaderComponent, SelectCategoriasComponent } from "@components";
import Link from 'next/link'
import { setIndicatorData } from "src/redux/reducers/datosIndicadorSlice";

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
    const { datosIndicador } = useSelector((stateData) => stateData);

    const [state, setState] = useState(initialState);
    const [loading, setLoading] = useState(true);

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
            dataIndex: "nb_indicador",
            key: "nb_idindicador",
            search: true,
        },
        {
            title: "Acción",
            dataIndex: "id_indicador",
            key: "id_indicador",
            search: false,
            render: (text, record) => {
                return (
                    <Row gutter={[4, 0]} justify="space-around" align="middle">
                        <Col span={4}>
                            {(record.permiso === "1" || record.permiso === "2") && (
                                <Link
                                    key={1}
                                    href={`/charts/${record.id_indicador}`}
                                >
                                    <Tooltip
                                        title="Ver detalles de indicador"
                                    >
                                        <Tag
                                            icon={<EyeOutlined />}
                                            color="success"
                                            className="tag-table"
                                        />
                                    </Tooltip>
                                </Link>
                            )}
                        </Col>
                        <Col span={4}>
                            {record.permiso === "2" && (
                                <Link
                                    key={2}
                                    href={`/indicator_data/meta_fisica_planificada/${record.id_indicador}`}
                                >
                                    <Tooltip
                                        title="Editar meta física planificada"
                                    >
                                        <Tag
                                            icon={<BarChartOutlined />}
                                            color="processing"
                                            className="tag-table"
                                        />
                                    </Tooltip>
                                </Link>
                            )}
                        </Col>
                        <Col span={4}>
                            {record.permiso === "2" && (
                                <Link
                                    key={3}
                                    href={`/indicator_data/meta_fisica_ejecutada/${record.id_indicador}`}
                                >
                                    <Tooltip
                                        title="Editar meta física ejecutada"
                                    >
                                        <Tag
                                            icon={<LineChartOutlined />}
                                            color="processing"
                                            className="tag-table"
                                        />
                                    </Tooltip>
                                </Link>
                            )}
                        </Col>
                        <Col span={4}>
                            <Link
                                key={1}
                                href={`/indicator_data/presupuesto_planificado/${record.id_indicador}`}
                            >
                                <Tooltip
                                    title="Editar presupuesto planificado"
                                >
                                    <Tag
                                        icon={<BarChartOutlined />}
                                        color="processing"
                                        className="tag-table"
                                    />
                                </Tooltip>
                            </Link>
                        </Col>
                        <Col span={4}>
                            <Link
                                key={2}
                                href={`/indicator_data/presupuesto_ejecutado/${record.id_indicador}`}
                            >
                                <Tooltip
                                    title="Editar presupuesto ejecutado"
                                >
                                    <Tag
                                        icon={<LineChartOutlined />}
                                        color="processing"
                                        className="tag-table"
                                    />
                                </Tooltip>
                            </Link>
                        </Col>
                        <Col span={4}>
                            <Link
                                key={3}
                                href={`/indicator_data/real/${record.id_indicador}`}
                            >
                                <Tooltip
                                    title="Editar valor reales"
                                >
                                    <Tag
                                        icon={<AreaChartOutlined />}
                                        color="processing"
                                        className="tag-table"
                                    />
                                </Tooltip>
                            </Link>
                        </Col>
                    </Row>
                );
            },
        },
    ];

    const handleGetData = async () => {
        setLoading(true);
        const { idUsuario, idPerfil } = dataUser;
        const response = await makeRequest({
            method: "POST",
            path: "/indican/listavpgmetaresul.php",
            body: {
                idUsuario,
                idPerfil,
            },
        });

        if (response.Estatus == 1) {
            setState({
                listaVicePresidencias: [...response.ListaVicePresidencias],
                idVicePresidencia: 0,
                listaGerencias: [...response.ListaGerencias],
                listaGerenciasMostrar: [],
                idGerencia: 0,
                listaIndicadores: [...response.Indicadores],
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
            (item) => item.id_vice_presidencia == idVP
        );

        setState((prevState) => ({
            ...prevState,
            idVicePresidencia: idVP,
            listaGerenciasMostrar,
            idGerencia: 0,
            listaIndicadoresMostrar: [],
        }));
        dispatch(setIndicatorData({
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
            (item) => item.id_gerencia == idGerencia
        );

        setState((prevState) => ({
            ...prevState,
            idGerencia,
            listaIndicadoresMostrar,
        }));

        dispatch(setIndicatorData({
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
        if (datosIndicador.idVicePresidencia > 0 && datosIndicador.idGerencia > 0) {
            setState((prevState) => ({
                ...prevState,
                listaIndicadores: datosIndicador.listaIndicadores,
                listaGerencias: datosIndicador.listaGerencias,
                listaVicePresidencias: datosIndicador.listaVicePresidencias,
                idVicePresidencia: datosIndicador.idVicePresidencia,
                listaGerenciasMostrar: datosIndicador.listaGerenciasMostrar,
                idGerencia: datosIndicador.idGerencia,
                listaIndicadoresMostrar: datosIndicador.listaIndicadoresMostrar,
            }));
            setLoading(false)
        } else {
            handleGetData();
        }
    }

    useEffect(() => {
        !loadingGeneral && handleGetData();
    }, [loadingGeneral]);

    return (
        <LayoutApp navigation={navigation}>
            <PageHeaderComponent
                title="Fichas de indicadores"
                reload={true}
                handleReload={handleGetData}
                button={false}
                // dataButton={buttonsHeader}
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
                        
                        {/* <TableComponent
                            columns={columns}
                            data={state.listaIndicadoresMostrar}
                            loading={false}
                        /> */}
                    </Card>
                )}
            </Spin>
        </LayoutApp>
    );
};

export default FichaIndicador;