import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import LayoutApp from "src/layout";
import { Spin, Card, notification, Row, Col, Select, Form } from "antd";
import { makeRequest } from "src/helpers";
import { PageHeaderComponent, ButtonComponent } from "@components";

const { Option } = Select;

const ChartColumn = dynamic(() => import("src/components/charts/column"), {
    ssr: false,
});

const ChartDetails = () => {
    const router = useRouter();
    const { idIndicador } = router.query;

    const [loading, setLoading] = useState(false);
    const [datosIndicadorOne, setDatosIndicadorOne] = useState([]);
    const [datosIndicadorTwo, setDatosIndicadorTwo] = useState([]);
    const [nombreIndicador, setNombreIndicador] = useState("");
    const [state, setState] = useState({
        compare: false
    })

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
                anio: 2021,
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
            setLoading(false)
        } else {
            notification.error({
                message: response.mensaje,
                placement: "bottomRight",
            });
            setLoading(false)
        }
    };

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
            />

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
                                    // onFinish={handleGraphicFilter}
                                >
                                    <Row gutter={[24, 24]} justify="center">
                                        <Col xs={24} sm={12} md={3}>
                                            <Form.Item
                                                label={"Año"}
                                                name={"anio"}
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
                                        <Col xs={24} sm={12} md={3} style={{ paddingTop: "21px" }}>
                                            <ButtonComponent
                                                type="default"
                                                htmlType="buttom"
                                                title="Filtrar"
                                                block
                                            />
                                        </Col>
                                        <Col span={24} style={{ minHeight: state.compare ? 200: 400 }}>
                                            <ChartColumn data={datosIndicadorOne} height={state.compare ? 200: 400} />
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
                                            // onFinish={handleGraphicFilter}
                                        >
                                            <Row gutter={[24, 24]} justify="center">
                                                <Col xs={24} sm={12} md={3}>
                                                    <Form.Item
                                                        label={"Año"}
                                                        name={"anio"}
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
                                                <Col xs={24} sm={12} md={3} style={{ paddingTop: "21px" }}>
                                                    <ButtonComponent
                                                        type="default"
                                                        htmlType="buttom"
                                                        title="Filtrar"
                                                        block
                                                    />
                                                </Col>
                                                <Col span={24} style={{ minHeight: state.compare ? 200: 400 }}>
                                                    <ChartColumn data={datosIndicadorTwo} height={state.compare ? 200: 400} />
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

            {/* <Card className="mb-3" style={{ minHeight: state.compare ? 200: 400 }}>
                <ChartColumn data={datosIndicadorOne} height={state.compare ? 200: 400} />
            </Card> */}

           
        </LayoutApp>
    );
};

export default ChartDetails;
