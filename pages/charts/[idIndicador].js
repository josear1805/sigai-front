import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import LayoutApp from "src/layout";
import { Spin, Card, notification, Row, Col, Select, Form, Descriptions, Checkbox } from "antd";
import { makeRequest } from "src/helpers";
import { PageHeaderComponent, ButtonComponent, ChartColumnLine } from "@components";
import moment from "moment";

const { Option } = Select;

const ChartColumn = dynamic(() => import("src/components/charts/column"), {
    ssr: false,
});

const ChartDetails = () => {
    const router = useRouter();
    const { idIndicador } = router.query;

    const currentYear = moment().format("YYYY");

    const [loading, setLoading] = useState(false);
    const [datosIndicadorOne, setDatosIndicadorOne] = useState([]);
    const [datosIndicadorTwo, setDatosIndicadorTwo] = useState([]);
    const [years, setYears] = useState([]);
    const [nombreIndicador, setNombreIndicador] = useState("");
    const [state, setState] = useState({
        compare: false,
        filterOne: {
            disabled: true,
            year: currentYear,
            type: 2
        },
        filterTwo: {
            disabled: true,
            year: currentYear,
            type: 1
        }
    })
    const [totales, setTotales] = useState({
        totalAnualMetaFinancieraEjecutada: 0,
        showTotalAnualMetaFinancieraEjecutada: true,
        totalAnualMetaFinancieraPlanificada: 0,
        showTotalAnualMetaFinancieraPlanificada: true,
        totalAnualMetaOperativaEjecutada: 0,
        showTotalAnualMetaOperativaEjecutada: true,
        totalAnualMetaOperativaPlanificada: 0,
        showTotalAnualMetaOperativaPlanificada: true,
        totalAnualValorReal: 0,
        showTotalAnualValorReal: true,
        unidadMedidaFinanciera: "",
        unidadMedidaOperativa: ""
    });

    const buttonsHeader = [
        {
            type: "primary",
            name: "Comparar",
            onClick: () => handleCompartion(),
        },
        {
            type: "primary",
            name: "Volver",
            onClick: () => router.back(),
            className: "ant-btn-danger"
        },
    ];

    const navigation = [
        {
            key: "1",
            path: `/charts/${idIndicador}`,
            breadcrumbName: "Detalles Gráfica",
        },
    ];

    const handleCompartion = () => {
        setState((prevState) => ({
            ...prevState,
            compare: !state.compare
        }))
    }

    const handleGetGrafics = async () => {
        setLoading(true)
        let auxDataInd = [];
        const response = await makeRequest({
            method: "POST",
            path: "/indican/infoindicadorgra.php",
            body: {
                idIndicador,
                anio: parseInt(currentYear),
            },
        });

        if (response.estatus === 1) {
            response.datosIndicador.map((item) => {
                let aux = auxDataInd;
                auxDataInd = aux.concat(item);
            });
            setNombreIndicador(response.nbIndicador);
            auxDataInd.map(
                (item) => (item.valor = item.valor ? parseInt(item.valor) : 0)
            );
            setDatosIndicadorOne(auxDataInd);
            setDatosIndicadorTwo(auxDataInd);
            setTotales((prevState) => ({
                ...prevState,
                totalAnualMetaFinancieraEjecutada: response.totalAnualMetaFinancieraEjecutada,
                totalAnualMetaFinancieraPlanificada: response.totalAnualMetaFinancieraPlanificada,
                totalAnualMetaOperativaEjecutada: response.totalAnualMetaOperativaEjecutada,
                totalAnualMetaOperativaPlanificada: response.totalAnualMetaOperativaPlanificada,
                totalAnualValorReal: response.totalAnualValorReal,
                unidadMedidaFinanciera: response.unidadMedidaFinanciera,
                unidadMedidaOperativa: response.unidadMedidaOperativa
            }))
            handleGetList();
            setLoading(false);
        } else {
            notification.error({
                message: response.mensaje,
                placement: "bottomRight",
            });
            setLoading(false)
        }
    };

    const handleGetList = async () => {
        const response = await makeRequest({
            method: "POST",
            path: "/indican/listaanios.php",
            body: {
                idIndicador,
            },
        });

        response.estatus && setYears(response.listaAnios);
    }

    const handleGraphicFilter = async (values, chart) => {
        setState((prevState) => ({
            ...prevState,
            filterOne: {
                ...prevState.filterOne,
                disabled: true,
            },
            filterTwo: {
                ...prevState.filterTwo,
                disabled: true,
            }
        }))

        const response = await makeRequest({
            method: "POST",
            path: "/indican/infoindicadorgra.php",
            body: {
                idIndicador: values.idIndicador? values.idIndicador: idIndicador,
                anio: parseInt(values.anio),
            },
        });

        if (response.estatus === 1) {
            let auxDataInd = [];
            response.datosIndicador.map((item) => {
                let aux = auxDataInd;
                auxDataInd = aux.concat(item);
            });
            auxDataInd.map(
                (item) => (item.valor = item.valor ? parseInt(item.valor) : 0)
            );

            chart === "one" && setDatosIndicadorOne(auxDataInd);
            chart === "two" && setDatosIndicadorTwo(auxDataInd);
        } else {
            notification.error({
                message: response.mensaje,
                placement: "bottomRight",
            });
        }
    }

    const handleSetTotales = (value) => {
        setTotales((prevState) => ({
            ...prevState,
            [value]: !prevState[value]
        }))
    }

    useEffect(() => {
        idIndicador && handleGetGrafics();
    }, [idIndicador]);

    return (
        <LayoutApp>
            <PageHeaderComponent
                title={`Gráfica: ${nombreIndicador}`}
                reload={true}
                handleReload={handleGetGrafics}
                button={true}
                dataButton={buttonsHeader}
                loading={loading}
                navigation={navigation}
            >
                <Row gutter={[24, 8]}>
                    <Col xs={24} sm={12} md={8}>
                        <Col span={24}>
                            <Checkbox defaultChecked={totales.showTotalAnualMetaFinancieraPlanificada} onChange={() => handleSetTotales("showTotalAnualMetaFinancieraPlanificada")} className="m-0">
                                <strong>Meta Financiera Planificada: </strong> 
                                {totales.showTotalAnualMetaFinancieraPlanificada && `${totales.totalAnualMetaFinancieraPlanificada} ${totales.unidadMedidaFinanciera}`}
                            </Checkbox>
                        </Col>
                        <Col span={24}>
                            <Checkbox defaultChecked={totales.showTotalAnualMetaFinancieraEjecutada} onChange={() => handleSetTotales("showTotalAnualMetaFinancieraEjecutada")} className="m-0">
                                <strong>Meta Financiera Ejecutada: </strong>
                                {totales.showTotalAnualMetaFinancieraEjecutada && `${totales.totalAnualMetaFinancieraEjecutada} ${totales.unidadMedidaFinanciera}`}
                            </Checkbox>
                        </Col>
                    </Col>
                    <Col xs={24} sm={12} md={8}>
                        <Col span={24}>
                            <Checkbox defaultChecked={totales.showTotalAnualMetaOperativaPlanificada} onChange={() => handleSetTotales("showTotalAnualMetaOperativaPlanificada")} className="m-0">
                                <strong>Meta Operativa Planificada Acum.: </strong>
                                {totales.showTotalAnualMetaOperativaPlanificada && `${totales.totalAnualMetaOperativaPlanificada} ${totales.unidadMedidaOperativa}`}
                            </Checkbox>
                        </Col>
                        <Col span={24}>
                            <Checkbox defaultChecked={totales.showTotalAnualMetaOperativaEjecutada} onChange={() => handleSetTotales("showTotalAnualMetaOperativaEjecutada")} className="m-0">
                                <strong>Meta Operativa Ejecutada Acum.: </strong>
                                {totales.showTotalAnualMetaOperativaEjecutada && `${totales.totalAnualMetaOperativaEjecutada} ${totales.unidadMedidaOperativa}`}
                            </Checkbox>
                        </Col>
                    </Col>
                    <Col xs={24} sm={12} md={8}>
                        <Checkbox defaultChecked={totales.showTotalAnualValorReal} onChange={() => handleSetTotales("showTotalAnualValorReal")} className="m-0">
                            <strong>Meta Valor Real: </strong>
                            {totales.showTotalAnualValorReal && `${totales.totalAnualValorReal} ${totales.unidadMedidaOperativa}`}
                        </Checkbox>
                    </Col>
                </Row>
            </PageHeaderComponent> 

            <Spin tip="Cargando..." spinning={loading}>
                {!loading && (
                    <Row gutter={[24, 24]}>
                        <Col span={24}>
                            <Card className="box-shadow">
                                <Form
                                    layout="vertical"
                                    name="basic"
                                    initialValues={{
                                        remember: true,
                                    }}
                                    onFinish={(values) => handleGraphicFilter(values, "one")}
                                >
                                    <Row gutter={[24, 24]} justify="center">
                                        <Col xs={24} sm={12} md={3}>
                                            <Form.Item
                                                label={"Año"}
                                                name={"anio"}
                                                className="mb-0"
                                            >
                                                <Select
                                                    defaultValue={ state.filterOne.year }
                                                    onChange={(value) => setState((prevState) => ({
                                                        ...prevState,
                                                        filterOne: {
                                                            ...prevState.filterOne,
                                                            disabled: false,
                                                            year: value
                                                        }
                                                    }))}
                                                    style={{ width: "100%" }}
                                                >
                                                    {years.length >= 1 && years.map((year) => (
                                                        <Option value={year}>
                                                            {year}
                                                        </Option>
                                                    ))}
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={12} md={3}>
                                            <Form.Item
                                                label={"Periocidad"}
                                                name={"periocidad"}
                                                className="mb-0"
                                            >
                                                <Select
                                                    defaultValue={0}
                                                    onChange={(value) => console.log(value)}
                                                    style={{ width: "100%" }}
                                                >
                                                    <Option value={0}>
                                                        Seleccione
                                                    </Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={12} md={3}>
                                            <Form.Item
                                                label={"Tipo"}
                                                name={"tipo"}
                                                className="mb-0"
                                            >
                                                <Select
                                                    defaultValue={state.filterOne.type}
                                                    onChange={(value) => setState((prevState) => ({
                                                        ...prevState,
                                                        filterOne: {
                                                            ...prevState.filterOne,
                                                            type: value
                                                        }
                                                    }))}
                                                    style={{ width: "100%" }}
                                                >
                                                    <Option value={1}>Gráfica Simple</Option>
                                                    <Option value={2}>Gráfica con Línea</Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={12} md={3} style={{ paddingTop: "21px" }}>
                                            <ButtonComponent
                                                type="primary"
                                                htmlType="buttom"
                                                title="Filtrar"
                                                block
                                                disabled={state.filterOne.disabled}
                                            />
                                        </Col>
                                        <Col span={24} style={{ minHeight: state.compare ? 200: 400 }}>
                                            {state.filterOne.type === 1 && (
                                                <ChartColumn data={datosIndicadorOne} height={state.compare ? 200: 400} unidadMedidaOperativa={totales.unidadMedidaOperativa} />
                                            )}
                                            {state.filterOne.type === 2 && (
                                                <ChartColumnLine data={datosIndicadorOne} height={state.compare ? 200: 400} unidadMedidaFinanciera={totales.unidadMedidaFinanciera} unidadMedidaOperativa={totales.unidadMedidaOperativa} />
                                            )}
                                        </Col>
                                    </Row>
                                </Form>
                            </Card>
                        </Col>
                        {
                            state.compare && (
                                <Col span={24}>
                                    <Card className="box-shadow">
                                        <Form
                                            layout="vertical"
                                            name="basic"
                                            initialValues={{
                                                remember: true,
                                            }}
                                            onFinish={(values) => handleGraphicFilter(values, "two")}
                                        >
                                            <Row gutter={[24, 24]} justify="center">
                                                <Col xs={24} sm={12} md={3}>
                                                    <Form.Item
                                                        label={"Año"}
                                                        name={"anio"}
                                                        className="mb-0"
                                                    >
                                                        <Select
                                                            defaultValue={ state.filterTwo.year }
                                                            onChange={(value) => setState((prevState) => ({
                                                                ...prevState,
                                                                filterTwo: {
                                                                    ...prevState.filterTwo,
                                                                    disabled: false,
                                                                    year: value
                                                                }
                                                            }))}
                                                            style={{ width: "100%" }}
                                                        >
                                                            {years.length >= 1 && years.map((year) => (
                                                                <Option value={year}>
                                                                    {year}
                                                                </Option>
                                                            ))}
                                                        </Select>
                                                    </Form.Item>
                                                </Col>
                                                <Col xs={24} sm={12} md={3}>
                                                    <Form.Item
                                                        label={"Indicador"}
                                                        name={"indicador"}
                                                        className="mb-0"
                                                    >
                                                        <Select
                                                            defaultValue={0}
                                                            onChange={(value) => console.log(value)}
                                                            style={{ width: "100%" }}
                                                        >
                                                            <Option value={0}>
                                                                Seleccione
                                                            </Option>
                                                        </Select>
                                                    </Form.Item>
                                                </Col>
                                                <Col xs={24} sm={12} md={3}>
                                                    <Form.Item
                                                        label={"Periocidad"}
                                                        name={"periocidad"}
                                                        className="mb-0"
                                                    >
                                                        <Select
                                                            defaultValue={0}
                                                            onChange={(value) => console.log(value)}
                                                            style={{ width: "100%" }}
                                                        >
                                                            <Option value={0}>
                                                                Seleccione
                                                            </Option>
                                                        </Select>
                                                    </Form.Item>
                                                </Col>
                                                <Col xs={24} sm={12} md={3}>
                                                    <Form.Item
                                                        label={"Tipo"}
                                                        name={"tipo"}
                                                        className="mb-0"
                                                    >
                                                        <Select
                                                            defaultValue={state.filterTwo.type}
                                                            onChange={(value) => setState((prevState) => ({
                                                                ...prevState,
                                                                filterTwo: {
                                                                    ...prevState.filterTwo,
                                                                    type: value
                                                                }
                                                            }))}
                                                            style={{ width: "100%" }}
                                                        >
                                                            <Option value={1}>Gráfica Simple</Option>
                                                            <Option value={2}>Gráfica con Línea</Option>
                                                        </Select>
                                                    </Form.Item>
                                                </Col>
                                                <Col xs={24} sm={12} md={3} style={{ paddingTop: "21px" }}>
                                                    <ButtonComponent
                                                        type="primary"
                                                        htmlType="buttom"
                                                        title="Filtrar"
                                                        block
                                                        disabled={state.filterTwo.disabled}
                                                    />
                                                </Col>
                                                <Col span={24} style={{ minHeight: state.compare ? 200: 400 }}>
                                                    {state.filterTwo.type === 1 && (
                                                        <ChartColumn data={datosIndicadorTwo} height={state.compare ? 200: 400} unidadMedidaOperativa={totales.unidadMedidaOperativa} />
                                                    )}
                                                    {state.filterTwo.type === 2 && (
                                                        <ChartColumnLine data={datosIndicadorTwo} height={state.compare ? 200: 400} unidadMedidaFinanciera={totales.unidadMedidaFinanciera} unidadMedidaOperativa={totales.unidadMedidaOperativa} />
                                                    )}
                                                </Col>
                                            </Row>
                                        </Form>
                                    </Card>
                                </Col>
                            )
                        }
                    </Row>
                )}
            </Spin>

        </LayoutApp>
    );
};

export default ChartDetails;
