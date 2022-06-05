import { useState } from "react";
import LayoutApp from "src/layout";
import { PageHeaderComponent } from "@components";
import { Spin } from "antd";
import FormFichaIndicadorTwo from "src/components/ficha_indicador/form2";

const AgregarFicha = () => {
    const [loading, setLoading] = useState(true);

    const buttonsHeader = [
        {
            href: "/ficha_indicador",
            type: "primary",
            name: "Volver",
        },
    ];

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
                <FormFichaIndicadorTwo idFicha={0} loading={loading} setLoading={setLoading}/>
            </Spin>
        </LayoutApp>
    );
};

export default AgregarFicha;
