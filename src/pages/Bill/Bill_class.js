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
  //------------------------------------------------
const Bill_class = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [form] = Form.useForm();
  useEffect(() => {
    //countReport();
  }, []);

  const columns_suggest_pay = [
    {
      title: "Stt",
      dataIndex: "Stt",
    },
    {
      title: "Công việc",
      dataIndex: "bill_work",
      render: (text) => (
        <a
          onClick={() =>
            history.push(`bill_class/table?status=${encodeURIComponent(text)}`)
          }
        >
          {text}
        </a>
      ),
    },
    {
      title: "Số tiền",
      dataIndex: "bill_total",
    },
    {
      title: "Tỷ trọng",
      dataIndex: "bill_density",
    },
  ];
  const data_suggest_pay = [
    {
      key: "1",
      Stt: "1",
      bill_work: "Tổng tiền",
      bill_total: "220,000,000",
      bill_density: "100%",
    },
    {
      key: "2",
      Stt: "2",
      bill_work: "Mua device, proxy & gia hạn",
      bill_total: "20,000,000",
      bill_density: "1,5%",
    },
    {
      key: "3",
      Stt: "3",
      bill_work: "Mua info",
      bill_total: "20,000,000",
      bill_density: "1,5%",
    },
    {
      key: "4",
      Stt: "4",
      bill_work: "Mua sim, phone & gia hạn",
      bill_total: "20,000,000",
      bill_density: "1,5%",
    },
    {
      key: "5",
      Stt: "5",
      bill_work: "Mua mail",
      bill_total: "20,000,000",
      bill_density: "1,5%",
    },

    {
      key: "6",
      Stt: "6",
      bill_work: "Thanh toán lương, thưởng hoa hồng",
      bill_total: "20,000,000",
      bill_density: "1,5%",
    },

    {
      key: "7",
      Stt: "7",
      bill_work: "Chi phí văn phòng",
      bill_total: "20,000,000",
      bill_density: "1,5%",
    },
    {
      key: "8",
      Stt: "8",
      bill_work: "Chi phí vận chuyển",
      bill_total: "20,000,000",
      bill_density: "1,5%",
    },
    {
      key: "9",
      Stt: "9",
      bill_work: "Chi phí checkout, tracking",
      bill_total: "20,000,000",
      bill_density: "1,5%",
    },
    {
      key: "10",
      Stt: "10",
      bill_work: "Chi phí Kicksold",
      bill_total: "20,000,000",
      bill_density: "1,5%",
    },
  ];

  const columns_suggest_collect = [
    {
      title: "Stt",
      dataIndex: "Stt",
    },
    {
      title: "Công việc",
      dataIndex: "bill_work",
      render: (text) => (
        <a
          onClick={() =>
            history.push(`bill_class/table?status=${encodeURIComponent(text)}`)
          }
        >
          {text}
        </a>
      ),
    },
    {
      title: "Số tiền",
      dataIndex: "bill_total",
    },
    {
      title: "Tỷ trọng",
      dataIndex: "bill_density",
    },
  ];
  const data_suggest_collect = [
    {
      key: "1",
      Stt: "1",
      bill_work: "Thu tiền bán hàng",
      bill_total: "20,000,000",
      bill_density: "1,5%",
    },
    {
      key: "2",
      Stt: "2",
      bill_work: "Thu tiền bán tài nguyên",
      bill_total: "20,000,000",
      bill_density: "1,5%",
    },
    {
      key: "3",
      Stt: "3",
      bill_work: "Thu tiền khác",
      bill_total: "20,000,000",
      bill_density: "1,5%",
    },
  ];
  //--------------------------------
  const columns_pay = [
    {
      title: "Stt",
      dataIndex: "Stt",
    },
    {
      title: "Công việc",
      dataIndex: "bill_work_pay",
      render: (text) => (
        <a
          onClick={() =>
            history.push(`bill_class/table?status=${encodeURIComponent(text)}`)
          }
        >
          {text}
        </a>
      ),
    },
    {
      title: "Số tiền",
      dataIndex: "bill_total_pay",
    },
    {
      title: "Tỷ trọng",
      dataIndex: "bill_density_pay",
    },
  ];
  const data_pay = [
    {
      key: "1",
      Stt: "1",
      bill_work_pay: "Mua device",
      bill_total_pay: "20,000,000",
      bill_density_pay: "1,5%",
    },
    {
      key: "2",
      Stt: "2",
      bill_work_pay: "Mua proxy",
      bill_total_pay: "20,000,000",
      bill_density_pay: "1,5%",
    },
    {
      key: "3",
      Stt: "3",
      bill_work_pay: "Mua info",
      bill_total_pay: "20,000,000",
      bill_density_pay: "1,5%",
    },
    {
      key: "4",
      Stt: "4",
      bill_work_pay: "Mua phone",
      bill_total_pay: "20,000,000",
      bill_density_pay: "1,5%",
    },
    {
      key: "5",
      Stt: "5",
      bill_work_pay: "Mua mail",
      bill_total_pay: "20,000,000",
      bill_density_pay: "1,5%",
    },
    {
      key: "6",
      Stt: "6",
      bill_work_pay: "Mua sim",
      bill_total_pay: "20,000,000",
      bill_density_pay: "1,5%",
    },
    {
      key: "7",
      Stt: "7",
      bill_work_pay: "Gia hạn device",
      bill_total_pay: "20,000,000",
      bill_density_pay: "1,5%",
    },
    {
      key: "8",
      Stt: "8",
      bill_work_pay: "Gia hạn proxy",
      bill_total_pay: "20,000,000",
      bill_density_pay: "1,5%",
    },
    {
      key: "9",
      Stt: "9",
      bill_work_pay: "Gia hạn sim",
      bill_total_pay: "20,000,000",
      bill_density_pay: "1,5%",
    },
    {
      key: "10",
      Stt: "10",
      bill_work_pay: "Thanh toán lương",
      bill_total_pay: "20,000,000",
      bill_density_pay: "1,5%",
    },
    {
      key: "11",
      Stt: "11",
      bill_work_pay: "Chi Phí văn phòng",
      bill_total_pay: "20,000,000",
      bill_density_pay: "1,5%",
    },
    {
      key: "12",
      Stt: "12",
      bill_work_pay: "Chi phí vận chuyển",
      bill_total_pay: "20,000,000",
      bill_density_pay: "1,5%",
    },
    {
      key: "13",
      Stt: "13",
      bill_work_pay: "Chi phí checkout",
      bill_total_pay: "20,000,000",
      bill_density_pay: "1,5%",
    },
    {
      key: "14",
      Stt: "14",
      bill_work_pay: "Chi phí Kicksold",
      bill_total_pay: "20,000,000",
      bill_density_pay: "1,5%",
    },
    {
      key: "15",
      Stt: "15",
      bill_work_pay: "Chi phí tracking",
      bill_total_pay: "20,000,000",
      bill_density_pay: "1,5%",
    },
  ];

  const columns_collect = [
    {
      title: "Stt",
      dataIndex: "Stt",
    },
    {
      title: "Công việc",
      dataIndex: "bill_work",
      render: (text) => (
        <a
          onClick={() =>
            history.push(`bill_class/table?status=${encodeURIComponent(text)}`)
          }
        >
          {text}
        </a>
      ),
    },
    {
      title: "Số tiền",
      dataIndex: "bill_total",
    },
    {
      title: "Tỷ trọng",
      dataIndex: "bill_density",
    },
  ];

  const data_collect = [
    {
      key: "1",
      Stt: "1",
      bill_work: "Thu tiền bán hàng",
      bill_total: "20,000,000",
      bill_density: "1,5%",
    },
    {
      key: "2",
      Stt: "2",
      bill_work: "Thu tiền bán tài nguyên",
      bill_total: "20,000,000",
      bill_density: "1,5%",
    },
    {
      key: "3",
      Stt: "3",
      bill_work: "Thu tiền khác",
      bill_total: "20,000,000",
      bill_density: "1,5%",
    },
  ];
  //--------------------------------
  return (
    //https://ant.design/components/date-picker --Preset Ranges
    <div>
      <Card>
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="TẠO HÓA ĐƠN" key="1">
            <Row gutter={16}>
              <Col span={12}>
                <Card
                  title={
                    <strong
                      style={{
                        color: "#1890FD",
                      }}
                    >
                      TẠO HÓA ĐƠN THU CHI
                    </strong>
                  }
                  extra={
                    <Button
                      onClick={() => form.submit()}
                      style={{
                        background: "#1890FD",
                        color: "white",
                      }}
                    >
                      Tạo hóa đơn
                    </Button>
                  }
                >
                  <Form
                    form={form}
                    name="basic"
                    autoComplete="off"
                    size="large"
                  >
                    <Row gutter={16}>
                      <Col span={8}>
                        <Form.Item
                          label="Bill id"
                          name="bill_id"
                          style={{ width: "100%" }}
                          rules={[
                            {
                              required: true,
                              message: "Hãy nhập Bill id!",
                            },
                          ]}
                        >
                          <Input
                            disabled={true}
                            size="small"
                            placeholder="input here"
                          />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item label="Ngày tháng" name="bill_date">
                          <DatePicker
                            style={{ float: "right" }}
                            format="MM-DD-YYYY HH:mm"
                            onChange={() => dateForm.submit()}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item label="Hạng mục" name="bill_type">
                          <Select optionLabelProp="label">
                            <Option value="Phiếu chi" label="Phiếu chi">
                              <div className="demo-option-label-item">
                                Phiếu chi
                              </div>
                            </Option>
                            <Option value="Phiếu thu" label="Phiếu thu">
                              <div className="demo-option-label-item">
                                Phiếu thu
                              </div>
                            </Option>
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={16}>
                      <Col span={8}>
                        <Form.Item label="Hành động" name="bill_action">
                          <Select optionLabelProp="label">
                            <Option value="Đề xuất" label="Đề xuất">
                              <div className="demo-option-label-item">
                                Đề xuất
                              </div>
                            </Option>
                            <Option value="Thực hiện" label="Thực hiện">
                              <div className="demo-option-label-item">
                                Thực hiện
                              </div>
                            </Option>
                          </Select>
                        </Form.Item>
                      </Col>

                      <Col span={8}>
                        <Form.Item label="Phòng ban" name="bill_owner">
                          <Select optionLabelProp="label">
                            {listselect_bill_owner.map((item, index) => {
                              return (
                                <Option value={item} label={item} key={index}>
                                  <div className="demo-option-label-item">
                                    {item}
                                  </div>
                                </Option>
                              );
                            })}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item label="Nhà cung cấp" name="bill_supplier">
                          <Input size="small" placeholder="Antidetect" />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={16}>
                      <Col span={8}>
                        <Form.Item label="Liên hệ" name="bill_contact_phone">
                          <Input size="small" placeholder="antidetect.online" />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item label="Liên hệ" name="bill_contact_social1">
                          <Input size="small" placeholder="fb.com/antidetect" />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item label="Liên hệ" name="bill_contact_social2">
                          <Input size="small" placeholder="0983339558" />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item label="Thanh toán" name="bill_payment">
                          <Input size="small" placeholder="40.000.000" />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item label="Công nợ" name="bill_debt">
                          <Input size="small" placeholder="10.000.000" />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={16}>
                      <Col span={24}>
                        <Form.Item label="Ghi chú" name="bill_note">
                          <Input size="small" placeholder="input here" />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form>
                </Card>
              </Col>
              <Col span={12}>
                <Card
                  title={
                    <strong
                      style={{
                        color: "#1890FD",
                      }}
                    >
                      CHI TIẾT HÀNG HÓA
                    </strong>
                  }
                  extra={
                    <Button
                      onClick={() => form.submit()}
                      style={{
                        background: "#18a689",
                        color: "white",
                      }}
                    >
                      Thêm hàng hóa
                    </Button>
                  }
                >
                  <Form
                    name="basic"
                    autoComplete="off"
                    size="large"
                    form={form}
                  >
                    <Row gutter={16}>
                      <Col span={12}>
                        <Form.Item label="Công việc" name="bill_work">
                          <Select optionLabelProp="label">
                            {listselect_bill_work.map((item, index) => {
                              return (
                                <Option value={item} label={item} key={index}>
                                  <div className="demo-option-label-item">
                                    {item}
                                  </div>
                                </Option>
                              );
                            })}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="Nội dung" name="bill_content">
                          <Input size="small" placeholder="Mua key tháng 12" />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={16}>
                      <Col span={6}>
                        <Form.Item label="Số lượng" name="bill_number">
                          <Input size="small" placeholder="1000" />
                        </Form.Item>
                      </Col>
                      <Col span={9}>
                        <Form.Item label="Giá tiền" name="bill_price">
                          <Input size="small" placeholder="50.000" />
                        </Form.Item>
                      </Col>
                      <Col span={9}>
                        <Form.Item label="Thành tiền" name="bill_total">
                          <Input size="small" placeholder="50.000.000" />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form>
                </Card>
              </Col>
            </Row>
          </Tabs.TabPane>
          <Tabs.TabPane tab="BÁO CÁO THU CHI" key="2">
            <Row gutter={16}>
              <Col span={12}>
                <Card
                  title={
                    <strong
                      style={{
                        color: "#18a689",
                      }}
                    >
                      BẢNG ĐỀ XUẤT
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
                  <Divider>BẢNG ĐỀ XUẤT CHI </Divider>
                  <Table
                    columns={columns_suggest_pay}
                    dataSource={data_suggest_pay}
                    size="middle"
                  />
                  <Divider>BẢNG ĐỀ XUẤT THU </Divider>
                  <Table
                    columns={columns_suggest_collect}
                    dataSource={data_suggest_collect}
                    size="middle"
                  />
                </Card>
              </Col>
              <Col span={12}>
                <Card
                  title={
                    <strong
                      style={{
                        color: "#1890FD",
                      }}
                    >
                      BẢNG THU CHI
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
                  <Divider>BẢNG CHI TIỀN</Divider>
                  <Table
                    columns={columns_pay}
                    dataSource={data_pay}
                    size="middle"
                  />
                  <Divider>BẢNG THU TIỀN</Divider>
                  <Table
                    columns={columns_collect}
                    dataSource={data_collect}
                    size="middle"
                  />
                </Card>
              </Col>
            </Row>
          </Tabs.TabPane>
          <Tabs.TabPane tab="HƯỚNG DẪN" key="3">
            <p>Mỗi nhà cung cấp phải tạo 1 phiếu khác nhau</p>
          </Tabs.TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default Bill_class;
