import React from "react";
import { Modal, Button, Row, Col, Typography } from "antd";

const { Title } = Typography;

const ModalComponet = ({
    title,
    show,
    width,
    loading = false,
    confirmButton = true,
    confirmButtonText,
    handleConfirm,
    cancelButton = true,
    cancelButtonText,
    handleCancel,
    children,
}) => {
    return (
        <Modal
            visible={show}
            onCancel={handleCancel}
            footer={null}
            centered
            width={width || 520}
        >
            <Row gutter={[24, 24]}>
                {/* TITLE */}
                {title && (
                    <Col span={24}>
                        <Title level={4} type="secondary" className="m-0">
                            {title}
                        </Title>
                    </Col>
                )}
                {/* CONTENT */}
                <Col span={24} className="pl-4 pr-4">
                    {children}
                </Col>
                {/* BUTTONS */}
                {confirmButton && (
                    <Col span={12}>
                        <Button
                            block
                            key="submit"
                            type="primary"
                            loading={loading}
                            disabled={loading}
                            onClick={handleConfirm}
                            className="ant-btn-success"
                        >
                            {confirmButtonText || "Confirmar"}
                        </Button>
                    </Col>
                )}
                {cancelButton && (
                    <Col span={12}>
                        <Button
                            block
                            key="back"
                            type="primary"
                            loading={loading}
                            disabled={loading}
                            onClick={handleCancel}
                            className="ant-btn-danger"
                        >
                            {cancelButtonText || "Cancelar"}
                        </Button>
                    </Col>
                )}
            </Row>
        </Modal>
    );
};

export default ModalComponet;
