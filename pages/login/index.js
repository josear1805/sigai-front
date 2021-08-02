import { useState } from "react";
import { Row, Col, Card, Form, Input, Button, Layout, notification, Spin } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import axios from "axios";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from 'next/image'

const { Header, Footer } = Layout;

const Signin = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
      console.log('login')
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Head>
        <title>Sigai Intranet</title>
      </Head>
      {/* <Header></Header> */}
      <Header className="site-layout-background" style={{ padding: 0 }} >
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
                  <p>¡Bienvenido a Sigai Intranet!</p>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="email"
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        type: "email",
                        message: "¡Por favor, ingrese su correo electrónico!",
                      },
                    ]}
                  >
                    <Input
                      prefix={<MailOutlined className="site-form-item-icon" />}
                      placeholder="Correo electronico"
                    />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    name="password"
                    hasFeedback
                    rules={[
                      {
                        // required: true,
                        message: "¡Por favor, ingrese su contraseña!",
                        // min: 4,
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
              </Row>
            </Form>
          </Card>
          </Spin>
        </Col>
      </Row>
      <Footer className="site-layout-background">Insight Latam (R)</Footer>
    </Layout>
  );
};

export default Signin;
