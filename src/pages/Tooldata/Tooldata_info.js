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
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// gửi dữ liệu lên và nhận về từ Back_end
import { createData, getEmployee } from "../../api/tooldata";
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
  listselect_processing,
  listselect_plan,
  listInfo,
  listselect_view_field,
} from "./Tooldata_list";

const Tooldata_info = () => {
  // Khai báo các kho dữ liệu
  const [form] = Form.useForm();
  const { users_function } = useSelector((state) => state.auth);
  const [noteValue, setNoteValue] = useState("");
  const [
    selectList_create_collection,
    setSelectList_create_collection,
  ] = useState(["device"]);

  const [listselect_employee, setList_employee] = useState();

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

  // Hàm gọi dữ liệu về từ database
  const gettooldata = async () => {
    const res = await getEmployee();
    let data = res.data;
    setList_employee(data);
  };
  //  Những hàm được gọi trong useEffect sẽ được chạy lần đầu khi vào trang
  useEffect(() => {
    gettooldata();
  }, []);

  // Hàm onChange khi click vào 1 item
  const onChange_view = (values) => {
    let view = [
      "device_id",
      "proxy_id",
      "info_id",
      "mail_id",
      "sim_id",
      "bank_id",
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
    let plan = [
      "PC",
      "Antidetect",
      "Windows 10",
      "Chrome",
      "USB 4G",
      "Info real",
      "Sim real",
      "Bank real",
      "Quy trình 1",
    ];
    let block = ["Team 1"];
    let processing = ["New"];
    let sell_status = ["Đang thực hiện"];
    let type = ["VN"];
    let owner = ["Phòng sản xuất"];
    form.setFieldsValue({
      class: "Lớp 1",
      view: view,
      plan: plan,
      block: block,
      processing: processing,
      type: type,
      sell_status: sell_status,
      owner: owner,
      status: "Live",
    });
  };

  return (
    <div>
      {[
        "Phó phòng",
        "Tổ trưởng",
        "Tổ phó",
        "Chuyên viên",
        "Nhân viên",
        "Tập sự",
        "Thử việc",
      ].indexOf(users_function) == -1 ? (
        <Card title="NHẬP SỐ LIỆU ĐẦU VÀO">
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="TẠO TÀI KHOẢN " key="1">
              <Row gutter={16}>
                <Col span={12}>
                  <Card
                    title="TẠO TÀI KHOẢN :"
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
                      </>
                    }
                  >
                    <Form
                      form={form}
                      name="form-create"
                      onFinish={onFinish}
                      autoComplete="off"
                      size="large"
                    >
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

                      <Form.Item label="List view *" name="view">
                        <Select
                          mode="multiple"
                          style={{ width: "100%" }}
                          placeholder="select one item"
                          optionLabelProp="label"
                          size="large"
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
                                <div className="demo-option-label-item">
                                  {item}
                                </div>
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
                                <div className="demo-option-label-item">
                                  {item}
                                </div>
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
                                <div className="demo-option-label-item">
                                  {item}
                                </div>
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
                                <div className="demo-option-label-item">
                                  {item}
                                </div>
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
                          onChange={onChange_view}
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
                                <div className="demo-option-label-item">
                                  {item}
                                </div>
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
                          {listselect_employee?.map((item) => {
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
                      </Row>
                    </Form>
                  </Card>
                </Col>
                <Col span={12}>
                  <Card title="NHẬP DỮ LIỆU">
                    <Form
                      form={form}
                      name="form-create"
                      onFinish={onFinish}
                      autoComplete="off"
                    >
                      <Form.Item label="List data" name="list_rowdata">
                        <Input.TextArea
                          value={noteValue}
                          placeholder="Etsy id|Etsy User|Etsy Pass|Etsy chi tiết|Etsy limit|Etsy items|Etsy Sold|Etsy Fb"
                          onChange={handleChange_list_rowdata}
                          rows={15}
                        ></Input.TextArea>
                      </Form.Item>
                    </Form>
                  </Card>
                </Col>
              </Row>
            </Tabs.TabPane>
            <Tabs.TabPane tab="XỬ LÝ DỮ LIỆU" key="2"></Tabs.TabPane>
            <Tabs.TabPane tab="XỬ LÝ ẢNH" key="3"></Tabs.TabPane>
            <Tabs.TabPane tab="HƯỚNG DẪN" key="4">
              <p>
                VD1: Tạo mới mỗi loại 100 tài khoản và liên kết các tài khoản
                với nhau:
              </p>
              <p>
                <strong>
                  Bước 1: Tạo liên kết các loại tài khoản với nhau
                </strong>
              </p>
              <p>
                - Chọn Tạo collection : CREATE, Sau đó muốn tạo tài khoản nào
                thì chọn tài khoản đó (VD DEVICE,PROXY,...,TIKTOK)
              </p>
              <p>
                - Điền vào list data mã id theo dòng (VD E_1,E_2,E_3,...,E_100)
              </p>
              <p>- Chọn TT bán: Tự động điền các trường còn lại</p>
              <p>
                - Ấn nút tạo tài khoản , sau đó vào từng thư mục tài khoản để
                kiểm tra tài khoản đó được tạo ra ở Lớp 1
              </p>
              <br></br>
              <p>
                <strong>
                  Bước 2: Update dữ liệu vào từng loại tài khoản (VD ETSY)
                </strong>
              </p>
              <p>
                - Chọn Tạo collection: UPDATE:Sau đó muốn update tài khoản nào
                thì chọn tài khoản đó(VD ETSY)
              </p>
              <p>- Điền các trường khác theo mong muốn</p>
              <p>
                - Điền list data: Mỗi dòng là 1 tài khoản tương ứng. Cấu trúc
                của mỗi dòng (VD: Etsy_id|Etsy User|Etsy Pass|Etsy chi tiết|Etsy
                limit|Etsy items|Etsy Sold|Etsy Fb) , thứ tự tương ứng theo
                trình tự input từ trái qua phải, từ trên xuống dưới
              </p>

              <p>
                - Ấn nút tạo tài khoản , sau đó vào từng thư mục tài khoản để
                kiểm tra tài khoản đó đã update thông tin chuẩn chưa
              </p>
              <br></br>
              <p></p>
            </Tabs.TabPane>
          </Tabs>
        </Card>
      ) : null}
    </div>
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
