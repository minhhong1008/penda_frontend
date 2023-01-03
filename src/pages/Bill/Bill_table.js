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
  Upload,
} from "antd";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { showError, showSuccess } from "../../utils";
import { listselect_bill_owner, listselect_bill_work } from "./Bill_list";
import { getListBill, postBillUpdate } from "../../api/bill";

// Liên quan upload ảnh
import { PlusOutlined } from "@ant-design/icons";
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const Bill_table = () => {
  const { RangePicker } = DatePicker;
  const rangePresets = [
    {
      label: "Tháng trước",
      value: [dayjs().add(-7, "d"), dayjs()],
    },
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
    //data.bill_total = VND.format(data.bill_total)
  
    setData(data);
  };

  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

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
            if (record?.bill_image_url) {
              let dataImage = [];
              let imageArr = record.bill_image_url.split(",");
              imageArr.map((item, index) => {
                dataImage.push({
                  uid: index,
                  name: item,
                  status: "done",
                  url: item,
                });
              });
              setFileList(dataImage);
            }
            setOpenModal(true);
          }}
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
    let bill_file = [];
    fileList?.map((item) => {
      let fileUrl = "";
      if (item?.xhr?.response) {
        fileUrl = JSON.parse(item.xhr.response).url;
      } else {
        fileUrl = item.url;
      }
      bill_file.push(fileUrl);
    });
   
    values.bill_date = dayjs(values.bill_date).format("YYYY-MM-DD");
    let productData = formProduct.getFieldsValue();
    let newValue = {
      ...values,
      ...productData,
      bill_image_url: bill_file.length > 0 ? bill_file.join(",") : "",
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
        to: dateStrings[1],
      });
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
  };

  // Upload ảnh
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState();

  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleChange = async ({ fileList }) => {
    setFileList(fileList);
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  // Những hàm được gọi trong useEffect sẽ được chạy lần đầu khi vào trang
  useEffect(() => {
   
    getListBillTable();
  }, []);

  return (
    <div>
      <Card>
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="BÁO CÁO CHI TIẾT" key="1">
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
        </Tabs>
        <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
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
                        <DatePicker style={{ float: "right" }} />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label="Hạng mục" name="bill_type">
                        <Select optionlabelprop="label">
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
                        <Select optionlabelprop="label">
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
                        <Select optionlabelprop="label">
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
                  <Row gutter={16}>
                    <Form.Item name="bill_image_url">
                      <Upload
                        listType="picture-card"
                        action="http://42.114.177.31:4000/api/files"
                        fileList={fileList}
                        onPreview={handlePreview}
                        onChange={handleChange}
                      >
                        {uploadButton}
                      </Upload>
                    </Form.Item>
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
                        <Select optionlabelprop="label">
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
