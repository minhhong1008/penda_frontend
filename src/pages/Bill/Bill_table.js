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
  Modal,
  InputNumber,
} from "antd";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listselect_bill_owner, listselect_bill_work } from "./Bill_list";
import { getListBill, postBillUpdate } from "../../api/bill";
import dayjs from "dayjs";
import { showError, showSuccess } from "../../utils";
const Bill_table = () => {
  const { RangePicker } = DatePicker;
  const rangePresets = [
    {
      label: "Last 7 Days",
      value: [dayjs().add(-7, "d"), dayjs()],
    },
    {
      label: "Last 14 Days",
      value: [dayjs().add(-14, "d"), dayjs()],
    },
    {
      label: "Last 30 Days",
      value: [dayjs().add(-30, "d"), dayjs()],
    },
    {
      label: "Last 90 Days",
      value: [dayjs().add(-90, "d"), dayjs()],
    },
  ];
  let { status } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [form] = Form.useForm();
  const [formProduct] = Form.useForm();
  const [filterDate, setFilterDate] = useState();
  const [data, setData] = useState();
  const [selectedBill, setSelectedBill] = useState();
  const [openModal, setOpenModal] = useState(false);
  const getListBillTable = async () => {
    let { data } = await getListBill({
      status: status,
    });
    setData(data);
  };

  useEffect(() => {
    getListBillTable();
  }, []);

  const columns = [
    {
      title: "Stt",
      dataIndex: "Stt",
      render: (text, record, index) => {
        return index + 1;
      },
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
    {
      title: "",
      dataIndex: "",
      render: (record) => (
        <Button
          onClick={() => {
            record.bill_date = dayjs(record.bill_date);
            setSelectedBill(record);
            setOpenModal(true);
          }}
          size="small"
        >
          Sửa
        </Button>
      ),
    },
  ];

  const renderTotalMoney = () => {
    let quantity = formProduct.getFieldValue("bill_number");
    let price = formProduct.getFieldValue("bill_price");
    if (quantity && price) {
      formProduct.setFieldValue("bill_total", quantity * price);
    } else {
      formProduct.setFieldValue("bill_total", 0);
    }
  };

  const onClose = () => {
    setOpenModal(false);
  };

  const onFinish = async (values) => {
    values.bill_date = dayjs(values.bill_date).format("YYYY-MM-DD");
    let productData = formProduct.getFieldsValue();
    let newValue = {
      ...values,
      ...productData,
      _id: selectedBill._id,
    };

    let response = await postBillUpdate(newValue);
    if (response.status == 200) {
      showSuccess("Sửa thành công");
    } else {
      showError("Sửa không thành công");
    }
  };

  const onRangeChange = (dates, dateStrings) => {
    if (dates) {
      setFilterDate({
        from: dateStrings[0],
        to: dateStrings[1]
      })
    } else {
      console.log("Clear");
    }
  };

  const handleFilter = async () => {
    let { data } = await getListBill({
      status: status,
      ...filterDate,
    });
    setData(data);
  }

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
                      {decodeURIComponent(status)}
                    </strong>
                  }
                  extra={
                    <>
                      <Row gutter={16}>
                        <Col span={16}>
                          <RangePicker
                            presets={rangePresets}
                            onChange={onRangeChange}
                          />
                        </Col>
                        <Col span={8}>
                          <Button
                            style={{
                              background: "#1890FD",
                              color: "white",
                            }}
                            onClick={() => handleFilter()}
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
        <Modal
          width={1600}
          open={openModal}
          title={selectedBill?._id}
          onCancel={onClose}
          onOk={() => form.submit()}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Card
                title={
                  <strong
                    style={{
                      color: "#1890FD",
                    }}
                  >
                    SỬA HÓA ĐƠN
                  </strong>
                }
              >
                <Form
                  form={form}
                  name="basic"
                  autoComplete="off"
                  size="large"
                  onFinish={onFinish}
                  initialValues={selectedBill}
                >
                  <Row gutter={16}>
                    <Col span={8}>
                      <Form.Item label="Ngày tháng" name="bill_date">
                        <DatePicker
                          style={{ float: "right" }}
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
                  initialValues={selectedBill}
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
        </Modal>
      </Card>
    </div>
  );
};

export default Bill_table;
