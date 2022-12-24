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
  HuongDanShopee_info,
  ContentShopee,
} from "./Shopee_list";

import {
  postshopeeInfo,
  getshopeeInfo,
  updateshopeeInfo,
} from "../../api/shopee/index";
// dùng update các field trong bảng shopee_info
import { updateListView } from "../../api/update";

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
    await updateshopeeInfo(payload, info.shopee_id);
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
    tablelist_shopee_Date.map((item) => {
      dateValue[item.value] = moment(dateData[item.value]).format(
        "MM-DD-YYYY HH:mm"
      );
    });
    const newValue = {
      ...values,
      ...dateValue,
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
      shopee_note: noteValue,
      shopee_history: info.shopee_history,
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
      //shopee_id: data?.shopee_id ? data?.shopee_id?.shopee_id : "",
      amazon_id: data?.amazon_id ? data?.amazon_id?.amazon_id : "",
      etsy_id: data?.etsy_id ? data?.etsy_id?.etsy_id : "",
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

      amazon_class: data?.amazon_id ? data?.amazon_id?.amazon_class : "",
      amazon_status: data?.amazon_id ? data?.amazon_id?.amazon_status : "",
      amazon_user: data?.amazon_id ? data?.amazon_id?.amazon_user : "",
      amazon_password: data?.amazon_id ? data?.amazon_id?.amazon_password : "",

      etsy_class: data?.etsy_id ? data?.etsy_id?.etsy_class : "",
      etsy_status: data?.etsy_id ? data?.etsy_id?.etsy_status : "",
      etsy_user: data?.etsy_id ? data?.etsy_id?.etsy_user : "",
      etsy_password: data?.etsy_id ? data?.etsy_id?.etsy_password : "",

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
    tablelist_shopee_Date.map((item) => {
      dateValue[item.value] = moment(data[item.value]);
    });
    //console.log(dateValue);
    dateForm.setFieldsValue(dateValue);
    setDateData(data);
    setNoteValue(data.shopee_note);
    setInfo(newData);
    setSelectListInfo(data.list_view.split(","));
    setListshopee_employee(data.listselect_shopee_employee);
  };

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
  const onChange_Status = async (values) => {
    if (values == "Error" || values == "Restrict" || values == "Suspended") {
      let new_shopee_owner = form.getFieldValue("shopee_owner");
      if (new_shopee_owner.indexOf("Phòng phục hồi") == -1) {
        new_shopee_owner.push("Phòng phục hồi");
      }
      if (new_shopee_owner.indexOf("Kho lưu trữ") == -1) {
        new_shopee_owner.push("Kho lưu trữ");
      }
      // lưu vào db vì quyền nhân viên không hiển thị
      let { data } = await updateshopeeInfo(
        {
          shopee_owner: new_shopee_owner.join(","),
        },
        info.shopee_id
      );
      // Tiếp tục set
      let new_shopee_processing = form.getFieldValue("shopee_processing");
      let old_shopee_processing = info.shopee_processing;
      if (new_shopee_processing.indexOf(values) == -1) {
        new_shopee_processing.push(values);
      }

      let new_shopee_class = form.getFieldValue("shopee_class");
      if (values == "Error") {
        (new_shopee_class = "Lớp 20"),
          dateForm.setFieldValue("shopeedate_error", moment(now())); // Hiển thị ra màn hình
        dateForm.setFieldValue("shopeedate_nextclass", moment(now()));
        setDateData({
          ...dateData,
          shopeedate_error: moment(now()),
          shopeedate_nextclass: moment(now()),
        }); // Dùng hàm này set lại date mới lưu đc vào db
      }
      if (values == "Restrict") {
        (new_shopee_class = "Lớp 23"),
          dateForm.setFieldValue("shopeedate_restrict", moment(now()));
        dateForm.setFieldValue("shopeedate_nextclass", moment(now()));
        setDateData({
          ...dateData,
          shopeedate_restrict: moment(now()),
          shopeedate_nextclass: moment(now()),
        });
      }
      if (values == "Suspended") {
        (new_shopee_class = "Lớp 26"),
          dateForm.setFieldValue("shopeedate_suspended", moment(now()));
        dateForm.setFieldValue("shopeedate_nextclass", moment(now()));
        setDateData({
          ...dateData,
          shopeedate_suspended: moment(now()),
          shopeedate_nextclass: moment(now()),
        });
      }

      form.setFieldsValue({
        shopee_class: new_shopee_class,
        shopee_support: "Nguyễn Hoài",
        shopee_processing: new_shopee_processing,
        shopee_owner: new_shopee_owner,
      }); // Dùng hàm này set lại để lưu vào db
    }
  };

  const onChange_Processing = (values) => {
    if (values[values.length - 1] == "Buyer") {
      form.setFieldValue("shopee_class", "Lớp 4");
      dateForm.setFieldValue("shopeedate_start", moment(now()));
      dateForm.setFieldValue("shopeedate_nextclass", moment(now()));
      setDateData({
        ...dateData,
        shopeedate_start: moment(now()),
        shopeedate_nextclass: moment(now()),
      });
    }
    if (values[values.length - 1] == "Verify") {
      form.setFieldValue("shopee_class", "Lớp 6");
      dateForm.setFieldValue("shopeedate_verify", moment(now()));
      dateForm.setFieldValue("shopeedate_nextclass", moment(now()));
      setDateData({
        ...dateData,
        shopeedate_verify: moment(now()),
        shopeedate_nextclass: moment(now()),
      });
    }
    if (values[values.length - 1] == "Seller") {
      form.setFieldValue("shopee_class", "Lớp 9");
      dateForm.setFieldValue("shopeedate_seller", moment(now()));
      dateForm.setFieldValue("shopeedate_nextclass", moment(now()));
      setDateData({
        ...dateData,
        shopeedate_seller: moment(now()),
        shopeedate_nextclass: moment(now()),
      });
    }
    if (values[values.length - 1] == "List") {
      form.setFieldValue("shopee_class", "Lớp 10");
      dateForm.setFieldValue("shopeedate_list1", moment(now()));
      dateForm.setFieldValue("shopeedate_nextclass", moment(now()));
      setDateData({
        ...dateData,
        shopeedate_list1: moment(now()),
        shopeedate_nextclass: moment(now()),
      });
    }
    if (values[values.length - 1] == "Move room") {
      form.setFieldValue("shopee_class", "Lớp 12");
      dateForm.setFieldValue("shopeedate_moveroom", moment(now()));
      dateForm.setFieldValue("shopeedate_nextclass", moment(now()));
      setDateData({
        ...dateData,
        shopeedate_moveroom: moment(now()),
        shopeedate_nextclass: moment(now()),
      });
    }
  };

  const onChange_Class = async (values) => {
    dateForm.setFieldValue("shopeedate_nextclass", moment(now()));
    setDateData({
      ...dateData,
      shopeedate_nextclass: moment(now()),
    });

    if (values == "Lớp 9") {
      let new_shopee_type = form.getFieldValue("shopee_type");
      if (new_shopee_type.indexOf("Seller") == -1) {
        new_shopee_type.push("Seller");
      }

      // lưu vào db vì quyền nhân viên không hiển thị
      let { data } = await updateshopeeInfo(
        {
          new_shopee_type: new_shopee_type.join(","),
        },
        info.shopee_id
      );

      let new_shopee_processing = form.getFieldValue("shopee_processing");
      if (new_shopee_processing.indexOf("Seller") == -1) {
        new_shopee_processing.push("Seller");
      }

      form.setFieldsValue({
        shopee_processing: new_shopee_processing,
        shopee_type: new_shopee_type,
      });

      dateForm.setFieldValue("shopeedate_seller", moment(now()));
      dateForm.setFieldValue("shopeedate_nextclass", moment(now()));
      setDateData({
        ...dateData,
        shopeedate_seller: moment(now()),
        shopeedate_nextclass: moment(now()),
      });
    }

    if (values == "Lớp 4") {
      let new_shopee_type = form.getFieldValue("shopee_type");
      if (new_shopee_type.indexOf("Buyer") == -1) {
        new_shopee_type.push("Buyer");
      }
      // lưu vào db vì quyền nhân viên không hiển thị
      let { data } = await updateshopeeInfo(
        {
          new_shopee_type: new_shopee_type.join(","),
        },
        info.shopee_id
      );

      let new_shopee_processing = form.getFieldValue("shopee_processing");
      if (new_shopee_processing.indexOf("Buyer") == -1) {
        new_shopee_processing.push("Buyer");
      }
      /*  let new_shopee_owner = form
        .getFieldValue("shopee_owner")
        .filter((item) => item !== ""); */

      form.setFieldsValue({
        shopee_processing: new_shopee_processing,
        shopee_type: new_shopee_type,
      });

      dateForm.setFieldValue("shopeedate_start", moment(now()));
      dateForm.setFieldValue("shopeedate_nextclass", moment(now()));
      setDateData({
        ...dateData,
        shopeedate_start: moment(now()),
        shopeedate_nextclass: moment(now()),
      });
    }

    if (values == "Lớp 12") {
      let new_shopee_type = form.getFieldValue("shopee_type");
      if (new_shopee_type.indexOf("Bán acc") == -1) {
        new_shopee_type.push("Bán acc");
      }
      let new_shopee_owner = form.getFieldValue("shopee_owner");
      if (new_shopee_owner.indexOf("Phòng Kinh doanh") == -1) {
        new_shopee_owner.push("Phòng Kinh doanh");
      }
      // lưu vào db vì quyền nhân viên không hiển thị
      let { data } = await updateshopeeInfo(
        {
          new_shopee_type: new_shopee_type.join(","),
          new_shopee_owner: new_shopee_owner.join(","),
        },
        info.shopee_id
      );

      let new_shopee_processing = form.getFieldValue("shopee_processing");
      if (new_shopee_processing.indexOf("Move room") == -1) {
        new_shopee_processing.push("Move room");
      }

      form.setFieldsValue({
        shopee_processing: new_shopee_processing,
        shopee_type: new_shopee_type,
        shopee_owner: new_shopee_owner,
      });

      dateForm.setFieldValue("shopeedate_moveroom", moment(now()));
      dateForm.setFieldValue("shopeedate_nextclass", moment(now()));
      setDateData({
        ...dateData,
        shopeedate_moveroom: moment(now()),
        shopeedate_nextclass: moment(now()),
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
              <Card title="THÔNG TIN ETSY" >
                <Form
                  form={form}
                  name="basic"
                  onFinish={onFinish}
                  initialValues={shopeeData}
                  autoComplete="off"
                  // labelCol={{ span: 3 }}
                  // layout="horizontal"

                  size="large"
                >
                  <Row gutter={16}>
                    <Col span={6}>
                      <Form.Item
                        label="Shopee id"
                        name="shopee_id"
                        style={{ width: "100%" }}
                        rules={[
                          {
                            required: true,
                            message: "Hãy nhập Shopee id!",
                          },
                        ]}
                        onClick={() =>
                          copyToClipboard(form.getFieldValue("_id"))
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
                      <Form.Item
                        onClick={() =>
                          copyToClipboard(form.getFieldValue("shopee_password"))
                        }
                        label="Shopee Pass"
                        name="shopee_password"
                      >
                        <Input size="small" placeholder="input here" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={16}>
                    <Col span={24}>
                      <Form.Item
                        onClick={() =>
                          copyToClipboard(form.getFieldValue("shopee_password"))
                        }
                        label="Shopee chi tiết"
                        name="shopee_detail"
                      >
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
                      style={{ width: "100%", color: "green" }}
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
                      style={{ width: "100%", color: "red" }}
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
                          optionLabelProp="label"
                          style={{
                            width: "100%",
                            color:
                              ["Suspended", "Error"].indexOf(
                                form.getFieldValue("shopee_status")
                              ) != -1
                                ? "red"
                                : "",
                            fontWeight:
                              ["Suspended", "Error"].indexOf(
                                form.getFieldValue("shopee_status")
                              ) != -1
                                ? "bold !important"
                                : "",
                          }}
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
                                    {listselect_shopee_status.map(
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
                                    {listselect_shopee_class.map(
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
                    {tablelist_shopee_Date.map((item, index) => {
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
                  <Col span={24} >
                    <Input.TextArea
                      value={noteValue}
                      rows={4}
                      onChange={handleChangeNote}
                    />
                  </Col>
                </Row>

                <span>
                  {info?.shopee_history?.split(",")?.map((data) => {
                    return <div>{data}</div>;
                  })}
                </span>
              </Card>
            </Col>
          </Row>
        </Tabs.TabPane>
        <Tabs.TabPane tab="HƯỚNG DẪN" key="3">
       
          <HuongDanShopee_info />
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

export default Shopee_info;
