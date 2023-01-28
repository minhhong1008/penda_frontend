//import từ ant.desgin và React
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
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// Liên quan upload ảnh vẫn của ản.desgin
import { PlusOutlined } from "@ant-design/icons";
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
//import từ api
import {
  get_Bill_table,
  post_Bill_update,
  get_Bill_employee,
} from "../../api/bill";
//import từ file dùng chung
import { showError, showSuccess } from "../../utils";
// import từ listselect
import { listselect_bill_owner, listselect_bill_work } from "./Bill_list";

/*  Đặt tên hàm và tên biến
- hàm lấy dữ liệu từ server: get_Bill_table, get_Bill_employee trả về data
- hàm post dữ liệu lên server: post_Bill_update
- Dữ liệu xử lý ở form dùng values
- gửi dữ liệu đi dùng postbody, trả về dùng data



*/
// HÀM CHÍNH TRONG TRANG
const Bill_table = () => {
  // Khai báo kho dữ liệu của andt.desin đầu tiên
  const { Option } = Select;
  
  const { RangePicker } = DatePicker;
  const month = dayjs().format("MM");
  const year = dayjs().format("YYYY");
  const countDay_last = dayjs(
    year + "-" + (parseInt(month) -1) + "-" + "01"
  ).daysInMonth();
  const countDay = dayjs().daysInMonth();
  const countDay_next = dayjs(
    year + "-" + (parseInt(month) + 1) + "-" + "01"
  ).daysInMonth();
  
  let { status } = useParams();
  // Khai báo kho dữ liệu lấy từ file dùng chung
  const dispatch = useDispatch();
  const history = useHistory();
  const { users_function, users_name } = useSelector((state) => state.auth);
  // Khai báo các kho dữ liệu từ các form từ : form, các phần tử của form date, select multil, note sau đó đến columns
  const [form] = Form.useForm();
  const [form_Product] = Form.useForm();
  const [filter_date_start, setFilter_date_start] = useState();
  const [data_Bill_info, setData_Bill_info] = useState();
  const [list_bill_employee, setList_bill_employee] = useState();
  const [lists_bill_work, setList_bill_work] = useState(listselect_bill_work);
  const [openModal, setOpenModal] = useState(false);
  const [data_Bill_table, setData_Bill_table] = useState();

  // Các hàm liên quan đến thao tác với giao diện nhưng chưa gửi data lên sever theo thứ tự: ngày tháng, select, note, onchange

  const rangePresets_date_start = [
    {
      label: "Default",
      value: [dayjs().add(-30, "d"), dayjs().add(30, "d")],
    },
    {
      label: "Tháng trước",
      value: [
        dayjs(year + "-" + (parseInt(month) - 1) + "-" + "01"),
        dayjs(year + "-" + (parseInt(month) - 1) + "-" + countDay_last),
      ],
    },
    {
      label: "Tháng này",
      value: [
        dayjs(year + "-" + month + "-" + "01"),
        dayjs(year + "-" + month + "-" + countDay),
      ],
    },
    {
      label: "Tháng sau",
      value: [
        dayjs(year + "-" + (parseInt(month) + 1) + "-" + "01"),
        dayjs(year + "-" + (parseInt(month) + 1) + "-" + countDay_next),
      ],
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

  const onChange_date_start = (dates, dateStrings) => {
    if (dates) {
      setFilter_date_start({
        from: dateStrings[0],
        to: dateStrings[1],
      });
    } else {
      console.log("Clear");
    }
  };

  const render_bill_type = (value) => {
    if (value == "Phiếu chi") {
      setList_bill_work([
        "Mua device, proxy & gia hạn",
        "Mua sim, phone & gia hạn",
        "Mua info",
        "Mua mail",
        "Thanh toán lương, thưởng hoa hồng",
        "Chi phí văn phòng",
        "Chi phí vận chuyển",
        "Chi phí checkout, tracking",
        "Chi phí Kicksold",
      ]);
    } else {
      setList_bill_work([
        "Thu tiền bán hàng",
        "Thu tiền bán tài nguyên",
        "Thu tiền khác",
        "Thu tiền đi vay",
      ]);
    }
  };

  const render_bill_payment = () => {
    let bill_payment = form.getFieldValue("bill_payment");
    let bill_total = form_Product.getFieldValue("bill_total");
    form.setFieldValue("bill_debt", bill_payment - bill_total);
  };

  // Hàm tính tổng tiền:
  const render_bill_total = () => {
    let quantity = form_Product.getFieldValue("bill_number");
    let price = form_Product.getFieldValue("bill_price");
    let bill_total = quantity * price;
    form_Product.setFieldValue("bill_total", bill_total);
    form.setFieldValue("bill_payment", bill_total);
    let payment = form.getFieldValue("bill_payment");
    let debt = payment - bill_total;
    form.setFieldValue("bill_debt", debt);
  };

  const onClose = () => {
    setOpenModal(false);
  };

  // Các hàm liên quan đến gọi dữ liệu từ giao diện và gửi dữ liệu lên server

  const onFinish = async (values) => {
    let bill_file = [];
    fileList?.map((item) => {
      let file_url = "";
      if (item?.xhr?.response) {
        file_url = JSON.parse(item.xhr.response).url;
      } else {
        file_url = item.url;
      }
      bill_file.push(file_url);
    });
    if (values.bill_date != null) {
      values.bill_date = dayjs(values.bill_date).format("YYYY-MM-DD");
      values.bill_expiry_date = dayjs(values.bill_expiry_date).format(
        "YYYY-MM-DD"
      );

      let values_Product = form_Product.getFieldsValue();
      let postbody = {
        ...values,
        ...values_Product,
        bill_image_url: bill_file.length > 0 ? bill_file.join(",") : "",
        _id: data_Bill_info._id,
      };
      let response = await post_Bill_update(postbody);
      if (response.status == 200) {
        showSuccess("Sửa thành công");
      } else {
        showError("Sửa không thành công");
      }
    }
  };

  // Hàm gọi dữ liệu về từ database từ dữ liệu nhỏ đến dữ liệu lớn

  const getSelect_bill_employee = async () => {
    const res = await get_Bill_employee();
    let data = res.data;
    setList_bill_employee(data);
  };

  const onClick_Filter_date_start = async () => {
    let { data } = await get_Bill_table({
      status: status,
      ...filter_date_start,
    });
    setData_Bill_table(data);
  };

  const getData_Bill_table = async () => {
    let filter_date = [
      dayjs()
        .add(-30, "d")
        .format("YYYY-MM-DD"),
      dayjs()
        .add(+30, "d")
        .format("YYYY-MM-DD"),
    ];
    setFilter_date_start({
      from: filter_date[0],
      to: filter_date[1],
    });

    let { data } = await get_Bill_table({
      status: status,
      from: filter_date[0],
      to: filter_date[1],
    });
    setData_Bill_table(data);
  };

  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  // Những hàm được gọi trong useEffect sẽ được chạy lần đầu khi vào trang
  useEffect(() => {
    getData_Bill_table();
    getSelect_bill_employee();
  }, []);

  // Các hàm xử lý giao diện từ ant.desgin bao gồm columns
  const columns = [
    {
      title: "Stt",
      dataIndex: "Stt",
      width: 50,
      render: (text, record, index) => {
        return index + 1;
      },
      responsive: ["md"],
    },
    {
      title: "Ngày tháng",
      dataIndex: "bill_date",
      responsive: ["md"],
    },
    {
      title: "Phòng ban",
      dataIndex: "bill_owner",
      responsive: ["md"],
    },
    {
      title: "Công việc",
      dataIndex: "bill_work",
      ellipsis: true,
    },
    {
      title: "Nội dung",
      dataIndex: "bill_content",
      responsive: ["md"],
      ellipsis: true,
    },
    {
      title: "Số lượng",
      dataIndex: "bill_number",
      responsive: ["md"],
    },
    {
      title: "Giá tiền",
      dataIndex: "bill_price",
      render: (text) => VND.format(text),
      responsive: ["md"],
    },
    {
      title: "Thành tiền",
      dataIndex: "bill_total",
      render: (text) => VND.format(text),
      ellipsis: true,
    },
    {
      title: "Công nợ",
      dataIndex: "bill_debt",
      render: (text) => VND.format(text),
      responsive: ["md"],
    },
    {
      title: "Thời hạn",
      dataIndex: "bill_expiry_date",
      responsive: ["md"],
    },
    {
      title: "Tính năng",
      dataIndex: "",
      render: (record) => (
        <div>
          <Button
            onClick={() => {
              record.bill_date = dayjs(record.bill_date);
              record.bill_expiry_date = dayjs(record.bill_expiry_date);
              setData_Bill_info(record);
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
                setFile_image(dataImage);
              }
              setOpenModal(true);
            }}
          >
            Sửa
          </Button>
        </div>
      ),
      ellipsis: true,
    },
  ];
  // Upload ảnh là mục khó nhớ nên để vào 1 chỗ: để upload ảnh cần copy 4 chỗ
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFile_image] = useState();

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
    setFile_image(fileList);
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
  return (
    <div>
      {["Giám đốc","Phó Giám đốc","Trưởng phòng"].indexOf(
        users_function
      ) !== -1 ? (
        <Card>
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="BÁO CÁO CHI TIẾT" key="1">
              <Row  gutter={[24, 0]}>
                <Col xs={24} xl={24} className="mb-24">
                  <Card
                    title={
                      <strong
                        style={{
                          color: "#1890FD",
                        }}
                      >
                        {decodeURIComponent(status)
                          .split("?action=")[0]
                          .trim()}
                      </strong>
                    }
                    extra={
                      <>
                        <Row  gutter={[24, 0]}>
                          <Col xs={16} xl={16} className="mb-24">
                            <RangePicker
                              size="large"
                              presets={rangePresets_date_start}
                              defaultValue={[
                                dayjs().add(-30, "d"),
                                dayjs().add(+30, "d"),
                              ]}
                              onChange={onChange_date_start}
                            />
                          </Col>
                          <Col xs={12} xl={8} className="mb-24">
                            <Button
                              style={{
                                background: "#1890FD",
                                color: "white",
                              }}
                              onClick={() => onClick_Filter_date_start()}
                            >
                              Kết quả
                            </Button>
                          </Col>
                        </Row>
                      </>
                    }
                  >
                    <Table columns={columns} dataSource={data_Bill_table} />
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
            title={data_Bill_info?.bill_type}
            onCancel={onClose}
            onOk={() => form.submit()}
          >
            <Row  gutter={[24, 0]} >
              <Col xs={24} xl={12} className="mb-24">
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
                    initialValues={data_Bill_info}
                  >
                    <Row  gutter={[24, 0]}>
                      <Col xs={12} xl={8} className="mb-24">
                        <Form.Item label="Ngày tháng" name="bill_date">
                          <DatePicker style={{ float: "right" }} />
                        </Form.Item>
                      </Col>
                      <Col xs={12} xl={8} className="mb-24">
                        <Form.Item label="Hạng mục" name="bill_type">
                          <Select
                            optionlabelprop="label"
                            onChange={render_bill_type}
                          >
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
                      <Col xs={12} xl={8} className="mb-24">
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
                    </Row>
                    <Row  gutter={[24, 0]}>
                      <Col xs={12} xl={8} className="mb-24">
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
                      <Col xs={12} xl={8} className="mb-24">
                        <Form.Item label="Nhân viên" name="bill_employee">
                          <Select
                            style={{ width: "100%" }}
                            placeholder="select one item"
                            optionlabelprop="label"
                            size="large"
                          >
                            {list_bill_employee?.map((item) => {
                              return (
                                <Option value={item} label={item}>
                                  <div className="demo-option-label-item">
                                    {item}
                                  </div>
                                </Option>
                              );
                            })}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col xs={12} xl={8} className="mb-24">
                        <Form.Item label="NCC" name="bill_supplier">
                          <Input placeholder="Antidetect" />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row  gutter={[24, 0]}>
                      <Col xs={12} xl={8} className="mb-24">
                        <Form.Item label="Điện thoại" name="bill_contact_phone">
                          <Input placeholder="antidetect.online" />
                        </Form.Item>
                      </Col>
                      <Col xs={12} xl={8} className="mb-24">
                        <Form.Item label="Web" name="bill_contact_social1">
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col xs={12} xl={8} className="mb-24">
                        <Form.Item label="Social" name="bill_contact_social2">
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col xs={12} xl={8} className="mb-24">
                        <Form.Item label="Thanh toán" name="bill_payment">
                          <InputNumber
                            style={{
                              width: "100%",
                            }}
                            step="10000"
                            formatter={(value) =>
                              ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                            }
                            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                            onChange={render_bill_payment}
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={12} xl={8} className="mb-24">
                        <Form.Item label="Công nợ" name="bill_debt">
                          <InputNumber
                            style={{
                              width: "100%",
                            }}
                            formatter={(value) =>
                              ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                            }
                            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={12} xl={8} className="mb-24">
                        <Form.Item label="Thời hạn" name="bill_expiry_date">
                          <DatePicker style={{ float: "right" }} />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row  gutter={[24, 0]}>
                      <Col span={24}>
                        <Form.Item label="Ghi chú" name="bill_note">
                          <Input placeholder="input here" />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row  gutter={[24, 0]}>
                      <Form.Item name="bill_image_url">
                        <Upload
                          multiple
                          listType="picture-card"
                          action="http://backend.penda.vn/api/files"
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
              <Col xs={24} xl={12} className="mb-24">
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
                    form={form_Product}
                    initialValues={data_Bill_info}
                    name="basic"
                    autoComplete="off"
                    size="large"
                  >
                    <Row  gutter={[24, 0]}>
                      <Col xs={24} xl={12} className="mb-24">
                        <Form.Item label="Công việc" name="bill_work">
                          <Select optionlabelprop="label">
                            {lists_bill_work.map((item, index) => {
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
                      <Col xs={24} xl={12} className="mb-24">
                        <Form.Item label="Nội dung" name="bill_content">
                          <Input placeholder="Mua key tháng 12" />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row  gutter={[24, 0]}>
                      <Col xs={12} xl={6} className="mb-24">
                        <Form.Item label="Số lượng" name="bill_number">
                          <InputNumber
                            size="large"
                            placeholder="1000"
                            onChange={render_bill_total}
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={12} xl={9} className="mb-24">
                        <Form.Item label="Giá tiền" name="bill_price">
                          <InputNumber
                            style={{
                              width: "100%",
                            }}
                            step="10000"
                            size="large"
                            formatter={(value) =>
                              ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                            }
                            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                            onChange={render_bill_total}
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={12} xl={9} className="mb-24">
                        <Form.Item label="Thành tiền" name="bill_total">
                          <InputNumber
                            style={{
                              width: "100%",
                            }}
                            size="large"
                            formatter={(value) =>
                              ` ${value} đ`.replace(
                                /\B(?=(\d{3})+(?!\d))/g,
                                ","
                              )
                            }
                            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                            disabled
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form>
                </Card>
              </Col>
            </Row>
          </Modal>
        </Card>
      ) : null}
    </div>
  );
};

export default Bill_table;
