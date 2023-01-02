import {Button,Card,Tabs,Row,Col,Form,Input,DatePicker,Select,Modal,Avatar,List,Upload,} from "antd";
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
  tablelist_person_Date,
  listselect_view_acc,
  listselect_person_plan,
  listselect_person_block,
  listselect_person_processing,
  listselect_person_error,
  listselect_person_type,
  listselect_person_sell_status,
  listselect_person_owner,
  listselect_person_status,
  listselect_person_class,
  HuongDanPerson_info,
  ContentPerson,
} from "./Person_list";

import {
  postpersonInfo,
  getpersonInfo,
  updatepersonInfo,
} from "../../api/person/index";
// dùng update các field trong bảng person_info
import { updateListView } from "../../api/update";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const Person_info = () => {
  const { Option } = Select;
  const { users_function, users_name } = useSelector((state) => state.auth);
  // Lấy ID từ trên param url
  let { id } = useParams();
  // Khai báo các kho dữ liệu
  const [personData, setpersonData] = useState({});
  const [dateData, setDateData] = useState();
  const [info, setInfo] = useState();
  const [selectListInfo, setSelectListInfo] = useState([]);
  const [noteValue, setNoteValue] = useState("");
  // Khai báo kho dữ liệu của các form
  const [form] = Form.useForm();
  const [infoForm] = Form.useForm();
  const [dateForm] = Form.useForm();
  const [listselect_person_employee, setListperson_employee] = useState();

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
    await updatepersonInfo(payload, info.person_id);
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
    tablelist_person_Date.map((item) => {
      dateValue[item.value] = dayjs(dateData[item.value]).format(
        "YYYY-MM-DD HH:mm"
      );
    });
    const newValue = {
      ...values,
      ...dateValue,
      person_plan: values?.person_plan ? values.person_plan.join(",") : "",
      person_block: values?.person_block ? values.person_block.join(",") : "",
      person_error: values?.person_error ? values.person_error.join(",") : "",
      person_processing: values?.person_processing
        ? values.person_processing.join(",")
        : "",
      person_type: values?.person_type ? values.person_type.join(",") : "",
      person_sell_status: values?.person_sell_status
        ? values.person_sell_status.join(",")
        : "",
      person_owner: values?.person_owner ? values.person_owner.join(",") : "",
      person_employee: values?.person_employee
        ? values.person_employee.join(",")
        : "",
      list_view: selectListInfo.length > 0 ? selectListInfo.join(",") : "",
      person_note: noteValue,
      person_history: info.person_history,
    };

    const response = await updatepersonInfo(newValue, id);
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
  const getInfoperson = async () => {
    const res = await getpersonInfo(id);
    let data = res.data;
    const newData = {
      ...data,
      person_plan: data?.person_plan ? data.person_plan.split(",") : "",
      person_block: data?.person_block ? data.person_block.split(",") : "",
      person_error: data?.person_error ? data.person_error.split(",") : "",
      person_employee: data?.person_employee ? data.person_employee.split(",") : "",
      person_processing: data?.person_processing
        ? data.person_processing.split(",")
        : "",
      person_type: data?.person_type ? data.person_type.split(",") : "",
      person_sell_status: data?.person_sell_status
        ? data.person_sell_status.split(",")
        : "",
      person_owner: data?.person_owner ? data.person_owner.split(",") : "",

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
      etsy_id: data?.etsy_id ? data?.etsy_id?.etsy_id : "",
      amazon_id: data?.amazon_id ? data?.amazon_id?.amazon_id : "",
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
    tablelist_person_Date.map((item) => {
      dateValue[item.value] = dayjs(data[item.value]);
    });
    //console.log(dateValue);
    dateForm.setFieldsValue(dateValue);
    setDateData(data);
    setNoteValue(data.person_note);
    setInfo(newData);
    setSelectListInfo(data.list_view.split(","));
    setListperson_employee(data.listselect_person_employee);
  };

  //  Những hàm được gọi trong useEffect sẽ được chạy lần đầu khi vào trang
  useEffect(() => {
    getInfoperson();
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
      let new_person_owner = form.getFieldValue("person_owner");
      if (new_person_owner.indexOf("Phòng phục hồi") == -1) {
        new_person_owner.push("Phòng phục hồi");
      }
      if (new_person_owner.indexOf("Kho lưu trữ") == -1) {
        new_person_owner.push("Kho lưu trữ");
      }
      // lưu vào db vì quyền nhân viên không hiển thị
      let { data } = await updatepersonInfo(
        {
          person_owner: new_person_owner.join(","),
        },
        info.person_id
      );
      // Tiếp tục set
      let new_person_processing = form.getFieldValue("person_processing");
      let old_person_processing = info.person_processing;
      if (new_person_processing.indexOf(values) == -1) {
        new_person_processing.push(values);
      }

      let new_person_class = form.getFieldValue("person_class");
      if (values == "Error") {
        (new_person_class = "Lớp 20"),
          dateForm.setFieldValue("persondate_error", dayjs(now())); // Hiển thị ra màn hình
        dateForm.setFieldValue("persondate_nextclass", dayjs(now()));
        setDateData({
          ...dateData,
          persondate_error: dayjs(now()),
          persondate_nextclass: dayjs(now()),
        }); // Dùng hàm này set lại date mới lưu đc vào db
      }
      if (values == "Restrict") {
        (new_person_class = "Lớp 23"),
          dateForm.setFieldValue("persondate_restrict", dayjs(now()));
        dateForm.setFieldValue("persondate_nextclass", dayjs(now()));
        setDateData({
          ...dateData,
          persondate_restrict: dayjs(now()),
          persondate_nextclass: dayjs(now()),
        });
      }
      if (values == "Suspended") {
        (new_person_class = "Lớp 26"),
          dateForm.setFieldValue("persondate_suspended", dayjs(now()));
        dateForm.setFieldValue("persondate_nextclass", dayjs(now()));
        setDateData({
          ...dateData,
          persondate_suspended: dayjs(now()),
          persondate_nextclass: dayjs(now()),
        });
      }

      form.setFieldsValue({
        person_class: new_person_class,
        person_support: "Nguyễn Hoài",
        person_processing: new_person_processing,
        person_owner: new_person_owner,
      }); // Dùng hàm này set lại để lưu vào db
    }
  };

  const onChange_Processing = (values) => {
    if (values[values.length - 1] == "Buyer") {
      form.setFieldValue("person_class", "Lớp 4");
      dateForm.setFieldValue("persondate_start", dayjs(now()));
      dateForm.setFieldValue("persondate_nextclass", dayjs(now()));
      setDateData({
        ...dateData,
        persondate_start: dayjs(now()),
        persondate_nextclass: dayjs(now()),
      });
    }
    if (values[values.length - 1] == "Verify Full") {
      form.setFieldValue("person_class", "Lớp 6");
      dateForm.setFieldValue("persondate_verify", dayjs(now()));
      dateForm.setFieldValue("persondate_nextclass", dayjs(now()));
      setDateData({
        ...dateData,
        persondate_verify: dayjs(now()),
        persondate_nextclass: dayjs(now()),
      });
    }
    if (values[values.length - 1] == "Seller") {
      form.setFieldValue("person_class", "Lớp 9");
      dateForm.setFieldValue("persondate_seller", dayjs(now()));
      dateForm.setFieldValue("persondate_nextclass", dayjs(now()));
      setDateData({
        ...dateData,
        persondate_seller: dayjs(now()),
        persondate_nextclass: dayjs(now()),
      });
    }
    if (values[values.length - 1] == "List") {
      form.setFieldValue("person_class", "Lớp 10");
      dateForm.setFieldValue("persondate_list1", dayjs(now()));
      dateForm.setFieldValue("persondate_nextclass", dayjs(now()));
      setDateData({
        ...dateData,
        persondate_list1: dayjs(now()),
        persondate_nextclass: dayjs(now()),
      });
    }
    if (values[values.length - 1] == "Move room") {
      form.setFieldValue("person_class", "Lớp 12");
      dateForm.setFieldValue("persondate_moveroom", dayjs(now()));
      dateForm.setFieldValue("persondate_nextclass", dayjs(now()));
      setDateData({
        ...dateData,
        persondate_moveroom: dayjs(now()),
        persondate_nextclass: dayjs(now()),
      });
    }
  };

  const onChange_Class = async (values) => {
    dateForm.setFieldValue("persondate_nextclass", dayjs(now()));
    setDateData({
      ...dateData,
      persondate_nextclass: dayjs(now()),
    });

    if (values == "Lớp 9") {
      let new_person_type = form.getFieldValue("person_type");
      if (new_person_type.indexOf("Seller") == -1) {
        new_person_type.push("Seller");
      }

      // lưu vào db vì quyền nhân viên không hiển thị
      let { data } = await updatepersonInfo(
        {
          new_person_type: new_person_type.join(","),
        },
        info.person_id
      );

      let new_person_processing = form.getFieldValue("person_processing");
      if (new_person_processing.indexOf("Seller") == -1) {
        new_person_processing.push("Seller");
      }

      form.setFieldsValue({
        person_processing: new_person_processing,
        person_type: new_person_type,
      });

      dateForm.setFieldValue("persondate_seller", dayjs(now()));
      dateForm.setFieldValue("persondate_nextclass", dayjs(now()));
      setDateData({
        ...dateData,
        persondate_seller: dayjs(now()),
        persondate_nextclass: dayjs(now()),
      });
    }

    if (values == "Lớp 4") {
      let new_person_type = form.getFieldValue("person_type");
      if (new_person_type.indexOf("Buyer") == -1) {
        new_person_type.push("Buyer");
      }
      // lưu vào db vì quyền nhân viên không hiển thị
      let { data } = await updatepersonInfo(
        {
          new_person_type: new_person_type.join(","),
        },
        info.person_id
      );

      let new_person_processing = form.getFieldValue("person_processing");
      if (new_person_processing.indexOf("Buyer") == -1) {
        new_person_processing.push("Buyer");
      }
      /*  let new_person_owner = form
        .getFieldValue("person_owner")
        .filter((item) => item !== ""); */

      form.setFieldsValue({
        person_processing: new_person_processing,
        person_type: new_person_type,
      });

      dateForm.setFieldValue("persondate_start", dayjs(now()));
      dateForm.setFieldValue("persondate_nextclass", dayjs(now()));
      setDateData({
        ...dateData,
        persondate_start: dayjs(now()),
        persondate_nextclass: dayjs(now()),
      });
    }

    if (values == "Lớp 12") {
      let new_person_type = form.getFieldValue("person_type");
      if (new_person_type.indexOf("Bán acc") == -1) {
        new_person_type.push("Bán acc");
      }
      let new_person_owner = form.getFieldValue("person_owner");
      if (new_person_owner.indexOf("Phòng Kinh doanh") == -1) {
        new_person_owner.push("Phòng Kinh doanh");
      }
      // lưu vào db vì quyền nhân viên không hiển thị
      let { data } = await updatepersonInfo(
        {
          new_person_type: new_person_type.join(","),
          new_person_owner: new_person_owner.join(","),
        },
        info.person_id
      );

      let new_person_processing = form.getFieldValue("person_processing");
      if (new_person_processing.indexOf("Move room") == -1) {
        new_person_processing.push("Move room");
      }

      form.setFieldsValue({
        person_processing: new_person_processing,
        person_type: new_person_type,
        person_owner: new_person_owner,
      });

      dateForm.setFieldValue("persondate_moveroom", dayjs(now()));
      dateForm.setFieldValue("persondate_nextclass", dayjs(now()));
      setDateData({
        ...dateData,
        persondate_moveroom: dayjs(now()),
        persondate_nextclass: dayjs(now()),
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
              <Card title="THÔNG TIN PERSON" >
                <Form
                  form={form}
                  name="basic"
                  onFinish={onFinish}
                  initialValues={personData}
                  autoComplete="off"
                  size="large"
                >

                  
                  <Row gutter={16}>
                    <Col span={8}>
                      <Form.Item
                        label="person id"
                        name="person_id"
                        rules={[
                          {
                            required: true,
                            message: "Hãy nhập person id!",
                          },
                        ]}
                      >
                        <Input placeholder="I_1000" />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label="Giới tính" name="person_sex">
                        <Input placeholder="Nam" />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label="Ngày sinh" name="persondate_birthday">
                        <Input placeholder="27/7/2000" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={16}>
                    <Col span={8}>
                      <Form.Item label="Họ tên" name="person_fullname">
                        <Input placeholder="Thế Minh Hồng" />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label="Passport" name="person_passport">
                        <Input placeholder="028094999999" />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label="SSN" name="person_ssn">
                        <Input placeholder="028094999999" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={16}>
                    <Col span={24}>
                      <Form.Item label="Nơi thường trú" name="person_residence">
                        <Input placeholder="I_1000" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={16}>
                    <Col span={18}>
                      <Form.Item label="Quê quán........" name="person_origin">
                        <Input placeholder="I_1000" />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item label="code" name="person_code">
                        <Input placeholder="100000" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={16}>
                    <Col span={18}>
                      <Form.Item
                        label="Đặc điểm nhận dạng"
                        name="person_identifying"
                      >
                        <Input
                        
                          placeholder="Nốt ruồi c: 2cm dưới mép trái"
                        />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item label="Password" name="person_password">
                        <Input placeholder="012345678910" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={8}>
                      <Form.Item
                        label="CCCD giá trị đến"
                        name="persondate_expiry"
                      >
                        <Input placeholder="25/7/2041" />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label="Ngày làm CCCD" name="persondate_start">
                        <Input placeholder="29/4/2021" />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label="Ngày nhập" name="persondate_import">
                        <Input placeholder="07/12/2022" />
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
                      name="person_plan"
                      disabled={true}
                    >
                      <Select
                        mode="multiple"
                        style={{ width: "100%" }}
                        placeholder="select one item"
                        optionLabelProp="label"
                      >
                        {listselect_person_plan.map((item, index) => {
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
                      label="Person block"
                      name="person_block"
                      disabled={true}
                    >
                      <Select
                        mode="multiple"
                        style={{ width: "100%" }}
                        placeholder="select one item"
                        optionLabelProp="label"
                      >
                        {listselect_person_block.map((item, index) => {
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

                  <Form.Item label="Tiến trình" name="person_processing">
                    <Select
                      onChange={onChange_Processing}
                      mode="multiple"
                      style={{ width: "100%", color: "green" }}
                      optionLabelProp="label"
                      //status="warning"
                    >
                      {listselect_person_processing.map((item, index) => {
                        return (
                          <Option value={item} label={item} key={index}>
                            <div className="demo-option-label-item">{item}</div>
                          </Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                  <Form.Item label="Phát sinh" name="person_error">
                    <Select
                      mode="multiple"
                      style={{ width: "100%", color: "red" }}
                      optionLabelProp="label"
                      //status="warning"
                    >
                      {listselect_person_error.map((item, index) => {
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
                    <Form.Item label="Loại person" name="person_type">
                      <Select
                        mode="multiple"
                        style={{ width: "100%" }}
                        placeholder="select one item"
                        optionLabelProp="label"
                      >
                        {listselect_person_type.map((item, index) => {
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
                      name="person_sell_status"
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
                        {listselect_person_sell_status.map((item, index) => {
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
                    <Form.Item label="Sở hữu" name="person_owner">
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
                        {listselect_person_owner.map((item, index) => {
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
                    <Form.Item label="Nhân viên" name="person_employee">
                      <Select
                        mode="multiple"
                        style={{ width: "100%" }}
                        placeholder="select one item"
                        optionLabelProp="label"
                      >
                        {listselect_person_employee?.map((item) => {
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
                      <Form.Item label="Trạng thái" name="person_status">
                        <Select
                          //mode="multiple"
                          onChange={onChange_Status}
                          optionLabelProp="label"
                          style={{
                            width: "100%",
                            color:
                              ["Suspended", "Error"].indexOf(
                                form.getFieldValue("person_status")
                              ) != -1
                                ? "red"
                                : "",
                            fontWeight:
                              ["Suspended", "Error"].indexOf(
                                form.getFieldValue("person_status")
                              ) != -1
                                ? "bold !important"
                                : "",
                          }}
                        >
                          {listselect_person_status.map((item, index) => {
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
                      <Form.Item label="Lớp Person" name="person_class">
                        <Select
                          //mode="multiple"
                          style={{ width: "100%" }}
                          optionLabelProp="label"
                          onChange={onChange_Class}
                        >
                          {listselect_person_class.map((item, index) => {
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
                      <Form.Item label="Hỗ trợ" name="person_support">
                        <Select
                          style={{ width: "100%" }}
                          placeholder="select one item"
                          optionLabelProp="label"
                        >
                          {listselect_person_employee?.map((item) => {
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
                    <Form.Item name="person_image_url">
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
                                    {listselect_person_status.map(
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
                                    {listselect_person_class.map(
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
                    {tablelist_person_Date.map((item, index) => {
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
                  {info?.person_history?.split(",")?.map((data) => {
                    return <div>{data}</div>;
                  })}
                </span>
              </Card>
            </Col>
          </Row>
        </Tabs.TabPane>
        <Tabs.TabPane tab="HƯỚNG DẪN" key="3">
       
          <HuongDanPerson_info />
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

export default Person_info;
