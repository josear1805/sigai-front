import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Link from 'next/link'
import { Row, Col, Card, Select, Spin, Tag } from "antd";
import { EditOutlined } from "@ant-design/icons";

import LayoutApp from "src/layout";
import { makeRequest } from "src/helpers";
import { TableComponent, PageHeaderComponent } from "@components";
import { setUsuarios } from "src/redux/reducers/usuariosSlice";

const Profile = () => {

	const dispatch = useDispatch();
	const router = useRouter();

	const { loadingGeneral } = useSelector((stateData) => stateData.global)

	const [perfiles, setPerfiles] = useState([]);
	const [loading, setLoading] = useState(true);

	const columns = [
		{
			title: "Nombre",
			dataIndex: "nombrePerfil",
			key: "nombrePerfil",
			search: true,
		},
		{
			title: "Descripción",
			dataIndex: "descripcion",
			key: "descripcion",
			search: true,
		},
		{
			title: "Acción",
			dataIndex: "idPerfil",
			key: "idPerfil",
			search: false,
			width: "75px",
			render: (text, record) => (
				<Col style={{ width: "75px" }}>
					<Link
						key={record.idPerfil}
						href={`/perfiles/${record.idPerfil}`}
					>
						<Tag
							icon={<EditOutlined />}
							color="success"
							className="tag-table"
						>
							Editar
						</Tag>
					</Link>
				</Col>
			)
		},
	];

	const buttonsHeader = [
		{
			href: "/perfiles/crear",
			type: "primary",
			name: "Nuevo Perfil",
		},
	];

	const navigation = [
		{
			key: "1",
			path: `/perfiles`,
			breadcrumbName: "Perfiles",
		},
	];

	const handleGetData = async () => {
		setLoading(true);
		const response = await makeRequest({
			method: "POST",
			path: "/indican/listaperfiles.php",
			body: {
				vista: router.pathname,
			}
		});

		if (response.estatus == 1) {
			setPerfiles(response.perfiles);
			setLoading(false);
		} else {
			setLoading(false);
		}
	};

	useEffect(async () => {
		!loadingGeneral && handleGetData();
	}, [loadingGeneral]);

	return (
		<LayoutApp navigation={navigation}>
			<PageHeaderComponent
				title="Perfiles"
				reload={true}
				handleReload={handleGetData}
				button={true}
				dataButton={buttonsHeader}
				loading={loading}
				navigation={navigation}
			/>

			<Spin tip="Cargando..." spinning={loading}>
				{!loading && (
					<Card>
						<TableComponent
							columns={columns}
							data={perfiles}
							loading={false}
						/>
					</Card>
				)}
			</Spin>
		</LayoutApp>
	);
};

export default Profile;
