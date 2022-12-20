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
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";

import {
  tablelist_shopee_Date,
  listselect_view_acc,
  listselect_shopee_plan,
  listselect_shopee_block,
  listselect_shopee_processing,
  listselect_shopee_error,
  listselect_shopee_type,
  listselect_shopee_sell_status,
  listselect_shopee_owner,
  listselect_shopee_status,
  listselect_shopee_class,
} from "./Shopee_list";

import {
  postshopeeInfo,
  getshopeeInfo,
  updateshopeeInfo,
} from "../../api/shopee/index";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const Shopee_info = () => {
  
  const { Option } = Select;
  const { users_function, users_name } = useSelector((state) => state.auth);
  // Lấy ID từ trên param url
  let { id } = useParams();
  // Khai báo các kho dữ liệu
  const [shopeeData, setshopeeData] = useState({});
  const [dateData, setDateData] = useState();
  const [info, setInfo] = useState();
  const [selectListInfo, setSelectListInfo] = useState([]);
  const [noteValue, setNoteValue] = useState("");
  // Khai báo kho dữ liệu của các form
  const [form] = Form.useForm();
  const [infoForm] = Form.useForm();
  const [dateForm] = Form.useForm();
  const [listselect_shopee_employee, setListshopee_employee] = useState();
  // Hàm để gửi dữ liệu đi
  const onFinish = async (values) => {
    const newValue = {
      ...info,
      ...values,
      shopee_plan: values?.shopee_plan ? values.shopee_plan.join(",") : "",
      shopee_block: values?.shopee_block ? values.shopee_block.join(",") : "",
      shopee_error: values?.shopee_error ? values.shopee_error.join(",") : "",
      shopee_processing: values?.shopee_processing
        ? values.shopee_processing.join(",")
        : "",
      shopee_type: values?.shopee_type ? values.shopee_type.join(",") : "",
      shopee_sell_status: values?.shopee_sell_status
        ? values.shopee_sell_status.join(",")
        : "",
      shopee_owner: values?.shopee_owner ? values.shopee_owner.join(",") : "",
      shopee_employee: values?.shopee_employee
        ? values.shopee_employee.join(",")
        : "",
      list_view: selectListInfo.length > 0 ? selectListInfo.join(",") : "",


        shopeedate_delivery:dateData?.shopeedate_delivery? moment(dateData.shopeedate_delivery).format("MM-DD-YYYY"): "",
        shopeedate_nextclass:dateData?.shopeedate_nextclass? moment(dateData.shopeedate_nextclass).format("MM-DD-YYYY"): "",
        shopeedate_start:dateData?.shopeedate_start? moment(dateData.shopeedate_start).format("MM-DD-YYYY"): "",
        shopeedate_verify:dateData?.shopeedate_verify? moment(dateData.shopeedate_verify).format("MM-DD-YYYY"): "",
        shopeedate_seller:dateData?.shopeedate_seller? moment(dateData.shopeedate_seller).format("MM-DD-YYYY"): "",
        shopeedate_verifybank:dateData?.shopeedate_verifybank? moment(dateData.shopeedate_verifybank).format("MM-DD-YYYY"): "",
        shopeedate_draft:dateData?.shopeedate_draft? moment(dateData.shopeedate_draft).format("MM-DD-YYYY"): "",
        shopeedate_list1:dateData?.shopeedate_list1? moment(dateData.shopeedate_list1).format("MM-DD-YYYY"): "",
        shopeedate_list2:dateData?.shopeedate_list2? moment(dateData.shopeedate_list2).format("MM-DD-YYYY"): "",
        shopeedate_list3:dateData?.shopeedate_list3? moment(dateData.shopeedate_list3).format("MM-DD-YYYY"): "",
        shopeedate_list4:dateData?.shopeedate_list4? moment(dateData.shopeedate_list4).format("MM-DD-YYYY"): "",
        shopeedate_list5:dateData?.shopeedate_list5? moment(dateData.shopeedate_list5).format("MM-DD-YYYY"): "",
        shopeedate_calendarseller:dateData?.shopeedate_calendarseller? moment(dateData.shopeedate_calendarseller).format("MM-DD-YYYY"): "",
        shopeedate_calendarlist1:dateData?.shopeedate_calendarlist1? moment(dateData.shopeedate_calendarlist1).format("MM-DD-YYYY"): "",
        shopeedate_calendarlist2:dateData?.shopeedate_calendarlist2? moment(dateData.shopeedate_calendarlist2).format("MM-DD-YYYY"): "",
        shopeedate_calendarlist3:dateData?.shopeedate_calendarlist3? moment(dateData.shopeedate_calendarlist3).format("MM-DD-YYYY"): "",
        shopeedate_calendarlist4:dateData?.shopeedate_calendarlist4? moment(dateData.shopeedate_calendarlist4).format("MM-DD-YYYY"): "",
        shopeedate_calendarlist5:dateData?.shopeedate_calendarlist5? moment(dateData.shopeedate_calendarlist5).format("MM-DD-YYYY"): "",
        shopeedate_suspended:dateData?.shopeedate_suspended? moment(dateData.shopeedate_suspended).format("MM-DD-YYYY"): "",
        shopeedate_contact1:dateData?.shopeedate_contact1? moment(dateData.shopeedate_contact1).format("MM-DD-YYYY"): "",
        shopeedate_contact2:dateData?.shopeedate_contact2? moment(dateData.shopeedate_contact2).format("MM-DD-YYYY"): "",
        shopeedate_contact3:dateData?.shopeedate_contact3? moment(dateData.shopeedate_contact3).format("MM-DD-YYYY"): "",
        shopeedate_contact4:dateData?.shopeedate_contact4? moment(dateData.shopeedate_contact4).format("MM-DD-YYYY"): "",
        shopeedate_contact5:dateData?.shopeedate_contact5? moment(dateData.shopeedate_contact5).format("MM-DD-YYYY"): "",
        shopeedate_checksus1:dateData?.shopeedate_checksus1? moment(dateData.shopeedate_checksus1).format("MM-DD-YYYY"): "",
        shopeedate_checksus2:dateData?.shopeedate_checksus2? moment(dateData.shopeedate_checksus2).format("MM-DD-YYYY"): "",
        shopeedate_checksus3:dateData?.shopeedate_checksus3? moment(dateData.shopeedate_checksus3).format("MM-DD-YYYY"): "",

      shopee_note: noteValue,
    };
    const response = await updateshopeeInfo(newValue, id);
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
  const getInfoshopee = async () => {
    const res = await getshopeeInfo(id);
    let data = res.data;
    const newData = {
      ...data,
      shopee_plan: data?.shopee_plan ? data.shopee_plan.split(",") : "",
      shopee_block: data?.shopee_block ? data.shopee_block.split(",") : "",
      shopee_error: data?.shopee_error ? data.shopee_error.split(",") : "",
      shopee_employee: data?.shopee_employee ? data.shopee_employee.split(",") : "",
      shopee_processing: data?.shopee_processing
        ? data.shopee_processing.split(",")
        : "",
      shopee_type: data?.shopee_type ? data.shopee_type.split(",") : "",
      shopee_sell_status: data?.shopee_sell_status
        ? data.shopee_sell_status.split(",")
        : "",
      shopee_owner: data?.shopee_owner ? data.shopee_owner.split(",") : "",
    };
    form.setFieldsValue(newData);
    infoForm.setFieldsValue(newData);
    dateForm.setFieldsValue({
      shopeedate_delivery: moment(data.shopeedate_delivery),
      shopeedate_nextclass: moment(data.shopeedate_nextclass),
      shopeedate_start: moment(data.shopeedate_start),
      shopeedate_verify: moment(data.shopeedate_verify),
      shopeedate_seller: moment(data.shopeedate_seller),
      shopeedate_verifybank: moment(data.shopeedate_verifybank),
      shopeedate_draft: moment(data.shopeedate_draft),
      shopeedate_list1: moment(data.shopeedate_list1),
      shopeedate_list2: moment(data.shopeedate_list2),
      shopeedate_list3: moment(data.shopeedate_list3),
      shopeedate_list4: moment(data.shopeedate_list4),
      shopeedate_list5: moment(data.shopeedate_list5),
      shopeedate_calendarseller: moment(data.shopeedate_calendarseller),
      shopeedate_calendarlist1: moment(data.shopeedate_calendarlist1),
      shopeedate_calendarlist2: moment(data.shopeedate_calendarlist2),
      shopeedate_calendarlist3: moment(data.shopeedate_calendarlist3),
      shopeedate_calendarlist4: moment(data.shopeedate_calendarlist4),
      shopeedate_calendarlist5: moment(data.shopeedate_calendarlist5),
      shopeedate_suspended: moment(data.shopeedate_suspended),
      shopeedate_contact1: moment(data.shopeedate_contact1),
      shopeedate_contact2: moment(data.shopeedate_contact2),
      shopeedate_contact3: moment(data.shopeedate_contact3),
      shopeedate_contact4: moment(data.shopeedate_contact4),
      shopeedate_contact5: moment(data.shopeedate_contact5),
      shopeedate_checksus1: moment(data.shopeedate_checksus1),
      shopeedate_checksus2: moment(data.shopeedate_checksus2),
      shopeedate_checksus3: moment(data.shopeedate_checksus3),
      
    });
    setNoteValue(data.shopee_note);
    setSelectListInfo(data.list_view.split(","));
    setListshopee_employee(data.listselect_shopee_employee);
  };
  // Hàm để chuyển trang sang các tài khoản khác
  const viewInfo = useCallback(
    (type, id) => {
      {
        window.open(`http://localhost:3000/products/${type}_class/table/${id}`);
      }
    },
    [info]
  );
  //  Những hàm được gọi trong useEffect sẽ được chạy lần đầu khi vào trang
  useEffect(() => {
    getInfoshopee();
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
      let old_shopee_owner = form.getFieldValue("shopee_owner");
      if (
        old_shopee_owner.indexOf("Phòng nâng cấp và phục hồi tài khoản") == -1
      ) {
        old_shopee_owner.push("Phòng nâng cấp và phục hồi tài khoản");
      }
      let new_shopee_processing = form.getFieldValue("shopee_processing");
      new_shopee_processing.push("Error");
      form.setFieldsValue({
        shopee_class: "Lớp 20",
        shopee_support: "Nguyễn Hoài",
        shopee_owner: old_shopee_owner,
        shopee_processing: new_shopee_processing,
      });
    }
    if (values == "Restrict") {
      let old_shopee_owner = form
        .getFieldValue("shopee_owner")
        .filter((item) => item !== "Phòng sản xuất");
      if (
        old_shopee_owner.indexOf("Phòng nâng cấp và phục hồi tài khoản") == -1
      ) {
        old_shopee_owner.push("Phòng nâng cấp và phục hồi tài khoản");
      }
      if (old_shopee_owner.indexOf("Kho lưu trữ") == -1) {
        old_shopee_owner.push("Kho lưu trữ");
      }
      let new_shopee_processing = form.getFieldValue("shopee_processing");
      new_shopee_processing.push("Restrict");
      form.setFieldsValue({
        shopee_class: "Lớp 23",
        shopee_support: "Nguyễn Hoài",
        shopee_owner: old_shopee_owner,
        shopee_processing: new_shopee_processing,
      });
    }
    if (values == "Suspended") {
      let old_shopee_owner = form
        .getFieldValue("shopee_owner")
        .filter((item) => item !== "Phòng sản xuất");
      if (
        old_shopee_owner.indexOf("Phòng nâng cấp và phục hồi tài khoản") == -1
      ) {
        old_shopee_owner.push("Phòng nâng cấp và phục hồi tài khoản");
      }
      if (old_shopee_owner.indexOf("Kho lưu trữ") == -1) {
        old_shopee_owner.push("Kho lưu trữ");
      }

      let new_shopee_processing = form.getFieldValue("shopee_processing");
      new_shopee_processing.push("Suspended");

      form.setFieldsValue({
        shopee_class: "Lớp 26",
        shopee_support: "Nguyễn Hoài",
        shopee_owner: old_shopee_owner,
        shopee_processing: new_shopee_processing,
      });
    }
  };

  const onChange_Processing = (values) => {
    if (values[values.length - 1] == "Buyer") {
      form.setFieldValue("shopee_class", "Lớp 3");
    }
    if (values[values.length - 1] == "Verify") {
      form.setFieldValue("shopee_class", "Lớp 5");
    }
  };

  const onChange_Class = (values) => {
    if (values == "Lớp 8") {
      let new_shopee_type = form.getFieldValue("shopee_type");
      if (new_shopee_type.indexOf("Seller") == -1) {
        new_shopee_type.push("Seller");
      }

      let new_shopee_processing = form.getFieldValue("shopee_processing");
      if (new_shopee_processing.indexOf("Seller") == -1) {
        new_shopee_processing.push("Seller");
      }

      form.setFieldsValue({
        shopee_processing: new_shopee_processing,
        shopee_type: new_shopee_type,
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
              <Card title="THÔNG TIN SHOPEE">
                <Form
                  form={form}
                  name="basic"
                  onFinish={onFinish}
                  initialValues={shopeeData}
                  autoComplete="off"
                >
                  <Row gutter={16}>
                    <Col span={6}>
                      <Form.Item
                        label="Shopee id"
                        name="shopee_id"
                        rules={[
                          {
                            required: true,
                            message: "Hãy nhập Shopee id!",
                          },
                        ]}
                        onClick={() =>
                          copyToClipboard(form.getFieldValue("shopee_id"))
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
                          copyToClipboard(form.getFieldValue("shopee_user"))
                        }
                        label="Shopee User"
                        name="shopee_user"
                      >
                        <Input size="small" placeholder="input here" />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label="Shopee Pass" name="shopee_password">
                        <Input size="small" placeholder="input here" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={16}>
                    <Col span={24}>
                      <Form.Item label="Shopee chi tiết" name="shopee_detail">
                        <Input size="small" placeholder="input here" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={16}>
                    <Col span={6}>
                      <Form.Item label="Shopee limit" name="shopee_limit">
                        <Input size="small" placeholder="0" />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item label="Shopee items" name="shopee_item">
                        <Input size="small" placeholder="0" />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item label="Shopee Sold" name="shopee_sold">
                        <Input size="small" placeholder="0" />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item label="Shopee Fb" name="shopee_feedback">
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
                      name="shopee_plan"
                      disabled={true}
                    >
                      <Select
                        mode="multiple"
                        style={{ width: "100%" }}
                        placeholder="select one item"
                        optionLabelProp="label"
                      >
                        {listselect_shopee_plan.map((item, index) => {
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
                      label="Shopee block"
                      name="shopee_block"
                      disabled={true}
                    >
                      <Select
                        mode="multiple"
                        style={{ width: "100%" }}
                        placeholder="select one item"
                        optionLabelProp="label"
                      >
                        {listselect_shopee_block.map((item, index) => {
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

                  <Form.Item label="Tiến trình" name="shopee_processing">
                    <Select
                      onChange={onChange_Processing}
                      mode="multiple"
                      style={{ width: "100%" }}
                      optionLabelProp="label"
                      //status="warning"
                    >
                      {listselect_shopee_processing.map((item, index) => {
                        return (
                          <Option value={item} label={item} key={index}>
                            <div className="demo-option-label-item">{item}</div>
                          </Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                  <Form.Item label="Phát sinh" name="shopee_error">
                    <Select
                      mode="multiple"
                      style={{ width: "100%" }}
                      optionLabelProp="label"
                      //status="warning"
                    >
                      {listselect_shopee_error.map((item, index) => {
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
                    <Form.Item label="Loại shopee" name="shopee_type">
                      <Select
                        mode="multiple"
                        style={{ width: "100%" }}
                        placeholder="select one item"
                        optionLabelProp="label"
                      >
                        {listselect_shopee_type.map((item, index) => {
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
                      name="shopee_sell_status"
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
                        {listselect_shopee_sell_status.map((item, index) => {
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
                    <Form.Item label="Sở hữu" name="shopee_owner">
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
                        {listselect_shopee_owner.map((item, index) => {
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
                    <Form.Item label="Nhân viên" name="shopee_employee">
                      <Select
                        mode="multiple"
                        style={{ width: "100%" }}
                        placeholder="select one item"
                        optionLabelProp="label"
                      >
                        {listselect_shopee_employee?.map((item) => {
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
                      <Form.Item label="Trạng thái" name="shopee_status">
                        <Select
                          //mode="multiple"
                          onChange={onChange_Status}
                          style={{ width: "100%" }}
                          optionLabelProp="label"
                        >
                          {listselect_shopee_status.map((item, index) => {
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
                      <Form.Item label="Lớp Shopee" name="shopee_class">
                        <Select
                          //mode="multiple"
                          style={{ width: "100%" }}
                          optionLabelProp="label"
                          onChange={onChange_Class}
                        >
                          {listselect_shopee_class.map((item, index) => {
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
                      <Form.Item label="Hỗ trợ" name="shopee_support">
                        <Select
                          style={{ width: "100%" }}
                          placeholder="select one item"
                          optionLabelProp="label"
                        >
                          {listselect_shopee_employee?.map((item) => {
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
                    <Form.Item name="shopee_image_url">
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
                    {tablelist_shopee_Date.map((item, index) => {
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
                  | Thế Minh Hồng, 2022-11-26 14:34:04 Cập nhật lần cuối:
                  2022-11-23 16:50:34
                </span>
              </Card>
            </Col>
          </Row>
        </Tabs.TabPane>

        <Tabs.TabPane tab="HƯỚNG DẪN" key="3">
          <p>1. Shopee mã EB_12345</p>
          <p>
            1. Shopee được tạo từ tool - nhập liệu - Chọn SHOPEE, bảng bên cạnh nhập
            user|pass (user: là tên shop shopee chuẩn bị sẵn, có hướng dẫn tạo acc
            bên tool nhập liệu)
          </p>
          <p>
            2. Quy trình: là kế hoạch triển khai acc theo các yêu cầu định sẵn.
            Kế hoạch được tạo khi tạo mã Shopee từ tool nhập liệu
          </p>
          <p>
            3. Tiến trình: Là quá trình thực hiện công việc của nhân viên. Từ
            tiến trình ta biết được acc đang làm đến hạng mục nào, nếu suspend
            thì biết được suspend ở hạng mục nào, dùng để tạo báo cáo, phân loại
            acc
          </p>
          <p>
            4. Loại shopee: Là tổng quan 1 tài khoản shopee, dùng để tạo báo cáo,
            phân loại acc
          </p>
          <p>
            5. Trạng thái bán: Dùng để phân loại tài khoản của phòng kinh doanh
          </p>
          <p>6. Sở hữu: Dùng để phân quyền các phòng ban theo acc</p>
          <p>7. Nhân viên: Dùng để phân quyền nhân viên theo acc</p>
          <p>
            8. Trạng thái: Dùng để xác định trạng thái của acc, tạo báo cáo,
            phân loại acc
          </p>
          <p>
            9. Lớp shopee: Dùng để xác định tổng quan các hạng mục đã triển khai,
            dùng tạo báo cáo, phân loại acc
          </p>
          <p>
            10. Upload ảnh: Dùng để upload câu hỏi bảo mật, upload ảnh shopee
            suspended, tải cccd
          </p>
          <p>
            11. Click vào loại acc trong bảng THÔNG TIN TÀI NGUYÊN: chuyển đến
            trang chi tiết của tài nguyên đó
          </p>
          <br></br>
          <p>
            Tính năng: Khi chọn suspend + upload ảnh + Lớp nhỏ hơn 9 - tự động
            chuyển acc về lớp 20, tự động điền ngày suspend, tự động chọn
            suspended trong tiến trình,tự động thêm phòng phục hồi tài khoản, tự
            động disable tất cả các field{" "}
          </p>
          <p>
            Tính năng: Khi chọn suspend + upload ảnh + Lớp lớn hơn 8 - tự động
            chuyển acc về lớp 21, tự động điền ngày suspend, tự động chọn
            suspended trong tiến trình,tự động thêm phòng phục hồi tài khoản, tự
            động disable tất cả các field{" "}
          </p>
          <p>
            Khi chọn tiến trình thì tự động điền ngày tưng ứng với tiến trình
            được chọn, tự động điền ngày chuyển lớp khi chuyển lớp{" "}
          </p>
          <p>Khi ấn lưu - tự động ghi lại lịch sử: user|lớp cũ|ngày tháng</p>
          <p>
            Để tạo 1 acc shopee or etsy... trên 1 device thì vào device đó ấn tạo
            shopee or etsy...
          </p>
          <p>
            Để thay đổi field của nhiều acc 1 lúc, hoặc xem báo cáo cơ bản thì
            vào phần tool- xử lý số liệu - filter{" "}
          </p>
          <p>
            Thông tin tài nguyên: acc nào suspend thì icon chuyển về mầu xám
          </p>
          <br></br>
          <p>
            Ctrl + /;Shift + Alt + A (comment);Ctrl + Shift + [;Ctrl + K, Ctrl +
            0;Ctrl + K, Ctrl + J;Ctrl + K, Ctrl + [;Ctrl + K, Ctrl + ];{" "}
          </p>
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

export default Shopee_info;
