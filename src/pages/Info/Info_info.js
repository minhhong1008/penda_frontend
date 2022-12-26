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
import moment, { now } from "moment";
import React, { useCallback, useEffect, useState } from "react";

import {
  tablelist_info_Date,
  listselect_view_acc,
  listselect_info_plan,
  listselect_info_block,
  listselect_info_processing,
  listselect_info_error,
  listselect_info_type,
  listselect_info_sell_status,
  listselect_info_owner,
  listselect_info_status,
  listselect_info_class,
  HuongDanInfo_info,
  ContentInfo,
} from "./Info_list";

import {
  postinfoInfo,
  getinfoInfo,
  updateinfoInfo,
} from "../../api/info/index";
import { updateListView } from "../../api/update";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const Info_info = () => {
  const { Option } = Select;
  const { users_function, users_name } = useSelector((state) => state.auth);
  // Lấy ID từ trên param url
  let { id } = useParams();
  // Khai báo các kho dữ liệu
  const [infoData, setinfoData] = useState({});
  const [dateData, setDateData] = useState();
  const [info, setInfo] = useState();
  const [selectListInfo, setSelectListInfo] = useState([]);
  const [noteValue, setNoteValue] = useState("");
  // Khai báo kho dữ liệu của các form
  const [form] = Form.useForm();
  const [infoForm] = Form.useForm();
  const [dateForm] = Form.useForm();
  const [listselect_info_employee, setListinfo_employee] = useState();

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
    await updateinfoInfo(payload, info.info_id);
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
    let info_file = [];
    fileList?.map((item) => {
      let fileUrl = "";
      if (item?.xhr?.response) {
        fileUrl = JSON.parse(item.xhr.response).url;
      } else {
        fileUrl = item.url;
      }
      info_file.push(fileUrl);
    });
    let dateValue = {};
    tablelist_info_Date.map((item) => {
      dateValue[item.value] = moment(dateData[item.value]).format(
        "MM-DD-YYYY HH:mm"
      );
    });
    const newValue = {
      ...values,
      ...dateValue,
      info_image_url: info_file.length > 0 ? info_file.join(",") : "",
      info_plan: values?.info_plan ? values.info_plan.join(",") : "",
      info_block: values?.info_block ? values.info_block.join(",") : "",
      info_error: values?.info_error ? values.info_error.join(",") : "",
      info_processing: values?.info_processing
        ? values.info_processing.join(",")
        : "",
      info_type: values?.info_type ? values.info_type.join(",") : "",
      info_sell_status: values?.info_sell_status
        ? values.info_sell_status.join(",")
        : "",
      info_owner: values?.info_owner ? values.info_owner.join(",") : "",
      info_employee: values?.info_employee
        ? values.info_employee.join(",")
        : "",
      list_view: selectListInfo.length > 0 ? selectListInfo.join(",") : "",
      info_note: noteValue,
      info_history: info.info_history,
    };

    const response = await updateinfoInfo(newValue, id);
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
  const getInfoinfo = async () => {
    const res = await getinfoInfo(id);
    let data = res.data;
    const newData = {
      ...data,
      info_plan: data?.info_plan ? data.info_plan.split(",") : "",
      info_block: data?.info_block ? data.info_block.split(",") : "",
      info_error: data?.info_error ? data.info_error.split(",") : "",
      info_employee: data?.info_employee ? data.info_employee.split(",") : "",
      info_processing: data?.info_processing
        ? data.info_processing.split(",")
        : "",
      info_type: data?.info_type ? data.info_type.split(",") : "",
      info_sell_status: data?.info_sell_status
        ? data.info_sell_status.split(",")
        : "",
      info_owner: data?.info_owner ? data.info_owner.split(",") : "",

      device_id: data?.device_id ? data?.device_id?.device_id : "",
      proxy_id: data?.proxy_id ? data?.proxy_id?.proxy_id : "",
      etsy_id: data?.etsy_id ? data?.etsy_id?.etsy_id : "",
      mail_id: data?.mail_id ? data?.mail_id?.mail_id : "",
      sim_id: data?.sim_id ? data?.sim_id?.sim_id : "",
      bank_id: data?.bank_id ? data?.bank_id?.bank_id : "",
      payoneer_id: data?.payoneer_id ? data?.payoneer_id?.payoneer_id : "",
      paypal_id: data?.paypal_id ? data?.paypal_id?.paypal_id : "",
      pingpong_id: data?.pingpong_id ? data?.pingpong_id?.pingpong_id : "",
      //info_id: data?.info_id ? data?.info_id?.info_id : "",
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

      etsy_class: data?.etsy_id ? data?.etsy_id?.etsy_class : "",
      etsy_status: data?.etsy_id ? data?.etsy_id?.etsy_status : "",
      etsy_user: data?.etsy_id ? data?.etsy_id?.etsy_fullname : "",
      etsy_password: data?.etsy_id ? data?.etsy_id?.etsydate_birthday : "",

      mail_class: data?.mail_id ? data?.mail_id?.mail_class : "",
      mail_status: data?.mail_id ? data?.mail_id?.mail_status : "",
      mail_user: data?.mail_id ? data?.mail_id?.mail_user : "",
      mail_password: data?.mail_id ? data?.mail_id?.mail_password : "",

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
    tablelist_info_Date.map((item) => {
      dateValue[item.value] = moment(data[item.value]);
    });
    if (data?.info_image_url) {
      let dataImage = [];
      let imageArr = data.info_image_url.split(",");
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
    setNoteValue(data.info_note);
    setInfo(newData);
    setSelectListInfo(data.list_view.split(","));
    setListinfo_employee(data.listselect_info_employee);
  };

  //  Những hàm được gọi trong useEffect sẽ được chạy lần đầu khi vào trang
  useEffect(() => {
    getInfoinfo();
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
      let new_info_owner = form.getFieldValue("info_owner");
      if (new_info_owner.indexOf("Phòng phục hồi") == -1) {
        new_info_owner.push("Phòng phục hồi");
      }
      if (new_info_owner.indexOf("Kho lưu trữ") == -1) {
        new_info_owner.push("Kho lưu trữ");
      }
      // lưu vào db vì quyền nhân viên không hiển thị
      let { data } = await updateinfoInfo(
        {
          info_owner: new_info_owner.join(","),
        },
        info.info_id
      );
      // Tiếp tục set
      let new_info_processing = form.getFieldValue("info_processing");
      let old_info_processing = info.info_processing;
      if (new_info_processing.indexOf(values) == -1) {
        new_info_processing.push(values);
      }

      let new_info_class = form.getFieldValue("info_class");
      if (values == "Error") {
        (new_info_class = "Lớp 20"),
          dateForm.setFieldValue("infodate_error", moment(now())); // Hiển thị ra màn hình
        dateForm.setFieldValue("infodate_nextclass", moment(now()));
        setDateData({
          ...dateData,
          infodate_error: moment(now()),
          infodate_nextclass: moment(now()),
        }); // Dùng hàm này set lại date mới lưu đc vào db
      }
      if (values == "Restrict") {
        (new_info_class = "Lớp 23"),
          dateForm.setFieldValue("infodate_restrict", moment(now()));
        dateForm.setFieldValue("infodate_nextclass", moment(now()));
        setDateData({
          ...dateData,
          infodate_restrict: moment(now()),
          infodate_nextclass: moment(now()),
        });
      }
      if (values == "Suspended") {
        (new_info_class = "Lớp 26"),
          dateForm.setFieldValue("infodate_suspended", moment(now()));
        dateForm.setFieldValue("infodate_nextclass", moment(now()));
        setDateData({
          ...dateData,
          infodate_suspended: moment(now()),
          infodate_nextclass: moment(now()),
        });
      }

      form.setFieldsValue({
        info_class: new_info_class,
        info_support: "Nguyễn Hoài",
        info_processing: new_info_processing,
        info_owner: new_info_owner,
      }); // Dùng hàm này set lại để lưu vào db
    }
  };

  const onChange_Processing = (values) => {
    if (values[values.length - 1] == "Buyer") {
      form.setFieldValue("info_class", "Lớp 4");
      dateForm.setFieldValue("infodate_start", moment(now()));
      dateForm.setFieldValue("infodate_nextclass", moment(now()));
      setDateData({
        ...dateData,
        infodate_start: moment(now()),
        infodate_nextclass: moment(now()),
      });
    }
    if (values[values.length - 1] == "Verify") {
      form.setFieldValue("info_class", "Lớp 6");
      dateForm.setFieldValue("infodate_verify", moment(now()));
      dateForm.setFieldValue("infodate_nextclass", moment(now()));
      setDateData({
        ...dateData,
        infodate_verify: moment(now()),
        infodate_nextclass: moment(now()),
      });
    }
    if (values[values.length - 1] == "Seller") {
      form.setFieldValue("info_class", "Lớp 9");
      dateForm.setFieldValue("infodate_seller", moment(now()));
      dateForm.setFieldValue("infodate_nextclass", moment(now()));
      setDateData({
        ...dateData,
        infodate_seller: moment(now()),
        infodate_nextclass: moment(now()),
      });
    }
    if (values[values.length - 1] == "List") {
      form.setFieldValue("info_class", "Lớp 10");
      dateForm.setFieldValue("infodate_list1", moment(now()));
      dateForm.setFieldValue("infodate_nextclass", moment(now()));
      setDateData({
        ...dateData,
        infodate_list1: moment(now()),
        infodate_nextclass: moment(now()),
      });
    }
    if (values[values.length - 1] == "Move room") {
      form.setFieldValue("info_class", "Lớp 12");
      dateForm.setFieldValue("infodate_moveroom", moment(now()));
      dateForm.setFieldValue("infodate_nextclass", moment(now()));
      setDateData({
        ...dateData,
        infodate_moveroom: moment(now()),
        infodate_nextclass: moment(now()),
      });
    }
  };

  const onChange_Class = async (values) => {
    dateForm.setFieldValue("infodate_nextclass", moment(now()));
    setDateData({
      ...dateData,
      infodate_nextclass: moment(now()),
    });

    if (values == "Lớp 9") {
      let new_info_type = form.getFieldValue("info_type");
      if (new_info_type.indexOf("Seller") == -1) {
        new_info_type.push("Seller");
      }

      // lưu vào db vì quyền nhân viên không hiển thị
      let { data } = await updateinfoInfo(
        {
          new_info_type: new_info_type.join(","),
        },
        info.info_id
      );

      let new_info_processing = form.getFieldValue("info_processing");
      if (new_info_processing.indexOf("Seller") == -1) {
        new_info_processing.push("Seller");
      }

      form.setFieldsValue({
        info_processing: new_info_processing,
        info_type: new_info_type,
      });

      dateForm.setFieldValue("infodate_seller", moment(now()));
      dateForm.setFieldValue("infodate_nextclass", moment(now()));
      setDateData({
        ...dateData,
        infodate_seller: moment(now()),
        infodate_nextclass: moment(now()),
      });
    }

    if (values == "Lớp 4") {
      let new_info_type = form.getFieldValue("info_type");
      if (new_info_type.indexOf("Buyer") == -1) {
        new_info_type.push("Buyer");
      }
      // lưu vào db vì quyền nhân viên không hiển thị
      let { data } = await updateinfoInfo(
        {
          new_info_type: new_info_type.join(","),
        },
        info.info_id
      );

      let new_info_processing = form.getFieldValue("info_processing");
      if (new_info_processing.indexOf("Buyer") == -1) {
        new_info_processing.push("Buyer");
      }
      /*  let new_info_owner = form
        .getFieldValue("info_owner")
        .filter((item) => item !== ""); */

      form.setFieldsValue({
        info_processing: new_info_processing,
        info_type: new_info_type,
      });

      dateForm.setFieldValue("infodate_start", moment(now()));
      dateForm.setFieldValue("infodate_nextclass", moment(now()));
      setDateData({
        ...dateData,
        infodate_start: moment(now()),
        infodate_nextclass: moment(now()),
      });
    }

    if (values == "Lớp 12") {
      let new_info_type = form.getFieldValue("info_type");
      if (new_info_type.indexOf("Bán acc") == -1) {
        new_info_type.push("Bán acc");
      }
      let new_info_owner = form.getFieldValue("info_owner");
      if (new_info_owner.indexOf("Phòng Kinh doanh") == -1) {
        new_info_owner.push("Phòng Kinh doanh");
      }
      // lưu vào db vì quyền nhân viên không hiển thị
      let { data } = await updateinfoInfo(
        {
          new_info_type: new_info_type.join(","),
          new_info_owner: new_info_owner.join(","),
        },
        info.info_id
      );

      let new_info_processing = form.getFieldValue("info_processing");
      if (new_info_processing.indexOf("Move room") == -1) {
        new_info_processing.push("Move room");
      }

      form.setFieldsValue({
        info_processing: new_info_processing,
        info_type: new_info_type,
        info_owner: new_info_owner,
      });

      dateForm.setFieldValue("infodate_moveroom", moment(now()));
      dateForm.setFieldValue("infodate_nextclass", moment(now()));
      setDateData({
        ...dateData,
        infodate_moveroom: moment(now()),
        infodate_nextclass: moment(now()),
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
              <Card title="THÔNG TIN INFO">
                <Form
                  form={form}
                  name="basic"
                  onFinish={onFinish}
                  initialValues={infoData}
                  autoComplete="off"
                  size="large"
                >
                  <Row gutter={16}>
                    <Col span={8}>
                      <Form.Item
                        label="info id"
                        name="info_id"
                        rules={[
                          {
                            required: true,
                            message: "Hãy nhập info id!",
                          },
                        ]}
                      >
                        <Input
                          disabled={true}
                          size="small"
                          placeholder="I_1000"
                        />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label="Giới tính" name="info_sex">
                        <Input size="small" placeholder="Nam" />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label="Ngày sinh" name="infodate_birthday">
                        <Input size="small" placeholder="27/7/2000" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={16}>
                    <Col span={8}>
                      <Form.Item label="Họ tên" name="info_fullname">
                        <Input size="small" placeholder="Thế Minh Hồng" />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label="Passport" name="info_passport">
                        <Input size="small" placeholder="028094999999" />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label="SSN" name="info_ssn">
                        <Input size="small" placeholder="028094999999" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={16}>
                    <Col span={24}>
                      <Form.Item label="Nơi thường trú" name="info_residence">
                        <Input size="small" placeholder="I_1000" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={16}>
                    <Col span={18}>
                      <Form.Item label="Quê quán........" name="info_origin">
                        <Input size="small" placeholder="I_1000" />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item label="code" name="info_code">
                        <Input size="small" placeholder="100000" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={16}>
                    <Col span={18}>
                      <Form.Item
                        label="Đặc điểm nhận dạng"
                        name="info_identifying"
                      >
                        <Input
                          size="small"
                          placeholder="Nốt ruồi c: 2cm dưới mép trái"
                        />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item label="Password" name="info_password">
                        <Input size="small" placeholder="012345678910" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={8}>
                      <Form.Item
                        label="CCCD giá trị đến"
                        name="infodate_expiry"
                      >
                        <Input size="small" placeholder="25/7/2041" />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label="Ngày làm CCCD" name="infodate_start">
                        <Input size="small" placeholder="29/4/2021" />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label="Ngày nhập" name="infodate_import">
                        <Input size="small" placeholder="07/12/2022" />
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
                      name="info_plan"
                      disabled={true}
                    >
                      <Select
                        mode="multiple"
                        style={{ width: "100%" }}
                        placeholder="select one item"
                        optionLabelProp="label"
                      >
                        {listselect_info_plan.map((item, index) => {
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
                      label="Info block"
                      name="info_block"
                      disabled={true}
                    >
                      <Select
                        mode="multiple"
                        style={{ width: "100%" }}
                        placeholder="select one item"
                        optionLabelProp="label"
                      >
                        {listselect_info_block.map((item, index) => {
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

                  <Form.Item label="Tiến trình" name="info_processing">
                    <Select
                      onChange={onChange_Processing}
                      mode="multiple"
                      style={{ width: "100%", color: "green" }}
                      optionLabelProp="label"
                      //status="warning"
                    >
                      {listselect_info_processing.map((item, index) => {
                        return (
                          <Option value={item} label={item} key={index}>
                            <div className="demo-option-label-item">{item}</div>
                          </Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                  <Form.Item label="Phát sinh" name="info_error">
                    <Select
                      mode="multiple"
                      style={{ width: "100%", color: "red" }}
                      optionLabelProp="label"
                      //status="warning"
                    >
                      {listselect_info_error.map((item, index) => {
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
                    <Form.Item label="Loại info" name="info_type">
                      <Select
                        mode="multiple"
                        style={{ width: "100%" }}
                        placeholder="select one item"
                        optionLabelProp="label"
                      >
                        {listselect_info_type.map((item, index) => {
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
                      name="info_sell_status"
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
                        {listselect_info_sell_status.map((item, index) => {
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
                    <Form.Item label="Sở hữu" name="info_owner">
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
                        {listselect_info_owner.map((item, index) => {
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
                    <Form.Item label="Nhân viên" name="info_employee">
                      <Select
                        mode="multiple"
                        style={{ width: "100%" }}
                        placeholder="select one item"
                        optionLabelProp="label"
                      >
                        {listselect_info_employee?.map((item) => {
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
                      <Form.Item label="Trạng thái" name="info_status">
                        <Select
                          //mode="multiple"
                          onChange={onChange_Status}
                          optionLabelProp="label"
                          style={{
                            width: "100%",
                            color:
                              ["Suspended", "Error"].indexOf(
                                form.getFieldValue("info_status")
                              ) != -1
                                ? "red"
                                : "",
                            fontWeight:
                              ["Suspended", "Error"].indexOf(
                                form.getFieldValue("info_status")
                              ) != -1
                                ? "bold !important"
                                : "",
                          }}
                        >
                          {listselect_info_status.map((item, index) => {
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
                      <Form.Item label="Lớp Info" name="info_class">
                        <Select
                          //mode="multiple"
                          style={{ width: "100%" }}
                          optionLabelProp="label"
                          onChange={onChange_Class}
                        >
                          {listselect_info_class.map((item, index) => {
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
                      <Form.Item label="Hỗ trợ" name="info_support">
                        <Select
                          style={{ width: "100%" }}
                          placeholder="select one item"
                          optionLabelProp="label"
                        >
                          {listselect_info_employee?.map((item) => {
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
                    <Form.Item name="info_image_url">
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
                                    optionLabelProp="label"
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
                                    {listselect_info_status.map(
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
                                    optionLabelProp="label"
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
                                    {listselect_info_class.map(
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
              <Card title="THỜI GIAN: MM-DD-YYYY">
                <Form
                  form={dateForm}
                  onFinish={onFinishDate}
                  name="date"
                  initialValues={dateData}
                  size="large"
                >
                  <Row gutter={16}>
                    {tablelist_info_Date.map((item, index) => {
                      return (
                        <Col key={index} span={8}>
                          <Form.Item label={item.title} name={item.value}>
                            <DatePicker
                              style={{ float: "right" }}
                              format="MM-DD-YYYY HH:mm"
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
                  {info?.info_history?.split(",")?.map((data) => {
                    return <div>{data}</div>;
                  })}
                </span>
              </Card>
            </Col>
          </Row>
        </Tabs.TabPane>
        <Tabs.TabPane tab="HƯỚNG DẪN" key="3">
          <HuongDanInfo_info />
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

export default Info_info;
