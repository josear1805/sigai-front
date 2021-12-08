import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Row, Col, Card, Select, Tooltip, Button, Empty } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import dynamic from "next/dynamic";
import { makeRequest } from "src/helpers";

const { Option } = Select;

const ChartColumn = dynamic(() => import("../charts/column"), {
    ssr: false,
});

const ChartCardComponent = (props) => {
    const { indicadorMostrar, listaIndicadores } = props;

    const [loading, setLoading] = useState(false);
    const [year, setYear] = useState(2021);
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
                let aux = auxDatosIndicador;
                auxDatosIndicador = aux.concat(item);
            });
            auxDatosIndicador.map(
                (item) => (item.valor = item.valor ? parseInt(item.valor) : 0)
            );
            setDatosIndicador(auxDatosIndicador);
            setLoading(false);
        } else {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleGetDatosIndicador(indicadorMostrar.id_indicador, year);
    }, []);

    return (
        <Col xs={24} sm={24} md={12}>
            <Card className="box-shadow">
                <Row gutter={[24, 24]} justify="end">
                    <Col xs={18} lg={10}>
                        <Select
                            defaultValue={indicadorMostrar.id_indicador}
                            onChange={(value) =>
                                handleGetDatosIndicador(value, year)
                            }
                            style={{ width: "100%" }}
                        >
                            <Option value={0}>Seleccione</Option>
                            {listaIndicadores.length > 0 &&
                                listaIndicadores.map((item) => (
                                    <Option
                                        value={item.id_indicador}
                                        key={item.id_indicador}
                                    >
                                        {item.nb_indicador}
                                    </Option>
                            ))}
                        </Select>
                    </Col>
                    <Col>
                        <Link
                            key={1}
                            href={`/charts/${indicadorMostrar?.id_indicador}`}
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
