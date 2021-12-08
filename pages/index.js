import React, { useEffect, useState } from "react";
import LayoutApp from "src/layout";
import { Row, Spin, notification } from "antd";
import { makeRequest } from "src/helpers";
import { useSelector } from "react-redux";
import { ChartCardComponent } from "@components";

const initialState = {
    listaIndicadoresMostrar: [],
    listaIndicadores: [],
};

const Home = (props) => {
    const { dataUser, loadingGeneral } = useSelector((stateData) => stateData.global);

    const [loading, setLoading] = useState(false);
    const [state, setState] = useState(initialState);

    const handleGetListaIndicadores = async () => {
        setLoading(true);
        const { idUsuario, idPerfil } = dataUser;

        const response = await makeRequest({
            method: "POST",
            path: "/indican/listagraficosasociados.php",
            body: {
                idusuario: idUsuario,
                idperfil: idPerfil,
            },
        });

        if (response.Estatus === 1) {
            const { ListaIndicadoresMostrar, ListaIndicadores } = response;
            setState((prevState) => ({
                ...prevState,
                listaIndicadores: ListaIndicadores,
                listaIndicadoresMostrar: ListaIndicadoresMostrar,
            }));
            setLoading(false);
        } else {
            notification.error({
                message: response.mensaje,
                placement: "bottomRight",
            });
            setLoading(false);
        }
    };

    useEffect(() => {
        !loadingGeneral && dataUser.idUsuario && handleGetListaIndicadores();
    }, [loadingGeneral]);

    return (
        <LayoutApp {...props}>
            <Spin tip="Cargando..." spinning={loading}>
                {!loading && (
                    <Row gutter={[24, 24]}>
                        {state.listaIndicadoresMostrar.length > 0 && state.listaIndicadoresMostrar.map((item) => (
                            <ChartCardComponent indicadorMostrar={item} listaIndicadores={state.listaIndicadores} />
                        ))}
                    </Row>
                )}
            </Spin>
        </LayoutApp>
    );
};

export default Home;
