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

const GoalsEdit = (props) => {
    const dateNow = moment().format("YYYY-MM-DD");
    const monthNumber =  parseInt(moment().format("M"));
    const router = useRouter();
    const [formMonth] = Form.useForm();
    const { idIndicador } = router.query;
    const { dataUser } = useSelector((stateData) => stateData.global);
    // const dataUser = process.browser && JSON.parse(localStorage.getItem("user"));

    const [generalData, setGeneralData] = useState({});
    const [listMetas, setListMetas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [disabledButton, serDisabledButton] = useState(true)
    const [buttonsHeader, setButtonsHeader] = useState([{
        identifier: "request_modification",
        type: "primary",
        name: "Solicitar Modificación",
    }]);
    const [stateModalMonth, setStateModalMonth] = useState(initialStateModalMonth);

    const navigation = [
        {
            key: "1",
            path: `/indicator_data`,
            breadcrumbName: "Datos de Indicadores",
        },
        {
            key: "2",
            path: `/indicator_data/goals/${idIndicador}`,
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
                idUsuario: dataUser.id_usuario,
            },
        });

        if (response.estatus === 1) {
            const { datosGenerales, listaMetas } = response;
            let everyMonth = datosGenerales.fechaMaxIngresoDatos >= dateNow;
            let currentMonth = datosGenerales.fechaModViva && datosGenerales.fechaModDatos !== null;

            if (!everyMonth && !datosGenerales.fechaModViva && datosGenerales.fechaModDatos === null) {
                // buttonsHeader.push({
                //     identifier: "request_modification",
                //     type: "primary",
                //     name: "Solicitar Modificación",
                // })
                // setButtonsHeader([...buttonsHeader])
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
                message:
                "Ha ocurrido un error interno, por favor intente nuevamente!",
                placement: "bottomRight",
            });
            setLoading(false)
        }
    };

    const handleClickButtonsHeader = (identifier) => {
        console.log("ESTO ES UNA PRUEBA", identifier)
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

    const handleCloseModalMonth = () => {
        formMonth.resetFields();
        setStateModalMonth(initialStateModalMonth);
    };

    const handleSaveMeta = () => {
        setLoading(true);
        let values = {
            idUsuario: dataUser.id_usuario,
            idIndicador,
            datos: listMetas
        }
        console.log(values)

        makeRequest({
            path: "/indican/inclumodmetas.php",
            method: "POST",
            body: values,
        }).then((response) => {
            console.log("response", response)
            if (response.estatus === 1) {
                notification.success({
                    message:"Meta editada con Exito!",
                    placement: "bottomRight",
                });
                setTimeout(() => {
                    router.push("/indicator_data");
                }, 1000);
                setLoading(false);
            } else {
                notification.error({
                    message:
                    "Ha ocurrido un error interno, por favor intente nuevamente!",
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

    useEffect(() => {
        idIndicador && handleGetMetas(idIndicador);
    }, [idIndicador]);

    return (
        <LayoutApp navigation={navigation}>
            <PageHeaderComponent
                title="Meta física planificada"
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
                            path="/indicator_data"
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

        </LayoutApp>
    );
};

export default GoalsEdit;
