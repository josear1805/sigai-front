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

const FormFichaIndicador = (props) => {
    const {
        idFicha,
        loading,
        setLoading
    } = props
    const [formFicha] = Form.useForm();

    const year = moment().format("YYYY");

    const [categoriaIndicador, setCategoriaIndicador] = useState([]);
    const [escalasMediciones, setEscalasMediciones] = useState({});
    const [gerencia, setGerencia] = useState([]);
    const [periodoPublicacionDatos, setPeriodoPublicacionDatos] = useState([]);
    const [periodoRecoleccionDatos, setPeriodoRecoleccionDatos] = useState([]);
    const [subTipoCobertura, setSubTipoCobertura] = useState([]);
    const [subTipoIndicador, setSubTipoIndicador] = useState([]);
    const [unidadesMedicion, setUnidadesMedicion] = useState([]);

    const validations = {
        required: {
            required: true,
            message: "Campo requerido",
        },
    }

    const handleGuardarFicha = (values) => {
        setLoading(true);
        values.idIndicador = idFicha
        console.log("values", values)

        makeRequest({
            path: "/indican/inclumodfichaindicador.php",
            method: "POST",
            body: values,
        }).then((response) => {
            if (response.estatus === 1) {
                notification.success({
                    message: response.mensaje,
                    placement: "bottomRight",
                });
                setTimeout(() => {
                    router.push("/ficha_indicador");
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
            method: "POST",
            path: "/indican/fichaindicador.php",
            body: {
                idUsuario: "1",
                idIndicador: idFicha,
                idTipo: 1,
                anio: year
            },
        });

        if (response.estatus) {
            setCategoriaIndicador(response.categoriaIndicador);
            setEscalasMediciones(response.escalasMediciones);
            setGerencia(response.gerencia);
            setPeriodoPublicacionDatos(response.periodoPublicacionDatos);
            setPeriodoRecoleccionDatos(response.periodoRecoleccionDatos);
            setSubTipoCobertura(response.subTipoCobertura);
            setSubTipoIndicador(response.subTipoIndicador);
            setUnidadesMedicion(response.unidadesMedicion);
            formFicha.setFieldsValue({
                idIndicador: response.ficha.idIndicador,
                nbIndicador: response.ficha.nbIndicador,
                operacionEstadistica: response.ficha.operacionEstadistica,
                idSubTipoIndicador: response.ficha.idSubTipoIndicador,
                idEscalaMedicion: response.ficha.idEscalaMedicion,
                definicionIndicador: response.ficha.definicionIndicador,
                objetivoIndicador: response.ficha.objetivoIndicador,
                justificacionIndicador: response.ficha.justificacionIndicador,
                metodologiaCalculo: response.ficha.metodologiaCalculo,
                formula: response.ficha.formula,
                defConceptosInvol: response.ficha.defConceptosInvol,
                idUnidadMedicion: response.ficha.idUnidadMedicion,
                interpretacionIndicador: response.ficha.interpretacionIndicador,
                idPeriodoRecDatos: response.ficha.idPeriodoRecDatos,
                idPeriodoPubDatos: response.ficha.idPeriodoPubDatos,
                idGerencia: response.ficha.idGerencia,
                idSubTipoCobertura: response.ficha.idSubTipoCobertura,
                fechaMaxMeta: moment(response.ficha.fechaMaxMeta || currentDate, dateFormat),
                diasIncResult: response.ficha.diasIncResult,
                idCategoria: response.ficha.idCategoria,
                permiso: response.ficha.permiso,
            });
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
                onFinish={handleGuardarFicha}
                form={formFicha}
            >
                <Row gutter={[24, 16]}>
                    <Col xs={24} sm={12} md={6}>
                        <Form.Item
                            label={"Def Conceptos Invol"}
                            name={"defConceptosInvol"}
                            rules={[validations.required]}
                        >
                            <Input
                                placeholder={"Def Conceptos Invol"}
                                type={"text"}
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <Form.Item
                            label={"Definicion Indicador"}
                            name={"definicionIndicador"}
                            rules={[validations.required]}
                        >
                            <Input
                                placeholder={"Definicion Indicador"}
                                type={"text"}
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <Form.Item
                            label={"Dias Inc Result"}
                            name={"diasIncResult"}
                            rules={[validations.required]}
                        >
                            <Input
                                placeholder={"Dias Inc Result"}
                                type={"number"}
                            />
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
                    <Col xs={24} sm={12} md={6}>
                        <Form.Item
                            label={"Formula"}
                            name={"formula"}
                            rules={[validations.required]}
                        >
                            <Input
                                placeholder={"Formula"}
                                type={"text"}
                            />
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={12} md={6}>
                        <Form.Item
                            label={"Categoría"}
                            name={"idCategoria"}
                            rules={[validations.required]}
                        >
                            <Select placeholder="Seleccione..." disabled={loading}>
                                {categoriaIndicador.length >= 1 &&
                                    categoriaIndicador.map((item) => (
                                        <Option
                                            key={item.idCategoria}
                                            value={item.idCategoria}
                                        >
                                            {item.nbCategoria}
                                        </Option>
                                    ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    {/* <Col xs={24} sm={12} md={6}>
                        <Form.Item
                            label={"Categoría"}
                            name={"idEscalaMedicion"}
                            rules={[validations.required]}
                        >
                            <Select placeholder="Seleccione..." disabled={loading}>
                                {escalasMediciones.length >= 1 &&
                                    escalasMediciones.map((item) => (
                                        <Option
                                            key={item.idCategoria}
                                            value={item.idCategoria}
                                        >
                                            {item.nbCategoria}
                                        </Option>
                                    ))}
                            </Select>
                        </Form.Item>
                    </Col> */}
                        <Col xs={24} sm={12} md={6}>
                        <Form.Item
                            label={"Gerencia"}
                            name={"idGerencia"}
                            rules={[validations.required]}
                        >
                            <Select placeholder="Seleccione..." disabled={loading}>
                                {gerencia.length >= 1 &&
                                    gerencia.map((item) => (
                                        <Option
                                            key={item.idGerencia}
                                            value={item.idGerencia}
                                        >
                                            {item.nbGerencia}
                                        </Option>
                                    ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <Form.Item
                            label={"Periodo Pub Datos"}
                            name={"idPeriodoPubDatos"}
                            rules={[validations.required]}
                        >
                            <Select placeholder="Seleccione..." disabled={loading}>
                                {periodoPublicacionDatos.length >= 1 &&
                                    periodoPublicacionDatos.map((item) => (
                                        <Option
                                            key={item.idPeriodoPubDatos}
                                            value={item.idPeriodoPubDatos}
                                        >
                                            {item.nbPeriodoPubDatos}
                                        </Option>
                                    ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <Form.Item
                            label={"Periodo Rec Datos"}
                            name={"idPeriodoRecDatos"}
                            rules={[validations.required]}
                        >
                            <Select placeholder="Seleccione..." disabled={loading}>
                                {periodoRecoleccionDatos.length >= 1 &&
                                    periodoRecoleccionDatos.map((item) => (
                                        <Option
                                            key={item.idPeriodoRecDatos}
                                            value={item.idPeriodoRecDatos}
                                        >
                                            {item.nbPeriodoRecDatos}
                                        </Option>
                                    ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <Form.Item
                            label={"Sub Tipo Cobertura"}
                            name={"idSubTipoCobertura"}
                            rules={[validations.required]}
                        >
                            <Select placeholder="Seleccione..." disabled={loading}>
                                {subTipoCobertura.length >= 1 &&
                                    subTipoCobertura.map((item) => (
                                        <Option
                                            key={item.idSubTipoCobertura}
                                            value={item.idSubTipoCobertura}
                                        >
                                            {item.subTipoCobertura}
                                        </Option>
                                    ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <Form.Item
                            label={"Sub Tipo Indicador"}
                            name={"idSubTipoIndicador"}
                            rules={[validations.required]}
                        >
                            <Select placeholder="Seleccione..." disabled={loading}>
                                {subTipoIndicador.length >= 1 &&
                                    subTipoIndicador.map((item) => (
                                        <Option
                                            key={item.idSubTipoIndicador}
                                            value={item.idSubTipoIndicador}
                                        >
                                            {item.nbSubTipoIndicador}
                                        </Option>
                                    ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <Form.Item
                            label={"Unidad Medicion"}
                            name={"idUnidadMedicion"}
                            rules={[validations.required]}
                        >
                            <Select placeholder="Seleccione..." disabled={loading}>
                                {unidadesMedicion.length >= 1 &&
                                    unidadesMedicion.map((item) => (
                                        <Option
                                            key={item.idUnidadMedicion}
                                            value={item.idUnidadMedicion}
                                        >
                                            {item.unidadMedicion}
                                        </Option>
                                    ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <Form.Item
                            label={"Interpretacion Indicador"}
                            name={"interpretacionIndicador"}
                            rules={[validations.required]}
                        >
                            <Input
                                placeholder={"Interpretacion Indicador"}
                                type={"text"}
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <Form.Item
                            label={"Justificacion Indicador"}
                            name={"justificacionIndicador"}
                            rules={[validations.required]}
                        >
                            <Input
                                placeholder={"Justificacion Indicador"}
                                type={"text"}
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <Form.Item
                            label={"Metodologia Calculo"}
                            name={"metodologiaCalculo"}
                            rules={[validations.required]}
                        >
                            <Input
                                placeholder={"Metodologia Calculo"}
                                type={"text"}
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <Form.Item
                            label={"Nombre Indicador"}
                            name={"nbIndicador"}
                            rules={[validations.required]}
                        >
                            <Input
                                placeholder={"Nombre Indicador"}
                                type={"text"}
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <Form.Item
                            label={"Objetivo Indicador"}
                            name={"objetivoIndicador"}
                            rules={[validations.required]}
                        >
                            <Input
                                placeholder={"Objetivo Indicador"}
                                type={"text"}
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <Form.Item
                            label={"Operacion Estadistica"}
                            name={"operacionEstadistica"}
                            rules={[validations.required]}
                        >
                            <Input
                                placeholder={"Operacion Estadistica"}
                                type={"text"}
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <Form.Item
                            label={"Permiso"}
                            name={"permiso"}
                            rules={[validations.required]}
                        >
                            <Input
                                placeholder={"Permiso"}
                                type={"number"}
                            />
                        </Form.Item>
                    </Col>
                
                </Row>

                <Row gutter={[16, 16]} justify="space-around">
                    <Col xs={24} sm={12} md={6}>
                        <ButtonComponent
                            type="primary"
                            title={parseInt(idFicha) > 0 ? "Editar" : "Guardar"}
                            htmlType="submit"
                            block
                            className="ant-btn-success"
                        />
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <ButtonComponent
                            type="primary"
                            title="Cancelar"
                            onClick={() => console.log("Closed")}
                            block
                            className="ant-btn-danger"
                        />
                    </Col>
                </Row>

            </Form>
            
        </Card>
    )
};

export default FormFichaIndicador;
