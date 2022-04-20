import { useState, useEffect } from "react";
import { ButtonComponent } from "@components";
import {
    Card,
    Form,
    Col,
    Row,
    Input,
    Select,
    DatePicker,

} from "antd";
import { makeRequest } from "src/helpers";
import moment from "moment";

const { Option } = Select;
const dateFormat = 'DD-MM-YYYY';

const FormUsuarios = (props) => {
    const {
        idUsuario,
        pathView,
        loading,
        setLoading
    } = props
    const [formUser] = Form.useForm();

    const [tipoDocIdentidad, setTipoDocIdentidad] = useState([]);
    const [perfiles, setPerfiles] = useState([]);
    const [gerencias, setGerencias] = useState([]);
    const [unidadesAdministrativas, setUnidadesAdministrativas] = useState([]);

    const validations = {
        required: {
            required: true,
            message: "Campo requerido",
        },
    }

    const handleGuardarUsuario = (values) => {
        setLoading(true);
        values.idUsuario = idUsuario;
        values.vista = pathView;
        values.idJerarquia = 1;

        makeRequest({
            path: "/indican/guardardatosusuarioapp.php",
            method: "POST",
            body: values,
        }).then((response) => {
            if (response.estatus === 1) {
                notification.success({
                    message: response.mensaje,
                    placement: "bottomRight",
                });
                setTimeout(() => {
                    router.push("/usuarios");
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

    const handleGetData = async () => {
        setLoading(true);
        const response = await makeRequest({
            path: "/indican/datosusuarioapp.php",
			method: "POST",
			body: {
				vista: pathView,
                idUsuario
			}
		});

        if (response.estatus) {
            setTipoDocIdentidad(response.tipoDocIdentidad);
            setPerfiles(response.perfiles);
            setGerencias(response.gerencias);
            setUnidadesAdministrativas(response.unidadesAdministrativas);

            if (parseInt(idUsuario) > 0) {
                formUser.setFieldsValue(response.datosUsuario);
            }

            setLoading(false);
        } else {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleGetData();
        setTimeout(() => {
            setLoading(false)
        }, 5000)
    }, [])

    return (
        <Card className="mb-4">
            <Form
                layout="vertical"
                name="basic"
                initialValues={{
                    remember: true,
                }}
                onFinish={handleGuardarUsuario}
                form={formUser}
            >
                <Row gutter={[24, 16]}>
                    <Col xs={24} sm={12} md={6}>
                        <Form.Item
                            label={"Usuario"}
                            name={"nombreUsuario"}
                            rules={[validations.required]}
                        >
                            <Input
                                placeholder={"Usuario"}
                                type={"text"}
                            />
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={12} md={6}>
                        <Form.Item
                            label={"Tipo Doc. Identidad"}
                            name={"idTipoDocIdent"}
                            rules={[validations.required]}
                        >
                            <Select placeholder="Seleccione..." disabled={loading}>
                                {tipoDocIdentidad.length >= 1 && tipoDocIdentidad.map((item) => (
                                    <Option
                                        key={item.idTipoDocIdent}
                                        value={item.idTipoDocIdent}
                                    >
                                        {item.nombreTipoDocIdentidad}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={12} md={6}>
                        <Form.Item
                            label={"Doc. Identidad"}
                            name={"docIdentidad"}
                            rules={[validations.required]}
                        >
                            <Input
                                placeholder={"12345678"}
                                type={"text"}
                            />
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={12} md={6}>
                        <Form.Item
                            label={"Nombre(s)"}
                            name={"nombres"}
                            rules={[validations.required]}
                        >
                            <Input
                                placeholder={"Nombre(s)"}
                                type={"text"}
                            />
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={12} md={6}>
                        <Form.Item
                            label={"Apellido(s)"}
                            name={"apellidos"}
                            rules={[validations.required]}
                        >
                            <Input
                                placeholder={"Apellido(s)"}
                                type={"text"}
                            />
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={12} md={6}>
                        <Form.Item
                            label={"Perfil"}
                            name={"idPerfil"}
                            rules={[validations.required]}
                        >
                            <Select placeholder="Seleccione..." disabled={loading}>
                                {perfiles.length >= 1 && perfiles.map((item) => (
                                    <Option
                                        key={item.idPerfil}
                                        value={item.idPerfil}
                                    >
                                        {item.nombrePerfil}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={12} md={6}>
                        <Form.Item
                            label={"Gerencia"}
                            name={"idGerencia"}
                            rules={[validations.required]}
                        >
                            <Select placeholder="Seleccione..." disabled={loading}>
                                {gerencias.length >= 1 && gerencias.map((item) => (
                                    <Option
                                        key={item.idGerencia}
                                        value={item.idGerencia}
                                    >
                                        {item.nombreGerencia}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={12} md={6}>
                        <Form.Item
                            label={"Unidad Administratia"}
                            name={"idUnidAdmin"}
                            rules={[validations.required]}
                        >
                            <Select placeholder="Seleccione..." disabled={loading}>
                                {unidadesAdministrativas.length >= 1 && unidadesAdministrativas.map((item) => (
                                    <Option
                                        key={item.idUnidAdmin}
                                        value={item.idUnidAdmin}
                                    >
                                        {item.nombreUnidades}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={12} md={6}>
                        <Form.Item
                            label={"Fecha Nacimiento"}
                            name={"fNacimiento"}
                            rules={[validations.required]}
                        >
                            {/* <DatePicker format={"YYYY-MM-DD"} style={{ width: "100%" }} disabled={loading}/> */}
                            <Input
                                placeholder={"Seleccionar fecha"}
                                type={"date"}
                                disabled={loading}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={[16, 16]} justify="space-around">
                    <Col xs={24} sm={12} md={6}>
                        <ButtonComponent
                            type="primary"
                            title={parseInt(idUsuario) > 0 ? "Editar" : "Guardar"}
                            htmlType="submit"
                            block
                            className="ant-btn-success"
                        />
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <ButtonComponent
                            type="primary"
                            title="Cancelar"
                            path="/usuarios"
                            block
                            className="ant-btn-danger"
                        />
                    </Col>
                </Row>
            </Form>
        </Card>
    )
};

export default FormUsuarios;
