import React, { useEffect, useState } from 'react';
import LayoutApp from 'src/layout';
import dynamic from 'next/dynamic'
import { Row, Col, Card, Select, Spin, Button, Tooltip, notification } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import Link from 'next/link'
import { makeRequest } from 'src/helpers';
import { PageHeaderComponent, SelectCategoriasComponent } from '@components';

const { Option } = Select;

const ChartColumn = dynamic(() => import('src/components/charts/column'), { ssr: false })

const initialState = {
    loading: true,
    listaGerencias: [],
    auxListaGerencias: [],
    listaVicePresidencias: [],
    vicePresidencia: "0",
    gerencia: "0",
    listaIndicadoresMostrar: [],
    listaIndicadores: [],
    datosIndicador1: [],
    datosIndicador2: [],
    datosIndicador3: [],
    datosIndicador4: [],
}

const MyIndicators = (props) => {
    const dataUser = process.browser && JSON.parse(localStorage.getItem("user"));

    const [state, setState] = useState(initialState);
    const [loading, setLoading] = useState(false);

    const navigation = [
        {
            key: '1',
            path: `/my_indicators`,
            breadcrumbName: 'Mis Indicadores',
        }
    ]

    const handleGetListaVPGerencia = async () => {
        setLoading(true)
        const response = await makeRequest({
            method: "POST",
            path: "/indican/listavpgerencia.php",
            body: { 
                idUsuario: dataUser.id_usuario, 
                idPerfil: dataUser.id_perfil 
            }
        })

        if (response.estatus === 1) {
            const { listaGerencias, listaVicePresidencias } = response
            setState((prevState) => ({
                ...prevState,
                listaGerencias,
                listaVicePresidencias,
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

    const handleGetListaGraficosGerencia = async (id_gerencia) => {
        setLoading(true)
        const response = await makeRequest({
            method: "POST",
            path: "/indican/listagraficosgerencia.php",
            body: { 
                idUsuario: dataUser.id_usuario, 
                idPerfil: dataUser.id_perfil,
                idGerencia: id_gerencia
            }
        })
        
        if (response.estatus === 1) {
            const { listaIndicadores, listaIndicadoresMostrar } = response
            listaIndicadoresMostrar.map((item, index) => {
                handleGetGrafics(index + 1, item.idIndicador)
            })

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

    const handleGetGrafics = async (grafica, idIndicador, anio = 2021) => {
        let auxDataInd = []
        const response = await makeRequest({
            method: "POST",
            path: "/indican/infoindicadorgra.php",
            body: {
                idIndicador,
                anio
            }
        })
       
        if (response.estatus === 1) {
            const { datosIndicador } = response;
            datosIndicador.map((item) => {
                let aux = auxDataInd
                auxDataInd = aux.concat(item)
            })
        } else {
            notification.warning({
                message: 'Indicador sin data!',
                placement: 'bottomRight',
            });
            return
        }

        let auxLIM = state.listaIndicadoresMostrar
        if (auxLIM.length > 0 && auxLIM[grafica - 1]?.idIndicador != idIndicador) {
            auxLIM[grafica - 1].idIndicador = idIndicador
            setState((prevState) => ({
                ...prevState,
                listaIndicadoresMostrar: auxLIM,
            }))
        }
        auxDataInd.map((item) => item.valor = item.valor ? parseInt(item.valor) : 0)

        switch (grafica) {
            case 1:
                setState((prevState) => ({
                    ...prevState,
                    datosIndicador1: auxDataInd,
                }))
                break;

            case 2:
                setState((prevState) => ({
                    ...prevState,
                    datosIndicador2: auxDataInd,
                }))
                break;

            case 3:
                setState((prevState) => ({
                    ...prevState,
                    datosIndicador3: auxDataInd,
                }))
                break;

            case 4:
                setState((prevState) => ({
                    ...prevState,
                    datosIndicador4: auxDataInd,
                }))
                break;
        }
    };

    const handleChangueVicePresidencia = (id) => {
        const { listaGerencias } = state;
        let auxListaGerencias = listaGerencias.filter((item) =>
            item.idVicePresidencia === id
        )

        setState((prevState) => ({
            ...prevState,
            vicePresidencia: id? id: "0",
            auxListaGerencias: id? auxListaGerencias: [],
            gerencia: "0",
            listaIndicadoresMostrar: [],
            listaIndicadores: [],
            datosIndicador1: [],
            datosIndicador2: [],
            datosIndicador3: [],
            datosIndicador4: [],
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

    useEffect(() => {
        dataUser && handleGetListaVPGerencia()
    }, [])

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
                        <SelectCategoriasComponent />
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
                                {
                                    state.listaVicePresidencias && state.listaVicePresidencias.map((item) => (
                                        <Option value={item.idVicePresidencia} key={`vp-${item.idVicePresidencia}`}>{item.nbVicePresidencia}</Option>
                                    ))
                                }
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
                                {
                                    state.auxListaGerencias && state.auxListaGerencias.map((item) => (
                                        <Option value={item.idGerencia} key={`ge-${item.idGerencia}`}>{item.nbGerencia}</Option>
                                    ))
                                }
                            </Select>
                        </Col>

                        <Col span={24}>
                            <Row gutter={[24, 24]}>
                                {state.listaIndicadoresMostrar[0] &&
                                    <>
                                        <Col xs={24} sm={24} md={12} >
                                            <Card className="box-shadow">
                                                <Row gutter={[24, 24]} justify="end">
                                                    <Col xs={18} lg={10} >
                                                        <Select
                                                            defaultValue={state.listaIndicadoresMostrar[0]?.idIndicador}
                                                            onChange={(value) => handleGetGrafics(1, value)}
                                                            style={{ width: "100%" }}>
                                                            {
                                                                state.listaIndicadores.length > 0 && state.listaIndicadores.map((item) => (
                                                                    <Option value={item.idIndicador} key={item.idIndicador}>{item.nbIndicador}</Option>
                                                                ))
                                                            }
                                                        </Select>
                                                    </Col>
                                                    <Col>
                                                        <Link key={1} href="/charts/[idIndicador]" as={`/charts/${state.listaIndicadoresMostrar[0]?.idIndicador}`} passHref>
                                                            <Tooltip title="Ver gráfica">
                                                                <Button
                                                                    icon={<EyeOutlined />}
                                                                />
                                                            </Tooltip>
                                                        </Link>
                                                    </Col>
                                                    <Col span={24}>
                                                        <ChartColumn data={state.datosIndicador1} height={200} />
                                                    </Col>
                                                </Row>
                                            </Card>
                                        </Col>
                                    </>
                                }
                                {state.listaIndicadoresMostrar[1] &&
                                    <>
                                        <Col xs={24} sm={24} md={12} >
                                            <Card className="box-shadow">
                                                <Row gutter={[24, 24]} justify="end">
                                                    <Col xs={18} lg={10} >
                                                        <Select
                                                            defaultValue={state.listaIndicadoresMostrar[1]?.idIndicador}
                                                            onChange={(value) => handleGetGrafics(2, value)}
                                                            style={{ width: "100%" }}>
                                                            {
                                                                state.listaIndicadores.length > 0 && state.listaIndicadores.map((item) => (
                                                                    <Option value={item.idIndicador} key={item.idIndicador}>{item.nbIndicador}</Option>
                                                                ))
                                                            }
                                                        </Select>
                                                    </Col>
                                                    <Col>
                                                        <Link key={2} href="/charts/[idIndicador]" as={`/charts/${state.listaIndicadoresMostrar[1]?.idIndicador}`} passHref>
                                                            <Tooltip title="Ver gráfica">
                                                                <Button
                                                                    icon={<EyeOutlined />}
                                                                />
                                                            </Tooltip>
                                                        </Link>
                                                    </Col>
                                                    <Col span={24}>
                                                        <ChartColumn data={state.datosIndicador2} height={200} />
                                                    </Col>
                                                </Row>
                                            </Card>
                                        </Col>
                                    </>
                                }
                                {state.listaIndicadoresMostrar[2] &&
                                    <>
                                        <Col xs={24} sm={24} md={12} >
                                            <Card className="box-shadow">
                                                <Row gutter={[24, 24]} justify="end">
                                                    <Col xs={18} lg={10} >
                                                        <Select
                                                            defaultValue={parseInt(state.listaIndicadoresMostrar[2]?.idIndicador)}
                                                            onChange={(value) => handleGetGrafics(3, value)}
                                                            style={{ width: "100%" }}>
                                                            {
                                                                state.listaIndicadores.length > 0 && state.listaIndicadores.map((item) => (
                                                                    <Option value={item.idIndicador} key={item.idIndicador}>{item.nbIndicador}</Option>
                                                                ))
                                                            }
                                                        </Select>
                                                    </Col>
                                                    <Col>
                                                        <Link key={1} href="/charts/[idIndicador]" as={`/charts/${state.listaIndicadoresMostrar[2]?.idIndicador}`} passHref>
                                                            <Tooltip title="Ver gráfica">
                                                                <Button
                                                                    icon={<EyeOutlined />}
                                                                />
                                                            </Tooltip>
                                                        </Link>
                                                    </Col>
                                                    <Col span={24}>
                                                        <ChartColumn data={state.datosIndicador3} height={200} />
                                                    </Col>
                                                </Row>
                                            </Card>
                                        </Col>
                                    </>
                                }
                                {state.listaIndicadoresMostrar[3] &&
                                    <>
                                        <Col xs={24} sm={24} md={12} >
                                            <Card className="box-shadow">
                                                <Row gutter={[24, 24]} justify="end">
                                                    <Col xs={18} lg={10} >
                                                        <Select
                                                            defaultValue={state.listaIndicadoresMostrar[3]?.idIndicador}
                                                            onChange={(value) => handleGetGrafics(4, value)}
                                                            style={{ width: "100%" }}>
                                                            {
                                                                state.listaIndicadores.length > 0 && state.listaIndicadores.map((item) => (
                                                                    <Option value={item.idIndicador} key={item.idIndicador}>{item.nbIndicador}</Option>
                                                                ))
                                                            }
                                                        </Select>
                                                    </Col>
                                                    <Col>
                                                        <Link key={1} href="/charts/[idIndicador]" as={`/charts/${state.listaIndicadoresMostrar[3]?.idIndicador}`} passHref>
                                                            <Tooltip title="Ver gráfica">
                                                                <Button
                                                                    icon={<EyeOutlined />}
                                                                />
                                                            </Tooltip>
                                                        </Link>
                                                    </Col>
                                                    <Col span={24}>
                                                        <ChartColumn data={state.datosIndicador4} height={200} />
                                                    </Col>
                                                </Row>
                                            </Card>
                                        </Col>
                                    </>
                                }
                            </Row>
                        </Col>

                    </Row>
                </Card>

            </Spin>
        </LayoutApp>
    );
}

export default MyIndicators;
