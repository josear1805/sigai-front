import { useState, useEffect } from "react";
import { Table, Input, Button, Row, Col, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const TableComponent = (props) => {
    const { columns, data, loading, position="bottomCenter", pageSize=10 } = props;
    const [sourceColumns, setSourceColumns] = useState(columns);

    const getColumnSearchProps = (item) => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
        }) => {
            return (
                <div style={{ padding: 8 }}>
                    <Input
                        placeholder={`Buscar ${item.title}`}
                        value={selectedKeys[0]}
                        onChange={(e) =>
                            setSelectedKeys(
                                e.target.value ? [e.target.value] : []
                            )
                        }
                        onPressEnter={() => handleSearch(confirm)}
                        style={{
                            width: 188,
                            marginBottom: 8,
                            display: "block",
                        }}
                    />
                    <Space>
                        <Button
                            type="primary"
                            onClick={() => handleSearch(confirm)}
                            icon={<SearchOutlined />}
                            size="small"
                            style={{ width: 90 }}
                        >
                            Buscar
                        </Button>
                        <Button
                            onClick={() => handleReset(clearFilters)}
                            size="small"
                            style={{ width: 90 }}
                        >
                            Resetear
                        </Button>
                    </Space>
                </div>
            );
        },
        filterIcon: (filtered) => {
            return (
                <SearchOutlined
                    style={{ color: filtered ? "#1890ff" : undefined }}
                />
            );
        },
        onFilter: (value, record) =>
            record[item.dataIndex]
                ? record[item.dataIndex]
                      .toString()
                      .toLowerCase()
                      .includes(value.toLowerCase())
                : "",
    });

    const handleSearch = (confirm) => {
        confirm();
    };

    const handleReset = (clearFilters) => {
        clearFilters();
    };

    useEffect(() => {
        let aux = [];
        sourceColumns.map((response, index) => {
            response.search
                ? aux.push({ ...response, ...getColumnSearchProps(response) })
                : aux.push({ ...response });
        });
        setSourceColumns(aux);
    }, []);

    return (
        <Row>
            <Col span={24}>
                <Table
                    dataSource={data}
                    columns={sourceColumns}
                    size="small"
                    loading={loading}
                    scroll={{ x: "auto" }}
                    pagination={{ position: [position], pageSize: pageSize }}
                />
            </Col>
        </Row>
    );
};

export default TableComponent;
