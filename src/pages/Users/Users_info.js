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
  Timeline,
  Alert,
  Space,
  Upload,
  Modal,
} from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { getusersInfo, updateusersInfo } from "../../api/users/index";
import { HuongDanUsers_info } from "./Users_list";
import { showError, showSuccess } from "../../utils";
import { useSelector } from "react-redux";
// Liên quan upload ảnh
import { PlusOutlined } from "@ant-design/icons";

// Khi

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const Users_info = () => {
  // Khi lưu lại thì dùng JSON.stringfy(user_function) để chuyển về dạng string
  // Khi gọi từ database về dùng JSON.parse(user_function) để truyển lại về JSON
  const user_testfunction = [
    {
      title: "Chức năng",
      value: [
        {
          title: "Chức năng 1",
          content: "Nội dung chức năng 1",
        },
        {
          title: "Chức năng 2",
          content: "Nội dung chức năng 2",
        },
        {
          title: "Chức năng 3",
          content: "Nội dung chức năng 3",
        },
      ],
    },
    {
      title: "Nhiệm vụ",
      value: [
        {
          title: "Nhiệm vụ 1",
          content: "Nội dung chức năng 1",
        },
        {
          title: "Nhiệm vụ 2",
          content: "Nội dung chức năng 2",
        },
        {
          title: "Nhiệm vụ 3",
          content: "Nội dung chức năng 3",
        },
      ],
    },
  ];

  const { Option } = Select;
  const { users_function, users_name } = useSelector((state) => state.auth);
  // Lấy ID từ trên param url
  let { id } = useParams();
  // Khai báo các kho dữ liệu
  const [usersData, setusersData] = useState({});
  const [dateData, setDateData] = useState();
  const [info, setInfo] = useState();

  const [noteValue, setNoteValue] = useState("");

  // Khai báo kho dữ liệu của các form
  const [form] = Form.useForm();

  const [dateForm] = Form.useForm();

  // Hàm để gửi dữ liệu đi
  const onFinish = async (values) => {
    let users_file = [];
    fileList?.map((item) => {
      let fileUrl = "";
      if (item?.xhr?.response) {
        fileUrl = JSON.parse(item.xhr.response).url;
      } else {
        fileUrl = item.url;
      }
      users_file.push(fileUrl);
    });

    const newValue = {
      ...info,
      ...values,
      users_image_url: users_file.length > 0 ? users_file.join(",") : "",
      //users_level: values?.users_level ? values.users_level.join(",") : "",
      manage_view: values?.manage_view ? values.manage_view.join(",") : "",
      users_function: values?.users_function
        ? values.users_function.join(",")
        : "",
      users_owner: values?.users_owner ? values.users_owner.join(",") : "",
      //users_status: values?.users_status ? values.users_status.join(",") : "",
      //users_class: values?.users_class ? values.users_class.join(",") : "",

      users_date_start: dateData?.users_date_start
        ? dayjs(dateData.users_date_start).format("YYYY-MM-DD")
        : "",
      users_date_verify: dateData?.users_date_verify
        ? dayjs(dateData.users_date_verify).format("YYYY-MM-DD")
        : "",
      users_note: noteValue,
    };
    const response = await updateusersInfo(newValue, id);
    if (response.status == 200) {
      showSuccess("Sửa thành công");
    } else {
      showError("Sửa không thành công");
    }
  };
  // Hàm gể gửi dữ liệu date
  const onFinishDate = (values) => {
    setDateData(values);
  };
  // Hàm gửi dữ liệu từ form users
  const onFinishInfo = (values) => {
    setInfo(values);
  };
  // Hàm gọi dữ liệu về từ database
  const getInfousers = async () => {
    const { data } = await getusersInfo(id);
    const newData = {
      ...data,
      manage_view: data?.manage_view ? data.manage_view.split(",") : "",
      users_function: data?.users_function
        ? data.users_function.split(",")
        : "",
      users_owner: data?.users_owner ? data.users_owner.split(",") : "",
    };
    if (data?.users_image_url) {
      let dataImage = [];
      let imageArr = data.users_image_url.split(",");
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

    form.setFieldsValue(newData);
    //infoForm.setFieldsValue(newData);
    dateForm.setFieldsValue({
      users_date_start: dayjs(data.users_date_start),
      users_date_verify: dayjs(data.users_date_verify),
    });
    setInfo(newData);
    setNoteValue(data.users_note);

    //setSelectListInfo(data.list_view.split(","));
  };

  //  List danh sách các trường trong bảng DATE
  const listDate = [
    {
      title: "Ngày tạo",
      value: "users_date_start",
    },
    {
      title: "Ngày verify",
      value: "users_date_verify",
    },
  ];

  // Hàm để thay đổi dữ liệu của select list info
  const changeSelectListUsers = (values) => {
    setSelectListUsers(values);
  };

  // Hàm để thay đổi dữ liệu của note
  const handleChangeNote = (e) => {
    setNoteValue(e.target.value);
  };

  const [mode, setMode] = useState("left");
  const renderTimeLine = () => {
    let arr = [
      {
        value: "users_date_start",
        title: "Ngày vào làm",
      },
      {
        value: "users_date_verify",
        title: "Ngày tăng lương",
      },
      {
        value: "01/01/2023",
        title: "Up seller",
      },
      {
        value: "01/01/2023",
        title: "Up seller",
      },
      {
        value: "01/01/2023",
        title: "Up seller",
      },
    ];

    return (
      <Col span={24}>
        <Timeline mode={mode}>
          {arr.map((item, index) => {
            return (
              <Timeline.Item
                label={item.value}
                key={index}
                dot={
                  <ClockCircleOutlined
                    style={{
                      fontSize: "20px",
                    }}
                  />
                }
              >
                {item.title}
              </Timeline.Item>
            );
          })}
        </Timeline>
      </Col>
    );
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

  //  Những hàm được gọi trong useEffect sẽ được chạy lần đầu khi vào trang
  useEffect(() => {
    getInfousers();
  }, []);

  return (
    <div>
      {["Giám đốc", "Phó Giám đốc", "Trưởng phòng"].indexOf(users_function) !==
      -1 ? (
        <Card
          title={id}
          extra={<Button onClick={() => form.submit()}>Lưu thông tin</Button>}
        >
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="THÔNG TIN TÀI KHOẢN" key="1">
              <Row gutter={16}>
                <Col span={12}>
                  <Card
                    title="THÔNG TIN USER"
                    extra={
                      <Button onClick={() => form.submit()}>
                        Lưu thông tin
                      </Button>
                    }
                  >
                    <Form
                      form={form}
                      name="basic"
                      onFinish={onFinish}
                      initialValues={usersData}
                      autoComplete="off"
                    >
                      <Row gutter={16}>
                        <Col span={8}>
                          <Form.Item
                            label="Users id"
                            name="users_id"
                            rules={[
                              {
                                required: true,
                                message: "Hãy nhập info id!",
                              },
                            ]}
                          >
                            <Input disabled={true} placeholder="I_1000" />
                          </Form.Item>
                        </Col>
                        <Col span={8}>
                          <Form.Item label="Giới tính" name="users_sex">
                            <Input placeholder="Nam" />
                          </Form.Item>
                        </Col>
                        <Col span={8}>
                          <Form.Item
                            label="Ngày sinh"
                            name="usersdate_birthday"
                          >
                            <Input placeholder="27/7/1945" />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row gutter={16}>
                        <Col span={8}>
                          <Form.Item label="Họ tên" name="users_fullname">
                            <Input placeholder="Thế Minh Hồng" />
                          </Form.Item>
                        </Col>
                        <Col span={8}>
                          <Form.Item label="Passport" name="users_passport">
                            <Input placeholder="028094999999" />
                          </Form.Item>
                        </Col>
                        <Col span={8}>
                          <Form.Item label="SSN" name="users_ssn">
                            <Input placeholder="028094999999" />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row gutter={16}>
                        <Col span={18}>
                          <Form.Item label="Quê quán" name="users_origin">
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col span={6}>
                          <Form.Item label="code" name="users_code">
                            <Input />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row gutter={16}>
                        <Col span={24}>
                          <Form.Item
                            label="Nơi thường trú"
                            name="users_residence"
                          >
                            <Input placeholder="I_1000" />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row gutter={16}>
                        <Col span={8}>
                          <Form.Item
                            label="Có giá trị đến"
                            name="usersdate_expiry"
                          >
                            <Input placeholder="25/7/2041" />
                          </Form.Item>
                        </Col>
                        <Col span={8}>
                          <Form.Item label="Ngày CCCD" name="usersdate_start">
                            <Input placeholder="29/4/2021" />
                          </Form.Item>
                        </Col>
                        <Col span={8}>
                          <Form.Item
                            label="Ngày vào làm"
                            name="usersdate_begin"
                          >
                            <Input placeholder="25/12/2022" />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row gutter={16}>
                        <Col span={8}>
                          <Form.Item label="Users" name="users_name">
                            <Input placeholder="nguyenhoai" />
                          </Form.Item>
                        </Col>

                        <Col span={8}>
                          <Form.Item label="Password" name="users_passwords">
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col span={8}>
                          <Form.Item label="Biệt danh" name="users_aliases">
                            <Input placeholder="Nguyễn Hoài" />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row gutter={16}>
                        <Col span={8}>
                          <Form.Item label="Điện thoại" name="users_phone">
                            <Input placeholder="0994238888" />
                          </Form.Item>
                        </Col>
                        <Col span={8}>
                          <Form.Item label="Facebook" name="users_fb">
                            <Input placeholder="fb.com/theminhhong1008a" />
                          </Form.Item>
                        </Col>
                        <Col span={8}>
                          <Form.Item label="Mail" name="users_mail">
                            <Input placeholder="" />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row gutter={16}>
                        <Col span={9}>
                          <Form.Item label="Ngân hàng" name="users_bank">
                            <Input placeholder="ACB" />
                          </Form.Item>
                        </Col>
                        <Col span={10}>
                          <Form.Item
                            label="Số tài khoản"
                            name="users_banknumber"
                          >
                            <Input placeholder="76668888" />
                          </Form.Item>
                        </Col>
                        <Col span={5}>
                          <Form.Item label="Sắp xếp" name="users_sort">
                            <Input placeholder="" />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item label="Trình độ" name="users_level">
                            <Select
                              //mode="multiple"
                              style={{ width: "100%" }}
                              optionlabelprop="label"
                            >
                              <Option
                                value="Lao động phổ thông"
                                label="Lao động phổ thông"
                              >
                                <div className="demo-option-label-item">
                                  Lao động phổ thông
                                </div>
                              </Option>
                              <Option value="Sinh viên" label="Sinh viên">
                                <div className="demo-option-label-item">
                                  Sinh viên
                                </div>
                              </Option>
                              <Option value="Cao đẳng" label="Cao đẳng">
                                <div className="demo-option-label-item">
                                  Cao đẳng
                                </div>
                              </Option>
                              <Option value="Đại học" label="Đại học">
                                <div className="demo-option-label-item">
                                  Đại học
                                </div>
                              </Option>
                              <Option value="Cao học" label="Cao học">
                                <div className="demo-option-label-item">
                                  Cao học
                                </div>
                              </Option>
                              <Option value="Tiến sĩ" label="Tiến sĩ">
                                <div className="demo-option-label-item">
                                  Tiến sĩ
                                </div>
                              </Option>
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item label="Chuyên ngành" name="users_major">
                            <Select
                              //mode="multiple"
                              style={{ width: "100%" }}
                              optionlabelprop="label"
                            >
                              <Option value="Marketing" label="Marketing">
                                <div className="demo-option-label-item">
                                  Marketing
                                </div>
                              </Option>
                              <Option value="Tài chính" label="Tài chính">
                                <div className="demo-option-label-item">
                                  Tài chính
                                </div>
                              </Option>
                              <Option value="Công nghệ" label="Công nghệ">
                                <div className="demo-option-label-item">
                                  Công nghệ
                                </div>
                              </Option>
                            </Select>
                          </Form.Item>
                        </Col>
                      </Row>

                      <Form.Item label="Chức vụ" name="users_function">
                        <Select
                          mode="multiple"
                          style={{ width: "100%" }}
                          placeholder="select one item"
                          optionlabelprop="label"
                          // disabled={true}
                        >
                          <Option value="Giám đốc" label="Giám đốc">
                            <div className="demo-option-label-item">
                              Giám đốc
                            </div>
                          </Option>
                          <Option value="Phó Giám đốc" label="Phó Giám đốc">
                            <div className="demo-option-label-item">
                              Phó Giám đốc
                            </div>
                          </Option>
                          <Option value="Trưởng phòng" label="Trưởng phòng">
                            <div className="demo-option-label-item">
                              Trưởng phòng
                            </div>
                          </Option>
                          <Option value="Phó phòng" label="Phó phòng">
                            <div className="demo-option-label-item">
                              Phó phòng
                            </div>
                          </Option>
                          <Option value="Tổ trưởng" label="Tổ trưởng">
                            <div className="demo-option-label-item">
                              Tổ trưởng
                            </div>
                          </Option>
                          <Option value="Tổ phó" label="Tổ phó">
                            <div className="demo-option-label-item">Tổ phó</div>
                          </Option>
                          <Option value="Chuyên viên" label="Chuyên viên">
                            <div className="demo-option-label-item">
                              Chuyên viên
                            </div>
                          </Option>
                          <Option value="Nhân viên" label="Nhân viên">
                            <div className="demo-option-label-item">
                              Nhân viên
                            </div>
                          </Option>
                          <Option value="Tập sự" label="Tập sự">
                            <div className="demo-option-label-item">Tập sự</div>
                          </Option>
                          <Option value="Thử việc" label="Thử việc">
                            <div className="demo-option-label-item">
                              Thử việc
                            </div>
                          </Option>
                          
                        </Select>
                      </Form.Item>
                      <Form.Item label="Phòng ban" name="users_owner">
                        <Select
                          //disabled={true}
                          mode="multiple"
                          style={{ width: "100%" }}
                          placeholder="select one item"
                          optionlabelprop="label"
                        >
                          <Option value="Phòng IT" label="Phòng IT">
                            <div className="demo-option-label-item">
                              Phòng IT
                            </div>
                          </Option>
                          <Option
                            value="Phòng Marketting"
                            label="Phòng Marketting"
                          >
                            <div className="demo-option-label-item">
                              Phòng Marketing
                            </div>
                          </Option>
                          <Option
                            value="Phòng hành chính nhân sự"
                            label="Phòng hành chính nhân sự"
                          >
                            <div className="demo-option-label-item">
                              Phòng hành chính nhân sự
                            </div>
                          </Option>
                          <Option
                            value="Phòng kế toán quản trị"
                            label="Phòng kế toán quản trị"
                          >
                            <div className="demo-option-label-item">
                              Phòng kế toán quản trị
                            </div>
                          </Option>
                          <Option value="Phòng kế hoạch" label="Phòng kế hoạch">
                            <div className="demo-option-label-item">
                              Phòng kế hoạch
                            </div>
                          </Option>
                          <Option value="Ban kiểm soát" label="Ban kiểm soát">
                            <div className="demo-option-label-item">
                              Ban kiểm soát
                            </div>
                          </Option>
                          <Option value="Phòng sản xuất" label="Phòng sản xuất">
                            <div className="demo-option-label-item">
                              Phòng sản xuất
                            </div>
                          </Option>
                          <Option
                            value="Phòng Kinh doanh"
                            label="Phòng Kinh doanh"
                          >
                            <div className="demo-option-label-item">
                              Phòng Kinh doanh
                            </div>
                          </Option>
                          <Option value="Phòng nâng cấp" label="Phòng nâng cấp">
                            <div className="demo-option-label-item">
                              Phòng nâng cấp
                            </div>
                          </Option>
                          <Option value="Phòng phục hồi" label="Phòng phục hồi">
                            <div className="demo-option-label-item">
                              Phòng phục hồi
                            </div>
                          </Option>

                          <Option value="Kho lưu trữ" label="Kho lưu trữ">
                            <div className="demo-option-label-item">
                              Kho lưu trữ
                            </div>
                          </Option>
                        </Select>
                      </Form.Item>

                      <Form.Item label="Quản lý " name="manage_view">
                        <Select
                          //disabled={true}
                          mode="multiple"
                          style={{ width: "100%" }}
                          placeholder="select one item"
                          optionlabelprop="label"
                          //status="warning"
                        >
                          <Option value="bill_id" label="bill">
                            <div className="demo-option-label-item">bill</div>
                          </Option>
                          <Option value="device_id" label="device">
                            <div className="demo-option-label-item">device</div>
                          </Option>
                          <Option value="proxy_id" label="proxy">
                            <div className="demo-option-label-item">proxy</div>
                          </Option>
                          <Option value="info_id" label="info">
                            <div className="demo-option-label-item">info</div>
                          </Option>
                          <Option value="project_id" label="project">
                            <div className="demo-option-label-item">
                              project
                            </div>
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
                            <div className="demo-option-label-item">
                              payoneer
                            </div>
                          </Option>
                          <Option value="paypal_id" label="paypal">
                            <div className="demo-option-label-item">paypal</div>
                          </Option>
                          <Option value="pingpong_id" label="pingpong">
                            <div className="demo-option-label-item">
                              pingpong
                            </div>
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
                            <div className="demo-option-label-item">
                              facebook
                            </div>
                          </Option>
                          <Option value="tiktok_id" label="tiktok">
                            <div className="demo-option-label-item">tiktok</div>
                          </Option>
                        </Select>
                      </Form.Item>

                      <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item label="Trạng thái" name="users_status">
                            <Select
                              //mode="multiple"
                              //disabled={true}
                              style={{ width: "100%" }}
                              optionlabelprop="label"
                            >
                              <Option value="Active" label="Active">
                                <div className="demo-option-label-item">
                                  Active
                                </div>
                              </Option>
                              <Option value="Restrict" label="Restrict">
                                <div className="demo-option-label-item">
                                  Restrict
                                </div>
                              </Option>
                              <Option value="Suspened" label="Suspened">
                                <div className="demo-option-label-item">
                                  Suspened
                                </div>
                              </Option>
                              <Option value="Disable" label="Disable">
                                <div className="demo-option-label-item">
                                  Disable
                                </div>
                              </Option>
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item label="Lương" name="users_salary">
                            <Select
                              //mode="multiple"
                              //disabled={true}
                              style={{ width: "100%" }}
                              optionlabelprop="label"
                            >
                              <Option value="6000000" label="6.000.000">
                                <div className="demo-option-label-item">
                                  6.000.000 đ
                                </div>
                              </Option>
                              <Option value="8000000" label="8.000.000">
                                <div className="demo-option-label-item">
                                  8.000.000 đ
                                </div>
                              </Option>
                              <Option value="10000000" label="10.000.000">
                                <div className="demo-option-label-item">
                                  10.000.000
                                </div>
                              </Option>
                              <Option value="12000000" label="12.000.000">
                                <div className="demo-option-label-item">
                                  12.000.000
                                </div>
                              </Option>
                              <Option value="14000000" label="14.000.000">
                                <div className="demo-option-label-item">
                                  14.000.000
                                </div>
                              </Option>
                              <Option value="16000000" label="16.000.000">
                                <div className="demo-option-label-item">
                                  16.000.000
                                </div>
                              </Option>
                              <Option value="18000000" label="18.000.000">
                                <div className="demo-option-label-item">
                                  18.000.000
                                </div>
                              </Option>
                              <Option value="20000000" label="20.000.000">
                                <div className="demo-option-label-item">
                                  20.000.000
                                </div>
                              </Option>
                              <Option value="22000000" label="22.000.000">
                                <div className="demo-option-label-item">
                                  22.000.000
                                </div>
                              </Option>
                              <Option value="24000000" label="24000000">
                                <div className="demo-option-label-item">
                                  24000000
                                </div>
                              </Option>
                              <Option value="26000000" label="26000000">
                                <div className="demo-option-label-item">
                                  26000000
                                </div>
                              </Option>
                              <Option value="28000000" label="28000000">
                                <div className="demo-option-label-item">
                                  28000000
                                </div>
                              </Option>
                              <Option value="30000000" label="30000000">
                                <div className="demo-option-label-item">
                                  30000000
                                </div>
                              </Option>
                              <Option value="35000000" label="35.000.000">
                                <div className="demo-option-label-item">
                                  35.000.000
                                </div>
                              </Option>
                              <Option value="40000000" label="40.000.000">
                                <div className="demo-option-label-item">
                                  40000000
                                </div>
                              </Option>
                              <Option value="45000000" label="45.000.000">
                                <div className="demo-option-label-item">
                                  45.000.000
                                </div>
                              </Option>
                              <Option value="50000000" label="50.000.000">
                                <div className="demo-option-label-item">
                                  50.000.000
                                </div>
                              </Option>
                            </Select>
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row>
                      <Col span={12}>
                          <Form.Item label="Trợ cấp" name="users_subsidize">
                             <Input />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item label="Hoa hồng" name="users_comission">
                            <Input />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row>
                      <Col span={12}>
                          <Form.Item label="Ứng lương" name="users_salary_advance">
                             <Input />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                        </Col>
                      </Row>
                      <Row gutter={16}>
                        <Form.Item name="users_image_url">
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

                <Col span={12}>
                  <Card title="CHỨC NĂNG NHIỆM VỤ">
                    <Col span={24}>
                      <Space
                        direction="vertical"
                        style={{
                          width: "100%",
                        }}
                      >
                        {user_testfunction.map((item) => {
                          return (
                            <Alert
                              message={item.title}
                              description={item.value.map((data) => {
                                return (
                                  <div>
                                    <p>{data.title}</p>
                                    <p>{data.content}</p>
                                  </div>
                                );
                              })}
                              type={
                                item.title == "Chức năng" ? "success" : "info"
                              }
                            />
                          );
                        })}
                      </Space>
                    </Col>
                    <br></br>
                    <br></br>
                    {/* {renderTimeLine()} */}
                  </Card>
                </Col>
              </Row>
              <br></br>
            </Tabs.TabPane>

            <Tabs.TabPane tab="LỊCH SỬ" key="2">
              <Row gutter={16}>
                <Col span={12}>
                  <Card title="THỜI GIAN">
                    <Form
                      form={dateForm}
                      onFinish={onFinishDate}
                      name="date"
                      initialValues={dateData}
                    >
                      <Row gutter={16}>
                        {listDate.map((item, index) => {
                          return (
                            <Col span={8} key={index}>
                              <Form.Item label={item.title} name={item.value}>
                                <DatePicker
                                  format="YYYY-MM-DD"
                                  onChange={() => dateForm.submit()}
                                />
                              </Form.Item>
                            </Col>
                          );
                        })}
                      </Row>
                    </Form>
                  </Card>
                </Col>

                <Col span={12}>
                  <Card title="LỊCH SỬ">
                    <Row>
                      <Col span={24}>
                        <Input.TextArea
                          value={noteValue}
                          rows={4}
                          onChange={handleChangeNote}
                        />
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>
            </Tabs.TabPane>

            <Tabs.TabPane tab="HƯỚNG DẪN" key="3">
              <HuongDanUsers_info />
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
        </Card>
      ) : null}
    </div>
  );
};

export default Users_info;
