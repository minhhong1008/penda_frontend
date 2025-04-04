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
  Rate,
  List,
  Upload,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { showError, showSuccess } from "../../utils";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import dayjs, { now } from "dayjs";
import React, { useCallback, useEffect, useState } from "react";

import {
  listselect_project_work,
  listselect_project_processing,
  listselect_project_error,
  listselect_project_type,
  listselect_project_work_item,
  listselect_project_owner,
  listselect_project_status,
  HuongDanProject_info,
} from "./Project_list";

import { getprojectInfo, updateprojectInfo } from "../../api/project/index";
//Upload ảnh
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const desc = ["terrible", "bad", "normal", "good", "wonderful"];

const Project_info = () => {
  const { Option } = Select;
  const [value, setValue] = useState(3);
  const { users_function, users_name } = useSelector((state) => state.auth);
  // Lấy ID từ trên param url
  let { id } = useParams();
  // Khai báo các kho dữ liệu
  const [projectData, setprojectData] = useState({});
  const [info] = useState();
  const [data, setData] = useState();
  const [noteValue_request, setNoteValueRequest] = useState("");
  const [noteValue_active, setNoteValueActive] = useState("");
  // Khai báo kho dữ liệu của các form
  const [form] = Form.useForm();
  const [listselect_project_employee, setListproject_employee] = useState();
  const [list_project_type, setListproject_type] = useState();
  const [disabled, setDisabled] = useState(false);
  const [list_project_work, setList_project_work] = useState(
    listselect_project_work
  );
  
  /* Các hàm liên quan đến thao tác với giao diện
      Các hàm liên quan đến ngày tháng
      Các hàm liên quan đến render
      Các hàm liên quan đếm sự kiện trên giao diện */

  const onChange_project_work_item = (values) => {
    if (values == "Sản xuất") {
      form.setFieldValue("project_work", "Tạo tài khoản");
      setList_project_work([
        "Xử lý dữ liệu",
        "Mua tài nguyên",
        "Tạo tài khoản",
        "Chăm tài khoản",
        "Lên seller",
      ]);
    }
    if (values == "Nhân sự") {
      form.setFieldValue("project_work", "Chức năng & Nhiệm vụ");
      setList_project_work([
        "Chức năng & Nhiệm vụ",
      ]);
    }

    if (values == "Tài chính") {
      form.setFieldValue("project_work", "Thanh toán");
      setList_project_work([
        "Mua sắm",
        "Thanh toán",
      ]);
    }
    if (values == "Kinh doanh") {
      setList_project_work([
        "Giao việc",
        "Tài nguyên",
        "Dữ liệu",
        "Thiết bị",
        "Code",
      ]);
    }
    if (values == "Công nghệ") {
      form.setFieldValue("project_work", "Code");
      setList_project_work([
        "Code",
        "Nghiên cứu",
      ]);
    }
    
    if (values == "Mục tiêu") {
      form.setFieldValue("project_work", "Mục tiêu sản xuất");
      setList_project_work([
        "Mục tiêu sản xuất",
        "Mục tiêu tài chính",
        "Mục tiêu kinh doanh",
        "Mục tiêu công nghệ",
        "Mục tiêu nhân sự",
        "Mục tiêu kế hoạch",
      ]);
    }

    if (values == "Kế hoạch") {
      form.setFieldValue("project_work", "Kế hoạch sản xuất");
      setList_project_work([
        "Kế hoạch sản xuất",
        "Kế hoạch tài chính",
        "Kế hoạch kinh doanh",
        "Kế hoạch công nghệ",
        "Kế hoạch nhân sự",
      ]);
    }
  };

  // Các hàm liên quan đến gọi dữ liệu từ giao diện và gửi dữ liệu lên server
  // Hàm để gửi dữ liệu đi
  const onFinish = async (values) => {
    if (values.project_date_start == null || values.project_date_end == null) {
      return showError("Có Lỗi, date");
    }
    //Upload ảnh
    let project_file = [];
    fileList?.map((item) => {
      let fileUrl = "";
      if (item?.xhr?.response) {
        fileUrl = JSON.parse(item.xhr.response).url;
      } else {
        fileUrl = item.url;
      }
      project_file.push(fileUrl);
    });

    values.project_date_start = dayjs(values.project_date_start).format(
      "YYYY-MM-DD"
    );
    values.project_date_end = dayjs(values.project_date_end).format(
      "YYYY-MM-DD"
    );
    const newValue = {
      ...values,
      //Upload ảnh
      project_image_url: project_file.length > 0 ? project_file.join(",") : "",
      project_error: values?.project_error
        ? values.project_error.join(",")
        : "",
      project_processing: values?.project_processing
        ? values.project_processing.join(",")
        : "",
      project_type: values?.project_type ? values.project_type.join(",") : "",

      project_note: noteValue_request,
      project_note_active: noteValue_active,
    };

    const response = await updateprojectInfo(newValue, id);
    if (response.status == 200) {
      showSuccess("Sửa thành công");
    } else {
      showError("Sửa không thành công");
    }
  };
  // Các hàm liên quan đến xử lý dữ liệu từ database về
  // Hàm gọi dữ liệu về từ database
  const getInfoproject = async () => {
    const res = await getprojectInfo(id);
    let data = res.data;
    const newData = {
      ...data,
      project_error: data?.project_error ? data.project_error.split(",") : "",
      project_processing: data?.project_processing
        ? data.project_processing.split(",")
        : "",
      project_type: data?.project_type ? data.project_type.split(",") : "",
      project_date_start: data?.project_date_start
        ? dayjs(data.project_date_start)
        : "",
      project_date_end: data?.project_date_end
        ? dayjs(data.project_date_end)
        : "",
      project_note: noteValue_request,
      project_note_active: noteValue_active,
    };
    //disable input theo điều kiện
    if (users_function == "Giám đốc") {
      setDisabled(false);
     
    } else {
      if (newData.project_type?.indexOf("Giao việc") !== -1) {
        setDisabled(true);
       
      }
    }
    
    form.setFieldsValue(newData);
    setNoteValueActive(data.project_note_active);
    setNoteValueRequest(data.project_note);
    setListproject_employee(data.listselect_project_employee);
    setListproject_type(newData.project_type);
    //Upload ảnh
    if (data?.project_image_url) {
      let dataImage = [];
      let imageArr = data.project_image_url.split(",");
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
  };

  
  //  Những hàm được gọi trong useEffect sẽ được chạy lần đầu khi vào trang
  useEffect(() => {
    getInfoproject();
  }, []);

  // Hàm để thay đổi dữ liệu của note
  const handleChangeNoteRequest = (e) => {
    setNoteValueRequest(e.target.value);
  };

  const handleChangeNoteActive = (e) => {
    setNoteValueActive(e.target.value);
  };

  // Upload ảnh
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "../asset/",
    },
  ]);

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
  const handleChange = async ({ fileList }) => setFileList(fileList);
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
  // Các hàm xử lý giao diện từ ant.desgin bao gồm columns

  return (
    <Card
      title={id + " | " + users_name}
      extra={
        <Button
          onClick={() => form.submit()}
          style={{
            background: "#18a689",
            color: "white",
          }}
        >
          Lưu thông tin
        </Button>
      }
    >
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="THÔNG TIN KẾ HOẠCH" key="1">
          <Row gutter={[24, 0]}>
            <Col xs={24} xl={12} className="mb-24">
              <Card
                title="THÔNG TIN KẾ HOẠCH"
                style={{ width: "100%", color: "blue" }}
                extra={
                  <Button
                    onClick={() => form.submit()}
                    style={{
                      background: "#18a689",
                      color: "white",
                    }}
                  >
                    Lưu thông tin
                  </Button>
                }
              >
                <Form
                  form={form}
                  name="basic"
                  onFinish={onFinish}
                  initialValues={projectData}
                  autoComplete="off"
                  size="large"
                >
                  <Row gutter={[24, 0]}>
                    <Col xs={0} xl={6} className="mb-24">
                      <Form.Item label="Mã" name="project_id">
                        <Input disabled={true} />
                      </Form.Item>
                    </Col>
                    <Col xs={12} xl={9} className="mb-24">
                      <Form.Item label="Ngày bắt đầu" name="project_date_start">
                        <DatePicker
                          style={{ float: "right" }}
                          disabled={disabled}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={12} xl={9} className="mb-24">
                      <Form.Item label="Ngày kết thúc" name="project_date_end">
                        <DatePicker
                          style={{ float: "right" }}
                          disabled={disabled}
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  {/* Trạng thái */}
                  <Row gutter={[24, 0]}>
                    <Col xs={0} xl={8} className="mb-24">
                      <Form.Item label="Trạng thái" name="project_status">
                        <Select
                          disabled={
                            users_name ==
                            form.getFieldValue("project_employee_request")
                              ? false
                              : true
                          }
                          optionlabelprop="label"
                          style={{
                            width: "100%",
                          }}
                        >
                          {listselect_project_status.map((item, index) => {
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
                      {/* Hạng mục */}
                      {["Giám đốc", "Phó Giám đốc", "Trưởng phòng"].indexOf(
                        users_function
                      ) !== -1 ? (
                        <Form.Item label="Hạng mục" name="project_work_item">
                          <Select
                            onChange={onChange_project_work_item}
                            style={{ width: "100%" }}
                            placeholder="select one item"
                            optionlabelprop="label"
                            disabled={disabled}
                          >
                            {listselect_project_work_item.map((item, index) => {
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
                      ) : null}
                    </Col>

                    <Col xs={12} xl={8} className="mb-24">
                      {/* Công việc */}
                      {["Giám đốc", "Phó Giám đốc", "Trưởng phòng"].indexOf(
                        users_function
                      ) !== -1 ? (
                        <Form.Item label="Công việc" name="project_work">
                          <Select
                            style={{ width: "100%" }}
                            optionlabelprop="label"
                            disabled={disabled}
                          >
                            {list_project_work.map((item, index) => {
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
                      ) : null}
                    </Col>
                  </Row>

                  <Row gutter={[24, 0]}>
                    <Col xs={24} xl={18} className="mb-24">
                      <Form.Item label="Nội dung" name="project_content">
                        <Input
                          placeholder="Nội dung chi tiết công việc maxLength 50"
                          disabled={disabled}
                          maxLength={50}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={0} xl={6} className="mb-24">
                      <Form.Item label="Số lượng" name="project_number">
                        <Input
                          placeholder="50"
                          maxLength={10}
                          disabled={disabled}
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  {/* Tiến trình */}
                  <Form.Item label="Tiến trình" name="project_processing">
                    <Select
                      mode="multiple"
                      style={{ width: "100%", color: "green" }}
                      optionlabelprop="label"
                    >
                      {listselect_project_processing.map((item, index) => {
                        return (
                          <Option value={item} label={item} key={index}>
                            <div className="demo-option-label-item">{item}</div>
                          </Option>
                        );
                      })}
                    </Select>
                  </Form.Item>

                  {/* Phát sinh */}
                  <Form.Item label="Phát sinh" name="project_error">
                    <Select
                      mode="multiple"
                      style={{ width: "100%", color: "red" }}
                      optionlabelprop="label"
                    >
                      {listselect_project_error.map((item, index) => {
                        return (
                          <Option value={item} label={item} key={index}>
                            <div className="demo-option-label-item">{item}</div>
                          </Option>
                        );
                      })}
                    </Select>
                  </Form.Item>

                  <Row gutter={[24, 0]}>
                    <Col xs={16} xl={16} className="mb-24">
                      {/*  Loại */}
                      {["Giám đốc", "Phó Giám đốc", "Trưởng phòng"].indexOf(
                        users_function
                      ) !== -1 ? (
                        <Form.Item label="Loại" name="project_type">
                          <Select
                            mode="multiple"
                            style={{ width: "100%" }}
                            placeholder="select one item"
                            optionlabelprop="label"
                            disabled={disabled}
                          >
                            {listselect_project_type.map((item, index) => {
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
                      ) : null}
                    </Col>

                    <Col xs={8} xl={8} className="mb-24">
                      {/* Nhân viên */}
                      {["Giám đốc", "Phó Giám đốc", "Trưởng phòng"].indexOf(
                        users_function
                      ) !== -1 ? (
                        <Form.Item label="Nhân viên" name="project_employee">
                          <Select
                            style={{ width: "100%" }}
                            placeholder="select one item"
                            optionlabelprop="label"
                            disabled={disabled}
                          >
                            {listselect_project_employee?.map((item) => {
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
                      ) : null}
                    </Col>
                  </Row>

                  <Row gutter={[24, 0]}>
                    <Col xs={0} xl={8} className="mb-24">
                      {/* Sở hữu */}
                      {["Giám đốc", "Phó Giám đốc", "Trưởng phòng"].indexOf(
                        users_function
                      ) !== -1 ? (
                        <Form.Item label="Sở hữu" name="project_owner">
                          <Select
                            disabled={
                              ["Giám đốc"].indexOf(users_function) == -1
                            }
                            style={{ width: "100%" }}
                            placeholder="select one item"
                            optionlabelprop="label"
                          >
                            {listselect_project_owner.map((item, index) => {
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
                      ) : null}
                    </Col>
                    <Col xs={12} xl={8} className="mb-24">
                      {/* Người giao việc */}
                      {["Giám đốc", "Phó Giám đốc", "Trưởng phòng"].indexOf(
                        users_function
                      ) !== -1 ? (
                        <Form.Item
                          label="Người giao"
                          name="project_employee_request"
                        >
                          <Select
                            style={{ width: "100%" }}
                            placeholder="select one item"
                            optionlabelprop="label"
                            disabled={disabled}
                          >
                            {listselect_project_employee?.map((item) => {
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
                      ) : null}
                    </Col>
                    <Col xs={12} xl={8} className="mb-24">
                      {/* Đánh giá */}
                      <Form.Item label="Đánh giá" name="project_review">
                        <Rate
                          disabled={
                            users_name ==
                            form.getFieldValue("project_employee_request")
                              ? false
                              : true
                          }
                          tooltips={desc}
                          allowHalf
                          defaultValue={1.5}
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  {/* Upload ảnh */}
                  <Row gutter={[24, 0]}>
                    <Form.Item name="project_image_url">
                      <Upload
                        action="https://backend.penda.vn/api/files"
                        multiple
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={handlePreview}
                        onChange={handleChange}
                      >
                        {fileList.length >= 8 ? null : uploadButton}
                      </Upload>
                    </Form.Item>
                  </Row>
                </Form>
              </Card>
            </Col>
            <Col xs={24} xl={12} className="mb-24">
              <Card title="GHI CHÚ">
                <Row gutter={[24, 0]}>
                  <Col xs={24} xl={24} className="mb-24">
                    <Form.Item label="Yêu cầu">
                      <Input.TextArea
                        disabled={disabled}
                        value={noteValue_request}
                        rows={11}
                        onChange={handleChangeNoteRequest}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={[24, 0]}>
                  <Col xs={24} xl={24} className="mb-24">
                    <Form.Item label="Thực hiện">
                      <Input.TextArea
                        value={noteValue_active}
                        rows={12}
                        onChange={handleChangeNoteActive}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <span>
                  {info?.project_history?.split(",")?.map((data) => {
                    return <div>{data}</div>;
                  })}
                </span>
              </Card>
            </Col>
          </Row>
          <br></br>
        </Tabs.TabPane>
        <Tabs.TabPane tab="HƯỚNG DẪN" key="3">
          <HuongDanProject_info />
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
  );
};

export default Project_info;
