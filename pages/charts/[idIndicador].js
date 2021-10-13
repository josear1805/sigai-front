import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import LayoutApp from "src/layout";
import { Row, Col, notification } from "antd";
import { makeRequest } from "src/helpers";

const ChartColumn = dynamic(() => import("src/components/charts/column"), {
    ssr: false,
});

const ChartDetails = () => {
    const router = useRouter();
    const { idIndicador } = router.query;

    const navigation = [
        {
            key: "1",
            path: `/charts/${idIndicador}`,
            breadcrumbName: "Detalles Gráfica",
        },
    ];

    const [datosIndicador, setDatosIndicador] = useState([]);
    const [nombreIndicador, setNombreIndicador] = useState("");

    const handleGetGrafics = async () => {
        let auxDataInd = [];
        const response = await makeRequest({
            method: "POST",
            path: "/indican/infoindicadorgra.php",
            body: {
                idIndicador,
                anio: 2021,
            },
        });

        if (response.estatus === 1) {
            response.datosIndicador.map((item) => {
                let aux = auxDataInd;
                auxDataInd = aux.concat(item);
            });
            setNombreIndicador(response.nbIndicador);
            auxDataInd.map(
                (item) => (item.valor = item.valor ? parseInt(item.valor) : 0)
            );
            setDatosIndicador(auxDataInd);
        } else {
            notification.error({
                message:
                    "Ha ocurrido un error interno, por favor intente nuevamente!",
                placement: "bottomRight",
            });
        }
    };

    useEffect(() => {
        idIndicador && handleGetGrafics();
    }, [idIndicador]);

    return (
        <LayoutApp navigation={navigation}>
            <Row gutter={[24, 24]}>
                <Col>
                    <h2>{nombreIndicador}</h2>
                </Col>

                <Col span={24}>
                    <ChartColumn data={datosIndicador} height={400} />
                </Col>
            </Row>
        </LayoutApp>
    );
};

export default ChartDetails;
