import React, { useEffect, useState } from 'react';
import LayoutApp from 'src/components/layout';
import dynamic from 'next/dynamic'
import { Row, Col, notification } from 'antd';
import axios from 'axios';
import { useRouter } from "next/router";
import { enviroments } from 'src/config/enviroments';

const ChartColumn = dynamic(() => import('src/components/charts/column'), { ssr: false })

const Home = () => {
    const router = useRouter();
    const { idIndicador } = router.query;

    const navigation = [
		{
			key: '1',
			path: `/charts/${idIndicador}`,
			breadcrumbName: 'Detalles Gráfica',
		}
	]

    const [datosIndicador, setDatosIndicador] = useState([])
    const [nombreIndicador, setNombreIndicador] = useState("")

    const handleGetGrafics = async () => {
        let auxDataInd = []
        await axios.get(`${enviroments.api}/indican/infoindicadorgra.php?id_Indicador=${idIndicador}&anio=2021`)
            .then(response => {
                const { data } = response;
                if (data.Estatus === 1) {
                    data.DatosIndicador.map((item) => {
                        const aux = auxDataInd
                        auxDataInd = aux.concat(item)
                    })
                    setNombreIndicador(data.nb_indicador);
                } else {
                    notification.error({
                        message: 'Ha ocurrido un error interno, por favor intente nuevamente!',
                        placement: 'bottomRight',
                    });
                }
            })

        auxDataInd.map((item) => item.valor = item.valor? parseInt(item.valor): 0)
        setDatosIndicador(auxDataInd)
    }

    useEffect(() => {
        handleGetGrafics()
    }, [])

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
}

export default Home;
