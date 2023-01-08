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
import dayjs, { now } from "dayjs";
import React, { useCallback, useEffect, useState } from "react";

import {
  tablelist_amazon_Date,
  listselect_view_acc,
  listselect_amazon_plan,
  listselect_amazon_block,
  listselect_amazon_processing,
  listselect_amazon_error,
  listselect_amazon_type,
  listselect_amazon_sell_status,
  listselect_amazon_owner,
  listselect_amazon_status,
  listselect_amazon_class,
  HuongDanAmazon_info,
  ContentAmazon,
} from "./Amazon_list";

import {
  postamazonInfo,
  getamazonInfo,
  updateamazonInfo,
} from "../../api/amazon/index";
// dùng update các field trong bảng amazon_info
import { updateListView } from "../../api/update";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const Amazon_info = () => {
  const { Option } = Select;
  const { users_function, users_name } = useSelector((state) => state.auth);
  // Lấy ID từ trên param url
  let { id } = useParams();
  // Khai báo các kho dữ liệu
  const [amazonData, setamazonData] = useState({});
  const [dateData, setDateData] = useState();
  const [info, setInfo] = useState();
  const [selectListInfo, setSelectListInfo] = useState([]);
  const [noteValue, setNoteValue] = useState("");
  // Khai báo kho dữ liệu của các form
  const [form] = Form.useForm();
  const [infoForm] = Form.useForm();
  const [dateForm] = Form.useForm();
  const [listselect_amazon_employee, setListamazon_employee] = useState();

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
    await updateamazonInfo(payload, info.amazon_id);
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
      window.open(`http://localhost:3000/products/${type}_class/table/${id}`);
    },
    [info]
  );

  // Hàm để gửi dữ liệu đi
  const onFinish = async (values) => {
    let dateValue = {};
    tablelist_amazon_Date.map((item) => {
      dateValue[item.value] = dayjs(dateData[item.value]).format(
        "YYYY-MM-DD HH:mm"
      );
    });
    const newValue = {
      ...values,
      ...dateValue,
      amazon_plan: values?.amazon_plan ? values.amazon_plan.join(",") : "",
      amazon_block: values?.amazon_block ? values.amazon_block.join(",") : "",
      amazon_error: values?.amazon_error ? values.amazon_error.join(",") : "",
      amazon_processing: values?.amazon_processing
        ? values.amazon_processing.join(",")
        : "",
      amazon_type: values?.amazon_type ? values.amazon_type.join(",") : "",
      amazon_sell_status: values?.amazon_sell_status
        ? values.amazon_sell_status.join(",")
        : "",
      amazon_owner: values?.amazon_owner ? values.amazon_owner.join(",") : "",
      amazon_employee: values?.amazon_employee
        ? values.amazon_employee.join(",")
        : "",
      list_view: selectListInfo.length > 0 ? selectListInfo.join(",") : "",
      amazon_note: noteValue,
      amazon_history: info.amazon_history,
    };

    const response = await updateamazonInfo(newValue, id);
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
  const getInfoamazon = async () => {
    const res = await getamazonInfo(id);
    let data = res.data;
    const newData = {
      ...data,
      amazon_plan: data?.amazon_plan ? data.amazon_plan.split(",") : "",
      amazon_block: data?.amazon_block ? data.amazon_block.split(",") : "",
      amazon_error: data?.amazon_error ? data.amazon_error.split(",") : "",
      amazon_employee: data?.amazon_employee ? data.amazon_employee.split(",") : "",
      amazon_processing: data?.amazon_processing
        ? data.amazon_processing.split(",")
        : "",
      amazon_type: data?.amazon_type ? data.amazon_type.split(",") : "",
      amazon_sell_status: data?.amazon_sell_status
        ? data.amazon_sell_status.split(",")
        : "",
      amazon_owner: data?.amazon_owner ? data.amazon_owner.split(",") : "",

      device_id: data?.device_id ? data?.device_id?.device_id : "",
      proxy_id: data?.proxy_id ? data?.proxy_id?.proxy_id : "",
      info_id: data?.info_id ? data?.info_id?.info_id : "",
      mail_id: data?.mail_id ? data?.mail_id?.mail_id : "",
      sim_id: data?.sim_id ? data?.sim_id?.sim_id : "",
      bank_id: data?.bank_id ? data?.bank_id?.bank_id : "",
      payoneer_id: data?.payoneer_id ? data?.payoneer_id?.payoneer_id : "",
      paypal_id: data?.paypal_id ? data?.paypal_id?.paypal_id : "",
      pingpong_id: data?.pingpong_id ? data?.pingpong_id?.pingpong_id : "",
      ebay_id: data?.ebay_id ? data?.ebay_id?.ebay_id : "",
      //amazon_id: data?.amazon_id ? data?.amazon_id?.amazon_id : "",
      etsy_id: data?.etsy_id ? data?.etsy_id?.etsy_id : "",
      shopee_id: data?.shopee_id ? data?.shopee_id?.shopee_id : "",
      facebook_id: data?.facebook_id ? data?.facebook_id?.facebook_id : "",
      tiktok_id: data?.tiktok_id ? data?.tiktok_id?.tiktok_id : "",
    };
    // hàm đổ dữ liệu về khi đã liên kết field
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

      etsy_class: data?.etsy_id ? data?.etsy_id?.etsy_class : "",
      etsy_status: data?.etsy_id ? data?.etsy_id?.etsy_status : "",
      etsy_user: data?.etsy_id ? data?.etsy_id?.etsy_user : "",
      etsy_password: data?.etsy_id ? data?.etsy_id?.etsy_password : "",

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
    tablelist_amazon_Date.map((item) => {
      dateValue[item.value] = dayjs(data[item.value]);
    });
    //console.log(dateValue);
    dateForm.setFieldsValue(dateValue);
    setDateData(data);
    setNoteValue(data.amazon_note);
    setInfo(newData);
    setSelectListInfo(data.list_view.split(","));
    setListamazon_employee(data.listselect_amazon_employee);
  };

  //  Những hàm được gọi trong useEffect sẽ được chạy lần đầu khi vào trang
  useEffect(() => {
    getInfoamazon();
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
  const onChange_Status = async (values) => {
    if (values == "Error" || values == "Restrict" || values == "Suspended") {
      let new_amazon_owner = form.getFieldValue("amazon_owner");
      if (new_amazon_owner.indexOf("Phòng phục hồi") == -1) {
        new_amazon_owner.push("Phòng phục hồi");
      }
      if (new_amazon_owner.indexOf("Kho lưu trữ") == -1) {
        new_amazon_owner.push("Kho lưu trữ");
      }
      // lưu vào db vì quyền nhân viên không hiển thị
      let { data } = await updateamazonInfo(
        {
          amazon_owner: new_amazon_owner.join(","),
        },
        info.amazon_id
      );
      // Tiếp tục set
      let new_amazon_processing = form.getFieldValue("amazon_processing");
      let old_amazon_processing = info.amazon_processing;
      if (new_amazon_processing.indexOf(values) == -1) {
        new_amazon_processing.push(values);
      }

      let new_amazon_class = form.getFieldValue("amazon_class");
      if (values == "Error") {
        (new_amazon_class = "Lớp 20"),
          dateForm.setFieldValue("amazondate_error", dayjs(now())); // Hiển thị ra màn hình
        dateForm.setFieldValue("amazondate_nextclass", dayjs(now()));
        setDateData({
          ...dateData,
          amazondate_error: dayjs(now()),
          amazondate_nextclass: dayjs(now()),
        }); // Dùng hàm này set lại date mới lưu đc vào db
      }
      if (values == "Restrict") {
        (new_amazon_class = "Lớp 23"),
          dateForm.setFieldValue("amazondate_restrict", dayjs(now()));
        dateForm.setFieldValue("amazondate_nextclass", dayjs(now()));
        setDateData({
          ...dateData,
          amazondate_restrict: dayjs(now()),
          amazondate_nextclass: dayjs(now()),
        });
      }
      if (values == "Suspended") {
        (new_amazon_class = "Lớp 26"),
          dateForm.setFieldValue("amazondate_suspended", dayjs(now()));
        dateForm.setFieldValue("amazondate_nextclass", dayjs(now()));
        setDateData({
          ...dateData,
          amazondate_suspended: dayjs(now()),
          amazondate_nextclass: dayjs(now()),
        });
      }

      form.setFieldsValue({
        amazon_class: new_amazon_class,
        amazon_support: "Nguyễn Hoài",
        amazon_processing: new_amazon_processing,
        amazon_owner: new_amazon_owner,
      }); // Dùng hàm này set lại để lưu vào db
    }
  };

  const onChange_Processing = (values) => {
    if (values[values.length - 1] == "Buyer") {
      form.setFieldValue("amazon_class", "Lớp 4");
      dateForm.setFieldValue("amazondate_start", dayjs(now()));
      dateForm.setFieldValue("amazondate_nextclass", dayjs(now()));
      setDateData({
        ...dateData,
        amazondate_start: dayjs(now()),
        amazondate_nextclass: dayjs(now()),
      });
    }
    if (values[values.length - 1] == "Verify Full") {
      form.setFieldValue("amazon_class", "Lớp 6");
      dateForm.setFieldValue("amazondate_verify", dayjs(now()));
      dateForm.setFieldValue("amazondate_nextclass", dayjs(now()));
      setDateData({
        ...dateData,
        amazondate_verify: dayjs(now()),
        amazondate_nextclass: dayjs(now()),
      });
    }
    if (values[values.length - 1] == "Seller") {
      form.setFieldValue("amazon_class", "Lớp 9");
      dateForm.setFieldValue("amazondate_seller", dayjs(now()));
      dateForm.setFieldValue("amazondate_nextclass", dayjs(now()));
      setDateData({
        ...dateData,
        amazondate_seller: dayjs(now()),
        amazondate_nextclass: dayjs(now()),
      });
    }
    if (values[values.length - 1] == "List") {
      form.setFieldValue("amazon_class", "Lớp 10");
      dateForm.setFieldValue("amazondate_list1", dayjs(now()));
      dateForm.setFieldValue("amazondate_nextclass", dayjs(now()));
      setDateData({
        ...dateData,
        amazondate_list1: dayjs(now()),
        amazondate_nextclass: dayjs(now()),
      });
    }
    if (values[values.length - 1] == "Move room") {
      form.setFieldValue("amazon_class", "Lớp 12");
      dateForm.setFieldValue("amazondate_moveroom", dayjs(now()));
      dateForm.setFieldValue("amazondate_nextclass", dayjs(now()));
      setDateData({
        ...dateData,
        amazondate_moveroom: dayjs(now()),
        amazondate_nextclass: dayjs(now()),
      });
    }
  };

  const onChange_Class = async (values) => {
    dateForm.setFieldValue("amazondate_nextclass", dayjs(now()));
    setDateData({
      ...dateData,
      amazondate_nextclass: dayjs(now()),
    });

    if (values == "Lớp 9") {
      let new_amazon_type = form.getFieldValue("amazon_type");
      if (new_amazon_type.indexOf("Seller") == -1) {
        new_amazon_type.push("Seller");
      }

      // lưu vào db vì quyền nhân viên không hiển thị
      let { data } = await updateamazonInfo(
        {
          new_amazon_type: new_amazon_type.join(","),
        },
        info.amazon_id
      );

      let new_amazon_processing = form.getFieldValue("amazon_processing");
      if (new_amazon_processing.indexOf("Seller") == -1) {
        new_amazon_processing.push("Seller");
      }

      form.setFieldsValue({
        amazon_processing: new_amazon_processing,
        amazon_type: new_amazon_type,
      });

      dateForm.setFieldValue("amazondate_seller", dayjs(now()));
      dateForm.setFieldValue("amazondate_nextclass", dayjs(now()));
      setDateData({
        ...dateData,
        amazondate_seller: dayjs(now()),
        amazondate_nextclass: dayjs(now()),
      });
    }

    if (values == "Lớp 4") {
      let new_amazon_type = form.getFieldValue("amazon_type");
      if (new_amazon_type.indexOf("Buyer") == -1) {
        new_amazon_type.push("Buyer");
      }
      // lưu vào db vì quyền nhân viên không hiển thị
      let { data } = await updateamazonInfo(
        {
          new_amazon_type: new_amazon_type.join(","),
        },
        info.amazon_id
      );

      let new_amazon_processing = form.getFieldValue("amazon_processing");
      if (new_amazon_processing.indexOf("Buyer") == -1) {
        new_amazon_processing.push("Buyer");
      }
      /*  let new_amazon_owner = form
        .getFieldValue("amazon_owner")
        .filter((item) => item !== ""); */

      form.setFieldsValue({
        amazon_processing: new_amazon_processing,
        amazon_type: new_amazon_type,
      });

      dateForm.setFieldValue("amazondate_start", dayjs(now()));
      dateForm.setFieldValue("amazondate_nextclass", dayjs(now()));
      setDateData({
        ...dateData,
        amazondate_start: dayjs(now()),
        amazondate_nextclass: dayjs(now()),
      });
    }

    if (values == "Lớp 12") {
      let new_amazon_type = form.getFieldValue("amazon_type");
      if (new_amazon_type.indexOf("Bán acc") == -1) {
        new_amazon_type.push("Bán acc");
      }
      let new_amazon_owner = form.getFieldValue("amazon_owner");
      if (new_amazon_owner.indexOf("Phòng Kinh doanh") == -1) {
        new_amazon_owner.push("Phòng Kinh doanh");
      }
      // lưu vào db vì quyền nhân viên không hiển thị
      let { data } = await updateamazonInfo(
        {
          new_amazon_type: new_amazon_type.join(","),
          new_amazon_owner: new_amazon_owner.join(","),
        },
        info.amazon_id
      );

      let new_amazon_processing = form.getFieldValue("amazon_processing");
      if (new_amazon_processing.indexOf("Move room") == -1) {
        new_amazon_processing.push("Move room");
      }

      form.setFieldsValue({
        amazon_processing: new_amazon_processing,
        amazon_type: new_amazon_type,
        amazon_owner: new_amazon_owner,
      });

      dateForm.setFieldValue("amazondate_moveroom", dayjs(now()));
      dateForm.setFieldValue("amazondate_nextclass", dayjs(now()));
      setDateData({
        ...dateData,
        amazondate_moveroom: dayjs(now()),
        amazondate_nextclass: dayjs(now()),
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
            <Col span={12} >
              <Card title={
                  <strong
                    style={{
                      color: "#1890FD",
                    }}
                  >
                    THÔNG TIN ETSY
                  </strong>
                }>
                <Form
                  form={form}
                  name="basic"
                  onFinish={onFinish}
                  initialValues={amazonData}
                  autoComplete="off"
                  // labelCol={{ span: 3 }}
                  // layout="horizontal"

                  size="large"
                >
                  <Row gutter={16}>
                    <Col span={6}>
                      <Form.Item
                        label="Amazon id"
                        name="amazon_id"
                        style={{ width: "100%" }}
                        rules={[
                          {
                            required: true,
                            message: "Hãy nhập Amazon id!",
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
                        
                        label="Amazon User"
                        name="amazon_user"
                      >
                        <Input  placeholder="input here" />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                       
                        label="Amazon Pass"
                        name="amazon_password"
                      >
                        <Input  placeholder="input here" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={16}>
                    <Col span={24}>
                      <Form.Item
                        
                        label="Amazon chi tiết"
                        name="amazon_detail"
                      >
                        <Input  placeholder="input here" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={16}>
                    <Col span={6}>
                      <Form.Item label="Amazon limit" name="amazon_limit">
                        <Input  placeholder="0" />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item label="Amazon items" name="amazon_item">
                        <Input  placeholder="0" />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item label="Amazon Sold" name="amazon_sold">
                        <Input  placeholder="0" />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item label="Amazon Fb" name="amazon_feedback">
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
                      name="amazon_plan"
                      disabled={true}
                    >
                      <Select
                        mode="multiple"
                        style={{ width: "100%" }}
                        placeholder="select one item"
                        optionlabelprop="label"
                      >
                        {listselect_amazon_plan.map((item, index) => {
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
                      label="Amazon block"
                      name="amazon_block"
                      disabled={true}
                    >
                      <Select
                        mode="multiple"
                        style={{ width: "100%" }}
                        placeholder="select one item"
                        optionlabelprop="label"
                      >
                        {listselect_amazon_block.map((item, index) => {
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

                  <Form.Item label="Tiến trình" name="amazon_processing">
                    <Select
                      onChange={onChange_Processing}
                      mode="multiple"
                      style={{ width: "100%", color: "green" }}
                      optionlabelprop="label"
                      //status="warning"
                    >
                      {listselect_amazon_processing.map((item, index) => {
                        return (
                          <Option value={item} label={item} key={index}>
                            <div className="demo-option-label-item">{item}</div>
                          </Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                  <Form.Item label="Phát sinh" name="amazon_error">
                    <Select
                      mode="multiple"
                      style={{ width: "100%", color: "red" }}
                      optionlabelprop="label"
                      //status="warning"
                    >
                      {listselect_amazon_error.map((item, index) => {
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
                    <Form.Item label="Loại amazon" name="amazon_type">
                      <Select
                        mode="multiple"
                        style={{ width: "100%" }}
                        placeholder="select one item"
                        optionlabelprop="label"
                      >
                        {listselect_amazon_type.map((item, index) => {
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
                      name="amazon_sell_status"
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
                        {listselect_amazon_sell_status.map((item, index) => {
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
                    <Form.Item label="Sở hữu" name="amazon_owner">
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
                        {listselect_amazon_owner.map((item, index) => {
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
                    <Form.Item label="Nhân viên" name="amazon_employee">
                      <Select
                        mode="multiple"
                        style={{ width: "100%" }}
                        placeholder="select one item"
                        optionlabelprop="label"
                      >
                        {listselect_amazon_employee?.map((item) => {
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
                      <Form.Item label="Trạng thái" name="amazon_status">
                        <Select
                          //mode="multiple"
                          onChange={onChange_Status}
                          optionlabelprop="label"
                          style={{
                            width: "100%",
                            color:
                              ["Suspended", "Error"].indexOf(
                                form.getFieldValue("amazon_status")
                              ) != -1
                                ? "red"
                                : "",
                            fontWeight:
                              ["Suspended", "Error"].indexOf(
                                form.getFieldValue("amazon_status")
                              ) != -1
                                ? "bold !important"
                                : "",
                          }}
                        >
                          {listselect_amazon_status.map((item, index) => {
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
                      <Form.Item label="Lớp Amazon" name="amazon_class">
                        <Select
                          //mode="multiple"
                          style={{ width: "100%" }}
                          optionlabelprop="label"
                          onChange={onChange_Class}
                        >
                          {listselect_amazon_class.map((item, index) => {
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
                      <Form.Item label="Hỗ trợ" name="amazon_support">
                        <Select
                          style={{ width: "100%" }}
                          placeholder="select one item"
                          optionlabelprop="label"
                        >
                          {listselect_amazon_employee?.map((item) => {
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
                    <Form.Item name="amazon_image_url">
                      <Upload
                        action="http://backend.penda.vn/api/files"
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
                                    {listselect_amazon_status.map(
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
                                    {listselect_amazon_class.map(
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
                    {tablelist_amazon_Date.map((item, index) => {
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
                  <Col span={24} >
                    <Input.TextArea
                      value={noteValue}
                      rows={4}
                      onChange={handleChangeNote}
                    />
                  </Col>
                </Row>

                <span>
                  {info?.amazon_history?.split(",")?.map((data) => {
                    return <div>{data}</div>;
                  })}
                </span>
              </Card>
            </Col>
          </Row>
        </Tabs.TabPane>
        <Tabs.TabPane tab="HƯỚNG DẪN" key="3">
       
          <HuongDanAmazon_info />
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

export default Amazon_info;
