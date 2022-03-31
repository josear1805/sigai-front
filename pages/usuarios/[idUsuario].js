import { useState } from "react";
import LayoutApp from "src/layout";
import { useRouter } from "next/router";
import { PageHeaderComponent } from "@components";
import { Spin } from "antd";
import FormUsuarios from "src/components/usuarios/form";

const EditarFicha = () => {
    const router = useRouter();
    const { idUsuario } = router.query;

    const [loading, setLoading] = useState(true);

    const buttonsHeader = [
        {
            href: "/usuarios",
            type: "primary",
            name: "Volver",
        },
    ];

    return (
        <LayoutApp>
            <PageHeaderComponent
                title="Editar Usuario"
                reload={false}
                button={true}
                dataButton={buttonsHeader}
                loading={loading}
            />

            <Spin tip="Cargando datos..." spinning={loading}>
                <FormUsuarios idUsuario={idUsuario} loading={loading} setLoading={setLoading}/>
            </Spin>
        </LayoutApp>
    );
};

export default EditarFicha;
