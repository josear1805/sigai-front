import { useState, useEffect } from "react";
import LayoutApp from "src/layout";
import { useRouter } from "next/router";
import { PageHeaderComponent, ButtonComponent } from "@components";
import {
    Spin,
    Card,
    Form,
    Col,
    Row,
    Input,
    Select,
    DatePicker
} from "antd";
import { makeRequest } from "src/helpers";
import moment from "moment";

const { Option } = Select;
const dateFormat = 'YYYY-MM-DD';
const currentDate = moment().format(dateFormat);

const FormUsuarios = (props) => {
    const {
        idUsuario,
        loading,
        setLoading
    } = props
    const [formUser] = Form.useForm();

    const year = moment().format("YYYY");

    const validations = {
        required: {
            required: true,
            message: "Campo requerido",
        },
    }

    const handleGuardarFicha = (values) => {
        // setLoading(true);
        // values.idIndicador = idUsuario
        // console.log("values", values)

        // makeRequest({
        //     path: "/indican/inclumodfichaindicador.php",
        //     method: "POST",
        //     body: values,
        // }).then((response) => {
        //     if (response.estatus === 1) {
        //         notification.success({
        //             message: response.mensaje,
        //             placement: "bottomRight",
        //         });
        //         setTimeout(() => {
        //             router.push("/ficha_indicador");
        //         }, 1000);
        //         setLoading(false);
        //     } else {
        //         notification.error({
        //             message: response.mensaje,
        //             placement: "bottomRight",
        //         });
        //         setLoading(false);
        //     }
        // });

        
    };

    // const handleGetData = async () => {
    //     setLoading(true);
    //     const response = await makeRequest({
    //         method: "POST",
    //         path: "/indican/fichaindicador.php",
    //         body: {
    //             idUsuario: "1",
    //             idIndicador: idUsuario,
    //             idTipo: 1,
    //             anio: year
    //         },
    //     });

    //     if (response.estatus) {

    //         setLoading(false);
    //     } else {
    //         setLoading(false);
    //     }
    // };

    useEffect(() => {
        // handleGetData();
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
                onFinish={handleGuardarFicha}
                form={formUser}
            >
                <Row gutter={[24, 16]}>
                    <Col xs={24} sm={12} md={6}>
                        <Form.Item
                            label={"Usuario"}
                            name={"usuario"}
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
                            name={"tipoDoc"}
                            rules={[validations.required]}
                        >
                            <Select placeholder="Seleccione..." disabled={loading}>
                                {/* {categoriaIndicador.length >= 1 &&
                                    categoriaIndicador.map((item) => (
                                        <Option
                                            key={item.idCategoria}
                                            value={item.idCategoria}
                                        >
                                            {item.nbCategoria}
                                        </Option>
                                    ))} */}
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={12} md={6}>
                        <Form.Item
                            label={"Doc. Identidad"}
                            name={"doc"}
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
                            name={"apellido"}
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
                            name={"perfil"}
                            rules={[validations.required]}
                        >
                            <Select placeholder="Seleccione..." disabled={loading}>
                                {/* {categoriaIndicador.length >= 1 &&
                                    categoriaIndicador.map((item) => (
                                        <Option
                                            key={item.idCategoria}
                                            value={item.idCategoria}
                                        >
                                            {item.nbCategoria}
                                        </Option>
                                    ))} */}
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={12} md={6}>
                        <Form.Item
                            label={"Gerencia"}
                            name={"gerencia"}
                            rules={[validations.required]}
                        >
                            <Select placeholder="Seleccione..." disabled={loading}>
                                {/* {categoriaIndicador.length >= 1 &&
                                    categoriaIndicador.map((item) => (
                                        <Option
                                            key={item.idCategoria}
                                            value={item.idCategoria}
                                        >
                                            {item.nbCategoria}
                                        </Option>
                                    ))} */}
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={12} md={6}>
                        <Form.Item
                            label={"Unidad Administratia"}
                            name={"unidadAdministrativa"}
                            rules={[validations.required]}
                        >
                            <Select placeholder="Seleccione..." disabled={loading}>
                                {/* {categoriaIndicador.length >= 1 &&
                                    categoriaIndicador.map((item) => (
                                        <Option
                                            key={item.idCategoria}
                                            value={item.idCategoria}
                                        >
                                            {item.nbCategoria}
                                        </Option>
                                    ))} */}
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={12} md={6}>
                        <Form.Item
                            label={"Fecha Max Meta"}
                            name={"fechaMaxMeta"}
                            rules={[validations.required]}
                        >
                            <DatePicker format={dateFormat} style={{ width: "100%" }} disabled={loading}/>
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
                            // onClick={() => console.log("Closed")}
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
