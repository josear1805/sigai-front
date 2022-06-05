import { useState, useEffect } from "react";
import LayoutApp from "src/layout";
import { useRouter } from "next/router";
import { PageHeaderComponent, ButtonComponent } from "@components";
import { Spin, Card,
    Form,
    Col,
    Row,
    Input,
    Select,
    DatePicker,
    InputNumber,
    Cascader
 } from "antd";
import { makeRequest } from "src/helpers";
import moment from "moment";

const { Option } = Select;
const dateFormat = 'YYYY-MM-DD';
const currentDate = moment().format(dateFormat);

const FormFichaIndicadorTwo = (props) => {
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

    const options = [
        {
            value: 'zhejiang',
            label: 'Zhejiang',
            children: [
                {
                    value: 'hangzhou',
                    label: 'Hangzhou',
                },
            ],
        },
        {
            value: 'jiangsu',
            label: 'Jiangsu',
            children: [
                {
                    value: 'nanjing',
                    label: 'Nanjing',
                },
            ],
        },
    ];
    
    const onChange = (value) => {
        console.log(value);
    };

    const handleSetSubTipoIndicador = (subTiposIndicador) => {
        let aux = [
            {
                value: 1,
                label: 'Gestión',
                children: [],
            },
            {
                value: 2,
                label: 'Estratégicos',
                children: [],
            },
        ];
        let gestion = [];
        let estrategicos = [];

        subTiposIndicador.map((item) => {
            const children = {
                value: item.idSubTipoIndicador,
                label: item.nbSubTipoIndicador,
            };

            if (item.idTipoIndicador == 1) {
                gestion.push(children);
            } else {
                estrategicos.push(children);
            }
        })

        aux[0].children = gestion;
        aux[1].children = estrategicos;

        setSubTipoIndicador(aux);
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

        if (response.estatus == 2) {
            handleSetSubTipoIndicador(response.subTipoIndicador);

            setCategoriaIndicador(response.categoriaIndicador);
            setEscalasMediciones(response.escalasMediciones);
            setGerencia(response.gerencia);
            setPeriodoPublicacionDatos(response.periodoPublicacionDatos);
            setPeriodoRecoleccionDatos(response.periodoRecoleccionDatos);
            setSubTipoCobertura(response.subTipoCobertura);
            // setSubTipoIndicador(response.subTipoIndicador);
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
    }, [])

    return (
        <Card className="mb-4">
            <Form
                layout="vertical"
                name="basic"
                initialValues={{
                    remember: true,
                }}
                // onFinish={handleGuardarFicha}
                form={formFicha}
            >
                <Row gutter={[24, 16]}>
                    <Col xs={24} sm={12} md={6}>
                        <Form.Item
                            label={"Nombre"}
                            name={"nbIndicador"}
                            rules={[validations.required]}
                            className={"m-0"}
                        >
                            <Input
                                placeholder={"Nombre"}
                                type={"text"}
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <Form.Item
                            label={"Vicepresidencia"}
                            name={"idVicepresidencia"}
                            rules={[validations.required]}
                            className={"m-0"}
                        >
                            <Select placeholder="Seleccione..." disabled={loading}>
                                <Option
                                    key={0}
                                    value={0}
                                >
                                    {"dasdasd"}
                                </Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <Form.Item
                            label={"Gerencia"}
                            name={"idGerencia"}
                            rules={[validations.required]}
                            className={"m-0"}
                        >
                            <Select placeholder="Seleccione..." disabled={loading}>
                                {gerencia.length >= 1 && gerencia.map((item, key) => (
                                    <Option
                                        key={key}
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
                            label={"Categoría"}
                            name={"idCategoria"}
                            rules={[validations.required]}
                            className={"m-0"}
                        >
                            <Select placeholder="Seleccione..." disabled={loading}>
                                {categoriaIndicador.length >= 1 && categoriaIndicador.map((item, key) => (
                                    <Option
                                        key={key}
                                        value={item.idCategoria}
                                    >
                                        {item.nbCategoria}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <Form.Item
                            label={"Unidad de medida"}
                            name={"idUnidadMedicion"}
                            rules={[validations.required]}
                            className={"m-0"}
                        >
                            <Select placeholder="Seleccione..." disabled={loading}>
                                {unidadesMedicion.length >= 1 && unidadesMedicion.map((item, key) => (
                                    <Option
                                        key={key}
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
                            label={"Unidad de medida financiera"}
                            name={"idEscalaMedicion"}
                            rules={[validations.required]}
                            className={"m-0"}
                        >
                            <Select placeholder="Seleccione..." disabled={loading}>
                                
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <Form.Item
                            label={"Dias adicionales para incluir resultados"}
                            name={"diasIncResult"}
                            rules={[validations.required]}
                            className={"m-0"}
                        >
                            <InputNumber min={1} max={10} defaultValue={0} onChange={() => console.log("Closed")} style={{ width: "100%" }}/>
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <Form.Item
                            label={"Tipo de indicador"}
                            name={"idSubTipoIndicador"}
                            rules={[validations.required]}
                            className={"m-0"}
                        >
                            <Cascader options={subTipoIndicador} onChange={onChange} placeholder="Please select" />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            label={"Definición del indicador"}
                            name={"definicionIndicador"}
                            rules={[validations.required]}
                            className={"m-0"}
                        >
                            <Input.TextArea
                                placeholder={"Definición del indicador"}
                                type={"text"}
                                rows={1}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            label={"Objetivo del indicador"}
                            name={"objetivoIndicador"}
                            rules={[validations.required]}
                            className={"m-0"}
                        >
                            <Input.TextArea
                                placeholder={"Objetivo del indicador"}
                                type={"text"}
                                rows={1}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            label={"Justificación del indicador"}
                            name={"justificacionIndicador"}
                            rules={[validations.required]}
                            className={"m-0"}
                        >
                            <Input.TextArea
                                placeholder={"Justificación del indicador"}
                                type={"text"}
                                rows={1}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            label={"Metodología de Cálculo"}
                            name={"metodologiaCalculo"}
                            rules={[validations.required]}
                            className={"m-0"}
                        >
                            <Input.TextArea
                                placeholder={"Metodología de Cálculo"}
                                type={"text"}
                                rows={1}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            label={"Fórmula de Cálculo"}
                            name={"formula"}
                            rules={[validations.required]}
                            className={"m-0"}
                        >
                            <Input.TextArea
                                placeholder={"Fórmula de Cálculo"}
                                type={"text"}
                                rows={1}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            label={"Definición de conceptos involucrados en la construcción del indicador"}
                            name={"defConceptosInvol"}
                            rules={[validations.required]}
                            className={"m-0"}
                        >
                            <Input.TextArea
                                placeholder={"Definición de conceptos involucrados en la construcción del indicador"}
                                type={"text"}
                                rows={1}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            label={"Definición de conceptos"}
                            name={"defConceptosInvol"}
                            rules={[validations.required]}
                            className={"m-0"}
                        >
                            <Input.TextArea
                                placeholder={"Definición de conceptos"}
                                type={"text"}
                                rows={1}
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <Form.Item
                            label={"Período de recolección de datos"}
                            name={"idPeriodoRecDatos"}
                            rules={[validations.required]}
                            className={"m-0"}
                        >
                            <Select placeholder="Seleccione..." disabled={loading}>
                                {periodoRecoleccionDatos.length >= 1 && periodoRecoleccionDatos.map((item, key) => (
                                    <Option
                                        key={key}
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
                            label={"Período de publicación de datos"}
                            name={"idPeriodoPubDatos"}
                            rules={[validations.required]}
                            className={"m-0"}
                        >
                            <Select placeholder="Seleccione..." disabled={loading}>
                                {periodoPublicacionDatos.length >= 1 && periodoPublicacionDatos.map((item, key) => (
                                    <Option
                                        key={key}
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
                            label={"Tipo de cobertura"}
                            name={"idSubTipoCobertura"}
                            rules={[validations.required]}
                        >
                            <Cascader options={options} onChange={onChange} placeholder="Please select" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={[16, 16]} justify="space-around">
                    <Col xs={24} sm={12} md={6}>
                        <ButtonComponent
                            type="primary"
                            title="Guardar"
                            htmlType="submit"
                            block
                            className="ant-btn-success"
                        />
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <ButtonComponent
                            type="primary"
                            title="Cancelar"
                            path="/ficha_indicador"
                            block
                            className="ant-btn-danger"
                        />
                    </Col>
                </Row>
            </Form>
        </Card>
    )
};

export default FormFichaIndicadorTwo;
