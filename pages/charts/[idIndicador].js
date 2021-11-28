import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import LayoutApp from "src/layout";
import { Spin, Card, notification } from "antd";
import { makeRequest } from "src/helpers";
import { PageHeaderComponent } from "@components";

const ChartColumn = dynamic(() => import("src/components/charts/column"), {
    ssr: false,
});

const ChartDetails = () => {
    const router = useRouter();
    const { idIndicador } = router.query;
    const [loading, setLoading] = useState(false)

    const buttonsHeader = [
        {
            type: "primary",
            name: "Volver",
            onClick: () => router.back(),
            className: "ant-btn-danger"
        },
    ];

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
        setLoading(true)
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

    useEffect(() => {
        idIndicador && handleGetGrafics();
    }, [idIndicador]);

    return (
        <LayoutApp>
            <PageHeaderComponent
                title={`Gráfica: ${nombreIndicador}`}
                reload={true}
                handleReload={handleGetGrafics}
                button={true}
                dataButton={buttonsHeader}
                loading={loading}
                navigation={navigation}
            />
            <Card>
                <Spin tip="Cargando..." spinning={loading}>
                    <ChartColumn data={datosIndicador} height={400} />
                </Spin>
            </Card>
        </LayoutApp>
    );
};

export default ChartDetails;
