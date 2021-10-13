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
    Button
} from "antd";
import { makeRequest } from "src/helpers";
import { useSelector } from "react-redux";

import moment from "moment";

import { TableComponent } from "@components";

const { Text, Link } = Typography;

const GoalsEdit = (props) => {
    const dateNow = moment().format("YYYY-MM-DD");
    const router = useRouter();
    const { idIndicador } = router.query;
    const { dataUser } = useSelector((stateData) => stateData.global);
    // const dataUser = process.browser && JSON.parse(localStorage.getItem("user"));

    const [generalData, setGeneralData] = useState({});
    const [listMetas, setListMetas] = useState([]);
    const [disabled, setDisabled] = useState(true);

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
            listaMetas.map((meta) => {
                meta.disabled = true
            })
            setGeneralData(datosGenerales);
            setListMetas(listaMetas);
        } else {
            notification.error({
                message:
                    "Ha ocurrido un error interno, por favor intente nuevamente!",
                placement: "bottomRight",
            });
        }
    };

    const onChangeCasa = () => {
        console.log("dasdasd")
        let auxListMetas = listMetas;
        let fechaModDatos = generalData.fechaModDatos? generalData.fechaModDatos <= dateNow: true;
        let disabled =  generalData.fechaMaxIngresoDatos <= dateNow ? fechaModDatos : false;
        let mes = generalData.fechaModDatos? moment(generalData.fechaModDatos, "YYYY-MM-DD").format("M") : 6;

        auxListMetas.map((meta) => {
            meta.disabled = meta.idMes >= parseInt(mes)? false: true
        })
        console.log("auxListMetas", auxListMetas)
        setDisabled(false)
        setListMetas(auxListMetas);
    }

    const onChangeValue = (e, record) => {
        let { value } = e.target;
        console.log("value", value, record);
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
            render: (text, record) => {
                console.log(text, record)
                return (
                    <Input
                        placeholder="Valor"
                        defaultValue={record.valor}
                        onChange={(e) => onChangeValue(e, record)}
                        disabled={record.disabled}
                    />
                );
            },
        },
        {
            title: "Observación",
            dataIndex: "observacion",
            key: "observacion",
            render: (text, record) => {
                return (
                    <Input
                        placeholder="Observación"
                        defaultValue={record.observacion}
                        onChange={(e) => onChangeValue(e, record)}
                        disabled={record.disabled}
                    />
                );
            },
        },
    ];

    useEffect(() => {
        idIndicador && handleGetMetas(idIndicador);
    }, [idIndicador]);

    return (
        <LayoutApp navigation={navigation}>
            <Row>
                <Col>
                    <PageHeader style={{ padding: "0px" }}>
                        <Descriptions size="small" column={3}>
                            <Descriptions.Item label="Vicepresidencia">{ generalData.vicePesidencia }</Descriptions.Item>
                            <Descriptions.Item label="Gerencia">{ generalData.gerencia }</Descriptions.Item>
                            <Descriptions.Item label="Indicador">{ generalData.nombreIndicador }</Descriptions.Item>
                        </Descriptions>
                    </PageHeader>
                </Col>
                <Divider />

                <Col span={24}>
                    <Row gutter={[16, 16]} style={{ padding: "8px 6px", background: "#f5f5f5" }}>
                        <Col span={6}>
                            <b>Mes</b>
                        </Col>
                        <Col span={6}>
                            <b>Meta física planificada</b>
                        </Col>
                        <Col span={12}>
                            <b>Observación</b>
                        </Col>
                    </Row>
                    {
                        listMetas && listMetas.map((item) => (
                            <Row gutter={[16, 16]} className="div-list-metas">
                                <Col span={6}>
                                    {item.nbMes}
                                </Col>
                                <Col span={6}>
                                    <Input
                                        placeholder="Valor"
                                        defaultValue={item.valor}
                                        // onChange={(e) => onChangeValue(e, item)&}
                                        disabled={item.disabled}
                                    />
                                </Col>
                                <Col span={12}>
                                    <Input
                                        placeholder="Observación"
                                        defaultValue={item.observacion}
                                        onChange={(e) => onChangeValue(e, item)}
                                        disabled={item.disabled}
                                    />
                                </Col>
                            </Row>
                        ))
                    }
                </Col>
            </Row>
                    {/* <TableComponent
                        columns={columns}
                        data={listMetas}
                        loading={false}
                        position="none"
                        pageSize={12}
                    /> */}
            <Row gutter={[16, 16]}>
                <Divider />
                <Col span={6}>
                    <Button onClick={onChangeCasa}>
                        Modificar
                    </Button>
                </Col>
            </Row>
        </LayoutApp>
    );
};

export default GoalsEdit;
