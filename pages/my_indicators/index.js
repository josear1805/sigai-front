import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import LayoutApp from 'src/components/layout';
import dynamic from 'next/dynamic'
import { Row, Col, Card, Select, Spin, Button, Tooltip, notification } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import axios from 'axios';
import Link from 'next/link'
import { enviroments } from 'src/config/enviroments';

const ChartColumn = dynamic(() => import('src/components/charts/column'), { ssr: false })

const initialState = {
    loading: true,
    listaGerencias: [],
    auxListaGerencias: [],
    listaVicePresidencias: [],
    vicePresidencia: 0,
    gerencia: 0,
    listaIndicadoresMostrar: [],
    listaIndicadores: [],
    datosIndicador1: [],
    datosIndicador2: [],
    datosIndicador3: [],
    datosIndicador4: [],
}

const MyIndicators = () => {
    const { dataUser } = useSelector((stateData) => stateData.global)
    const { id_usuario, id_perfil } = dataUser;

    const navigation = [
        {
            key: '1',
            path: `/my_indicators`,
            breadcrumbName: 'Mis Indicadores',
        }
    ]

    const [state, setState] = useState(initialState);

    const handleGetListaVPGerencia = async () => {
        const response = await axios.post(`${enviroments.api}/indican/listavpgerencia.php`, { id_usuario, id_perfil })
        const { Estatus, ListaGerencias, ListaVicePresidencias } = response.data

        if (Estatus === 1) {
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
        const response = await axios.post(`${enviroments.api}/indican/listagraficosgerencia.php`, { id_usuario, id_perfil, id_gerencia })
        const { Estatus, ListaIndicadores, ListaIndicadoresMostrar } = response.data

        if (Estatus === 1) {
            handleGetGrafics(1, ListaIndicadoresMostrar[0].id_indicador)
            handleGetGrafics(2, ListaIndicadoresMostrar[1].id_indicador)
            handleGetGrafics(3, ListaIndicadoresMostrar[2].id_indicador)
            handleGetGrafics(4, ListaIndicadoresMostrar[3].id_indicador)
            setState((prevState) => ({
                ...prevState,
                loading: false,
                listaIndicadores: ListaIndicadores,
                listaIndicadoresMostrar: ListaIndicadoresMostrar,
            }))
        } else {
            notification.error({
                message: 'Ha ocurrido un error interno, por favor intente nuevamente!',
                placement: 'bottomRight',
            });
        }

    }

    const handleGetGrafics = async (grafica, id_indicador, anio = 2021) => {
        let auxDataInd = []
        const response = await axios.get(`${enviroments.api}/indican/infoindicadorgra.php?id_Indicador=${id_indicador}&anio=${anio}`)
        if (response.data.Estatus === 1) {
            const { DatosIndicador } = response.data;
            DatosIndicador.map((item) => {
                const aux = auxDataInd
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
        if (auxLIM.length > 0 && auxLIM[grafica - 1]?.id_indicador !== id_indicador) {
            auxLIM[grafica - 1].id_indicador = id_indicador
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
            parseInt(item.id_vice_presidencia) === parseInt(id)
        )

        setState((prevState) => ({
            ...prevState,
            vicePresidencia: id,
            auxListaGerencias,
            gerencia: 0,
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
            gerencia: id
        }))
        handleGetListaGraficosGerencia(id)
    }

    useEffect(() => {
        handleGetListaVPGerencia()
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
                                        <label>Vice Presidencia</label>
                                        <Select
                                            value={state.vicePresidencia}
                                            onChange={(value) => handleChangueVicePresidencia(value)}
                                            style={{ width: "100%" }}
                                        >
                                            <Option value={0} key="0">Seleccione</Option>
                                            {
                                                state.listaVicePresidencias && state.listaVicePresidencias.map((item) => (
                                                    <Option value={parseInt(item.id_vice_presidencia)} key={item.id_vice_presidencia}>{item.nb_vicepresidencia}</Option>
                                                ))
                                            }
                                        </Select>
                                    </Col>

                                    <Col span={6} >
                                        <label>Gerencia</label>
                                        <Select
                                            value={state.gerencia}
                                            style={{ width: "100%" }}
                                            disabled={!state.vicePresidencia}
                                            onChange={(value) => handleChangueGerencia(value)}
                                        >
                                            <Option value={0} key="0">Seleccione</Option>
                                            {
                                                state.auxListaGerencias && state.auxListaGerencias.map((item) => (
                                                    <Option value={parseInt(item.id_gerencia)} key={item.id_gerencia}>{item.nb_gerencia}</Option>
                                                ))
                                            }
                                        </Select>
                                    </Col>

                                </Row>
                            </Card>
                        </Col>

                        {state.listaIndicadoresMostrar.length > 0 &&
                            <>
                                <Col xs={24} sm={24} md={12} >
                                    <Card className="box-shadow">
                                        <Row gutter={[24, 24]} justify="end">
                                            <Col span={10} >
                                                <Select
                                                    defaultValue={state.listaIndicadoresMostrar[0]?.id_indicador}
                                                    onChange={(value) => handleGetGrafics(1, value)}
                                                    style={{ width: "100%" }}>
                                                    <Option value={0}>Seleccione</Option>
                                                    {
                                                        state.listaIndicadores.length > 0 && state.listaIndicadores.map((item) => (
                                                            <Option value={item.id_indicador} key={item.id_indicador}>{item.nb_indicador}</Option>
                                                        ))
                                                    }
                                                </Select>
                                            </Col>
                                            <Col span={2}>
                                                <Link key={1} href="/charts/[idIndicador]" as={`/charts/${state.listaIndicadoresMostrar[0]?.id_indicador}`} passHref>
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
                                <Col xs={24} sm={24} md={12} >
                                    <Card className="box-shadow">
                                        <Row gutter={[24, 24]} justify="end">
                                            <Col span={10} >
                                                <Select
                                                    defaultValue={state.listaIndicadoresMostrar[1]?.id_indicador}
                                                    onChange={(value) => handleGetGrafics(2, value)}
                                                    style={{ width: "100%" }}>
                                                    <Option value={0}>Seleccione</Option>
                                                    {
                                                        state.listaIndicadores.length > 0 && state.listaIndicadores.map((item) => (
                                                            <Option value={item.id_indicador} key={item.id_indicador}>{item.nb_indicador}</Option>
                                                        ))
                                                    }
                                                </Select>
                                            </Col>
                                            <Col span={2}>
                                                <Link key={2} href="/charts/[idIndicador]" as={`/charts/${state.listaIndicadoresMostrar[1]?.id_indicador}`} passHref>
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
                                <Col xs={24} sm={24} md={12} >
                                    <Card className="box-shadow">
                                        <Row gutter={[24, 24]} justify="end">
                                            <Col span={10} >
                                                <Select
                                                    defaultValue={state.listaIndicadoresMostrar[2]?.id_indicador}
                                                    onChange={(value) => handleGetGrafics(3, value)}
                                                    style={{ width: "100%" }}>
                                                    <Option value={0}>Seleccione</Option>
                                                    {
                                                        state.listaIndicadores.length > 0 && state.listaIndicadores.map((item) => (
                                                            <Option value={item.id_indicador} key={item.id_indicador}>{item.nb_indicador}</Option>
                                                        ))
                                                    }
                                                </Select>
                                            </Col>
                                            <Col span={2}>
                                                <Link key={1} href="/charts/[idIndicador]" as={`/charts/${state.listaIndicadoresMostrar[2]?.id_indicador}`} passHref>
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
                                <Col xs={24} sm={24} md={12} >
                                    <Card className="box-shadow">
                                        <Row gutter={[24, 24]} justify="end">
                                            <Col span={10} >
                                                <Select
                                                    defaultValue={state.listaIndicadoresMostrar[3]?.id_indicador}
                                                    onChange={(value) => handleGetGrafics(4, value)}
                                                    style={{ width: "100%" }}>
                                                    <Option value={0}>Seleccione</Option>
                                                    {
                                                        state.listaIndicadores.length > 0 && state.listaIndicadores.map((item) => (
                                                            <Option value={item.id_indicador} key={item.id_indicador}>{item.nb_indicador}</Option>
                                                        ))
                                                    }
                                                </Select>
                                            </Col>
                                            <Col span={2}>
                                                <Link key={1} href="/charts/[idIndicador]" as={`/charts/${state.listaIndicadoresMostrar[3]?.id_indicador}`} passHref>
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
