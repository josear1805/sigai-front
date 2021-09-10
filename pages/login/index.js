import { useState } from "react";
import { Row, Col, Card, Form, Input, Button, Layout, notification, Spin } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import Head from "next/head";
import { useDispatch } from "react-redux"
import { login } from "src/redux/actions/globalActions";
import Link from "next/link";
import axios from "axios";


const { Header, Footer } = Layout;

const Signin = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        const { Usuario, Clave } = values;
        
        await axios.get(`http://localhost/indican/verificarusuario.php?Usuario=${Usuario}&Clave=${Clave}`)
        .then(response => {
            if (response.status === 200) {
                const { data } = response;
                dispatch(login(data.DatosUsuario))
                notification.success({
                    message: 'Inicio de Sesión Exitoso!!',
                    placement: 'bottomRight',
                });
                setTimeout(() => {
                    setLoading(false)
                    router.push("/");
                }, 100);
            } else {
                handleErrorLogin()
            }
        })
        .catch(error => {
            handleErrorLogin()
        })
    };

    const handleErrorLogin = () => {
        notification.error({
            message: 'Error con los datos Ingresados!!',
            placement: 'bottomRight',
        });
        setTimeout(() => { setLoading(false) }, 100);
    }

    return (
        <Layout style={{ height: "100vh" }}>
            <Head>
                <title>Sigai Intranet</title>
            </Head>
            {/* <Header></Header> */}
            <Header className="site-layout-background">
                <img src="/images/cantv-white.png" alt="logo-cantv" />
            </Header>
            <Row justify="center" className="div-login">
                <Col sm={24} md={8} className="colForm">
                    <Spin tip="Cargando..." spinning={loading}>
                        <Card hoverable bordered={false} className="cardForm">

                            <Form
                                name="normal_login"
                                className="login-form"
                                initialValues={{ remember: true }}
                                onFinish={onFinish}
                            >
                                <Row gutter={[16, 16]} className="input-item">
                                    <Col span={24}>
                                        <p>¡Bienvenido al Sistema de Apoyo a la Gestión de Indicadores!</p>
                                        <h2>(SAGI)</h2>
                                    </Col>
                                    
                                    <Col span={24}>
                                        <Form.Item
                                            name="Usuario"
                                            hasFeedback
                                            // rules={[
                                            //     {
                                            //         required: true,
                                            //         type: "email",
                                            //         message: "¡Por favor, ingrese su correo electrónico!",
                                            //     },
                                            // ]}
                                        >
                                            <Input
                                                prefix={<MailOutlined className="site-form-item-icon" />}
                                                placeholder="Correo electronico"
                                            />
                                        </Form.Item>
                                    </Col>

                                    <Col span={24}>
                                        <Form.Item
                                            name="Clave"
                                            hasFeedback
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "¡Por favor, ingrese su contraseña y que sea mínimo tres carácteres!",
                                                    min: 3,
                                                },
                                            ]}
                                        >
                                            <Input
                                                prefix={<LockOutlined className="site-form-item-icon" />}
                                                type="password"
                                                placeholder="Contraseña"
                                            />
                                        </Form.Item>
                                    </Col>

                                    <Col span={24}>
                                        <Row gutter={[16, 16]} justify="center">
                                            <Col span={12}>
                                                <Form.Item>
                                                    <Button
                                                        block
                                                        type="primary"
                                                        htmlType="submit"
                                                        // loading={AuthStore.loading}
                                                        className="login-form-button"
                                                    >
                                                        Iniciar
                                                    </Button>
                                                </Form.Item>
                                            </Col>
                                            {/* <Col span={12}>
                                                <Form.Item>
                                                    <Button
                                                        block
                                                        type="secondary"
                                                        // loading={AuthStore.loading}
                                                        onClick={() => router.push("/register")}
                                                        className="login-form-button"
                                                    >
                                                        <Link href={`/login`}>
                                                            Registrarse
                                                        </Link>
                                                    </Button>
                                                </Form.Item>
                                            </Col> */}
                                        </Row>
                                    </Col>
                                </Row>
                            </Form>
                        </Card>
                    </Spin>
                </Col>
            </Row>
            <Footer  >
                <Row className="div-footer-login">
                    <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }} className="img-min" style={{ textAlign: "center" }}>
                        <img src="/images/mincyt.png" alt="logo-cantv" width="200" />
                    </Col>
                    <Col xs={{ span: 11, offset: 1 }} lg={{ span: 12, offset: 2 }}>

                    </Col>
                    <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }} className="img-logo" style={{ textAlign: "center" }}>
                        <img src="/images/cantv-colors.png" alt="logo-cantv" width="100" />
                    </Col>
                </Row>
            </Footer>
        </Layout>
    );
};

export default Signin;
