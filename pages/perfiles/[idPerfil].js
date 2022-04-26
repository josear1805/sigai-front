import { useState } from "react";
import LayoutApp from "src/layout";
import { useRouter } from "next/router";
import { PageHeaderComponent } from "@components";
import { Spin } from "antd";
import FormUsuarios from "src/components/usuarios/form";

const EditarFicha = () => {
    const router = useRouter();
    const { idPerfil } = router.query;

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
                title="Editar Perfil"
                reload={false}
                button={true}
                dataButton={buttonsHeader}
                loading={loading}
            />

            {/* <Spin tip="Cargando datos..." spinning={loading}>
                <FormUsuarios idUsuario={idUsuario} pathView={router.pathname} loading={loading} setLoading={setLoading}/>
            </Spin> */}
        </LayoutApp>
    );
};

export default EditarFicha;
