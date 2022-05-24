import { useEffect, useState } from "react";
import { ButtonComponent } from "@components";
import { Card, Checkbox, Col, Form, Input, notification, Row } from "antd";
import { makeRequest } from "src/helpers";
import { useRouter } from "next/router";

const FormPerfiles = ({ idPerfil, loading, setLoading }) => {
    const router = useRouter();
    const pathView = router.pathname;
    const [formPerfil] = Form.useForm();

    const [idPerfilCon, setIdPerfilCon] = useState(idPerfil);

    const [disabledBtnSave, setDisabledBtnSave] = useState(true);
    const [disabledCheckbox, setDisabledCheckbox] = useState(idPerfil === 0);
    const [initialValues, setInitialValues] = useState({});
    const [listaMenu, setListaMenu] = useState([]);
    const [listaIndicadores, setListaIndicadores] = useState([]);
    const [listaVistas, setListaVistas] = useState([]);

    const validations = {
        required: {
            required: true,
            message: "Campo requerido",
        },
    };

    const handleGetDatosPerfil = async () => {
        setLoading(true);
        const response = await makeRequest({
            method: "POST",
            path: "/indican/datosperfil.php",
            body: {
                idPerfilCon,
                vista: pathView,
            },
        });

        if (response.estatus == 1) {
            setListaMenu(response.menu);
            setListaVistas(response.vistas);
            setListaIndicadores(response.indicadores);

            const values = {
                nombre: response.nombrePerfil,
                descripcion: response.descripcionPerfil,
            };
            setInitialValues(values);
            idPerfilCon > 0 && formPerfil.setFieldsValue(values);
            setLoading(false);
        }

        if (response.estatus == 5) {
            notification.error({
                message: response.mensaje,
                placement: "bottomRight",
            });
            setTimeout(()=> {
                setLoading(false);
                router.push("/perfiles")
            }, 3000 )
        }
    };

    const handleGuardarPerfil = (values) => {
        setLoading(true);
        values.idPerfilCon = idPerfilCon;
        values.vista = pathView;

        makeRequest({
            path: "/indican/guardarperfil.php",
            method: "POST",
            body: values,
        }).then((response) => {
            if (response.estatus === 1) {
                notification.success({
                    message: response.mensaje,
                    placement: "bottomRight",
                });
                idPerfilCon === 0 && setIdPerfilCon(response.idPerfil);
                setDisabledCheckbox(false);
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

    const handleSetDisabledBtnSave = () => {
        const values = formPerfil.getFieldsValue();
        if (
            initialValues.nombre !== values.nombre ||
            initialValues.descripcion !== values.descripcion
        ) {
            setDisabledBtnSave(false);
        }
    };

    const handleOnChangeMenu = async (values) => {
        setLoading(true);
        const { target } = values;
        const idMenu = target.value;
        const activo = target.checked;

        const response = await makeRequest({
            method: "POST",
            path: "/indican/guardarmenuperfil.php",
            body: {
                idMenu,
                idPerfilCon,
                select: activo,
                vista: pathView,
            },
        });

        if (response.estatus === 1) {
            notification.success({
                message: response.mensaje,
                placement: "bottomRight",
            });
            const aux = listaMenu.map((item) => {
                if (item.idMenu == idMenu) {
                    item.activo = activo;
                }
                return item;
            });
            setListaMenu([...aux]);
            setLoading(false);
        } else {
            notification.error({
                message: response.mensaje,
                placement: "bottomRight",
            });
            setLoading(false);
        }
    };

    const handleOnChangeVista = async (values) => {
        setLoading(true);
        const { target } = values;
        const idVista = target.value;
        const activo = target.checked;

        const response = await makeRequest({
            method: "POST",
            path: "/indican/guardarvistasperfil.php",
            body: {
                idVista,
                idPerfilCon,
                select: activo,
                vista: pathView,
            },
        });

        if (response.estatus === 1) {
            notification.success({
                message: response.mensaje,
                placement: "bottomRight",
            });
            const aux = listaVistas.map((item) => {
                if (item.idPagina == idVista) {
                    item.activo = activo;
                }
                return item;
            });
            setListaVistas([...aux]);
            setLoading(false);
        } else {
            notification.error({
                message: response.mensaje,
                placement: "bottomRight",
            });
            setLoading(false);
        }
    };

    const handleOnChangeIndicadores = async (values) => {
        setLoading(true);
        const { target } = values;
        const idIndicador = target.value;
        const activo = target.checked;

        const response = await makeRequest({
            method: "POST",
            path: "/indican/guardarindicadoresperfil.php",
            body: {
                idIndicador,
                idPerfilCon,
                select: activo,
                vista: pathView,
            },
        });

        if (response.estatus === 1) {
            notification.success({
                message: response.mensaje,
                placement: "bottomRight",
            });
            const aux = listaIndicadores.map((item) => {
                if (item.idIndicador == idIndicador) {
                    item.activo = activo;
                }
                return item;
            });
            setListaIndicadores([...aux]);
            setLoading(false);
        } else {
            notification.error({
                message: response.mensaje,
                placement: "bottomRight",
            });
            setLoading(false);
        }
    };

    useEffect(async () => {
        handleGetDatosPerfil();
    }, []);

    return (
        <Card className="mb-4">
            <Form
                layout="vertical"
                name="basic"
                initialValues={{ remember: true }}
                onFinish={handleGuardarPerfil}
                form={formPerfil}
            >
                <Row gutter={[24, 16]}>
                    <Col xs={24} sm={24} md={6}>
                        <Form.Item
                            label={"Nombre"}
                            name={"nombre"}
                            rules={[validations.required]}
                        >
                            <Input
                                placeholder={"Nombre"}
                                type={"text"}
                                onChange={handleSetDisabledBtnSave}
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={18}>
                        <Form.Item
                            label={"Descripción"}
                            name={"descripcion"}
                            rules={[validations.required]}
                        >
                            <Input.TextArea
                                placeholder={"Descripción"}
                                type={"text"}
                                onChange={handleSetDisabledBtnSave}
                                rows={1}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={[16, 16]} justify="end">
                    <Col xs={24} sm={12} md={6} lg={4}>
                        <ButtonComponent
                            type="primary"
                            title={"Guardar"}
                            htmlType="submit"
                            disabled={disabledBtnSave}
                            block
                            className="ant-btn-success"
                        />
                    </Col>
                </Row>
            </Form>

            <Card className="mt-4">
                <label className="label-card">Menú</label>
                <Row className="overflow-200">
                    {listaMenu.length >= 1 &&
                        listaMenu.map((item, index) => (
                            <Col span={24}  key={index}>
                                <Checkbox
                                    checked={item.activo}
                                    value={item.idMenu}
                                    disabled={disabledCheckbox}
                                    onChange={handleOnChangeMenu}
                                >
                                    {item.nombreMenu}
                                </Checkbox>
                            </Col>
                        ))}
                </Row>
            </Card>

            <Card className="mt-4">
                <label className="label-card">Vista Permitidas</label>
                <Row className="overflow-200">
                    {listaVistas.length >= 1 &&
                        listaVistas.map((item, index) => (
                            <Col span={24}  key={index}>
                                <Checkbox
                                    checked={item.activo}
                                    value={item.idPagina}
                                    disabled={disabledCheckbox}
                                    onChange={handleOnChangeVista}
                                >
                                    {item.nombrePagina}
                                </Checkbox>
                            </Col>
                        ))}
                </Row>
            </Card>

            <Card className="mt-4">
                <label className="label-card">Indicadores Asociados</label>
                <Row className="overflow-200">
                    {listaIndicadores.length >= 1 &&
                        listaIndicadores.map((item, index) => (
                            <Col span={24}  key={index}>
                                <Checkbox
                                    checked={item.activo}
                                    value={item.idIndicador}
                                    disabled={disabledCheckbox}
                                    onChange={handleOnChangeIndicadores}
                                >
                                    {item.nombreIndicador}
                                </Checkbox>
                            </Col>
                        ))}
                </Row>
            </Card>
        </Card>
    );
};

export default FormPerfiles;
