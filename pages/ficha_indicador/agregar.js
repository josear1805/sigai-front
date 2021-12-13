import { useState, useEffect } from "react";
import LayoutApp from "src/layout";
import { PageHeaderComponent } from "@components";
import {
    Spin,
    Card
} from "antd";

const AgregarFicha = () => {

    const [loading, setLoading] = useState(true);

    const buttonsHeader = [
        {
            href: "/ficha_indicador",
            type: "primary",
            name: "Volver",
        },
    ];

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 5000)
    }, [])

    return (
        <LayoutApp>
            <PageHeaderComponent
                title="Nueva Ficha de Indicador"
                reload={false}
                button={true}
                dataButton={buttonsHeader}
                loading={loading}
            />

            <Spin tip="Cargando datos..." spinning={loading}>
                <Card className="mb-4">
                    
                </Card>
            </Spin>
        </LayoutApp>
    );
};

export default AgregarFicha;
