// phím tắt để đóng mở region : ctrl K + ctrl 0; ctrl K + ctrl J ; ctrl K + ctrl ] ; ctrl K + ctrl [ ; ctrl shifft [ ; ctrl shifft ]

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
import { getUser, randomStr } from "../../utils/index";
import { PlusOutlined } from "@ant-design/icons";
import { showError, showSuccess } from "../../utils";
import { useSelector } from "react-redux";
import { uploadFile } from "../../api/upload";
import { useParams } from "react-router-dom";
import { copyToClipboard } from "../../utils/index";
import dayjs, { now } from "dayjs";
import React, { useCallback, useEffect, useState } from "react";

import {
  tablelist_mail_Date,
  listselect_view_acc,
  listselect_mail_plan,
  listselect_mail_block,
  listselect_mail_processing,
  listselect_mail_error,
  listselect_mail_type,
  listselect_mail_sell_status,
  listselect_mail_owner,
  listselect_mail_status,
  listselect_mail_class,
  HuongDanMail_info,
  ContentMail,
} from "./Mail_list";

import {
  postmailInfo,
  getmailInfo,
  updatemailInfo,
} from "../../api/mail/index";
import { updateListView } from "../../api/update";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const Mail_info = () => {
  const { Option } = Select;
  const { users_function, users_name } = useSelector((state) => state.auth);
  // Lấy ID từ trên param url
  let { id } = useParams();
  // Khai báo các kho dữ liệu
  const [mailData, setmailData] = useState({});
  const [dateData, setDateData] = useState();
  const [info, setInfo] = useState();
  const [selectListInfo, setSelectListInfo] = useState([]);
  const [noteValue, setNoteValue] = useState("");
  // Khai báo kho dữ liệu của các form
  const [form] = Form.useForm();
  const [infoForm] = Form.useForm();
  const [dateForm] = Form.useForm();
  const [listselect_mail_employee, setListmail_employee] = useState();

  // Tạo state để nhận dữ liệu của listview

  const [listViewData, setListViewData] = useState();
  const [modalListView, setModalListView] = useState(false);
  const [viewData, setViewData] = useState();
  const [valueInput, setValueInput] = useState();

  // Xử lý dữ liệu Modal List view tài khoản khác bằng id

  const setValueView = (e) => {
    setValueInput(e.target.value);
  };

  const openModalListView = (name) => {
    setViewData(name);
    setModalListView(true);
  };

  const submitModalListView = async () => {
    let payload = {};
    payload[viewData] = valueInput;
    if (!valueInput) {
      cancelListView();
      return;
    }
    await updatemailInfo(payload, info.mail_id);
    window.location.reload();
    showSuccess("Thành công");
  };

  const cancelListView = () => {
    setModalListView(false);
    setValueInput("");
    setViewData("");
  };

  // hàm lưu lại value của class, status trong listview theo db của từng field
  const onChangeStatusListView = async (key, value, id) => {
    let newData = JSON.parse(JSON.stringify(listViewData));
    newData[key] = value;
    setListViewData(newData);
    await updateListView(id, key, value);
    showSuccess("Thành công");
  };
  // Hàm để chuyển trang sang các tài khoản khác
  const viewInfo = useCallback(
    (type, id) => {
      window.open(
        `${process.env.REACT_APP_URL}/products/${type}_class/table/${id}`
      );
    },
    [info]
  );

  // Hàm để gửi dữ liệu đi
  const onFinish = async (values) => {
    let mail_file = [];
    fileList?.map((item) => {
      let fileUrl = "";
      if (item?.xhr?.response) {
        fileUrl = JSON.parse(item.xhr.response).url;
      } else {
        fileUrl = item.url;
      }
      mail_file.push(fileUrl);
    });
    let dateValue = {};
    tablelist_mail_Date.map((item) => {
      dateValue[item.value] = dayjs(dateData[item.value]).format(
        "YYYY-MM-DD HH:mm"
      );
    });
    const newValue = {
      ...values,
      ...dateValue,
      mail_image_url: mail_file.length > 0 ? mail_file.join(",") : "",
      mail_plan: values?.mail_plan ? values.mail_plan.join(",") : "",
      mail_block: values?.mail_block ? values.mail_block.join(",") : "",
      mail_error: values?.mail_error ? values.mail_error.join(",") : "",
      mail_processing: values?.mail_processing
        ? values.mail_processing.join(",")
        : "",
      mail_type: values?.mail_type ? values.mail_type.join(",") : "",
      mail_sell_status: values?.mail_sell_status
        ? values.mail_sell_status.join(",")
        : "",
      mail_owner: values?.mail_owner ? values.mail_owner.join(",") : "",
      mail_employee: values?.mail_employee
        ? values.mail_employee.join(",")
        : "",
      list_view: selectListInfo.length > 0 ? selectListInfo.join(",") : "",
      mail_note: noteValue,
      mail_history: info.mail_history,
    };

    const response = await updatemailInfo(newValue, id);
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
  const getInfomail = async () => {
    const res = await getmailInfo(id);
    let data = res.data;
    const newData = {
      ...data,
      mail_plan: data?.mail_plan ? data.mail_plan.split(",") : "",
      mail_block: data?.mail_block ? data.mail_block.split(",") : "",
      mail_error: data?.mail_error ? data.mail_error.split(",") : "",
      mail_employee: data?.mail_employee ? data.mail_employee.split(",") : "",
      mail_processing: data?.mail_processing
        ? data.mail_processing.split(",")
        : "",
      mail_type: data?.mail_type ? data.mail_type.split(",") : "",
      mail_sell_status: data?.mail_sell_status
        ? data.mail_sell_status.split(",")
        : "",
      mail_owner: data?.mail_owner ? data.mail_owner.split(",") : "",

      device_id: data?.device_id ? data?.device_id?.device_id : "",
      proxy_id: data?.proxy_id ? data?.proxy_id?.proxy_id : "",
      info_id: data?.info_id ? data?.info_id?.info_id : "",
      etsy_id: data?.etsy_id ? data?.etsy_id?.etsy_id : "",
      sim_id: data?.sim_id ? data?.sim_id?.sim_id : "",
      bank_id: data?.bank_id ? data?.bank_id?.bank_id : "",
      payoneer_id: data?.payoneer_id ? data?.payoneer_id?.payoneer_id : "",
      paypal_id: data?.paypal_id ? data?.paypal_id?.paypal_id : "",
      pingpong_id: data?.pingpong_id ? data?.pingpong_id?.pingpong_id : "",
      //mail_id: data?.mail_id ? data?.mail_id?.mail_id : "",
      ebay_id: data?.ebay_id ? data?.ebay_id?.ebay_id : "",
      amazon_id: data?.amazon_id ? data?.amazon_id?.amazon_id : "",
      shopee_id: data?.shopee_id ? data?.shopee_id?.shopee_id : "",
      facebook_id: data?.facebook_id ? data?.facebook_id?.facebook_id : "",
      tiktok_id: data?.tiktok_id ? data?.tiktok_id?.tiktok_id : "",
    };
    // hàm đổ dữ liệu về field khi đã liên kết field
    setListViewData({
      device_class: data?.device_id ? data?.device_id?.device_class : "",
      device_status: data?.device_id ? data?.device_id?.device_status : "",
      device_user: data?.device_id ? data?.device_id?.device_user : "",
      device_password: data?.device_id ? data?.device_id?.device_password : "",

      proxy_class: data?.proxy_id ? data?.proxy_id?.proxy_class : "",
      proxy_status: data?.proxy_id ? data?.proxy_id?.proxy_status : "",
      proxy_user: data?.proxy_id ? data?.proxy_id?.proxy_user : "",
      proxy_password: data?.proxy_id ? data?.proxy_id?.proxy_password : "",

      info_class: data?.info_id ? data?.info_id?.info_class : "",
      info_status: data?.info_id ? data?.info_id?.info_status : "",
      info_user: data?.info_id ? data?.info_id?.info_fullname : "",
      info_password: data?.info_id ? data?.info_id?.infodate_birthday : "",

      etsy_class: data?.etsy_id ? data?.etsy_id?.etsy_class : "",
      etsy_status: data?.etsy_id ? data?.etsy_id?.etsy_status : "",
      etsy_user: data?.etsy_id ? data?.etsy_id?.etsy_user : "",
      etsy_password: data?.etsy_id ? data?.etsy_id?.etsy_password : "",

      sim_class: data?.sim_id ? data?.sim_id?.sim_class : "",
      sim_status: data?.sim_id ? data?.sim_id?.sim_status : "",
      sim_user: data?.sim_id ? data?.sim_id?.sim_user : "",
      sim_password: data?.sim_id ? data?.sim_id?.sim_password : "",

      bank_class: data?.bank_id ? data?.bank_id?.bank_class : "",
      bank_status: data?.bank_id ? data?.bank_id?.bank_status : "",
      bank_user: data?.bank_id ? data?.bank_id?.bank_user : "",
      bank_password: data?.bank_id ? data?.bank_id?.bank_password : "",

      payoneer_class: data?.payoneer_id
        ? data?.payoneer_id?.payoneer_class
        : "",
      payoneer_status: data?.payoneer_id
        ? data?.payoneer_id?.payoneer_status
        : "",
      payoneer_user: data?.payoneer_id ? data?.payoneer_id?.payoneer_user : "",
      payoneer_password: data?.payoneer_id
        ? data?.payoneer_id?.payoneer_password
        : "",

      paypal_class: data?.paypal_id ? data?.paypal_id?.paypal_class : "",
      paypal_status: data?.paypal_id ? data?.paypal_id?.paypal_status : "",
      paypal_user: data?.paypal_id ? data?.paypal_id?.paypal_user : "",
      paypal_password: data?.paypal_id ? data?.paypal_id?.paypal_password : "",

      pingpong_class: data?.pingpong_id
        ? data?.pingpong_id?.pingpong_class
        : "",
      pingpong_status: data?.pingpong_id
        ? data?.pingpong_id?.pingpong_status
        : "",
      pingpong_user: data?.pingpong_id ? data?.pingpong_id?.pingpong_user : "",
      pingpong_password: data?.pingpong_id
        ? data?.pingpong_id?.pingpong_password
        : "",

      ebay_class: data?.ebay_id ? data?.ebay_id?.ebay_class : "",
      ebay_status: data?.ebay_id ? data?.ebay_id?.ebay_status : "",
      ebay_user: data?.ebay_id ? data?.ebay_id?.ebay_user : "",
      ebay_password: data?.ebay_id ? data?.ebay_id?.ebay_password : "",

      amazon_class: data?.amazon_id ? data?.amazon_id?.amazon_class : "",
      amazon_status: data?.amazon_id ? data?.amazon_id?.amazon_status : "",
      amazon_user: data?.amazon_id ? data?.amazon_id?.amazon_user : "",
      amazon_password: data?.amazon_id ? data?.amazon_id?.amazon_password : "",

      shopee_class: data?.shopee_id ? data?.shopee_id?.shopee_class : "",
      shopee_status: data?.shopee_id ? data?.shopee_id?.shopee_status : "",
      shopee_user: data?.shopee_id ? data?.shopee_id?.shopee_user : "",
      shopee_password: data?.shopee_id ? data?.shopee_id?.shopee_password : "",

      facebook_class: data?.facebook_id
        ? data?.facebook_id?.facebook_class
        : "",
      facebook_status: data?.facebook_id
        ? data?.facebook_id?.facebook_status
        : "",
      facebook_user: data?.facebook_id ? data?.facebook_id?.facebook_user : "",
      facebook_password: data?.facebook_id
        ? data?.facebook_id?.facebook_password
        : "",

      tiktok_class: data?.tiktok_id ? data?.tiktok_id?.tiktok_class : "",
      tiktok_status: data?.tiktok_id ? data?.tiktok_id?.tiktok_status : "",
      tiktok_user: data?.tiktok_id ? data?.tiktok_id?.tiktok_user : "",
      tiktok_password: data?.tiktok_id ? data?.tiktok_id?.tiktok_password : "",
    });
    form.setFieldsValue(newData);
    infoForm.setFieldsValue(newData);
    let dateValue = {};
    tablelist_mail_Date.map((item) => {
      dateValue[item.value] = dayjs(data[item.value]);
    });
    if (data?.mail_image_url) {
      let dataImage = [];
      let imageArr = data.mail_image_url.split(",");
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
    dateForm.setFieldsValue(dateValue);
    setDateData(data);
    setNoteValue(data.mail_note);
    setInfo(newData);
    setSelectListInfo(data.list_view.split(","));
    setListmail_employee(data.listselect_mail_employee);
  };

  //  Những hàm được gọi trong useEffect sẽ được chạy lần đầu khi vào trang
  useEffect(() => {
    getInfomail();
  }, []);
  // Hàm để thay đổi dữ liệu của select list info
  const changeSelectListInfo = (values) => {
    setSelectListInfo(values);
  };

  // Hàm để thay đổi dữ liệu của note
  const handleChangeNote = (e) => {
    setNoteValue(e.target.value);
  };

  // Hàm upload
  // Hàm viết tự động hóa
  const onChange_Status = async (values) => {
    if (values == "Error" || values == "Restrict" || values == "Suspended") {
      let new_mail_owner = form.getFieldValue("mail_owner");
      if (new_mail_owner.indexOf("Phòng phục hồi") == -1) {
        new_mail_owner.push("Phòng phục hồi");
      }
      if (new_mail_owner.indexOf("Kho lưu trữ") == -1) {
        new_mail_owner.push("Kho lưu trữ");
      }
      // lưu vào db vì quyền nhân viên không hiển thị
      let { data } = await updatemailInfo(
        {
          mail_owner: new_mail_owner.join(","),
        },
        info.mail_id
      );
      // Tiếp tục set
      let new_mail_processing = form.getFieldValue("mail_processing");
      let old_mail_processing = info.mail_processing;
      if (new_mail_processing.indexOf(values) == -1) {
        new_mail_processing.push(values);
      }

      let new_mail_class = form.getFieldValue("mail_class");
      if (values == "Error") {
        (new_mail_class = "Lớp 20"),
          dateForm.setFieldValue("maildate_error", dayjs(now())); // Hiển thị ra màn hình
        dateForm.setFieldValue("maildate_nextclass", dayjs(now()));
        setDateData({
          ...dateData,
          maildate_error: dayjs(now()),
          maildate_nextclass: dayjs(now()),
        }); // Dùng hàm này set lại date mới lưu đc vào db
      }
      if (values == "Restrict") {
        (new_mail_class = "Lớp 23"),
          dateForm.setFieldValue("maildate_restrict", dayjs(now()));
        dateForm.setFieldValue("maildate_nextclass", dayjs(now()));
        setDateData({
          ...dateData,
          maildate_restrict: dayjs(now()),
          maildate_nextclass: dayjs(now()),
        });
      }
      if (values == "Suspended") {
        (new_mail_class = "Lớp 26"),
          dateForm.setFieldValue("maildate_suspended", dayjs(now()));
        dateForm.setFieldValue("maildate_nextclass", dayjs(now()));
        setDateData({
          ...dateData,
          maildate_suspended: dayjs(now()),
          maildate_nextclass: dayjs(now()),
        });
      }

      form.setFieldsValue({
        mail_class: new_mail_class,
        mail_support: "Nguyễn Hoài",
        mail_processing: new_mail_processing,
        mail_owner: new_mail_owner,
      }); // Dùng hàm này set lại để lưu vào db
    }
  };

  const onChange_Processing = (values) => {
    if (values[values.length - 1] == "Buyer") {
      form.setFieldValue("mail_class", "Lớp 4");
      dateForm.setFieldValue("maildate_start", dayjs(now()));
      dateForm.setFieldValue("maildate_nextclass", dayjs(now()));
      setDateData({
        ...dateData,
        maildate_start: dayjs(now()),
        maildate_nextclass: dayjs(now()),
      });
    }
    if (values[values.length - 1] == "Verify Full") {
      form.setFieldValue("mail_class", "Lớp 6");
      dateForm.setFieldValue("maildate_verify", dayjs(now()));
      dateForm.setFieldValue("maildate_nextclass", dayjs(now()));
      setDateData({
        ...dateData,
        maildate_verify: dayjs(now()),
        maildate_nextclass: dayjs(now()),
      });
    }
    if (values[values.length - 1] == "Seller") {
      form.setFieldValue("mail_class", "Lớp 9");
      dateForm.setFieldValue("maildate_seller", dayjs(now()));
      dateForm.setFieldValue("maildate_nextclass", dayjs(now()));
      setDateData({
        ...dateData,
        maildate_seller: dayjs(now()),
        maildate_nextclass: dayjs(now()),
      });
    }
    if (values[values.length - 1] == "List") {
      form.setFieldValue("mail_class", "Lớp 10");
      dateForm.setFieldValue("maildate_list1", dayjs(now()));
      dateForm.setFieldValue("maildate_nextclass", dayjs(now()));
      setDateData({
        ...dateData,
        maildate_list1: dayjs(now()),
        maildate_nextclass: dayjs(now()),
      });
    }
    if (values[values.length - 1] == "Move room") {
      form.setFieldValue("mail_class", "Lớp 12");
      dateForm.setFieldValue("maildate_moveroom", dayjs(now()));
      dateForm.setFieldValue("maildate_nextclass", dayjs(now()));
      setDateData({
        ...dateData,
        maildate_moveroom: dayjs(now()),
        maildate_nextclass: dayjs(now()),
      });
    }
  };

  const onChange_Class = async (values) => {
    dateForm.setFieldValue("maildate_nextclass", dayjs(now()));
    setDateData({
      ...dateData,
      maildate_nextclass: dayjs(now()),
    });

    if (values == "Lớp 9") {
      let new_mail_type = form.getFieldValue("mail_type");
      if (new_mail_type.indexOf("Seller") == -1) {
        new_mail_type.push("Seller");
      }

      // lưu vào db vì quyền nhân viên không hiển thị
      let { data } = await updatemailInfo(
        {
          new_mail_type: new_mail_type.join(","),
        },
        info.mail_id
      );

      let new_mail_processing = form.getFieldValue("mail_processing");
      if (new_mail_processing.indexOf("Seller") == -1) {
        new_mail_processing.push("Seller");
      }

      form.setFieldsValue({
        mail_processing: new_mail_processing,
        mail_type: new_mail_type,
      });

      dateForm.setFieldValue("maildate_seller", dayjs(now()));
      dateForm.setFieldValue("maildate_nextclass", dayjs(now()));
      setDateData({
        ...dateData,
        maildate_seller: dayjs(now()),
        maildate_nextclass: dayjs(now()),
      });
    }

    if (values == "Lớp 4") {
      let new_mail_type = form.getFieldValue("mail_type");
      if (new_mail_type.indexOf("Buyer") == -1) {
        new_mail_type.push("Buyer");
      }
      // lưu vào db vì quyền nhân viên không hiển thị
      let { data } = await updatemailInfo(
        {
          new_mail_type: new_mail_type.join(","),
        },
        info.mail_id
      );

      let new_mail_processing = form.getFieldValue("mail_processing");
      if (new_mail_processing.indexOf("Buyer") == -1) {
        new_mail_processing.push("Buyer");
      }
      /*  let new_mail_owner = form
        .getFieldValue("mail_owner")
        .filter((item) => item !== ""); */

      form.setFieldsValue({
        mail_processing: new_mail_processing,
        mail_type: new_mail_type,
      });

      dateForm.setFieldValue("maildate_start", dayjs(now()));
      dateForm.setFieldValue("maildate_nextclass", dayjs(now()));
      setDateData({
        ...dateData,
        maildate_start: dayjs(now()),
        maildate_nextclass: dayjs(now()),
      });
    }

    if (values == "Lớp 12") {
      let new_mail_type = form.getFieldValue("mail_type");
      if (new_mail_type.indexOf("Bán acc") == -1) {
        new_mail_type.push("Bán acc");
      }
      let new_mail_owner = form.getFieldValue("mail_owner");
      if (new_mail_owner.indexOf("Phòng Kinh doanh") == -1) {
        new_mail_owner.push("Phòng Kinh doanh");
      }
      // lưu vào db vì quyền nhân viên không hiển thị
      let { data } = await updatemailInfo(
        {
          new_mail_type: new_mail_type.join(","),
          new_mail_owner: new_mail_owner.join(","),
        },
        info.mail_id
      );

      let new_mail_processing = form.getFieldValue("mail_processing");
      if (new_mail_processing.indexOf("Move room") == -1) {
        new_mail_processing.push("Move room");
      }

      form.setFieldsValue({
        mail_processing: new_mail_processing,
        mail_type: new_mail_type,
        mail_owner: new_mail_owner,
      });

      dateForm.setFieldValue("maildate_moveroom", dayjs(now()));
      dateForm.setFieldValue("maildate_nextclass", dayjs(now()));
      setDateData({
        ...dateData,
        maildate_moveroom: dayjs(now()),
        maildate_nextclass: dayjs(now()),
      });
    }
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

  return (
    <Card
      title={id + " | " + (info?._id ? info?._id : "")}
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
        <Tabs.TabPane tab="THÔNG TIN TÀI KHOẢN" key="1">
          <Row gutter={16}>
            <Col span={12}>
              <Card title={
                  <strong
                    style={{
                      color: "#1890FD",
                    }}
                  >
                   THÔNG TIN MAIL
                  </strong>
                }>
                <Form
                  form={form}
                  name="basic"
                  onFinish={onFinish}
                  initialValues={mailData}
                  autoComplete="off"
                  size="large"
                >
                  <Row gutter={16}>
                    <Col span={6}>
                      <Form.Item
                        label="Mail id"
                        name="mail_id"
                        style={{ width: "100%" }}
                        rules={[
                          {
                            required: true,
                            message: "Hãy nhập Mail id!",
                          },
                        ]}
                        onClick={() =>
                          copyToClipboard(form.getFieldValue("_id"))
                        }
                      >
                        <Input
                          disabled={true}
                          
                          placeholder="input here"
                        />
                      </Form.Item>
                    </Col>
                    <Col span={10}>
                      <Form.Item
                        label="Mail User"
                        name="mail_user"
                      >
                        <Input  placeholder="input here" />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        label="Mail Pass"
                        name="mail_password"
                      >
                        <Input  placeholder="input here" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={16}>
                    <Col span={24}>
                      <Form.Item
                        label="Mail chi tiết"
                        name="mail_detail"
                      >
                        <Input  placeholder="input here" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={16}>
                    <Col span={8}>
                      <Form.Item label="Mail recover" name="mail_limit">
                        <Input  placeholder="0" />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label="Mail forward" name="mail_item">
                        <Input  placeholder="0" />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label="Mail Sold" name="mail_sold">
                        <Input  placeholder="0" />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label="Mail pass" name="mail_feedback">
                        <Input  placeholder="0" />
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
                      name="mail_plan"
                      disabled={true}
                    >
                      <Select
                        mode="multiple"
                        style={{ width: "100%" }}
                        placeholder="select one item"
                        optionlabelprop="label"
                      >
                        {listselect_mail_plan.map((item, index) => {
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
                      label="Mail block"
                      name="mail_block"
                      disabled={true}
                    >
                      <Select
                        mode="multiple"
                        style={{ width: "100%" }}
                        placeholder="select one item"
                        optionlabelprop="label"
                      >
                        {listselect_mail_block.map((item, index) => {
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

                  <Form.Item label="Tiến trình" name="mail_processing">
                    <Select
                      onChange={onChange_Processing}
                      mode="multiple"
                      style={{ width: "100%", color: "green" }}
                      optionlabelprop="label"
                      //status="warning"
                    >
                      {listselect_mail_processing.map((item, index) => {
                        return (
                          <Option value={item} label={item} key={index}>
                            <div className="demo-option-label-item">{item}</div>
                          </Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                  <Form.Item label="Phát sinh" name="mail_error">
                    <Select
                      mode="multiple"
                      style={{ width: "100%", color: "red" }}
                      optionlabelprop="label"
                      //status="warning"
                    >
                      {listselect_mail_error.map((item, index) => {
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
                    <Form.Item label="Loại mail" name="mail_type">
                      <Select
                        mode="multiple"
                        style={{ width: "100%" }}
                        placeholder="select one item"
                        optionlabelprop="label"
                      >
                        {listselect_mail_type.map((item, index) => {
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
                      name="mail_sell_status"
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
                        optionlabelprop="label"
                      >
                        {listselect_mail_sell_status.map((item, index) => {
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
                    <Form.Item label="Sở hữu" name="mail_owner">
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
                        optionlabelprop="label"
                      >
                        {listselect_mail_owner.map((item, index) => {
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
                    <Form.Item label="Nhân viên" name="mail_employee">
                      <Select
                        mode="multiple"
                        style={{ width: "100%" }}
                        placeholder="select one item"
                        optionlabelprop="label"
                      >
                        {listselect_mail_employee?.map((item) => {
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
                      <Form.Item label="Trạng thái" name="mail_status">
                        <Select
                          //mode="multiple"
                          onChange={onChange_Status}
                          optionlabelprop="label"
                          style={{
                            width: "100%",
                            color:
                              ["Suspended", "Error"].indexOf(
                                form.getFieldValue("mail_status")
                              ) != -1
                                ? "red"
                                : "",
                            fontWeight:
                              ["Suspended", "Error"].indexOf(
                                form.getFieldValue("mail_status")
                              ) != -1
                                ? "bold !important"
                                : "",
                          }}
                        >
                          {listselect_mail_status.map((item, index) => {
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
                      <Form.Item label="Lớp Mail" name="mail_class">
                        <Select
                          //mode="multiple"
                          style={{ width: "100%" }}
                          optionlabelprop="label"
                          onChange={onChange_Class}
                        >
                          {listselect_mail_class.map((item, index) => {
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
                      <Form.Item label="Hỗ trợ" name="mail_support">
                        <Select
                          style={{ width: "100%" }}
                          placeholder="select one item"
                          optionlabelprop="label"
                        >
                          {listselect_mail_employee?.map((item) => {
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
                    <Form.Item name="mail_image_url">
                      <Upload
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
              <Card title={
                  <strong
                    style={{
                      color: "#1890FD",
                    }}
                  >
                  THÔNG TIN TÀI NGUYÊN
                  </strong>
                }>
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
                    optionlabelprop="label"
                    onChange={changeSelectListInfo}
                    value={selectListInfo}
                    size="large"
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
                {/* form List_view */}
                <Form
                  onFinish={onFinishInfo}
                  initialValues={info}
                  form={infoForm}
                  name="info"
                  size="large"
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

                              <Row gutter={16} style={{ width: "100%" }}>
                                <Col span={4}>
                                  <Form.Item
                                    onClick={() =>
                                      openModalListView(
                                        item.title.toLocaleLowerCase() + "_id"
                                      )
                                    }
                                    name={
                                      item.title
                                        .toLocaleLowerCase()
                                        .split("|")[0] + "_id"
                                    }
                                  >
                                    <Input disabled />
                                  </Form.Item>
                                </Col>
                                <Col span={6}>
                                  <Form.Item
                                    onClick={() =>
                                      copyToClipboard(
                                        listViewData[
                                          item.title.toLocaleLowerCase() +
                                            "_user"
                                        ]
                                      )
                                    }
                                  >
                                    <Input
                                      value={
                                        listViewData[
                                          item.title.toLocaleLowerCase() +
                                            "_user"
                                        ]
                                      }
                                      disabled
                                    />
                                  </Form.Item>
                                </Col>
                                <Col span={6}>
                                  <Form.Item
                                    onClick={() =>
                                      copyToClipboard(
                                        listViewData[
                                          item.title.toLocaleLowerCase() +
                                            "_password"
                                        ]
                                      )
                                    }
                                  >
                                    <Input
                                      value={
                                        listViewData[
                                          item.title.toLocaleLowerCase() +
                                            "_password"
                                        ]
                                      }
                                      disabled
                                    />
                                  </Form.Item>
                                </Col>
                                <Col span={4}>
                                  <Select
                                    //mode="multiple"
                                    style={{ width: "100%" }}
                                    optionlabelprop="label"
                                    value={
                                      listViewData[
                                        item.title.toLocaleLowerCase() +
                                          "_status"
                                      ]
                                    }
                                    onChange={(value) =>
                                      onChangeStatusListView(
                                        item.title.toLocaleLowerCase() +
                                          "_status",
                                        value,
                                        info[
                                          item.title.toLocaleLowerCase() + "_id"
                                        ].split("|")[0]
                                      )
                                    }
                                  >
                                    {listselect_mail_status.map(
                                      (item, index) => {
                                        return (
                                          <Option
                                            value={item}
                                            label={item}
                                            key={index}
                                          >
                                            <div className="demo-option-label-item">
                                              {item}
                                            </div>
                                          </Option>
                                        );
                                      }
                                    )}
                                  </Select>
                                </Col>
                                <Col span={4}>
                                  <Select
                                    //mode="multiple"
                                    style={{ width: "100%" }}
                                    optionlabelprop="label"
                                    value={
                                      listViewData[
                                        item.title.toLocaleLowerCase() +
                                          "_class"
                                      ]
                                    }
                                    onChange={(value) =>
                                      onChangeStatusListView(
                                        item.title.toLocaleLowerCase() +
                                          "_class",
                                        value,
                                        info[
                                          item.title.toLocaleLowerCase() + "_id"
                                        ].split("|")[0]
                                      )
                                    }
                                  >
                                    {listselect_mail_class.map(
                                      (item, index) => {
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
                                      }
                                    )}
                                  </Select>
                                </Col>
                              </Row>
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
              <Card title="THỜI GIAN: YYYY-MM-DD">
                <Form
                  form={dateForm}
                  onFinish={onFinishDate}
                  name="date"
                  initialValues={dateData}
                  size="large"
                >
                  <Row gutter={16}>
                    {tablelist_mail_Date.map((item, index) => {
                      return (
                        <Col key={index} span={8}>
                          <Form.Item label={item.title} name={item.value}>
                            <DatePicker
                              style={{ float: "right" }}
                              format="YYYY-MM-DD HH:mm"
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
                  {info?.mail_history?.split(",")?.map((data) => {
                    return <div>{data}</div>;
                  })}
                </span>
              </Card>
            </Col>
          </Row>
        </Tabs.TabPane>
        <Tabs.TabPane tab="HƯỚNG DẪN" key="3">
          <HuongDanMail_info />
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
        title={"Thay tài khoản khác: " + (viewData ? viewData : "")}
        open={modalListView}
        onOk={() => submitModalListView()}
        onCancel={() => cancelListView()}
      >
        <Input placeholder="Input _id" onChange={setValueView}></Input>
      </Modal>
    </Card>
  );
};

export default Mail_info;
