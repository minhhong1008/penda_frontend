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
import { createData, submitData } from "../../api/create";
import { showError, showSuccess } from "../../utils";
import {
  listselect_view_acc,
  listselect_ebay_plan,
  listselect_ebay_block,
  listselect_ebay_processing,
  listselect_ebay_error,
  listselect_ebay_type,
  listselect_ebay_sell_status,
  listselect_ebay_owner,
  listselect_ebay_status,
  listselect_ebay_class,
} from "../Ebay/Ebay_list";
import { listselect_employee,listselect_processing,listselect_plan } from "./Create_list";
const Create = () => {
  const [form] = Form.useForm();

  const [noteValue, setNoteValue] = useState("");
  const [selectListInfo, setSelectListInfo] = useState(["device"]);

  const listInfo = [
    {
      title: "DEVICE",
      value: "",
    },
    {
      title: "PROXY",
      value: "",
    },
    {
      title: "INFO",
      value: "",
    },
    {
      title: "MAIL",
      value: "",
    },
    {
      title: "SIM",
      value: "",
    },
    {
      title: "BANK",
      value: "",
    },
    {
      title: "PAYONEER",
      value: "",
    },
    {
      title: "PAYPAL",
      value: "",
    },

    {
      title: "PINGPONG",
      value: "",
    },
    {
      title: "EBAY",
      value: "",
    },
    {
      title: "ETSY",
      value: "",
    },
    {
      title: "AMAZON",
      value: "",
    },
    {
      title: "SHOPEE",
      value: "",
    },

    {
      title: "FACEBOOK",
      value: "",
    },
    {
      title: "TIKTOK",
      value: "",
    },
  ];

  const changeSelectListInfo = (values) => {
    setSelectListInfo(values);
  };

  const handleChangeNote = (e) => {
    setNoteValue(e.target.value);
  };

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

    const { data } = createData(newValue, selectListInfo);

    showSuccess("Đã chạy");
  };

  const handleSubmitData = async () => {
    showSuccess("Đã chạy");
    const response = await submitData(selectListInfo);
    /* if (response.status == 204) {
      showSuccess("Đã xong");
    } else {
      showError("ghép dữ liệu không thành công");
    } */
  };

  const onChangeTypeAcc = (values) => {
   
    form.setFieldsValue({
      class: "Lớp 1",
      ebay_owner: "Phòng sản xuất",
    });
 
  };

  return (
    <Card
      title="NHẬP SỐ LIỆU ĐẦU VÀO"
      
    >
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="THÔNG TIN TÀI KHOẢN" key="1" >
          <Row gutter={16}>
            <Col span={12}>
              <Card title="THÔNG TIN ITEM" extra={
        <>
          <Button onClick={() => form.submit("Tạo tài khoản")}>Tạo tài khoản</Button>
          <Button onClick={() => handleSubmitData()}>Ghép dữ liệu</Button>
        </>
      }>
                <Form
                  form={form}
                  name="form-create"
                  onFinish={onFinish}
                  autoComplete="off"
                >
                  <Row gutter={16}>
                    <Select
                      style={{ width: "100%" }}
                      placeholder="select one item"
                      optionLabelProp="label"
                      onChange={changeSelectListInfo}
                      value={selectListInfo}
                      size="large"
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
                  </Row>
                  <br></br>

                  <Form.Item label="List view *" name="view">
                    <Select
                      mode="multiple"
                      style={{ width: "100%" }}
                      placeholder="select one item"
                      optionLabelProp="label"
                      onChange={onChangeTypeAcc}
                      size="large"
                    >
                      <Option value="device_id" label="device">
                        <div className="demo-option-label-item">device</div>
                      </Option>
                      <Option value="proxy_id" label="proxy">
                        <div className="demo-option-label-item">proxy</div>
                      </Option>
                      <Option value="info_id" label="info">
                        <div className="demo-option-label-item">info</div>
                      </Option>
                      <Option value="mail_id" label="mail">
                        <div className="demo-option-label-item">mail</div>
                      </Option>
                      <Option value="sim_id" label="sim">
                        <div className="demo-option-label-item">sim</div>
                      </Option>
                      <Option value="bank_id" label="bank">
                        <div className="demo-option-label-item">bank</div>
                      </Option>
                      <Option value="payoneer_id" label="payoneer">
                        <div className="demo-option-label-item">payoneer</div>
                      </Option>
                      <Option value="paypal_id" label="paypal">
                        <div className="demo-option-label-item">paypal</div>
                      </Option>
                      <Option value="pingpong_id" label="pingpong">
                        <div className="demo-option-label-item">pingpong</div>
                      </Option>
                      <Option value="ebay_id" label="ebay">
                        <div className="demo-option-label-item">ebay</div>
                      </Option>
                      <Option value="etsy_id" label="etsy">
                        <div className="demo-option-label-item">etsy</div>
                      </Option>
                      <Option value="amazon_id" label="amazon">
                        <div className="demo-option-label-item">amazon</div>
                      </Option>
                      <Option value="shopee_id" label="shopee">
                        <div className="demo-option-label-item">shopee</div>
                      </Option>
                      <Option value="facebook_id" label="facebook">
                        <div className="demo-option-label-item">facebook</div>
                      </Option>
                      <Option value="tiktok_id" label="tiktok">
                        <div className="demo-option-label-item">tiktok</div>
                      </Option>
                    </Select>
                  </Form.Item>

                  <Form.Item label="Quy trình *" name="plan">
                    <Select
                      mode="multiple"
                      style={{ width: "100%" }}
                      placeholder="select one item"
                      optionLabelProp="label"
                      classNamePrefix="select"
                      size="large"
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
                      classNamePrefix="select"
                      size="large"
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
                      <Option value="Chuẩn bị bán" label="Chuẩn bị bán">
                        <div className="demo-option-label-item">
                          Chuẩn bị bán
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
                    <Col span={12}>
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
                    <Col span={12}>
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
                  </Row>
                </Form>
              </Card>
            </Col>
            <Col span={12}>
              <Input.TextArea
                value={noteValue}
                placeholder=" Hướng dẫn nhập liệu
            Nhập ebay, etsy, sim, mail....
            user item|password item |detail item|limit item|item item|Sold item| Feedback item
            minhshopebay|Niceday89|ebay chất|1000|20 item|20 sold| 10 feedback
            Nhập Info:
            giới tính|ngày sinh|họ tên|cccd|ssn|quê quán|coce|thường trú|đặc điểm|có giá trị đến|ngày làm cccd|ngày nhập info
            Nam|25/7/1998|Hoàng Kiều|26545654654|26545654654|Phúc Yên, Vĩnh Phúc|10000|Cầu Giấy, Hà Nội|Nốt ruồi mép trái|25/9/2040|25/9/2040|17/12/2022
            "
                onChange={handleChangeNote}
                rows={24}
              ></Input.TextArea>
            </Col>
          </Row>
        </Tabs.TabPane>

        <Tabs.TabPane tab="HƯỚNG DẪN" key="3">
          <p>
            minhshopebay1|Niceday891|ebay chất quá1|10001|20 item1|20 sold1| 10
            feedback1
          </p>
          <p>
            minhshopebay2|Niceday892|ebay chất quá2|10002|20 item2|20 sold2| 10
            feedback2
          </p>
          <p>
            minhshopebay3|Niceday893|ebay chất quá3|10003|20 item3|20 sold3| 10
            feedback3
          </p>
          <br></br>
          <p>
            Nam|25/7/1998|Hoàng Kiều|26545654654|26545654654|Phúc Yên, Vĩnh
            Phúc|10000|Cầu Giấy, Hà Nội|Nốt ruồi mép
            trái|25/9/2040|25/9/2022|17/12/2022
          </p>
          <p>
            Nữ|25/7/1998|Minh Hằng|2654568888|2654568888|Phúc Yên, Vĩnh
            Phúc|10000|Cầu Giấy, Hà Nội|Nốt ruồi mép
            phải|25/9/2039|25/9/2021|18/12/2022
          </p>
        </Tabs.TabPane>
      </Tabs>
    </Card>
  );
};

export default Create;
