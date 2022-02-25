import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { Row, Col, Card, Select, Spin, notification } from 'antd';
import LayoutApp from 'src/layout';
import { makeRequest } from 'src/helpers';
import { PageHeaderComponent, SelectCategoriasComponent, ChartCardComponent, ButtonComponent } from '@components';

const { Option } = Select;

const initialState = {
    listaGerencias: [],
    auxListaGerencias: [],
    listaVicePresidencias: [],
    vicePresidencia: "0",
    gerencia: "0",
    listaIndicadoresMostrar: [],
    listaIndicadores: [],
}

const MyIndicators = (props) => {
    const { dataUser, loadingGeneral } = useSelector((stateData) => stateData.global)

    const [state, setState] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [showBtnComparation, setShowBtnComparation] = useState(false);

    const navigation = [
        {
            key: '1',
            path: `/mis_indicadores`,
            breadcrumbName: 'Mis Indicadores',
        }
    ]

    const handleGetListaVPGerencia = async () => {
        setShowBtnComparation(false);
        setLoading(true);
        const response = await makeRequest({
            method: "POST",
            path: "/indican/listavpgerencia.php",
            body: { 
                idUsuario: dataUser.idUsuario, 
                idPerfil: dataUser.idPerfil 
            }
        })

        if (response.estatus === 1) {
            const { listaGerencias, listaVicePresidencias } = response
            setState({
                listaGerencias,
                auxListaGerencias: [],
                listaVicePresidencias,
                vicePresidencia: "0",
                gerencia: "0",
                listaIndicadoresMostrar: [],
                listaIndicadores: [],
            })
            setLoading(false);
        } else {
            notification.error({
                message: 'Ha ocurrido un error interno, por favor intente nuevamente!',
                placement: 'bottomRight',
            });
            setLoading(false);
        }
    }

    const handleChangueVicePresidencia = (id) => {
        let auxListaGerencias = state.listaGerencias.filter((item) =>
            item.idVicePresidencia === id
        )

        setState((prevState) => ({
            ...prevState,
            vicePresidencia: id? id: "0",
            auxListaGerencias: id? auxListaGerencias: [],
            gerencia: "0",
            listaIndicadoresMostrar: [],
            listaIndicadores: [],
        }))
    }

    const handleChangueGerencia = (id) => {
        setState((prevState) => ({
            ...prevState,
            gerencia: id,
            listaIndicadoresMostrar: [],
            listaIndicadores: []
        }))
        parseInt(id) >= 1 && handleGetListaGraficosGerencia(id)
    }

    const handleGetListaGraficosGerencia = async (id_gerencia) => {
        setLoading(true)
        const response = await makeRequest({
            method: "POST",
            path: "/indican/listagraficosgerencia.php",
            body: { 
                idUsuario: dataUser.idUsuario, 
                idPerfil: dataUser.idPerfil,
                idGerencia: id_gerencia
            }
        })
        
        if (response.estatus === 1) {
            const { listaIndicadores, listaIndicadoresMostrar } = response
            setState((prevState) => ({
                ...prevState,
                listaIndicadores,
                listaIndicadoresMostrar,
            }))
            setLoading(false)
        } else {
            notification.error({
                message: 'Ha ocurrido un error interno, por favor intente nuevamente!',
                placement: 'bottomRight',
            });
            setLoading(false)
        }
    }

    const handleUpdateSelect = (posicion, idIndicador) => {
        setShowBtnComparation(true);
        state.listaIndicadoresMostrar.map((item) => {
            if (item.posicion == posicion) {
                item.idIndicador = idIndicador;
            }
        });
        setState((prevState) => ({
            ...prevState,
            listaIndicadoresMostrar: [...state.listaIndicadoresMostrar],
        }))
    }

    const handleCompartion = async () => {
        setLoading(true);
        const confIndicadorMostrar = state.listaIndicadoresMostrar.map((item) => ({
            idNumCuadro: parseInt(item.posicion),
            idIndicador: parseInt(item.idIndicador)
        }));

        const response = await makeRequest({
            method: "POST",
            path: "/indican/configcuadro.php",
            body: {
                idVistaMando: "2",
                idGerencia: dataUser.idGerencia,
                confIndicadorMostrar
            },
        });

        if (response.estatus === 1) {
            notification.success({
                message: response.mensaje,
                placement: "bottomRight",
            });
            setLoading(false);
            setShowBtnComparation(false);
        } else {
            notification.error({
                message: response.mensaje,
                placement: "bottomRight",
            });
            setLoading(false);
        }
    }

    useEffect(() => {
        !loadingGeneral && dataUser.idUsuario && handleGetListaVPGerencia()
    }, [loadingGeneral])

    return (
        <LayoutApp>
            <PageHeaderComponent
                title="Mis Indicadores"
                reload={true}
                handleReload={handleGetListaVPGerencia}
                button={false}
                loading={loading}
                navigation={navigation}
            >
                <Row gutter={[24, 24]}>
                    <Col xs={24} md={12} lg={6}>
                        <SelectCategoriasComponent handleSuccess={handleGetListaVPGerencia} />
                    </Col>
                </Row>
            </PageHeaderComponent>

            <Spin tip="Cargando..." spinning={loading}>
                <Card >
                    <Row gutter={[24, 24]} justify="start">
                        <Col xs={24} md={12} lg={6} >
                            <label>Unidad organizativa</label>
                            <Select
                                value={state.vicePresidencia}
                                onChange={(value) => handleChangueVicePresidencia(value)}
                                style={{ width: "100%" }}
                            >
                                <Option value="0" key="vp-0">Seleccione</Option>
                                {state.listaVicePresidencias && state.listaVicePresidencias.map((item) => (
                                    <Option value={item.idVicePresidencia} key={`vp-${item.idVicePresidencia}`}>{item.nbVicePresidencia}</Option>
                                ))}
                            </Select>
                        </Col>

                        <Col xs={24} md={12} lg={6} >
                            <label>Gerencia</label>
                            <Select
                                value={state.gerencia}
                                style={{ width: "100%" }}
                                disabled={state.vicePresidencia === "0"}
                                onChange={(value) => handleChangueGerencia(value)}
                            >
                                <Option value="0" key="ge-0">Seleccione</Option>
                                {state.auxListaGerencias && state.auxListaGerencias.map((item) => (
                                    <Option value={item.idGerencia} key={`ge-${item.idGerencia}`}>{item.nbGerencia}</Option>
                                ))}
                            </Select>
                        </Col>

                        {showBtnComparation && (
                            <Col xs={24} md={12} lg={12} style={{ paddingTop: "22px", textAlign: "right" }}>
                                <ButtonComponent
                                    type="primary"
                                    title="Guardar Configuración"
                                    loading={loading}
                                    onClick={handleCompartion}
                                />
                            </Col>
                        )}

                        <Col span={24}>
                            <Row gutter={[24, 24]}>
                                {state.listaIndicadoresMostrar.length > 0 && state.listaIndicadoresMostrar.map((item) => (
                                    <ChartCardComponent indicadorMostrar={item} listaIndicadores={state.listaIndicadores} handleUpdate={handleUpdateSelect} />
                                ))}
                            </Row>
                        </Col>

                    </Row>
                </Card>

            </Spin>
        </LayoutApp>
    );
}

export default MyIndicators;
