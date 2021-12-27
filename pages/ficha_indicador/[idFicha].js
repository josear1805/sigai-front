import { useState } from "react";
import LayoutApp from "src/layout";
import { useRouter } from "next/router";
import { PageHeaderComponent } from "@components";
import { Spin } from "antd";
import FormFichaIndicador from "src/components/ficha_indicador/form";

const EditarFicha = () => {
    const router = useRouter();
    const { idFicha } = router.query;

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
                title="Editar Ficha de Indicador"
                reload={false}
                button={true}
                dataButton={buttonsHeader}
                loading={loading}
            />

            <Spin tip="Cargando datos..." spinning={loading}>
                <FormFichaIndicador idFicha={idFicha} loading={loading} setLoading={setLoading}/>
            </Spin>
        </LayoutApp>
    );
};

export default EditarFicha;
