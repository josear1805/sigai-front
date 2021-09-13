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

const { Option } = Select;

const initialState = {
    loading: true,
    ListaIndicadoresMostrar: [],
    ListaIndicadores: [],
    DatosIndicador1: [],
    DatosIndicador2: [],
    DatosIndicador3: [],
    DatosIndicador4: [],
}

const Home = () => {

    const { dataUser } = useSelector((stateData) => stateData.global)
    const { id_usuario, id_perfil } = dataUser;
    const [state, setState] = useState(initialState);

    const handleGetListaIndicadores = async () => {
        const response = await axios.get(`${enviroments.api}/indican/listagraficosasociados.php?id_Usuario=${id_usuario}&id_Perfil=${id_perfil}`)

        if (response.data.Estatus === 1) {
            const { ListaIndicadoresMostrar, ListaIndicadores } = response.data;
            handleGetGrafics(1, ListaIndicadoresMostrar[0].id_indicador)
            handleGetGrafics(2, ListaIndicadoresMostrar[1].id_indicador)
            handleGetGrafics(3, ListaIndicadoresMostrar[2].id_indicador)
            handleGetGrafics(4, ListaIndicadoresMostrar[3].id_indicador)
            setState((prevState) => ({
                ...prevState,
                loading: false,
                ListaIndicadores: ListaIndicadores,
                ListaIndicadoresMostrar: ListaIndicadoresMostrar,
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
        }
        
        let auxLIM = state.ListaIndicadoresMostrar
        if (auxLIM.length > 0 && auxLIM[grafica - 1]?.id_indicador !== id_indicador) {
            auxLIM[grafica - 1].id_indicador = id_indicador
            setState((prevState) => ({
                ...prevState,
                ListaIndicadoresMostrar: auxLIM,
            }))
        }
        auxDataInd.map((item) => item.valor = item.valor? parseInt(item.valor): 0)

        switch (grafica) {
            case 1:
                setState((prevState) => ({
                    ...prevState,
                    DatosIndicador1: auxDataInd,
                }))
                break;

            case 2:
                setState((prevState) => ({
                    ...prevState,
                    DatosIndicador2: auxDataInd,
                }))
                break;

            case 3:
                setState((prevState) => ({
                    ...prevState,
                    DatosIndicador3: auxDataInd,
                }))
                break;

            case 4:
                setState((prevState) => ({
                    ...prevState,
                    DatosIndicador4: auxDataInd,
                }))
                break;
        }
    };

    useEffect(() => {
        handleGetListaIndicadores()
    }, [])

    return (
        <LayoutApp>
            <Spin tip="Cargando..." spinning={state.loading}>
                {!state.loading &&
                    <Row gutter={[24, 24]}>
                        <Col xs={24} sm={24} md={12} >
                            <Card className="box-shadow">
                                <Row gutter={[24, 24]} justify="end">
                                    <Col span={10} >
                                        <Select defaultValue={state.ListaIndicadoresMostrar[0]?.id_indicador} onChange={(value) => handleGetGrafics(1, value)} style={{ width: "100%" }}>
                                            <Option value={0}>Seleccione</Option>
                                            {
                                                state.ListaIndicadores.length > 0 && state.ListaIndicadores.map((item) => (
                                                    <Option value={item.id_indicador} key={item.id_indicador}>{item.nb_indicador}</Option>
                                                ))
                                            }
                                        </Select>
                                    </Col>
                                    <Col span={2}>
                                        <Link key={1} href="/charts/[idIndicador]" as={`/charts/${state.ListaIndicadoresMostrar[0]?.id_indicador}`} passHref>
                                            <a>
                                                <Tooltip title="Ver gráfica">
                                                    <Button
                                                        icon={<EyeOutlined />}
                                                    />
                                                </Tooltip>
                                            </a>
                                        </Link>
                                    </Col>
                                    <Col span={24}>
                                        <ChartColumn data={state.DatosIndicador1} height={200} />
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                        <Col xs={24} sm={24} md={12} >
                            <Card className="box-shadow">
                                <Row gutter={[24, 24]} justify="end">
                                    <Col span={10} >
                                        <Select 
                                            defaultValue={state.ListaIndicadoresMostrar[1]?.id_indicador}
                                            onChange={(value) => handleGetGrafics(2, value)}
                                            style={{ width: "100%" }}>
                                            <Option value={0}>Seleccione</Option>
                                            {
                                                state.ListaIndicadores.length > 0 && state.ListaIndicadores.map((item) => (
                                                    <Option value={item.id_indicador} key={item.id_indicador}>{item.nb_indicador}</Option>
                                                ))
                                            }
                                        </Select>
                                    </Col>
                                    <Col span={2}>
                                        <Link key={2} href="/charts/[idIndicador]" as={`/charts/${state.ListaIndicadoresMostrar[1]?.id_indicador}`} passHref>
                                            <Tooltip title="Ver gráfica">
                                                <Button
                                                    icon={<EyeOutlined />}
                                                />
                                            </Tooltip>
                                        </Link>
                                    </Col>
                                    <Col span={24}>
                                        <ChartColumn data={state.DatosIndicador2} height={200} />
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                        <Col xs={24} sm={24} md={12} >
                            <Card className="box-shadow">
                                <Row gutter={[24, 24]} justify="end">
                                    <Col span={10} >
                                        <Select 
                                            defaultValue={state.ListaIndicadoresMostrar[2]?.id_indicador}
                                            onChange={(value) => handleGetGrafics(3, value)}
                                            style={{ width: "100%" }}>
                                            <Option value={0}>Seleccione</Option>
                                            {
                                                state.ListaIndicadores.length > 0 && state.ListaIndicadores.map((item) => (
                                                    <Option value={item.id_indicador} key={item.id_indicador}>{item.nb_indicador}</Option>
                                                ))
                                            }
                                        </Select>
                                    </Col>
                                    <Col span={2}>
                                        <Link key={1} href="/charts/[idIndicador]" as={`/charts/${state.ListaIndicadoresMostrar[2]?.id_indicador}`} passHref>
                                            <Tooltip title="Ver gráfica">
                                                <Button
                                                    icon={<EyeOutlined />}
                                                />
                                            </Tooltip>
                                        </Link>
                                    </Col>
                                    <Col span={24}>
                                        <ChartColumn data={state.DatosIndicador3} height={200} />
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                        <Col xs={24} sm={24} md={12} >
                            <Card className="box-shadow">
                                <Row gutter={[24, 24]} justify="end">
                                    <Col span={10} >
                                        <Select 
                                            defaultValue={state.ListaIndicadoresMostrar[3]?.id_indicador} 
                                            onChange={(value) => handleGetGrafics(4, value)}
                                            style={{ width: "100%" }}>
                                            <Option value={0}>Seleccione</Option>
                                            {
                                                state.ListaIndicadores.length > 0 && state.ListaIndicadores.map((item) => (
                                                    <Option value={item.id_indicador} key={item.id_indicador}>{item.nb_indicador}</Option>
                                                ))
                                            }
                                        </Select>
                                    </Col>
                                    <Col span={2}>
                                        <Link key={1} href="/charts/[idIndicador]" as={`/charts/${state.ListaIndicadoresMostrar[3]?.id_indicador}`} passHref>
                                            <Tooltip title="Ver gráfica">
                                                <Button
                                                    icon={<EyeOutlined />}
                                                />
                                            </Tooltip>
                                        </Link>
                                    </Col>
                                    <Col span={24}>
                                        <ChartColumn data={state.DatosIndicador4} height={200} />
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                }
            </Spin>


        </LayoutApp>
    );
}

export default Home;
