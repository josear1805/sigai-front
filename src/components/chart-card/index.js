import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Row, Col, Card, Select, Tooltip, Button, Empty } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import dynamic from "next/dynamic";
import { makeRequest } from "src/helpers";
import moment from "moment";

const { Option } = Select;

const ChartColumn = dynamic(() => import("../charts/column"), {
    ssr: false,
});

const ChartCardComponent = (props) => {
    const { indicadorMostrar, listaIndicadores, handleUpdate } = props;

    const currentYear = moment().format("YYYY");

    const [loading, setLoading] = useState(false);
    const [datosIndicador, setDatosIndicador] = useState([]);

    const handleGetDatosIndicador = async (idIndicador, anio) => {
        setLoading(true);
        const response = await makeRequest({
            method: "POST",
            path: "/indican/infoindicadorgra.php",
            body: {
                idIndicador,
                anio,
            },
        });

        if (response.estatus === 1) {
            let auxDatosIndicador = [];
            response.datosIndicador.map((item) => {
                auxDatosIndicador = auxDatosIndicador.concat(item);
            });
            auxDatosIndicador.map((item) => (item.valor = item.valor ? parseInt(item.valor) : 0));
            setDatosIndicador(auxDatosIndicador);
            setLoading(false);
        } else {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleGetDatosIndicador(indicadorMostrar.idIndicador, currentYear);
    }, []);

    return (
        <Col xs={24} sm={24} md={12}>
            <Card className="box-shadow">
                <Row gutter={[24, 24]} justify="end">
                    <Col xs={18} lg={10}>
                        <Select
                            showSearch
                            placeholder="Select a person"
                            optionFilterProp="children"
                            defaultValue={indicadorMostrar.idIndicador}
                            onChange={(value) => {
                                handleGetDatosIndicador(value, currentYear)
                                handleUpdate(indicadorMostrar.posicion, value);
                            }}
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            style={{ width: "100%" }}
                        >
                            <Option value={0}>Seleccione</Option>
                            {listaIndicadores.length > 0 &&
                                listaIndicadores.map((item) => (
                                    <Option
                                        value={item.idIndicador}
                                        key={item.idIndicador}
                                    >
                                        {item.nbIndicador}
                                    </Option>
                            ))}
                        </Select>
                    </Col>
                    <Col>
                        <Link
                            key={1}
                            href={`/charts/${indicadorMostrar?.idIndicador}`}
                        >
                            <Tooltip title="Ver gráfica">
                                <Button icon={<EyeOutlined />} />
                            </Tooltip>
                        </Link>
                    </Col>
                    <Col span={24} style={{ minHeight: 200 }}>
                        {!loading && (
                            <>
                            {datosIndicador.length >= 1 ? (

                                <ChartColumn data={datosIndicador} height={200} />
                            ): (
                                <Empty description="Gráfica sin datos" />
                            )}
                            </>
                        )}
                    </Col>
                </Row>
            </Card>
        </Col>
    );
};

export default ChartCardComponent;
