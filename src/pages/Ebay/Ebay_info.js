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
  Upload,
} from "antd";
import { getUser } from "../../utils/index";
import { PlusOutlined } from "@ant-design/icons";
import { showError, showSuccess } from "../../utils";
import { useSelector } from "react-redux";
import { uploadFile } from "../../api/upload";
import { useParams } from "react-router-dom";
import { copyToClipboard } from "../../utils/index";
import moment, { now } from "moment";
import React, { useCallback, useEffect, useState } from "react";

import {
  tablelist_ebay_Date,
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
  HuongDanEbay,
} from "./Ebay_list";

import {
  postebayInfo,
  getebayInfo,
  updateebayInfo,
} from "../../api/ebay/index";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const Ebay_info = () => {
  const { Option } = Select;
  const { users_function, users_name } = useSelector((state) => state.auth);
  // Lấy ID từ trên param url
  let { id } = useParams();
  // Khai báo các kho dữ liệu
  const [ebayData, setebayData] = useState({});
  const [dateData, setDateData] = useState();
  const [info, setInfo] = useState();
  const [selectListInfo, setSelectListInfo] = useState([]);
  const [noteValue, setNoteValue] = useState("");
  // Khai báo kho dữ liệu của các form
  const [form] = Form.useForm();
  const [infoForm] = Form.useForm();
  const [dateForm] = Form.useForm();
  const [listselect_ebay_employee, setListebay_employee] = useState();
  // Hàm để gửi dữ liệu đi
  const onFinish = async (values) => {
    let dateValue = {};
    tablelist_ebay_Date.map((item) => {
      dateValue[item.value] = moment(dateData[item.value]).format("MM-DD-YYYY");
    });
    const newValue = {
      ...info,
      ...values,
      ...dateValue,
      ebay_plan: values?.ebay_plan ? values.ebay_plan.join(",") : "",
      ebay_block: values?.ebay_block ? values.ebay_block.join(",") : "",
      ebay_error: values?.ebay_error ? values.ebay_error.join(",") : "",
      ebay_processing: values?.ebay_processing
        ? values.ebay_processing.join(",")
        : "",
      ebay_type: values?.ebay_type ? values.ebay_type.join(",") : "",
      ebay_sell_status: values?.ebay_sell_status
        ? values.ebay_sell_status.join(",")
        : "",
      ebay_owner: values?.ebay_owner ? values.ebay_owner.join(",") : "",
      ebay_employee: values?.ebay_employee
        ? values.ebay_employee.join(",")
        : "",
      list_view: selectListInfo.length > 0 ? selectListInfo.join(",") : "",
      ebay_note: noteValue,
      ebay_history: info.ebay_history,
    };
    const response = await updateebayInfo(newValue, id);
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
  // Hàm gửi dữ liệu từ form info
  const onFinishInfo = (values) => {
    setInfo(values);
  };
  // Hàm gọi dữ liệu về từ database
  const getInfoebay = async () => {
    const res = await getebayInfo(id);
    let data = res.data;
    const newData = {
      ...data,
      ebay_plan: data?.ebay_plan ? data.ebay_plan.split(",") : "",
      ebay_block: data?.ebay_block ? data.ebay_block.split(",") : "",
      ebay_error: data?.ebay_error ? data.ebay_error.split(",") : "",
      ebay_employee: data?.ebay_employee ? data.ebay_employee.split(",") : "",
      ebay_processing: data?.ebay_processing
        ? data.ebay_processing.split(",")
        : "",
      ebay_type: data?.ebay_type ? data.ebay_type.split(",") : "",
      ebay_sell_status: data?.ebay_sell_status
        ? data.ebay_sell_status.split(",")
        : "",
      ebay_owner: data?.ebay_owner ? data.ebay_owner.split(",") : "",
    };
    form.setFieldsValue(newData);
    infoForm.setFieldsValue(newData);
    let dateValue = {};
    tablelist_ebay_Date.map((item) => {
      dateValue[item.value] = moment(data[item.value]);
    });
    console.log(dateValue);
    dateForm.setFieldsValue(dateValue);
    setDateData(data);
    setNoteValue(data.ebay_note);
    setInfo(newData);
    setSelectListInfo(data.list_view.split(","));
    setListebay_employee(data.listselect_ebay_employee);
  };

  // Hàm để chuyển trang sang các tài khoản khác
  const viewInfo = useCallback(
    (type, id) => {
      window.open(`http://localhost:3000/products/${type}_class/table/${id}`);
    },
    [info]
  );
  //  Những hàm được gọi trong useEffect sẽ được chạy lần đầu khi vào trang
  useEffect(() => {
    getInfoebay();
  }, []);
  // Hàm để thay đổi dữ liệu của select list info
  const changeSelectListInfo = (values) => {
    setSelectListInfo(values);
  };

  // Hàm để thay đổi dữ liệu của note
  const handleChangeNote = (e) => {
    setNoteValue(e.target.value);
  };

  // Hàm viết tự động hóa
  const onChange_Status = (values) => {
    if (values == "Error") {
      let old_ebay_owner = form.getFieldValue("ebay_owner");
      if (old_ebay_owner.indexOf("Phòng phục hồi") == -1) {
        old_ebay_owner.push("Phòng phục hồi");
      }
      let new_ebay_processing = form.getFieldValue("ebay_processing");
      new_ebay_processing.push("Error");
      form.setFieldsValue({
        ebay_class: "Lớp 20",
        ebay_support: "Nguyễn Hoài",
        ebay_owner: old_ebay_owner,
        ebay_processing: new_ebay_processing,
      });
    }
    if (values == "Restrict") {
      let old_ebay_owner = form
        .getFieldValue("ebay_owner")
        .filter((item) => item !== "Phòng sản xuất");
      if (old_ebay_owner.indexOf("Phòng phục hồi") == -1) {
        old_ebay_owner.push("Phòng phục hồi");
      }
      if (old_ebay_owner.indexOf("Kho lưu trữ") == -1) {
        old_ebay_owner.push("Kho lưu trữ");
      }
      let new_ebay_processing = form.getFieldValue("ebay_processing");
      new_ebay_processing.push("Restrict");
      form.setFieldsValue({
        ebay_class: "Lớp 23",
        ebay_support: "Nguyễn Hoài",
        ebay_owner: old_ebay_owner,
        ebay_processing: new_ebay_processing,
      });
    }
    if (values == "Suspended") {
      let old_ebay_owner = form
        .getFieldValue("ebay_owner")
        .filter((item) => item !== "Phòng sản xuất");
      if (old_ebay_owner.indexOf("Phòng phục hồi") == -1) {
        old_ebay_owner.push("Phòng phục hồin");
      }
      if (old_ebay_owner.indexOf("Kho lưu trữ") == -1) {
        old_ebay_owner.push("Kho lưu trữ");
      }

      let new_ebay_processing = form.getFieldValue("ebay_processing");
      new_ebay_processing.push("Suspended");

      form.setFieldsValue({
        ebay_class: "Lớp 26",
        ebay_support: "Nguyễn Hoài",
        ebay_owner: old_ebay_owner,
        ebay_processing: new_ebay_processing,
      });
    }
  };

  const onChange_Processing = (values) => {
    if (values[values.length - 1] == "Buyer") {
      form.setFieldValue("ebay_class", "Lớp 3");
    }
    if (values[values.length - 1] == "Verify") {
      form.setFieldValue("ebay_class", "Lớp 5");
    }
  };

  const onChange_Class = (values) => {
    if (values == "Lớp 9") {
      let new_ebay_type = form.getFieldValue("ebay_type");
      if (new_ebay_type.indexOf("Seller") == -1) {
        new_ebay_type.push("Seller");
      }

      let new_ebay_processing = form.getFieldValue("ebay_processing");
      if (new_ebay_processing.indexOf("Seller") == -1) {
        new_ebay_processing.push("Seller");
      }

      dateForm.setFieldValue("ebaydate_seller", moment(now()));
      setDateData({
        ...dateData,
        ebaydate_seller: moment(now()),
      });

      form.setFieldsValue({
        ebay_processing: new_ebay_processing,
        ebay_type: new_ebay_type,
      });
    }
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

  return (
    <Card
      title={id}
      extra={<Button onClick={() => form.submit()}>Lưu thông tin</Button>}
    >
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="THÔNG TIN TÀI KHOẢN" key="1">
          <Row gutter={16}>
            <Col span={12}>
              <Card title="THÔNG TIN EBAY">
                <Form
                  form={form}
                  name="basic"
                  onFinish={onFinish}
                  initialValues={ebayData}
                  autoComplete="off"
                >
                  <Row gutter={16}>
                    <Col span={6}>
                      <Form.Item
                        label="eBay id"
                        name="ebay_id"
                        rules={[
                          {
                            required: true,
                            message: "Hãy nhập eBay id!",
                          },
                        ]}
                        onClick={() =>
                          copyToClipboard(form.getFieldValue("ebay_id"))
                        }
                      >
                        <Input
                          disabled={true}
                          size="small"
                          placeholder="input here"
                        />
                      </Form.Item>
                    </Col>
                    <Col span={10}>
                      <Form.Item
                        onClick={() =>
                          copyToClipboard(form.getFieldValue("ebay_user"))
                        }
                        label="eBay User"
                        name="ebay_user"
                      >
                        <Input size="small" placeholder="input here" />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label="eBay Pass" name="ebay_password">
                        <Input size="small" placeholder="input here" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={16}>
                    <Col span={24}>
                      <Form.Item label="eBay chi tiết" name="ebay_detail">
                        <Input size="small" placeholder="input here" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={16}>
                    <Col span={6}>
                      <Form.Item label="eBay limit" name="ebay_limit">
                        <Input size="small" placeholder="0" />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item label="eBay items" name="ebay_item">
                        <Input size="small" placeholder="0" />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item label="eBay Sold" name="ebay_sold">
                        <Input size="small" placeholder="0" />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item label="eBay Fb" name="ebay_feedback">
                        <Input size="small" placeholder="0" />
                      </Form.Item>
                    </Col>
                  </Row>

                  {[
                    "Tổ phó",
                    "Chuyên viên",
                    "Nhân viên",
                    "Tập sự",
                    "Thử việc",
                  ].indexOf(users_function) == -1 ? (
                    <Form.Item
                      label="Quy trình"
                      name="ebay_plan"
                      disabled={true}
                    >
                      <Select
                        mode="multiple"
                        style={{ width: "100%" }}
                        placeholder="select one item"
                        optionLabelProp="label"
                      >
                        {listselect_ebay_plan.map((item, index) => {
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

                  {[
                    "Tổ phó",
                    "Chuyên viên",
                    "Nhân viên",
                    "Tập sự",
                    "Thử việc",
                  ].indexOf(users_function) == -1 ? (
                    <Form.Item
                      label="eBay block"
                      name="ebay_block"
                      disabled={true}
                    >
                      <Select
                        mode="multiple"
                        style={{ width: "100%" }}
                        placeholder="select one item"
                        optionLabelProp="label"
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
                  ) : null}

                  <Form.Item label="Tiến trình" name="ebay_processing">
                    <Select
                      onChange={onChange_Processing}
                      mode="multiple"
                      style={{ width: "100%" }}
                      optionLabelProp="label"
                      //status="warning"
                    >
                      {listselect_ebay_processing.map((item, index) => {
                        return (
                          <Option value={item} label={item} key={index}>
                            <div className="demo-option-label-item">{item}</div>
                          </Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                  <Form.Item label="Phát sinh" name="ebay_error">
                    <Select
                      mode="multiple"
                      style={{ width: "100%" }}
                      optionLabelProp="label"
                      //status="warning"
                    >
                      {listselect_ebay_error.map((item, index) => {
                        return (
                          <Option value={item} label={item} key={index}>
                            <div className="demo-option-label-item">{item}</div>
                          </Option>
                        );
                      })}
                    </Select>
                  </Form.Item>

                  {[
                    "Tổ phó",
                    "Chuyên viên",
                    "Nhân viên",
                    "Tập sự",
                    "Thử việc",
                  ].indexOf(users_function) == -1 ? (
                    <Form.Item label="Loại ebay" name="ebay_type">
                      <Select
                        mode="multiple"
                        style={{ width: "100%" }}
                        placeholder="select one item"
                        optionLabelProp="label"
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
                  ) : null}

                  {[
                    "Tổ phó",
                    "Chuyên viên",
                    "Nhân viên",
                    "Tập sự",
                    "Thử việc",
                  ].indexOf(users_function) == -1 ? (
                    <Form.Item
                      label="TT Bán"
                      name="ebay_sell_status"
                      style={{
                        display:
                          [
                            "Tổ phó",
                            "Chuyên viên",
                            "Nhân viên",
                            "Tập sự",
                            "Thử việc",
                          ].indexOf(users_function) == -1
                            ? ""
                            : "none",
                      }}
                    >
                      <Select
                        mode="multiple"
                        style={{ width: "100%" }}
                        placeholder="select one item"
                        optionLabelProp="label"
                      >
                        {listselect_ebay_sell_status.map((item, index) => {
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

                  {[
                    "Tổ phó",
                    "Chuyên viên",
                    "Nhân viên",
                    "Tập sự",
                    "Thử việc",
                  ].indexOf(users_function) == -1 ? (
                    <Form.Item label="Sở hữu" name="ebay_owner">
                      <Select
                        disabled={
                          [
                            "Trưởng phòng",
                            "Phó phòng",
                            "Tổ trưởng",
                            "Tổ phó",
                          ].indexOf(users_function) !== -1
                        }
                        mode="multiple"
                        style={{ width: "100%" }}
                        placeholder="select one item"
                        optionLabelProp="label"
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
                  ) : null}

                  {[
                    "Tổ phó",
                    "Chuyên viên",
                    "Nhân viên",
                    "Tập sự",
                    "Thử việc",
                  ].indexOf(users_function) == -1 ? (
                    <Form.Item label="Nhân viên" name="ebay_employee">
                      <Select
                        mode="multiple"
                        style={{ width: "100%" }}
                        placeholder="select one item"
                        optionLabelProp="label"
                      >
                        {listselect_ebay_employee?.map((item) => {
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

                  <Row gutter={16}>
                    <Col span={8}>
                      <Form.Item label="Trạng thái" name="ebay_status">
                        <Select
                          //mode="multiple"
                          onChange={onChange_Status}
                          style={{ width: "100%" }}
                          optionLabelProp="label"
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
                      <Form.Item label="Lớp eBay" name="ebay_class">
                        <Select
                          //mode="multiple"
                          style={{ width: "100%" }}
                          optionLabelProp="label"
                          onChange={onChange_Class}
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
                      <Form.Item label="Hỗ trợ" name="ebay_support">
                        <Select
                          style={{ width: "100%" }}
                          placeholder="select one item"
                          optionLabelProp="label"
                        >
                          {listselect_ebay_employee?.map((item) => {
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
                  </Row>

                  <Row gutter={16}>
                    <Form.Item name="ebay_image_url">
                      <Upload
                        action="http://localhost:4000/api/files"
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

            <Col span={12}>
              <Card title="THÔNG TIN TÀI NGUYÊN">
                {[
                  "Tổ phó",
                  "Chuyên viên",
                  "Nhân viên",
                  "Tập sự",
                  "Thử việc",
                ].indexOf(users_function) == -1 ? (
                  <Select
                    mode="multiple"
                    style={{ width: "100%" }}
                    placeholder="select one item"
                    optionLabelProp="label"
                    onChange={changeSelectListInfo}
                    value={selectListInfo}
                  >
                    {listselect_view_acc.map((item) => {
                      return (
                        <Option
                          value={item.title.toLocaleLowerCase() + "_id"}
                          label={item.title}
                        >
                          <div className="demo-option-label-item">
                            {item.title}
                          </div>
                        </Option>
                      );
                    })}
                  </Select>
                ) : null}

                <Form
                  onFinish={onFinishInfo}
                  initialValues={info}
                  form={infoForm}
                  name="info"
                >
                  <List
                    itemLayout="horizontal"
                    dataSource={listselect_view_acc}
                    renderItem={(item) => (
                      <>
                        {selectListInfo.indexOf(
                          item.title.toLocaleLowerCase() + "_id"
                        ) != -1 ? (
                          <List.Item>
                            <div className="custom_info_item">
                              <div className="meta_data">
                                <Avatar
                                  style={{ cursor: "pointer" }}
                                  onClick={() =>
                                    viewInfo(
                                      item.title.toLocaleLowerCase(),
                                      info[
                                        item.title.toLocaleLowerCase() + "_id"
                                      ].split("|")[0]
                                    )
                                  }
                                  src={item.thumbnail}
                                />
                                <a
                                  href="#"
                                  onClick={() =>
                                    viewInfo(
                                      item.title.toLocaleLowerCase(),
                                      info[
                                        item.title.toLocaleLowerCase() + "_id"
                                      ].split("|")[0]
                                    )
                                  }
                                >
                                  {item.title}
                                </a>
                              </div>
                              <Form.Item
                                name={item.title.toLocaleLowerCase() + "_id"}
                              >
                                <Input
                                  disabled={false}
                                  onChange={() => infoForm.submit()}
                                />
                              </Form.Item>
                            </div>
                          </List.Item>
                        ) : null}
                      </>
                    )}
                  />
                </Form>
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
                    {tablelist_ebay_Date.map((item, index) => {
                      return (
                        <Col span={8} key={index}>
                          <Form.Item label={item.title} name={item.value}>
                            <DatePicker
                              format="MM-DD-YYYY"
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

                <span>
                  {info?.ebay_history?.split(",")?.map((data) => {
                    return <div>{data}</div>;
                  })}
                </span>
              </Card>
            </Col>
          </Row>
        </Tabs.TabPane>

        <Tabs.TabPane tab="HƯỚNG DẪN" key="3">
          <HuongDanEbay />
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

export default Ebay_info;
