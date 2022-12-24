import {
  Button,
  Card,
  Tabs,
  Row,
  Col,
  Form,
  Input,
  DatePicker,
  Select,
  Modal,
  Avatar,
  List,
} from "antd";
import React, { useState } from "react";
// gửi dữ liệu lên và nhận về từ Back_end
import { createData, submitData } from "../../api/tooldata";
import { showError, showSuccess } from "../../utils";
// lấy dữ liệu về từ file list
import {
  listselect_ebay_block,
  listselect_ebay_type,
  listselect_ebay_owner,
  listselect_ebay_status,
  listselect_ebay_class,
} from "../Ebay/Ebay_list";
import {
  listselect_employee,
  listselect_processing,
  listselect_plan,
  listInfo,
  listselect_create_number,
  listselect_view_field,
} from "./Tooldata_list";

const Tooldata_info = () => {
  // Khai báo các kho dữ liệu
  const [form] = Form.useForm();
  const [noteValue, setNoteValue] = useState("");
  const [
    selectList_create_collection,
    setSelectList_create_collection,
  ] = useState(["device"]);

  // hiển thị lại list
  const changeSelectList_create_collection = (values) => {
    setSelectList_create_collection(values);
  };

  const handleChange_list_rowdata = (e) => {
    setNoteValue(e.target.value);
  };
  // Hàm để gửi dữ liệu đi
  const onFinish = async (values) => {
    let newValue = {
      ...values,
      view: values?.view ? values.view.join(",") : "",
      plan: values?.plan ? values.plan.join(",") : "",
      block: values?.block ? values.block.join(",") : "",
      processing: values?.processing ? values.processing.join(",") : "",
      type: values?.type ? values.type.join(",") : "",
      sell_status: values?.sell_status ? values.sell_status.join(",") : "",
      owner: values?.owner ? values.owner.join(",") : "",
      employee: values?.employee ? values.employee.join(",") : "",
      data: noteValue,
    };

    const { data } = createData(newValue, selectList_create_collection);

    showSuccess("Đã chạy");
  };

  const handleSubmitData = async () => {
    showSuccess("Đã chạy");
    const response = await submitData(selectList_create_collection);
  };
  // Hàm onChange khi click vào 1 item
  const onChange_create_type = (values) => {
    let fields = [
      "device_id",
      "proxy_id",
      "info_id",
      "mail_id",
      "sim_id",
      "payoneer_id",
      "paypal_id",
      "pingpong_id",
      "ebay_id",
      "etsy_id",
      "amazon_id",
      "shopee_id",
      "facebook_id",
      "tiktok_id",
    ];

    form.setFieldsValue({
      class: "Lớp 1",
      //owner: "Phòng sản xuất",
      view: fields,
    });
  };

  return (
    <Card title="NHẬP SỐ LIỆU ĐẦU VÀO">
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="TẠO TÀI KHOẢN " key="1">
          <Row gutter={16}>
            <Col span={12}>
              <Card
                title="TẠO TÀI KHOẢN : D_1000"
                extra={
                  <>
                    <Button
                      style={{
                        background: "#18a689",
                        color: "white",
                      }}
                      onClick={() => form.submit()}
                    >
                      Tạo tài khoản
                    </Button>
                    <Button onClick={() => handleSubmitData()}>
                      Ghép dữ liệu
                    </Button>
                  </>
                }
              >
                <Form
                  form={form}
                  name="form-create"
                  onFinish={onFinish}
                  autoComplete="off"
                >
                  <Row gutter={16}>
                    <Col span={8}>
                      <Form.Item label="Tạo loại" name="create_type">
                        <Select
                          //mode="multiple"
                          style={{ width: "100%" }}
                          optionLabelProp="label"
                          size="large"
                          onChange={onChange_create_type}
                        >
                          <Option value="Tạo mới" label="Tạo mới">
                            <div className="demo-option-label-item">
                              Tạo Mới
                            </div>
                          </Option>
                          <Option value="Tạo cũ" label="Tạo cũ">
                            <div className="demo-option-label-item">Tạo cũ</div>
                          </Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        label="Tạo collection"
                        name="create_collection"
                      >
                        <Select
                          mode="multiple"
                          style={{ width: "100%" }}
                          placeholder="select one item"
                          optionLabelProp="label"
                          size="large"
                          onChange={changeSelectList_create_collection}
                          value={selectList_create_collection}
                        >
                          {listInfo.map((item) => {
                            return (
                              <Option
                                value={item.title.toLocaleLowerCase()}
                                label={item.title}
                              >
                                <div className="demo-option-label-item">
                                  {item.title}
                                </div>
                              </Option>
                            );
                          })}
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item label="List view *" name="view">
                    <Select
                      mode="multiple"
                      style={{ width: "100%" }}
                      placeholder="select one item"
                      optionLabelProp="label"
                      size="large"
                      // defaultValue={"device_id"}
                      //onChange={onChange_view}
                    >
                      {listselect_view_field.map((item) => {
                        return (
                          <Option value={item.value} label={item.value}>
                            <div className="demo-option-label-item">
                              {item.value}
                            </div>
                          </Option>
                        );
                      })}
                    </Select>
                  </Form.Item>

                  <Form.Item label="Quy trình *" name="plan">
                    <Select
                      mode="multiple"
                      style={{ width: "100%" }}
                      placeholder="select one item"
                      optionLabelProp="label"
                      size="large"
                      classNamePrefix="select"
                    >
                      {listselect_plan.map((item, index) => {
                        return (
                          <Option value={item} label={item} key={index}>
                            <div className="demo-option-label-item">{item}</div>
                          </Option>
                        );
                      })}
                    </Select>
                  </Form.Item>

                  <Form.Item label="Block *" name="block">
                    <Select
                      mode="multiple"
                      style={{ width: "100%" }}
                      placeholder="select one item"
                      optionLabelProp="label"
                      size="large"
                      classNamePrefix="select"
                    >
                      {listselect_ebay_block.map((item, index) => {
                        return (
                          <Option value={item} label={item} key={index}>
                            <div className="demo-option-label-item">{item}</div>
                          </Option>
                        );
                      })}
                    </Select>
                  </Form.Item>

                  <Form.Item label="Tiến trình" name="processing">
                    <Select
                      mode="multiple"
                      style={{ width: "100%" }}
                      placeholder="select one item"
                      optionLabelProp="label"
                      size="large"
                    >
                      {listselect_processing.map((item, index) => {
                        return (
                          <Option value={item} label={item} key={index}>
                            <div className="demo-option-label-item">{item}</div>
                          </Option>
                        );
                      })}
                    </Select>
                  </Form.Item>

                  <Form.Item label="Loại item *" name="type">
                    <Select
                      mode="multiple"
                      style={{ width: "100%" }}
                      placeholder="select one item"
                      optionLabelProp="label"
                      size="large"
                    >
                      {listselect_ebay_type.map((item, index) => {
                        return (
                          <Option value={item} label={item} key={index}>
                            <div className="demo-option-label-item">{item}</div>
                          </Option>
                        );
                      })}
                    </Select>
                  </Form.Item>

                  <Form.Item label="TT Bán" name="sell_status">
                    <Select
                      mode="multiple"
                      style={{ width: "100%" }}
                      placeholder="select one item"
                      optionLabelProp="label"
                      size="large"
                    >
                      <Option value="Đang thực hiện" label="Đang thực hiện">
                        <div className="demo-option-label-item">
                          Đang thực hiện
                        </div>
                      </Option>
                    </Select>
                  </Form.Item>

                  <Form.Item label="Sở hữu *" name="owner">
                    <Select
                      mode="multiple"
                      style={{ width: "100%" }}
                      placeholder="select one item"
                      optionLabelProp="label"
                      size="large"
                    >
                      {listselect_ebay_owner.map((item, index) => {
                        return (
                          <Option value={item} label={item} key={index}>
                            <div className="demo-option-label-item">{item}</div>
                          </Option>
                        );
                      })}
                    </Select>
                  </Form.Item>

                  <Form.Item label="Nhân viên *" name="employee">
                    <Select
                      mode="multiple"
                      style={{ width: "100%" }}
                      placeholder="select one item"
                      optionLabelProp="label"
                      size="large"
                    >
                      {listselect_employee.map((item, index) => {
                        return (
                          <Option value={item} label={item} key={index}>
                            <div className="demo-option-label-item">{item}</div>
                          </Option>
                        );
                      })}
                    </Select>
                  </Form.Item>

                  <Row gutter={16}>
                    <Col span={8}>
                      <Form.Item label="Trạng thái *" name="status">
                        <Select
                          //mode="multiple"
                          style={{ width: "100%" }}
                          optionLabelProp="label"
                          size="large"
                        >
                          {listselect_ebay_status.map((item, index) => {
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
                      <Form.Item label="Lớp ebay *" name="class">
                        <Select
                          //mode="multiple"
                          style={{ width: "100%" }}
                          optionLabelProp="label"
                          size="large"
                        >
                          {listselect_ebay_class.map((item, index) => {
                            return (
                              <Option
                                value={item.value}
                                label={item.title}
                                key={index}
                              >
                                <div className="demo-option-label-item">
                                  {item.title}
                                </div>
                              </Option>
                            );
                          })}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label="Số lượng" name="create_number">
                        <Select
                          //mode="multiple"
                          style={{ width: "100%" }}
                          optionLabelProp="label"
                          size="large"
                          type="number"
                        >
                          {listselect_create_number.map((item, index) => {
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
                  </Row>
                </Form>
              </Card>
            </Col>
            <Col span={12}>
              <Card
                title="NHẬP DỮ LIỆU"
                extra={
                  <>
                    <Button onClick>Tạo tài khoản</Button>
                    <Button onClick>Ghép dữ liệu</Button>
                  </>
                }
              >
                <Form
                  form={form}
                  name="form-create"
                  onFinish={onFinish}
                  autoComplete="off"
                >
                  <Row gutter={16}>
                    <Col span={6}>
                      <Form.Item label="Số lượng" name="create_number">
                        <Select
                          //mode="multiple"
                          style={{ width: "100%" }}
                          optionLabelProp="label"
                          size="large"
                        >
                          {listselect_create_number.map((item, index) => {
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
                      <Button onClick>Upload excel</Button>
                    </Col>
                  </Row>
                  <Form.Item label="List data" name="list_rowdata">
                    <Input.TextArea
                      value={noteValue}
                      onChange={handleChange_list_rowdata}
                      rows={20}
                    ></Input.TextArea>
                  </Form.Item>
                </Form>
              </Card>
            </Col>
          </Row>
        </Tabs.TabPane>
        <Tabs.TabPane tab="XỬ LÝ DỮ LIỆU" key="2"></Tabs.TabPane>
        <Tabs.TabPane tab="XỬ LÝ ẢNH" key="3"></Tabs.TabPane>
        <Tabs.TabPane tab="HƯỚNG DẪN NHÂN VIÊN" key="4">
          <p>
            TH1 - Tạo tài khoản mới: Tạo mới 1000 tài khoản device, Info, Bank,
            Sim, Mail, Payoneer, Etsy... cùng 1 lúc
          </p>
          <br></br>
          <p>
            TH2 - Tạo thêm tài khoản (vd ebay, facebook vào bộ tài khoản có sẵn)
          </p>
          <br></br>
          <p>
            minhshopebay3|Niceday893|ebay chất quá3|10003|20 item3|20 sold3| 10
            feedback3
          </p>
          <br></br>
          <p>
            Nữ|25/7/1998|Minh Hằng|2654568888|2654568888|Phúc Yên, Vĩnh
            Phúc|10000|Cầu Giấy, Hà Nội|Nốt ruồi mép
            phải|25/9/2039|25/9/2021|18/12/2022
          </p>
        </Tabs.TabPane>
        <Tabs.TabPane tab="HƯỚNG DẪN QUẢN LÝ" key="5">
          <p>
            TH1 - Tạo tài khoản mới: Tạo mới 1000 tài khoản device, Info, Bank,
            Sim, Mail, Payoneer, Etsy... cùng 1 lúc
          </p>
        </Tabs.TabPane>
        <Tabs.TabPane tab="HƯỚNG DẪN CODE" key="6">
          <p>Thuật toán là gì?</p>
          <p>Tự động xóa dòng trống</p>
          <br></br>
          <p>Sử dụng các hàm chính nào</p>
        </Tabs.TabPane>
      </Tabs>
    </Card>
  );
};

export default Tooldata_info;

/* placeholder=" Hướng dẫn nhập liệu
              Nhập ebay, etsy, sim, mail....
              user item|password item |detail item|limit item|item item|Sold item| Feedback item
              minhshopebay|Niceday89|ebay chất|1000|20 item|20 sold| 10 feedback
              Nhập Info:
              giới tính|ngày sinh|họ tên|cccd|ssn|quê quán|coce|thường trú|đặc điểm|có giá trị đến|ngày làm cccd|ngày nhập info
              Nam|25/7/1998|Hoàng Kiều|26545654654|26545654654|Phúc Yên, Vĩnh Phúc|10000|Cầu Giấy, Hà Nội|Nốt ruồi mép trái|25/9/2040|25/9/2040|17/12/2022
              " */
