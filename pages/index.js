import React, { useEffect, useState } from "react";
import LayoutApp from "src/layout";
import { Row, Spin, notification } from "antd";
import { makeRequest } from "src/helpers";
import { useSelector } from "react-redux";
import { PageHeaderComponent, ChartCardComponent } from "@components";

const Home = (props) => {
    const { dataUser, loadingGeneral } = useSelector((stateData) => stateData.global);

    const initialButtonsHeader = [
        {
            type: "primary",
            name: "Guardar Configuración",
            disabled: true,
            onClick: () => handleCompartion(),
        }
    ];

    const [loading, setLoading] = useState(false);
    const [listaIndicadoresMostrar, setListaIndicadoresMostrar] = useState([]);
    const [listaIndicadores, setListaIndicadores] = useState([]);
    const [buttonsHeader, setButtonsHeader] = useState(initialButtonsHeader);

    const handleGetListaIndicadores = async () => {
        setLoading(true);
        const response = await makeRequest({
            method: "POST",
            path: "/indican/listagraficosasociados.php",
        });

        if (response.estatus === 1) {
            setListaIndicadores(response.listaIndicadores);
            setListaIndicadoresMostrar(response.listaIndicadoresMostrar);
            setLoading(false);
        } else {
            notification.error({
                message: response.mensaje,
                placement: "bottomRight",
            });
            setLoading(false);
        }
    };

    const handleUpdate = (posicion, idIndicador) => {
        initialButtonsHeader[0].disabled = false;
        setButtonsHeader([...initialButtonsHeader]);
        listaIndicadoresMostrar.map((item) => {
            if (item.posicion == posicion) {
                item.idIndicador = idIndicador;
            }
        });
        setListaIndicadoresMostrar([...listaIndicadoresMostrar]);
    }

    const handleCompartion = async () => {
        setLoading(true);
        const confIndicadorMostrar = listaIndicadoresMostrar.map((item) => ({
            idNumCuadro: parseInt(item.posicion),
            idIndicador: parseInt(item.idIndicador)
        }));

        const response = await makeRequest({
            method: "POST",
            path: "/indican/configcuadro.php",
            body: {
                idVistaMando: "1",
                idGerencia: 0,
                confIndicadorMostrar
            },
        });

        if (response.estatus === 1) {
            notification.success({
                message: response.mensaje,
                placement: "bottomRight",
            });
            setLoading(false);
        } else {
            notification.error({
                message: response.mensaje,
                placement: "bottomRight",
            });
            setLoading(false);
        }
    }

    useEffect(() => {
        !loadingGeneral && dataUser.idUsuario && handleGetListaIndicadores();
    }, [loadingGeneral]);

    return (
        <LayoutApp {...props}>
            <PageHeaderComponent
                title={""}
                reload={false}
                button={true}
                dataButton={buttonsHeader}
                loading={loading}
                navigation={false}
            />

            <Spin tip="Cargando..." spinning={loading}>
                {!loading && (
                    <Row gutter={[24, 24]}>
                        {listaIndicadoresMostrar.length > 0 && listaIndicadoresMostrar.map((item) => (
                            <ChartCardComponent indicadorMostrar={item} listaIndicadores={listaIndicadores} handleUpdate={handleUpdate} />
                        ))}
                    </Row>
                )}
            </Spin>
        </LayoutApp>
    );
};

export default Home;
