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
  InputNumber,
} from "antd";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listselect_bill_owner, listselect_bill_work } from "./Bill_list";
import dayjs from "dayjs";
import { createBill, getPayAndCollect, updateBill } from "../../api/bill";
import { showError, showSuccess } from "../../utils";
//------------------------------------------------

// useState để tạo kho dữ liệu trong nội bộ components !== biến thường là khi dữ liệu được cập nhật thì UI thay đổi theo

const Bill_class = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [form] = Form.useForm();
  const [formProduct] = Form.useForm();
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
          onClick={() => history.push(`bill_table/${encodeURIComponent(text)}`)}
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
  const [data_pay, setDataPay] = useState();

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

  // Bước 1: Lấy dữ liệu từ FORM
  const onFinish = (values) => {
    values.bill_date = dayjs(values.bill_date).format("YYYY-MM-DD");
    let productData = formProduct.getFieldsValue();
    let newValue = {
      ...values,
      ...productData,
    };
    postBill(newValue);
  };

  const test = () => {
    let productData = formProduct.getFieldsValue();
    console.log(productData);
    postupdateBill(productData);
  };
  // Bước 2: Gửi dữ liệu lên server
  // Xử lý bất đồng bộ: dùng async await
  const postBill = async (bill) => {
    // Gọi API để gửi dữ liệu đi
    const response = await createBill(bill);
    if (response.status == 200) {
      showSuccess("Thêm bill thành công");
    } else {
      showError("Thêm bill thất bại");
    }
  };

  const postupdateBill = async (productData) => {
    // Gọi API để gửi dữ liệu đi
    const response = await updateBill(productData);
    if (response.status == 200) {
      showSuccess("Thêm bill thành công");
    } else {
      showError("Thêm bill thất bại");
    }
  };
  //--------------------------------

  // Hàm tính tổng tiền:

  const renderTotalMoney = () => {
    let quantity = formProduct.getFieldValue("bill_number");
    let price = formProduct.getFieldValue("bill_price");
    if (quantity && price) {
      formProduct.setFieldValue("bill_total", quantity * price);
    } else {
      formProduct.setFieldValue("bill_total", 0);
    }
  };

  // Hàm gọi dữ liệu thu chi về

  const getDataBill = async () => {
    let response = await getPayAndCollect();
    if (response.status == 200) {
      const { data } = response;
      let arrPayKey = [];
      let arrCollect = [];
      let totalMoney = 0;
      data?.map((item) => {
        if (
          !arrPayKey.some((key) => {
            return key == item.bill_work;
          })
        ) {
          arrPayKey.push(item.bill_work);
        }
      });
      let arrPay = [];
      arrPayKey.map((key, index) => {
        let bill_work_pay = key;
        let bill_total_pay = 0;
        let bill_density_pay = "1,5%";
        data.map((item) => {
          if (item.bill_work == key) {
            bill_total_pay += parseInt(item.bill_total);
          }
        });
        arrPay.push({
          key: index + 2,
          Stt: index + 2,
          bill_work_pay: bill_work_pay,
          bill_total_pay: bill_total_pay,
          bill_density_pay: bill_density_pay,
        });
      });
      arrPay.map((item) => {
        totalMoney += parseInt(item.bill_total_pay);
      })
      arrPay.unshift({
        key: 1,
        Stt: 1,
        bill_work_pay: "Tổng tiền",
        bill_total_pay: totalMoney,
        bill_density_pay: "100%",
      });

      setDataPay(arrPay);
      setTablePay(arrPay);
      setTableCollect(arrCollect);
    } else {
      showError("Có lỗi xảy ra");
    }
  };

  useEffect(() => {
    getDataBill();
  }, []);

  return (
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
                    <>
                      <Button
                        onClick={() => {
                          form.submit();
                        }}
                        style={{
                          background: "#1890FD",
                          color: "white",
                        }}
                      >
                        Tạo hóa đơn
                      </Button>
                      <Button onClick={() => test()}>Test</Button>
                    </>
                  }
                >
                  <Form
                    form={form}
                    name="basic"
                    autoComplete="off"
                    size="large"
                    onFinish={onFinish}
                  >
                    <Row gutter={16}>
                      <Col span={8}>
                        <Form.Item label="Ngày tháng" name="bill_date">
                          <DatePicker
                            style={{ float: "right" }}
                            format="YYYY-MM-DD"
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
                >
                  <Form
                    form={formProduct}
                    name="basic"
                    autoComplete="off"
                    size="large"
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
                          <InputNumber
                            size="large"
                            placeholder="1000"
                            onChange={renderTotalMoney}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={9}>
                        <Form.Item label="Giá tiền" name="bill_price">
                          <InputNumber
                            size="large"
                            placeholder="50.000"
                            onChange={renderTotalMoney}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={9}>
                        <Form.Item label="Thành tiền" name="bill_total">
                          <InputNumber size="large" disabled />
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
