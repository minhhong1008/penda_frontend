import {
  Button,
  Card,
  Table,
  Tabs,
  Row,
  Col,
  Form,
  Input,
  DatePicker,
  Select,
  Collapse,
  Space,
  TreeSelect,
  Divider,
} from "antd";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listselect_bill_owner, listselect_bill_work } from "./Bill_list";
const Bill_table = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [form] = Form.useForm();
  useEffect(() => {
    //countReport();
  }, []);

  const columns = [
    {
      title: "Stt",
      dataIndex: "Stt",
    },
    {
      title: "Hóa đơn",
      dataIndex: "bill_id",
    },
    {
      title: "Ngày tháng",
      dataIndex: "bill_date",
    },
    {
      title: "Phòng ban",
      dataIndex: "bill_owner",
    },
    {
      title: "Công việc",
      dataIndex: "bill_work",
    },
    {
      title: "Nội dung",
      dataIndex: "bill_content",
    },
    {
      title: "Số lượng",
      dataIndex: "bill_number",
    },
    {
      title: "Giá tiền",
      dataIndex: "bill_price",
    },
    {
      title: "Thành tiền",
      dataIndex: "bill_total",
    },
    {
      title: "Thanh toán",
      dataIndex: "bill_payment",
    },
  ];
  const data = [
    {
      key: "1",
      Stt: "1",
      content: "Mua device",
      money: 2000000,
    },
    {
      key: "2",
      Stt: "2",
      content: "Mua phone",
      money: 6000000,
    },
    {
      key: "3",
      Stt: "3",
      content: "Mua mail",
      money: 9000000,
    },
    {
      key: "4",
      Stt: "4",
      content: "Thanh toán lương",
      money: 12000000,
    },
  ];
  return (
    <div>
      <Card>
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="BÁO CÁO THU CHI" key="1">
            <Row gutter={16}>
              <Col span={24}>
                <Card
                  title={
                    <strong
                      style={{
                        color: "#1890FD",
                      }}
                    >
                      MUA DEVICE
                    </strong>
                  }
                  extra={
                    <>
                      <Row gutter={16}>
                        <Col span={16}>
                          <Input
                            size="small"
                            placeholder="1/5/2025 - 30/7/2025"
                          />
                        </Col>
                        <Col span={8}>
                          <Button
                            style={{
                              background: "#1890FD",
                              color: "white",
                            }}
                          >
                            Kết quả
                          </Button>
                        </Col>
                      </Row>
                    </>
                  }
                >
                  <Table columns={columns} dataSource={data} size="small" />
                </Card>
              </Col>
            </Row>
          </Tabs.TabPane>
          <Tabs.TabPane tab="BÁO CÁO ĐỀ XUẤT" key="2">
            <Row gutter={16}>
              <Col span={24}>
                <Card
                  title={
                    <strong
                      style={{
                        color: "#18a689",
                      }}
                    >
                      MUA DEVICE
                    </strong>
                  }
                  extra={
                    <>
                      <Row gutter={16}>
                        <Col span={16}>
                          <Input
                            size="small"
                            placeholder="1/5/2025 - 30/7/2025"
                          />
                        </Col>
                        <Col span={8}>
                          <Button
                            style={{
                              background: "#18a689",
                              color: "white",
                            }}
                          >
                            Kết quả
                          </Button>
                        </Col>
                      </Row>
                    </>
                  }
                >
                  <Table columns={columns} dataSource={data} size="small" />
                </Card>
              </Col>
            </Row>
          </Tabs.TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default Bill_table;
