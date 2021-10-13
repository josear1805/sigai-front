import React, { useEffect, useState } from 'react';
import LayoutApp from 'src/layout';
import dynamic from 'next/dynamic'
import { Row, Col, Card, Select, Spin, Button, Tooltip, notification } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import Link from 'next/link'
import { makeRequest } from 'src/helpers';

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

    const navigation = [
        {
            key: '1',
            path: `/my_indicators`,
            breadcrumbName: 'Mis Indicadores',
        }
    ]

    const [state, setState] = useState(initialState);

    const handleGetListaVPGerencia = async () => {
        const response = await makeRequest({
            method: "POST",
            path: "/indican/listavpgerencia.php",
            body: { 
                idusuario: dataUser.id_usuario, 
                idperfil: dataUser.id_perfil 
            }
        })

        if (response.Estatus === 1) {
            const { ListaGerencias, ListaVicePresidencias } = response
            setState((prevState) => ({
                ...prevState,
                loading: false,
                listaGerencias: ListaGerencias,
                listaVicePresidencias: ListaVicePresidencias,
            }))
        } else {
            notification.error({
                message: 'Ha ocurrido un error interno, por favor intente nuevamente!',
                placement: 'bottomRight',
            });
        }
    }

    const handleGetListaGraficosGerencia = async (id_gerencia) => {
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

            // handleGetGrafics(1, parseInt(listaIndicadoresMostrar[0].idIndicador))
            // handleGetGrafics(2, listaIndicadoresMostrar[1].idIndicador)
            // handleGetGrafics(3, listaIndicadoresMostrar[2].idIndicador)
            // handleGetGrafics(4, listaIndicadoresMostrar[3].idIndicador)
            setState((prevState) => ({
                ...prevState,
                loading: false,
                listaIndicadores,
                listaIndicadoresMostrar,
            }))
        } else {
            notification.error({
                message: 'Ha ocurrido un error interno, por favor intente nuevamente!',
                placement: 'bottomRight',
            });
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
            notification.error({
                message: 'Ha ocurrido un error interno, por favor intente nuevamente!',
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
            item.id_vice_presidencia === id
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
        <LayoutApp navigation={navigation}>
            <Spin tip="Cargando..." spinning={state.loading}>
                {!state.loading &&
                    <Row gutter={[24, 24]}>
                        <Col span={24} >
                            <Card >
                                <Row gutter={[24, 24]} justify="start">
                                    <Col span={6} >
                                        <label>Unidad organizativa</label>
                                        <Select
                                            value={state.vicePresidencia}
                                            onChange={(value) => handleChangueVicePresidencia(value)}
                                            style={{ width: "100%" }}
                                        >
                                            <Option value="0" key="vp-0">Seleccione</Option>
                                            {
                                                state.listaVicePresidencias && state.listaVicePresidencias.map((item) => (
                                                    <Option value={item.id_vice_presidencia} key={`vp-${item.id_vice_presidencia}`}>{item.nb_vicepresidencia}</Option>
                                                ))
                                            }
                                        </Select>
                                    </Col>

                                    <Col span={6} >
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
                                                    <Option value={item.id_gerencia} key={`ge-${item.id_gerencia}`}>{item.nb_gerencia}</Option>
                                                ))
                                            }
                                        </Select>
                                    </Col>

                                </Row>
                            </Card>
                        </Col>

                        {state.listaIndicadoresMostrar[0] &&
                            <>
                                <Col xs={24} sm={24} md={12} >
                                    <Card className="box-shadow">
                                        <Row gutter={[24, 24]} justify="end">
                                            <Col span={10} >
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
                                            <Col span={2}>
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
                                            <Col span={10} >
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
                                            <Col span={2}>
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
                                            <Col span={10} >
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
                                            <Col span={2}>
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
                                            <Col span={10} >
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
                                            <Col span={2}>
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
                }
            </Spin>
        </LayoutApp>
    );
}

export default MyIndicators;
