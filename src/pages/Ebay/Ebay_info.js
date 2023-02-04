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
  Tooltip,
  List,
  Upload,
  Affix,
} from "antd";
import { useMemo } from 'react';


import { PlusOutlined, CopyOutlined } from "@ant-design/icons";
import { showError, showSuccess } from "../../utils";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { copyToClipboard } from "../../utils/index";
import dayjs, { now } from "dayjs";
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
  HuongDanEbay_info,
} from "./Ebay_list";

import { getebayInfo, updateebayInfo } from "../../api/ebay/index";
import { updateListView } from "../../api/update";
//upload ảnh
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const Ebay_info = () => {
  
        <Button onClick={() => form.submit()} type="primary">
          Lưu thông tin
        </Button>
      
  const operations =<Affix offsetTop={20} onChange={(affixed) => console.log(affixed)}><Button onClick={() => form.submit()} type="primary">Lưu thông tin</Button></Affix> ;
  const { Option } = Select;
  const { users_function } = useSelector((state) => state.auth);
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
    await updateebayInfo(payload, info.ebay_id);
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
    if (key == "info_class") {
      let update_auto = [
        "proxy_class",
        "info_class",
        "mail_class",
        "sim_class",
        "bank_class",
      ];
      update_auto.forEach((item, index) => {
        updateListView(id, item, value);
      });
    } else {
      let newData = JSON.parse(JSON.stringify(listViewData));
      newData[key] = value;
      setListViewData(newData);
      await updateListView(id, key, value);
      showSuccess("Thành công");
    }
  };

  // Hàm để chuyển trang sang các tài khoản khác
  const viewInfo = useCallback(
    (type, id) => {
      if (type == "customer") {
        window.open(
          `${process.env.REACT_APP_URL}/business/${type}_class/table/${id}`
        );
      } else {
        window.open(
          `${process.env.REACT_APP_URL}/products/${type}_class/table/${id}`
        );
      }
    },
    [info]
  );

  // Hàm để gửi dữ liệu đi
  const onFinish = async (values) => {
    let ebay_file = [];
    fileList?.map((item) => {
      let fileUrl = "";
      if (item?.xhr?.response) {
        fileUrl = JSON.parse(item.xhr.response).url;
      } else {
        fileUrl = item.url;
      }
      ebay_file.push(fileUrl);
    });
    let dateValue = {};
    tablelist_ebay_Date.map((item) => {
      dateValue[item.value] = dayjs(dateData[item.value]).format(
        "YYYY-MM-DD HH:mm"
      );
    });
    const newValue = {
      ...values,
      ...dateValue,
      ebay_image_url: ebay_file.length > 0 ? ebay_file.join(",") : "",
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

      device_id: data?.device_id ? data?.device_id?.device_id : "",
      proxy_id: data?.proxy_id ? data?.proxy_id?.proxy_id : "",
      info_id: data?.info_id ? data?.info_id?.info_id : "",
      mail_id: data?.mail_id ? data?.mail_id?.mail_id : "",
      sim_id: data?.sim_id ? data?.sim_id?.sim_id : "",
      bank_id: data?.bank_id ? data?.bank_id?.bank_id : "",
      payoneer_id: data?.payoneer_id ? data?.payoneer_id?.payoneer_id : "",
      paypal_id: data?.paypal_id ? data?.paypal_id?.paypal_id : "",
      pingpong_id: data?.pingpong_id ? data?.pingpong_id?.pingpong_id : "",
      //ebay_id: data?.ebay_id ? data?.ebay_id?.ebay_id : "",
      etsy_id: data?.etsy_id ? data?.etsy_id?.etsy_id : "",
      amazon_id: data?.amazon_id ? data?.amazon_id?.amazon_id : "",
      shopee_id: data?.shopee_id ? data?.shopee_id?.shopee_id : "",
      facebook_id: data?.facebook_id ? data?.facebook_id?.facebook_id : "",
      tiktok_id: data?.tiktok_id ? data?.tiktok_id?.tiktok_id : "",
      customer_id: data?.customer_id ? data?.customer_id?.customer_id : "",
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

      etsy_class: data?.etsy_id ? data?.etsy_id?.etsy_class : "",
      etsy_status: data?.etsy_id ? data?.etsy_id?.etsy_status : "",
      etsy_user: data?.etsy_id ? data?.etsy_id?.etsy_user : "",
      etsy_password: data?.etsy_id ? data?.etsy_id?.etsy_password : "",

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

      customer_class: data?.customer_id
        ? data?.customer_id?.customer_class
        : "",
      customer_status: data?.customer_id
        ? data?.customer_id?.customer_status
        : "",
      customer_user: data?.customer_id ? data?.customer_id?.customer_user : "",
      customer_phone1: data?.customer_id
        ? data?.customer_id?.customer_phone1
        : "",
    });
    form.setFieldsValue(newData);
    infoForm.setFieldsValue(newData);
    let dateValue = {};
    tablelist_ebay_Date.map((item) => {
      dateValue[item.value] = dayjs(data[item.value]);
    });
    if (data?.ebay_image_url) {
      let dataImage = [];
      let imageArr = data.ebay_image_url.split(",");
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
    setNoteValue(data.ebay_note);
    setInfo(newData);
    setSelectListInfo(data.list_view.split(","));
    setListebay_employee(data.listselect_ebay_employee);
  };

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
  const onChange_Status = async (values) => {
    if (values == "Error" || values == "Restrict" || values == "Suspended") {
      let new_ebay_owner = form.getFieldValue("ebay_owner");
      if (new_ebay_owner.indexOf("Phòng phục hồi") == -1) {
        new_ebay_owner.push("Phòng phục hồi");
      }
      if (new_ebay_owner.indexOf("Kho lưu trữ") == -1) {
        new_ebay_owner.push("Kho lưu trữ");
      }
      // lưu vào db vì quyền nhân viên không hiển thị
      let { data } = await updateebayInfo(
        {
          ebay_owner: new_ebay_owner.join(","),
        },
        info.ebay_id
      );
      // Tiếp tục set
      let new_ebay_processing = form.getFieldValue("ebay_processing");
      let old_ebay_processing = info.ebay_processing;
      if (new_ebay_processing.indexOf(values) == -1) {
        new_ebay_processing.push(values);
      }

      let new_ebay_class = form.getFieldValue("ebay_class");
      if (values == "Error") {
        (new_ebay_class = "Lớp 20"),
          dateForm.setFieldValue("ebaydate_error", dayjs(now())); // Hiển thị ra màn hình
        dateForm.setFieldValue("ebaydate_nextclass", dayjs(now()));
        setDateData({
          ...dateData,
          ebaydate_error: dayjs(now()),
          ebaydate_nextclass: dayjs(now()),
        }); // Dùng hàm này set lại date mới lưu đc vào db
      }
      if (values == "Restrict") {
        (new_ebay_class = "Lớp 23"),
          dateForm.setFieldValue("ebaydate_restrict", dayjs(now()));
        dateForm.setFieldValue("ebaydate_nextclass", dayjs(now()));
        setDateData({
          ...dateData,
          ebaydate_restrict: dayjs(now()),
          ebaydate_nextclass: dayjs(now()),
        });
      }
      if (values == "Suspended") {
        (new_ebay_class = "Lớp 26"),
          dateForm.setFieldValue("ebaydate_suspended", dayjs(now()));
        dateForm.setFieldValue("ebaydate_nextclass", dayjs(now()));
        setDateData({
          ...dateData,
          ebaydate_suspended: dayjs(now()),
          ebaydate_nextclass: dayjs(now()),
        });
      }

      form.setFieldsValue({
        ebay_class: new_ebay_class,
        ebay_support: "Nguyễn Hoài",
        ebay_processing: new_ebay_processing,
        ebay_owner: new_ebay_owner,
      }); // Dùng hàm này set lại để lưu vào db
    }
  };

  const onChange_Processing = (values) => {
    if (values[values.length - 1] == "Buyer") {
      form.setFieldValue("ebay_class", "Lớp 4");
      dateForm.setFieldValue("ebaydate_start", dayjs(now()));
      dateForm.setFieldValue("ebaydate_nextclass", dayjs(now()));
      setDateData({
        ...dateData,
        ebaydate_start: dayjs(now()),
        ebaydate_nextclass: dayjs(now()),
      });
    }
    if (values[values.length - 1] == "Verify Full") {
      form.setFieldValue("ebay_class", "Lớp 6");
      dateForm.setFieldValue("ebaydate_verify", dayjs(now()));
      dateForm.setFieldValue("ebaydate_nextclass", dayjs(now()));
      setDateData({
        ...dateData,
        ebaydate_verify: dayjs(now()),
        ebaydate_nextclass: dayjs(now()),
      });
    }
    if (values[values.length - 1] == "Seller") {
      form.setFieldValue("ebay_class", "Lớp 9");
      dateForm.setFieldValue("ebaydate_seller", dayjs(now()));
      dateForm.setFieldValue("ebaydate_nextclass", dayjs(now()));
      setDateData({
        ...dateData,
        ebaydate_seller: dayjs(now()),
        ebaydate_nextclass: dayjs(now()),
      });
    }
    if (values[values.length - 1] == "List") {
      form.setFieldValue("ebay_class", "Lớp 10");
      dateForm.setFieldValue("ebaydate_list1", dayjs(now()));
      dateForm.setFieldValue("ebaydate_nextclass", dayjs(now()));
      setDateData({
        ...dateData,
        ebaydate_list1: dayjs(now()),
        ebaydate_nextclass: dayjs(now()),
      });
    }
    if (values[values.length - 1] == "Move room") {
      form.setFieldValue("ebay_class", "Lớp 12");
      dateForm.setFieldValue("ebaydate_moveroom", dayjs(now()));
      dateForm.setFieldValue("ebaydate_nextclass", dayjs(now()));
      setDateData({
        ...dateData,
        ebaydate_moveroom: dayjs(now()),
        ebaydate_nextclass: dayjs(now()),
      });
    }
  };

  const onChange_Class = async (values) => {
    dateForm.setFieldValue("ebaydate_nextclass", dayjs(now()));
    setDateData({
      ...dateData,
      ebaydate_nextclass: dayjs(now()),
    });

    if (values == "Lớp 9") {
      let new_ebay_type = form.getFieldValue("ebay_type");
      if (new_ebay_type.indexOf("Seller") == -1) {
        new_ebay_type.push("Seller");
      }

      // lưu vào db vì quyền nhân viên không hiển thị
      let { data } = await updateebayInfo(
        {
          new_ebay_type: new_ebay_type.join(","),
        },
        info.ebay_id
      );

      let new_ebay_processing = form.getFieldValue("ebay_processing");
      if (new_ebay_processing.indexOf("Seller") == -1) {
        new_ebay_processing.push("Seller");
      }

      form.setFieldsValue({
        ebay_processing: new_ebay_processing,
        ebay_type: new_ebay_type,
      });

      dateForm.setFieldValue("ebaydate_seller", dayjs(now()));
      dateForm.setFieldValue("ebaydate_nextclass", dayjs(now()));
      setDateData({
        ...dateData,
        ebaydate_seller: dayjs(now()),
        ebaydate_nextclass: dayjs(now()),
      });
    }

    if (values == "Lớp 4") {
      let new_ebay_type = form.getFieldValue("ebay_type");
      if (new_ebay_type.indexOf("Buyer") == -1) {
        new_ebay_type.push("Buyer");
      }
      // lưu vào db vì quyền nhân viên không hiển thị
      let { data } = await updateebayInfo(
        {
          new_ebay_type: new_ebay_type.join(","),
        },
        info.ebay_id
      );

      let new_ebay_processing = form.getFieldValue("ebay_processing");
      if (new_ebay_processing.indexOf("Buyer") == -1) {
        new_ebay_processing.push("Buyer");
      }
      /*  let new_ebay_owner = form
        .getFieldValue("ebay_owner")
        .filter((item) => item !== ""); */

      form.setFieldsValue({
        ebay_processing: new_ebay_processing,
        ebay_type: new_ebay_type,
      });

      dateForm.setFieldValue("ebaydate_start", dayjs(now()));
      dateForm.setFieldValue("ebaydate_nextclass", dayjs(now()));
      setDateData({
        ...dateData,
        ebaydate_start: dayjs(now()),
        ebaydate_nextclass: dayjs(now()),
      });
    }

    if (values == "Lớp 12") {
      let new_ebay_type = form.getFieldValue("ebay_type");
      if (new_ebay_type.indexOf("Bán acc") == -1) {
        new_ebay_type.push("Bán acc");
      }
      let new_ebay_owner = form.getFieldValue("ebay_owner");
      if (new_ebay_owner.indexOf("Phòng Kinh doanh") == -1) {
        new_ebay_owner.push("Phòng Kinh doanh");
      }
      // lưu vào db vì quyền nhân viên không hiển thị
      let { data } = await updateebayInfo(
        {
          new_ebay_type: new_ebay_type.join(","),
          new_ebay_owner: new_ebay_owner.join(","),
        },
        info.ebay_id
      );

      let new_ebay_processing = form.getFieldValue("ebay_processing");
      if (new_ebay_processing.indexOf("Move room") == -1) {
        new_ebay_processing.push("Move room");
      }

      form.setFieldsValue({
        ebay_processing: new_ebay_processing,
        ebay_type: new_ebay_type,
        ebay_owner: new_ebay_owner,
      });

      dateForm.setFieldValue("ebaydate_moveroom", dayjs(now()));
      dateForm.setFieldValue("ebaydate_nextclass", dayjs(now()));
      setDateData({
        ...dateData,
        ebaydate_moveroom: dayjs(now()),
        ebaydate_nextclass: dayjs(now()),
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
      /* extra={
        
        <Affix offsetTop={20} onChange={(affixed) => console.log(affixed)}>
        <Button onClick={() => form.submit()} type="primary">
          Lưu thông tin
        </Button>
      </Affix>
      } */
    >
      <Tabs defaultActiveKey="1" tabBarExtraContent={operations}>
        <Tabs.TabPane tab={"THÔNG TIN TÀI KHOẢN: " + id} key="1" >
          <Row gutter={[24, 4]}>
            <Col xs={24} xl={12} className="mb-24">
              <Card
                title={
                  <strong
                    style={{
                      color: "#1890FD",
                    }}
                  >
                    THÔNG TIN EBAY
                  </strong>
                }
              >
                <Form
                  form={form}
                  name="basic"
                  onFinish={onFinish}
                  initialValues={ebayData}
                  autoComplete="off"
                  size="large"
                >
                  <Row gutter={[24, 24]}>
                    <Col xs={12} xl={6} className="mb-24">
                      <Form.Item
                        label="eBay id"
                        name="ebay_id"
                        style={{ width: "100%" }}
                        rules={[
                          {
                            required: true,
                            message: "Hãy nhập eBay id!",
                          },
                        ]}
                        onClick={() =>
                          copyToClipboard(form.getFieldValue("_id"))
                        }
                      >
                        <Input disabled={true} placeholder="input here" />
                      </Form.Item>
                    </Col>
                    <Col xs={12} xl={10} className="mb-24">
                      <Form.Item label="eBay User" name="ebay_user">
                        <Input placeholder="input here" />
                      </Form.Item>
                    </Col>
                    <Col xs={12} xl={8} className="mb-24">
                      <Form.Item label="eBay Pass" name="ebay_password">
                        <Input placeholder="input here" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={[24, 0]}>
                    <Col xs={24} xl={24} className="mb-24">
                      <Form.Item label="eBay chi tiết" name="ebay_detail">
                        <Input placeholder="input here" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={[24, 0]}>
                    <Col xs={12} xl={6} className="mb-24">
                      <Form.Item label="eBay limit" name="ebay_limit">
                        <Input placeholder="0" />
                      </Form.Item>
                    </Col>
                    <Col xs={12} xl={6} className="mb-24">
                      <Form.Item label="eBay items" name="ebay_item">
                        <Input placeholder="0" />
                      </Form.Item>
                    </Col>
                    <Col xs={0} xl={6} className="mb-24">
                      <Form.Item label="eBay Sold" name="ebay_sold">
                        <Input placeholder="0" />
                      </Form.Item>
                    </Col>
                    <Col xs={0} xl={6} className="mb-24">
                      <Form.Item label="eBay Fb" name="ebay_feedback">
                        <Input placeholder="0" />
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
                        optionlabelprop="label"
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
                        optionlabelprop="label"
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
                      style={{ width: "100%", color: "green" }}
                      optionlabelprop="label"
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
                      style={{ width: "100%", color: "red" }}
                      optionlabelprop="label"
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
                        optionlabelprop="label"
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
                        optionlabelprop="label"
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
                        optionlabelprop="label"
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
                        optionlabelprop="label"
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

                  <Row gutter={[24, 0]}>
                    <Col xs={12} xl={8} className="mb-24">
                      <Form.Item label="Trạng thái" name="ebay_status">
                        <Select
                          //mode="multiple"
                          onChange={onChange_Status}
                          optionlabelprop="label"
                          style={{
                            width: "100%",
                            color:
                              ["Suspended", "Error"].indexOf(
                                form.getFieldValue("ebay_status")
                              ) != -1
                                ? "red"
                                : "",
                            fontWeight:
                              ["Suspended", "Error"].indexOf(
                                form.getFieldValue("ebay_status")
                              ) != -1
                                ? "bold !important"
                                : "",
                          }}
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
                    <Col xs={12} xl={8} className="mb-24">
                      <Form.Item label="Lớp eBay" name="ebay_class">
                        <Select
                          //mode="multiple"
                          style={{ width: "100%" }}
                          optionlabelprop="label"
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
                    <Col xs={0} xl={8} className="mb-24">
                      <Form.Item label="Hỗ trợ" name="ebay_support">
                        <Select
                          style={{ width: "100%" }}
                          placeholder="select one item"
                          optionlabelprop="label"
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

                  <Row gutter={[24, 0]}>
                    <Form.Item name="ebay_image_url">
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

            <Col xs={24} xl={12} className="mb-24">
              <Card
                title={
                  <strong
                    style={{
                      color: "#1890FD",
                    }}
                  >
                    THÔNG TIN TÀI NGUYÊN
                  </strong>
                }
              >
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
                                  size={30}
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

                              <Row gutter={[24, 0]} style={{ width: "100%" }}>
                                <Col xs={12} xl={4} className="mb-24">
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
                                <Col xs={12} xl={6} className="mb-24">
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
                                <Col xs={0} xl={6} className="mb-24">
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
                                <Col xs={0} xl={4} className="mb-24">
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
                                    {listselect_ebay_status.map(
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
                                <Col xs={0} xl={4} className="mb-24">
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
                                    {listselect_ebay_class.map(
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
          <Row gutter={[24, 0]}>
            <Col xs={24} xl={12} className="mb-24">
              <Card title="THỜI GIAN: YYYY-MM-DD">
                <Form
                  form={dateForm}
                  onFinish={onFinishDate}
                  name="date"
                  initialValues={dateData}
                  size="large"
                >
                  <Row gutter={[24, 0]}>
                    {tablelist_ebay_Date.map((item, index) => {
                      return (
                        <Col key={index} xs={8} xl={8} className="mb-24">
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

            <Col xs={24} xl={12} className="mb-24">
              <Card title="LỊCH SỬ">
                <Row>
                  <Col xs={24} xl={24} className="mb-24">
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
          <HuongDanEbay_info />
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

export default Ebay_info;
