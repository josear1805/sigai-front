import { useState } from "react";
import LayoutApp from "src/layout";
import { PageHeaderComponent } from "@components";
import { Spin } from "antd";
import FormUsuarios from "src/components/usuarios/form";

const NuevoUsuario = () => {

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
                <FormUsuarios idUsuario={0} loading={loading} setLoading={setLoading}/>
            </Spin>
        </LayoutApp>
    );
};

export default NuevoUsuario;
