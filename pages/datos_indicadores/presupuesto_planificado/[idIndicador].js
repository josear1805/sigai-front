import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import LayoutApp from "src/layout";
import {
    Row,
    Col,
    Divider,
    PageHeader,
    Input,
    Descriptions,
    Typography,
    notification,
    Button,
    Card,
    Space,
    Tag,
    Form
} from "antd";
import { makeRequest } from "src/helpers";
import { useSelector } from "react-redux";
import { EyeOutlined, EditOutlined } from "@ant-design/icons";

import moment from "moment";

import { TableComponent, PageHeaderComponent, ButtonComponent, ModalComponet } from "@components";

const { Text, Link } = Typography;

const initialStateModalMonth = {
    show: false,
    loading: false,
    monthId: null,
};

const initialStateModalRequest = {
    show: false,
    loading: false,
    monthId: null,
};

const GoalsEdit = (props) => {
    const dateNow = moment().format("YYYY-MM-DD");
    const year = moment().format("YYYY");
    const tipoIndicador = 3;
    const monthNumber =  parseInt(moment().format("M"));
    const router = useRouter();
    const [formMonth, formRequestModification] = Form.useForm();
    const { idIndicador } = router.query;
    const { dataUser, loadingGeneral } = useSelector((stateData) => stateData.global);

    const [generalData, setGeneralData] = useState({});
    const [listMetas, setListMetas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [disabledButton, serDisabledButton] = useState(true)
    const [stateModalMonth, setStateModalMonth] = useState(initialStateModalMonth);
    const [stateModalRequest, setStateModalRequest] = useState(initialStateModalRequest);
    const [buttonsHeader, setButtonsHeader] = useState([
        {
            type: "primary",
            name: "Volver",
            href: "/datos_indicadores",
            className: "ant-btn-danger" 
        }
    ]);
    
    const navigation = [
        {
            key: "1",
            path: `/datos_indicadores`,
            breadcrumbName: "Datos de Indicadores",
        },
        {
            key: "2",
            path: `/datos_indicadores/goals/${idIndicador}`,
            breadcrumbName: "Editar meta",
        },
    ];

    const handleGetMetas = async (id) => {
        setLoading(true)
        const response = await makeRequest({
            method: "POST",
            path: "/indican/datosmetasindicador.php",
            body: {
                idIndicador: id,
                idUsuario: dataUser.idUsuario,
                tipo: tipoIndicador,
                anio: year
            },
        });

        if (response.estatus === 1) {
            const { datosGenerales, listaMetas } = response;
            let everyMonth = datosGenerales.fechaMaxIngresoDatos >= dateNow;
            let currentMonth = datosGenerales.fechaModViva && datosGenerales.fechaModDatos !== null;

            if (!everyMonth && !datosGenerales.fechaModViva && datosGenerales.fechaModDatos === null) {
                if (buttonsHeader.length === 0 ) {
                    buttonsHeader.unshift({
                        // identifier: "request_modification",
                        type: "primary",
                        name: "Solicitar Modificación",
                        onClick: () => setStateModalRequest((prevState) => ({
                            ...prevState,
                            show: true,
                        }))
                    })
                    setButtonsHeader([...buttonsHeader])
                }
            }

            listaMetas.map((meta) => {
                if (everyMonth) {
                    meta.modify = everyMonth
                } else {
                    meta.modify = currentMonth? meta.idMes >= monthNumber: false
                }
            })

            setGeneralData(datosGenerales);
            setListMetas(listaMetas);
            setLoading(false)
        } else {
            notification.error({
                message: response.mensaje,
                placement: "bottomRight",
            });
            setLoading(false)
        }
    };

    const handleClickButtonsHeader = (identifier) => {
        if (identifier === "request_modification") {
            setStateModalRequest((prevState) => ({
                ...prevState,
                show: true,
            }));
        }
    }

    const handleOpenModalMonth = (month) => {
        setStateModalMonth((prevState) => ({
            ...prevState,
            show: true,
            loading: false,
            monthId: month.idMes
        }));
        formMonth.setFieldsValue(month);
    }

    const handleSetMonth = (values) => {
        listMetas.map((meta) => {
            if (meta.idMes === stateModalMonth.monthId) {
                meta.observacion = values.observacion;
                meta.valor = values.valor;
            }
        })
        setListMetas([...listMetas]);
        serDisabledButton(false);
        handleCloseModalMonth();
    };

    const handleSendRequest = (values) => {
        setLoading(true);
        values.idUsuario = dataUser.idUsuario
        values.idIndicador = idIndicador
        values.tipo = tipoIndicador

        makeRequest({
            path: "/indican/solicitudes.php",
            method: "POST",
            body: values,
        }).then((response) => {
            if (response.estatus === 1) {
                notification.success({
                    message:"Solicitud de modificación realizada con exito!",
                    placement: "bottomRight",
                });
                handleGetMetas(idIndicador);
                setLoading(false);
            } else {
                notification.error({
                    message: response.mensaje,
                    placement: "bottomRight",
                });
                setLoading(false);
            }
        });
    }

    const handleCloseModalMonth = () => {
        formMonth.resetFields();
        setStateModalMonth(initialStateModalMonth);
    };

    const handleCloseModalRequest = () => {
        formRequestModification?.resetFields();
        setStateModalRequest(initialStateModalRequest);
    }

    const handleSaveMeta = () => {
        setLoading(true);
        let values = {
            anio: year,
            datos: listMetas,
            idIndicador,
            idTipo: tipoIndicador
        }

        makeRequest({
            path: "/indican/inclumodmetas.php",
            method: "POST",
            body: values,
        }).then((response) => {
            if (response.estatus === 1) {
                notification.success({
                    message:"Meta editada con Exito!",
                    placement: "bottomRight",
                });
                setTimeout(() => {
                    router.push("/datos_indicadores");
                }, 1000);
                setLoading(false);
            } else {
                notification.error({
                    message: response.mensaje,
                    placement: "bottomRight",
                });
                setLoading(false);
            }
        });
    };

    const columns = [
        {
            title: "Mes",
            dataIndex: "nbMes",
            key: "nbMes",
            width: "200px",
        },
        {
            title: "Valor",
            dataIndex: "valor",
            key: "valor",
            width: "150px",
        },
        {
            title: "Observación",
            dataIndex: "observacion",
            key: "observacion",
        },
        {
            title: "Acción",
            dataIndex: "id_indicador",
            key: "id_indicador",
            width: "100px",
            render: (text, record) => {
                return (
                    <Row gutter={[4, 0]} justify="space-around" align="middle">
                        <Col span={24}>
                            {
                                <Tag
                                    icon={<EditOutlined />}
                                    color={record.modify? "success": "default"}
                                    disabled={!record.modify}
                                    onClick={record.modify? () => handleOpenModalMonth(record): null}
                                    className="tag-table"
                                >
                                    Editar
                                </Tag>
                            }
                        </Col>
                    </Row>
                );
            },
        },
    ];

    // useEffect(() => {
    //     idIndicador && dataUser.idUsuario && handleGetMetas(idIndicador);
    // }, [idIndicador]);

    useEffect(() => {
        !loadingGeneral && dataUser.idUsuario && handleGetMetas(idIndicador);
    }, [loadingGeneral]);

    return (
        <LayoutApp navigation={navigation}>
            <PageHeaderComponent
                title="Presupuesto planificado"
                reload={true}
                handleReload={() => handleGetMetas(idIndicador)}
                button={true}
                dataButton={buttonsHeader}
                loading={loading}
                navigation={navigation}
                handleOnClick={handleClickButtonsHeader}
            />

            <Card>
                <Row gutter={[16, 16]} justify="space-around">
                    <Col span={24} >
                        <Space direction="vertical">
                            <Text><b>Vicepresidencia: </b> { generalData?.vicePresidencia }</Text>
                            <Text><b>Gerencia: </b> { generalData?.gerencia }</Text>
                            <Text><b>Indicador: </b> { generalData?.nombreIndicador }</Text>
                        </Space>
                    </Col>
                    <Divider className="mb-1" />
                    <Col span={24}>
                        <TableComponent
                            columns={columns}
                            data={listMetas}
                            loading={false}
                            position="none"
                            pageSize={12}
                        />
                    </Col>
                    <Divider className="mb-1" />
                    <Col xs={24} sm={12} md={6}>
                        <ButtonComponent
                            type="primary"
                            title="Guardar cambios"
                            onClick={handleSaveMeta}
                            disabled={disabledButton}
                            block
                            className="ant-btn-success"
                        />
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <ButtonComponent
                            type="primary"
                            title="Cancelar"
                            path="/datos_indicadores"
                            block
                            className="ant-btn-danger"
                        />
                    </Col>
                </Row>
            </Card>

            <ModalComponet
                show={stateModalMonth.show}
                title="Editar meta"
                width={400}
                loading={false}
                confirmButton={false}
                cancelButton={false}
                handleCancel={handleCloseModalMonth}
            >
                <Form
                    layout="vertical"
                    name="product"
                    form={formMonth}
                    onFinish={handleSetMonth}
                    style={{ margin: "0px -12px" }}
                >
                    <Row gutter={[24, 0]} justify="left" className="pl-4 pr-4">
                        <Col span={24}>
                            <Form.Item
                                label={"Valor"}
                                name={"valor"}
                                rules={[
                                    {
                                        required: true,
                                        message: "Valor requerido",
                                    },
                                ]}
                            >
                                <Input
                                    placeholder={"Valor"}
                                    type={"number"}
                                />
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Form.Item label={"Observación"} name={"observacion"}>
                                <Input.TextArea
                                    placeholder={"Observación"}
                                    type={"text"}
                                    rows={1}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={[16, 16]} justify="space-around">
                        <Col xs={24} sm={12} md={12}>
                            <ButtonComponent
                                type="primary"
                                title="Editar"
                                htmlType="submit"
                                block
                                className="ant-btn-success"
                            />
                        </Col>
                        <Col xs={24} sm={12} md={12}>
                            <ButtonComponent
                                type="primary"
                                title="Cancelar"
                                onClick={handleCloseModalMonth}
                                block
                                className="ant-btn-danger"
                            />
                        </Col>
                    </Row>
                </Form>
            </ModalComponet>

            <ModalComponet
                show={stateModalRequest.show}
                title="Solicitud de edición"
                width={400}
                loading={loading}
                confirmButton={false}
                cancelButton={false}
                handleCancel={handleCloseModalRequest}
            >
                <Form
                    layout="vertical"
                    name="product"
                    form={formRequestModification}
                    onFinish={handleSendRequest}
                    style={{ margin: "0px -12px" }}
                >
                    <Row gutter={[24, 0]} justify="left" className="pl-4 pr-4">
                        <Col span={24}>
                            <Form.Item label={"Descripción de la solicitud"} name={"observacion"}
                                rules={[
                                    {
                                        required: true,
                                        message: "Descripción requerido",
                                    },
                                ]}
                            >
                                <Input.TextArea
                                    placeholder={"Descripción de la solicitud"}
                                    type={"text"}
                                    disabled={loading}
                                    rows={2}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={[16, 16]} justify="space-around">
                        <Col xs={24} sm={12} md={12}>
                            <ButtonComponent
                                type="primary"
                                title="Solicitar"
                                htmlType="submit"
                                block
                                className="ant-btn-success"
                                loading={loading}
                            />
                        </Col>
                        <Col xs={24} sm={12} md={12}>
                            <ButtonComponent
                                type="primary"
                                title="Cancelar"
                                onClick={handleCloseModalRequest}
                                block
                                className="ant-btn-danger"
                                loading={loading}
                            />
                        </Col>
                    </Row>
                </Form>
            </ModalComponet>

        </LayoutApp>
    );
};

export default GoalsEdit;
