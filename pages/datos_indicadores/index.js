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

const DataIndicators = () => {
    const dispatch = useDispatch();
    const { dataUser, loadingGeneral } = useSelector((stateData) => stateData.global)
    const { datosIndicador } = useSelector((stateData) => stateData);

    const [state, setState] = useState(initialState);
    const [loading, setLoading] = useState(true);

    const navigation = [
        {
            key: "1",
            path: `/datos_indicadores`,
            breadcrumbName: "Datos de Indicadores",
        },
    ];

    const columns = [
        {
            title: "Nombre",
            dataIndex: "nombreInd",
            key: "idIndicador",
            search: true,
        },
        {
            title: "Acción",
            dataIndex: "idIndicador",
            key: "idIndicador",
            search: false,
            render: (text, record) => {
                return (
                    <Row gutter={[4, 0]} justify="space-around" align="middle">
                        <Col span={4}>
                            {(record.permiso === 1 || record.permiso === 2) && (
                                <Link
                                    key={1}
                                    href={`/charts/${record.idIndicador}`}
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
                            {record.permiso === 2 && (
                                <Link
                                    key={2}
                                    href={`/datos_indicadores/meta_fisica_planificada/${record.idIndicador}`}
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
                            {record.permiso === 2 && (
                                <Link
                                    key={3}
                                    href={`/datos_indicadores/meta_fisica_ejecutada/${record.idIndicador}`}
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
                            {record.permiso === 2 && (
                                <Link
                                    key={1}
                                    href={`/datos_indicadores/presupuesto_planificado/${record.idIndicador}`}
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
                            )}
                        </Col>
                        <Col span={4}>
                            {record.permiso === 2 && (
                                <Link
                                    key={2}
                                    href={`/datos_indicadores/presupuesto_ejecutado/${record.idIndicador}`}
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
                            )}
                        </Col>
                        <Col span={4}>
                            {record.permiso === 2 && (
                                <Link
                                    key={3}
                                    href={`/datos_indicadores/real/${record.idIndicador}`}
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
                            )}
                        </Col>
                    </Row>
                );
            },
        },
    ];

    const handleGetData = async () => {
        setLoading(true)
        const { idUsuario, idPerfil } = dataUser;
        const response = await makeRequest({
            method: "POST",
            path: "/indican/listavpgmetaresul.php",
            body: {
                idUsuario,
                idPerfil,
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
            setLoading(false)
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
            (item) => item.idGerencia == idGerencia
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
        !loadingGeneral && handleSetInit();
    }, [loadingGeneral]);

    return (
        <LayoutApp navigation={navigation}>
            <PageHeaderComponent
                title="Datos de indicadores"
                reload={true}
                handleReload={handleGetData}
                button={false}
                // dataButton={buttonsHeader}
                loading={loading}
                navigation={navigation}
            >
                <Row gutter={[24, 24]}>
                    <Col xs={24} md={12} lg={6}>
                        <SelectCategoriasComponent handleSuccess={handleGetData} />
                    </Col>
                </Row>
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
                                    showSearch
                                    placeholder="Select a person"
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
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
                                    showSearch
                                    placeholder="Select a person"
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
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

export default DataIndicators;
