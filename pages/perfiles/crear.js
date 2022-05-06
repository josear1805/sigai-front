import { useState } from "react";
import { Spin } from "antd";
import LayoutApp from "src/layout";
import { PageHeaderComponent } from "@components";
import FormPerfiles from "src/components/perfiles/form";

const NuevoPerfil = () => {
    const [loading, setLoading] = useState(false);

    const buttonsHeader = [
        {
            href: "/perfiles",
            type: "primary",
            name: "Volver",
        },
    ];

    return (
        <LayoutApp>
            <PageHeaderComponent
                title="Nuevo Perfil"
                reload={false}
                button={true}
                dataButton={buttonsHeader}
                loading={loading}
            />

            <Spin tip="Cargando datos..." spinning={loading}>
                <FormPerfiles
                    idPerfil={parseInt(idPerfil)}
                    loading={loading}
                    setLoading={setLoading}
                />
            </Spin>
        </LayoutApp>
    );
};

export default NuevoPerfil;
