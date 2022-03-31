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

const { Option } = Select;

const initialState = {
	listaVicePresidencias: [],
	idVicePresidencia: null,
	listaGerencias: [],
	listaGerenciasMostrar: [],
	idGerencia: null,
	listaUsuarios: [],
	listaUsuariosMostrar: [],
};

const Users = () => {

	const dispatch = useDispatch();
	const router = useRouter();

	const { loadingGeneral } = useSelector((stateData) => stateData.global)
	const { usuarios } = useSelector((stateData) => stateData);

	const [state, setState] = useState(initialState);
	const [loading, setLoading] = useState(true);

	const columns = [
		{
			title: "Nombre",
			dataIndex: "nombreUsuario",
			key: "nombreUsuario",
			search: true,
		},
		{
			title: "Acción",
			dataIndex: "idUsuario",
			key: "idUsuario",
			search: false,
			width: "75px",
			render: (text, record) => (
				// <Row gutter={[4, 0]} justify="end" align="middle">
					<Col style={{ width: "75px" }}>
						<Link
							key={record.idUsuario}
							href={`/usuarios/${record.idUsuario}`}
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
				// </Row>
			)
		},
	];

	const buttonsHeader = [
		{
			href: "/usuarios/crear",
			type: "primary",
			name: "Nuevo Usuario",
		},
	];

	const navigation = [
		{
			key: "1",
			path: `/usuarios`,
			breadcrumbName: "Usuarios",
		},
	];

	const handleGetData = async () => {
		setLoading(true);
		const response = await makeRequest({
			method: "POST",
			path: "/indican/listausuarios.php",
			body: {
				pathView: router.pathname,
			}
		});

		if (response.estatus == 1) {
			setState({
				listaVicePresidencias: [...response.vicePresidencia],
				idVicePresidencia: null,
				listaGerencias: [...response.gerencia],
				listaGerenciasMostrar: [],
				idGerencia: null,
				listaUsuarios: [...response.listaUsuarios],
				listaUsuariosMostrar: [...response.listaUsuarios],
			});
			setLoading(false);
		} else {
			setLoading(false);
		}
	};

	const handleChangueVicePresidencia = (idVP) => {
		const { listaGerencias } = state;
		let listaGerenciasMostrar = listaGerencias.filter((item) => item.idVicePresidencia == idVP);

		setState((prevState) => ({
			...prevState,
			idVicePresidencia: idVP,
			listaGerenciasMostrar,
			idGerencia: null,
			listaUsuariosMostrar: [],
		}));
		
		dispatch(setUsuarios({
			listaUsuarios: state.listaUsuarios,
			listaGerencias: state.listaGerencias,
			listaVicePresidencias: state.listaVicePresidencias,
			idVicePresidencia: idVP,
			listaGerenciasMostrar,
			idGerencia: null,
			listaUsuariosMostrar: [],
		}));
	};

	const handleChangueGerencia = (idGerencia) => {
		const { listaUsuarios } = state;
		let listaUsuariosMostrar = listaUsuarios.filter(
			(item) => item.idGerencia == idGerencia
		);

		setState((prevState) => ({
			...prevState,
			idGerencia,
			listaUsuariosMostrar,
		}));

		dispatch(setUsuarios({
			listaUsuarios: state.listaUsuarios,
			listaGerencias: state.listaGerencias,
			listaVicePresidencias: state.listaVicePresidencias,
			idVicePresidencia: state.idVicePresidencia,
			listaGerenciasMostrar: state.listaGerenciasMostrar,
			idGerencia,
			listaUsuariosMostrar,
		}));
	};

	const handleSetInit = () => {
		setLoading(true);
		if (usuarios.idVicePresidencia && usuarios.idGerencia) {
			setState((prevState) => ({
				...prevState,
				listaUsuarios: usuarios.listaUsuarios,
				listaGerencias: usuarios.listaGerencias,
				listaVicePresidencias: usuarios.listaVicePresidencias,
				idVicePresidencia: usuarios.idVicePresidencia,
				listaGerenciasMostrar: usuarios.listaGerenciasMostrar,
				idGerencia: usuarios.idGerencia,
				listaUsuariosMostrar: usuarios.listaUsuariosMostrar,
			}));
			setLoading(false)
		} else {
			handleGetData();
		}
	}

	useEffect(async () => {
		!loadingGeneral && handleSetInit();
	}, [loadingGeneral]);

	return (
		<LayoutApp navigation={navigation}>
			<PageHeaderComponent
				title="Usuarios"
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
						<Row gutter={[24, 24]} justify="start" className="mb-3">
							<Col xs={24} md={12} lg={6}>
								<label>Unidad organizativa</label>
								<Select
									value={state.idVicePresidencia}
									onChange={
										handleChangueVicePresidencia
									}
									showSearch
									placeholder="Seleccione.."
									optionFilterProp="children"
									filterOption={(input, option) =>
										option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
									}
									style={{ width: "100%" }}
								>
									{state.listaVicePresidencias && state.listaVicePresidencias.map((item, index) => (
										<Option
											value={parseInt(item.idVicePresidencia)}
											key={index}
										>{ item.vicePresidencia }</Option>
									))}
								</Select>
							</Col>

							<Col xs={24} md={12} lg={6}>
								<label>Gerencia</label>
								<Select
									placeholder="Selecccione..."
									value={state.idGerencia}
									style={{ width: "100%" }}
									disabled={!state.idVicePresidencia}
									onChange={(value) =>
										handleChangueGerencia(value)
									}
									showSearch
									optionFilterProp="children"
									filterOption={(input, option) =>
										option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
									}
								>
									{state.listaGerenciasMostrar && state.listaGerenciasMostrar.map((item, index) => (
										<Option
											value={parseInt(item.idGerencia)}
											key={index}
										>{ item.gerencia }</Option>
									))}
								</Select>
							</Col>
						</Row>
						
						<TableComponent
							columns={columns}
							data={state.listaUsuariosMostrar}
							loading={false}
						/>
					</Card>
				)}
			</Spin>
		</LayoutApp>
	);
};

export default Users;
