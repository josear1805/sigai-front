import { useState } from "react";
import LayoutApp from "src/layout";
import { PageHeaderComponent } from "@components";
import { Spin } from "antd";
import FormUsuarios from "src/components/usuarios/form";
import { useRouter } from "next/router";

const NuevoUsuario = () => {

    const router = useRouter();

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
                title="Nuevo Usuario"
                reload={false}
                button={true}
                dataButton={buttonsHeader}
                loading={loading}
            />

            <Spin tip="Cargando datos..." spinning={loading}>
                <FormUsuarios idUsuario={0} pathView={router.pathname} loading={loading} setLoading={setLoading}/>
            </Spin>
        </LayoutApp>
    );
};

export default NuevoUsuario;
