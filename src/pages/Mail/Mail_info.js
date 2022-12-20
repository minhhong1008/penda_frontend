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
} from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { copyToClipboard } from "../../utils/index";
import moment from "moment";
import { getUser } from "../../utils/index";
import {
  postmailInfo,
  getmailInfo,
  updatemailInfo,
} from "../../api/mail/index";
import { showError, showSuccess } from "../../utils";
import { useSelector } from "react-redux";

const mail_info = () => {
  const { Option } = Select;
  const { users_function, users_name } = useSelector((state) => state.auth);
  // Lấy ID từ trên param url
  let { id } = useParams();
  // Khai báo các kho dữ liệu
  const [mailData, setmailData] = useState({});
  const [dateData, setDateData] = useState();
  const [info, setInfo] = useState();
  const [selectListInfo, setSelectListInfo] = useState(["device_id"]);
  const [noteValue, setNoteValue] = useState("");

  // Khai báo kho dữ liệu của các form
  const [form] = Form.useForm();
  const [infoForm] = Form.useForm();
  const [dateForm] = Form.useForm();

  // Hàm để gửi dữ liệu đi
  const onFinish = async (values) => {
    const newValue = {
      ...info,
      ...values,
      mail_plan: values?.mail_plan ? values.mail_plan.join(",") : "",
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

      maildate_start: dateData?.mail_date_start
        ? moment(dateData.mail_date_start).format("MM-DD-YYYY")
        : "",
      maildate_verify: dateData?.mail_date_verify
        ? moment(dateData.mail_date_verify).format("MM-DD-YYYY")
        : "",
      mail_note: noteValue,
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
    const { data } = await getmailInfo(id);
    const newData = {
      ...data,
      mail_plan: data?.mail_plan ? data.mail_plan.split(",") : "",
      mail_employee: data?.mail_employee ? data.mail_employee.split(",") : "",
      mail_processing: data?.mail_processing
        ? data.mail_processing.split(",")
        : "",
      mail_type: data?.mail_type ? data.mail_type.split(",") : "",
      mail_sell_status: data?.mail_sell_status
        ? data.mail_sell_status.split(",")
        : "",
      mail_owner: data?.mail_owner ? data.mail_owner.split(",") : "",
    };
    form.setFieldsValue(newData);
    infoForm.setFieldsValue(newData);
    dateForm.setFieldsValue({
      mail_date_start: moment(data.mail_date_start),
      mail_date_verify: moment(data.mail_date_verify),
    });
    setInfo(data);
    setNoteValue(data.mail_note);
    setSelectListInfo(data.list_view.split(","));
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
    getInfomail();
  }, []);

  // List danh sách các trường trong bảng INFO
  const listInfo = [
    {
      title: "DEVICE",
      thumbnail:
        "https://www.iconbunny.com/icons/media/catalog/product/5/9/597.9-tablets-icon-iconbunny.jpg",
      value: "",
    },
    {
      title: "PROXY",
      thumbnail:
        "https://st2.depositphotos.com/4060975/9116/v/600/depositphotos_91164140-stock-illustration-vpn-colored-vector-illustration.jpg",
      value: "",
    },
    {
      title: "INFO",
      thumbnail:
        "https://cdn.pixabay.com/photo/2017/08/16/00/29/add-person-2646097_1280.png",
      value: "",
    },
    {
      title: "MAIL",
      thumbnail:
        "https://www.citypng.com/public/uploads/preview/-11597283936hxzfkdluih.png",
      value: "",
    },
    {
      title: "SIM",
      thumbnail:
        "https://static.vecteezy.com/system/resources/previews/007/140/884/original/sim-card-line-circle-background-icon-vector.jpg",
      value: "",
    },
    {
      title: "BANK",
      thumbnail:
        "https://previews.123rf.com/images/alexwhite/alexwhite1609/alexwhite160904656/62626176-mail-flat-design-yellow-round-web-icon.jpg",
      value: "",
    },
    {
      title: "PAYONEER",
      thumbnail:
        "https://global.discourse-cdn.com/envato/optimized/3X/c/0/c0264d85b64c0c7a759374baf20a8fb9c91b1c4c_2_500x500.png",
      value: "",
    },
    {
      title: "PAYPAL",
      thumbnail:
        "https://www.nicepng.com/png/detail/826-8264643_paypal-logo-png-instagram-icon-png-circle.png",
      value: "",
    },
    {
      title: "PINGPONG",
      thumbnail:
        "https://media.gettyimages.com/id/1441770156/vector/shield-ping-pong-icon-silhouette.jpg?s=612x612&w=gi&k=20&c=6YpqT55jRbNMzq642jQy4j8aw3ZyZmw8InQadlfMTPw=",
      value: "",
    },
    {
      title: "EBAY",
      thumbnail: "https://aux2.iconspalace.com/uploads/312694120.png",
      value: "",
    },
    {
      title: "ETSY",
      thumbnail:
        "https://png.pngitem.com/pimgs/s/118-1182357_circle-hd-png-download.png",
      value: "",
    },
    {
      title: "AMAZON",
      thumbnail:
        "https://icons-for-free.com/download-icon-amazon+icon-1320194704838275475_512.png",
      value: "",
    },
    {
      title: "SHOPEE",
      thumbnail:
        "https://freepngimg.com/convert-png/109014-shopee-logo-free-download-image",
      value: "",
    },
    {
      title: "FACEBOOK",
      thumbnail:
        "https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Facebook_f_logo_%282021%29.svg/2048px-Facebook_f_logo_%282021%29.svg.png",
      value: "",
    },
    {
      title: "TIKTOK",
      thumbnail:
        "https://image.similarpng.com/very-thumbnail/2020/10/Tiktok-icon-logo-design-on-transparent-background-PNG.png",
      value: "",
    },
    {
      title: "OTHER",
      thumbnail:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Circle-icons-globe.svg/768px-Circle-icons-globe.svg.png",
      value: "",
    },
  ];

  //  List danh sách các trường trong bảng DATE
  const listDate = [
    {
      title: "Ngày giao",
      value: "maildate_delivery",
    },
    {
      title: "Ngày tạo",
      value: "maildate_start",
    },
    {
      title: "Ngày chuyển lớp",
      value: "maildate_nextclass",
    },
    {
      title: "Ngày verify",
      value: "maildate_verify",
    },
    {
      title: "Ngày Seller",
      value: "maildate_seller",
    },
    {
      title: "Ngày verify Bank",
      value: "maildate_verifybank",
    },
    {
      title: "Ngày draft",
      value: "maildate_draft",
    },
    {
      title: "Ngày list1",
      value: "maildate_list1",
    },
    {
      title: "Ngày list2",
      value: "maildate_list2",
    },
    {
      title: "Ngày list3",
      value: "maildate_list3",
    },
    {
      title: "Ngày list4",
      value: "maildate_list4",
    },
    {
      title: "Ngày list5",
      value: "maildate_list5",
    },

    {
      title: "Dự kiến seller",
      value: "maildate_expectedseller",
    },
    {
      title: "Dự kiến list 1",
      value: "maildate_expectedlist1",
    },
    {
      title: "Dự kiến list 2",
      value: "maildate_expectedlist2",
    },
    {
      title: "Dự kiến list 3",
      value: "maildate_expectedlist3",
    },
    {
      title: "Dự kiến list 4",
      value: "maildate_expectedlist4",
    },
    {
      title: "Dự kiến list 5",
      value: "maildate_expectedlist5",
    },

    {
      title: "Ngày Suspended",
      value: "maildate_suspended",
    },
    {
      title: "Ngày check",
      value: "maildate_checksus1",
    },
    {
      title: "Ngày gỡ sus 1",
      value: "maildate_contact1",
    },
    {
      title: "Ngày gỡ sus 2",
      value: "maildate_contact2",
    },
    {
      title: "Ngày gỡ sus 3",
      value: "maildate_contact3",
    },
    {
      title: "Ngày gỡ sus 4",
      value: "maildate_contact4",
    },
    {
      title: "Ngày gỡ sus 5",
      value: "maildate_contact5",
    },
    {
      title: "Ngày check",
      value: "maildate_checksus2",
    },
    {
      title: "Ngày check",
      value: "maildate_checksus3",
    },
  ];

  // Hàm để thay đổi dữ liệu của select list info
  const changeSelectListInfo = (values) => {
    setSelectListInfo(values);
  };

  // Hàm để thay đổi dữ liệu của note
  const handleChangeNote = (e) => {
    setNoteValue(e.target.value);
  };

  return (
    <Card
      title={id}
      extra={<Button onClick={() => form.submit()}>Lưu thông tin</Button>}
    >
      <Tabs defaultActiveKey="1">
       
        <Tabs.TabPane tab="THÔNG TIN TÀI KHOẢN" key="1">
          <Row gutter={16}>
            <Col span={12}>
              <Card title="THÔNG TIN ETSY">
                <Form
                  form={form}
                  name="basic"
                  onFinish={onFinish}
                  initialValues={mailData}
                  autoComplete="off"
                >
                  <Row gutter={16}>
                    <Col span={6}>
                      <Form.Item
                        label="mail id"
                        name="mail_id"
                        rules={[
                          {
                            required: true,
                            message: "Hãy nhập mail id!",
                          },
                        ]}
                        onClick={() =>
                          copyToClipboard(form.getFieldValue("mail_id"))
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
                      <Form.Item label="mail User" name="mail_user">
                        <Input size="small" placeholder="input here" />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label="mail Pass" name="mail_password">
                        <Input size="small" placeholder="input here" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={24}>
                      <Form.Item label="mail chi tiết" name="mail_detail">
                        <Input size="small" placeholder="input here" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={16}>
                    <Col span={7}>
                      <Form.Item label="mail recover" name="mail_limit">
                        <Input size="small" />
                      </Form.Item>
                    </Col>
                    <Col span={5}>
                      <Form.Item label="pass" name="mail_item">
                        <Input size="small" />
                      </Form.Item>
                    </Col>
                    <Col span={7}>
                      <Form.Item label="mail forward" name="mail_sold">
                        <Input size="small"/>
                      </Form.Item>
                    </Col>
                    <Col span={5}>
                      <Form.Item label="pass" name="mail_feedback">
                        <Input size="small" />
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
                        optionLabelProp="label"
                      >
                        <Option value="Phone" label="Phone">
                          <div className="demo-option-label-item">Phone</div>
                        </Option>
                        <Option value="PC" label="PC">
                          <div className="demo-option-label-item">PC</div>
                        </Option>
                        <Option value="Antidetect" label="Antidetect">
                          <div className="demo-option-label-item">
                            Antidetect
                          </div>
                        </Option>
                        <Option value="Gologin" label="Gologin">
                          <div className="demo-option-label-item">Gologin</div>
                        </Option>
                        <Option value="VPS" label="VPS">
                          <div className="demo-option-label-item">VPS</div>
                        </Option>
                        <Option value="Windows 10" label="Windows 10">
                          <div className="demo-option-label-item">
                            Windows 10
                          </div>
                        </Option>
                        <Option value="Windows 11" label="Windows 11">
                          <div className="demo-option-label-item">
                            Windows 11
                          </div>
                        </Option>
                        <Option value="MAC" label="MAC">
                          <div className="demo-option-label-item">MAC</div>
                        </Option>
                        <Option value="Ubuntu" label="Ubuntu">
                          <div className="demo-option-label-item">Ubuntu</div>
                        </Option>
                        <Option value="Chrome" label="Chrome">
                          <div className="demo-option-label-item">Chrome</div>
                        </Option>
                        <Option value="Firefox" label="Firefox">
                          <div className="demo-option-label-item">Firefox</div>
                        </Option>
                        <Option value="Eagle" label="Eagle">
                          <div className="demo-option-label-item">Eagle</div>
                        </Option>
                        <Option value="Safari" label="Safari">
                          <div className="demo-option-label-item">Safari</div>
                        </Option>
                        <Option value="USB 4G" label="USB 4G">
                          <div className="demo-option-label-item">USB 4G</div>
                        </Option>
                        <Option value="Proxy 4G" label="Proxy 4G">
                          <div className="demo-option-label-item">Proxy 4G</div>
                        </Option>
                        <Option value="Proxy" label="Proxy">
                          <div className="demo-option-label-item">Proxy</div>
                        </Option>
                        <Option value="Info real" label="Info real">
                          <div className="demo-option-label-item">
                            Info real
                          </div>
                        </Option>
                        <Option value="Info gen" label="Info gen">
                          <div className="demo-option-label-item">Info gen</div>
                        </Option>
                        <Option value="Quy trình 1" label="Quy trình 1">
                          <div className="demo-option-label-item">
                            Quy trình 1
                          </div>
                        </Option>
                        <Option value="Quy trình 2" label="Quy trình 2">
                          <div className="demo-option-label-item">
                            Quy trình 2
                          </div>
                        </Option>
                        <Option value="Quy trình 3" label="Quy trình 3">
                          <div className="demo-option-label-item">
                            Quy trình 3
                          </div>
                        </Option>
                        <Option value="Quy trình 4" label="Quy trình 4">
                          <div className="demo-option-label-item">
                            Quy trình 4
                          </div>
                        </Option>
                        <Option value="Quy trình 5" label="Quy trình 5">
                          <div className="demo-option-label-item">
                            Quy trình 5
                          </div>
                        </Option>
                      </Select>
                    </Form.Item>
                  ) : null}

                  <Form.Item label="Tiến trình" name="mail_processing">
                    <Select
                      mode="multiple"
                      style={{ width: "100%" }}
                      placeholder="select one item"
                      optionLabelProp="label"
                      //status="warning"
                    >
                      <Option value="VN" label="VN">
                        <div className="demo-option-label-item">VN</div>
                      </Option>
                      <Option value="US" label="US">
                        <div className="demo-option-label-item">US</div>
                      </Option>
                      <Option value="Login" label="Login">
                        <div className="demo-option-label-item">Login</div>
                      </Option>
                      <Option value="Reg" label="Reg">
                        <div className="demo-option-label-item">Reg</div>
                      </Option>
                      <Option value="Change pass" label="Change pass">
                        <div className="demo-option-label-item">Change pass</div>
                      </Option>
                      <Option value="Change info" label="Change info">
                        <div className="demo-option-label-item">Change info</div>
                      </Option>
                      <Option value="Avatar" label="Avatar">
                        <div className="demo-option-label-item">Avatar</div>
                      </Option>
                      <Option value="Verify" label="Verify">
                        <div className="demo-option-label-item">Verify</div>
                      </Option>
                      <Option value="Recover" label="Recover">
                        <div className="demo-option-label-item">Recover</div>
                      </Option>
                      <Option value="Forward" label="Forward">
                        <div className="demo-option-label-item">Forward</div>
                      </Option>
                      <Option value="Security" label="Security">
                        <div className="demo-option-label-item">Security</div>
                      </Option>
                      <Option value="Tạo kênh" label="Tạo kênh">
                        <div className="demo-option-label-item">Tạo kênh</div>
                      </Option>
                      <Option value="Request verify" label="Request verify">
                        <div className="demo-option-label-item">Request verify</div>
                      </Option>
                      <Option value="Error" label="Error">
                        <div className="demo-option-label-item">Error</div>
                      </Option>
                      <Option value="Die" label="Die">
                        <div className="demo-option-label-item">Die</div>
                      </Option>
                      
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
                        optionLabelProp="label"
                      >
                        <Option value="VN" label="VN">
                          <div className="demo-option-label-item">VN</div>
                        </Option>
                        <Option value="US" label="US">
                          <div className="demo-option-label-item">US</div>
                        </Option>
                        <Option value="Buyer" label="Buyer">
                          <div className="demo-option-label-item">Buyer</div>
                        </Option>
                        <Option value="Reg" label="Reg">
                          <div className="demo-option-label-item">
                            Reg
                          </div>
                        </Option>
                        <Option value="Gmail" label="Gmail">
                          <div className="demo-option-label-item">Gmail</div>
                        </Option>
                        <Option value="Hotmail" label="Hotmail">
                          <div className="demo-option-label-item">
                            Hotmail
                          </div>
                        </Option>
                        <Option value="Outlook" label="Outlook">
                          <div className="demo-option-label-item">
                            Outlook
                          </div>
                        </Option>
                        <Option value="Yahoo" label="Yahoo">
                          <div className="demo-option-label-item">Yahoo</div>
                        </Option>
                        <Option value="New" label="New">
                          <div className="demo-option-label-item">
                          New
                          </div>
                        </Option>
                        <Option value="Old" label="Old">
                          <div className="demo-option-label-item">
                            Old
                          </div>
                        </Option>
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
                        optionLabelProp="label"
                      >
                        <Option value="Chuẩn bị bán" label="Chuẩn bị bán">
                          <div className="demo-option-label-item">
                            Chuẩn bị bán
                          </div>
                        </Option>
                        <Option
                          value="Đủ điều kiện bán"
                          label="Đủ điều kiện bán"
                        >
                          <div className="demo-option-label-item">
                            Đủ điều kiện bán
                          </div>
                        </Option>

                        <Option value="Bán tài khoản" label="Bán tài khoản">
                          <div className="demo-option-label-item">
                            Bán tài khoản
                          </div>
                        </Option>
                        <Option value="Đang giao dịch" label="Đang giao dịch">
                          <div className="demo-option-label-item">
                            Đang giao dịch
                          </div>
                        </Option>

                        <Option value="Bán thành công" label="Bán thành công">
                          <div className="demo-option-label-item">
                            Bán thành công
                          </div>
                        </Option>
                        <Option value="Bảo hành" label="Bảo hành">
                          <div className="demo-option-label-item">Bảo hành</div>
                        </Option>
                        <Option value="Hết bảo hành" label="Hết bảo hành">
                          <div className="demo-option-label-item">
                            Hết bảo hành
                          </div>
                        </Option>
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
                        optionLabelProp="label"
                      >
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
                        <Option
                          value="Phòng nâng cấp và phục hồi tài khoản"
                          label="Phòng nâng cấp và phục hồi tài khoản"
                        >
                          <div className="demo-option-label-item">
                            Phòng nâng cấp và phục hồi tài khoản
                          </div>
                        </Option>
                        <Option value="Kho lưu trữ" label="Kho lưu trữ">
                          <div className="demo-option-label-item">
                            Kho lưu trữ
                          </div>
                        </Option>
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
                        optionLabelProp="label"
                      >
                        <Option value="Nguyễn Hoài" label="Nguyễn Hoài">
                          <div className="demo-option-label-item">
                            Nguyễn Hoài
                          </div>
                        </Option>
                        <Option value="Khắc Liêm" label="Khắc Liêm">
                          <div className="demo-option-label-item">
                            Khắc Liêm
                          </div>
                        </Option>
                      </Select>
                    </Form.Item>
                  ) : null}

                  <Row gutter={16}>
                    <Col span={8}>
                      <Form.Item label="Trạng thái" name="mail_status">
                        <Select
                          //mode="multiple"
                          style={{ width: "100%" }}
                          optionLabelProp="label"
                        >
                          <Option value="Live" label="Live">
                            <div className="demo-option-label-item">Live</div>
                          </Option>
                          <Option value="Active" label="Active">
                            <div className="demo-option-label-item">Active</div>
                          </Option>
                          <Option value="Error" label="Error">
                            <div className="demo-option-label-item">Error</div>
                          </Option>
                          <Option value="Die" label="Die">
                            <div className="demo-option-label-item">Die</div>
                          </Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label="Lớp mail" name="mail_class">
                        <Select
                          //mode="multiple"
                          style={{ width: "100%" }}
                          optionLabelProp="label"
                        >
                          <Option value="Lớp 1" label="Lớp 1 New">
                            <div className="demo-option-label-item">
                              Lớp 1 New
                            </div>
                          </Option>
                          <Option value="Lớp 2" label="Lớp 2">
                            <div className="demo-option-label-item">Lớp 2</div>
                          </Option>
                          <Option value="Lớp 3" label="Lớp 3">
                            <div className="demo-option-label-item">Lớp 3</div>
                          </Option>
                          <Option value="Lớp 4" label="Lớp 4">
                            <div className="demo-option-label-item">Lớp 4</div>
                          </Option>
                          <Option value="Lớp 5" label="Lớp 5">
                            <div className="demo-option-label-item">Lớp 5</div>
                          </Option>
                          <Option value="Lớp 6" label="Lớp 6">
                            <div className="demo-option-label-item">Lớp 6</div>
                          </Option>
                          <Option value="Lớp 7" label="Lớp 7">
                            <div className="demo-option-label-item">Lớp 7</div>
                          </Option>
                          <Option value="Lớp 8" label="Lớp 8 Upseller">
                            <div className="demo-option-label-item">
                              Lớp 8 Upseller
                            </div>
                          </Option>
                          <Option value="Lớp 9" label="Lớp 9">
                            <div className="demo-option-label-item">Lớp 9</div>
                          </Option>
                          <Option value="Lớp 10" label="Lớp 10">
                            <div className="demo-option-label-item">Lớp 10</div>
                          </Option>
                          <Option value="Lớp 11" label="Lớp 11">
                            <div className="demo-option-label-item">Lớp 11</div>
                          </Option>
                          <Option value="Lớp 12" label="Lớp 12 Chuyển">
                            <div className="demo-option-label-item">
                              Lớp 12 Chuyển
                            </div>
                          </Option>
                          <Option value="Lớp 13" label="Lớp 13">
                            <div className="demo-option-label-item">Lớp 13</div>
                          </Option>
                          <Option value="Lớp 14" label="Lớp 14">
                            <div className="demo-option-label-item">Lớp 14</div>
                          </Option>
                          <Option value="Lớp 15" label="Lớp 15">
                            <div className="demo-option-label-item">Lớp 15</div>
                          </Option>
                          <Option value="Lớp 16" label="Lớp 16">
                            <div className="demo-option-label-item">Lớp 16</div>
                          </Option>
                          <Option value="Lớp 17" label="Lớp 17">
                            <div className="demo-option-label-item">Lớp 17</div>
                          </Option>
                          <Option value="Lớp 18" label="Lớp 18">
                            <div className="demo-option-label-item">Lớp 18</div>
                          </Option>
                          <Option value="Lớp 19" label="Lớp 19">
                            <div className="demo-option-label-item">Lớp 19</div>
                          </Option>
                          <Option value="Lớp 20" label="Lớp 20 mail error">
                            <div className="demo-option-label-item">
                              Lớp 20 mail error
                            </div>
                          </Option>
                          <Option value="Lớp 21" label="Lớp 21 Request Verify">
                            <div className="demo-option-label-item">
                              Lớp 21 Request Verify
                            </div>
                          </Option>
                          <Option value="Lớp 22" label="Lớp 22 Error">
                            <div className="demo-option-label-item">
                              Lớp 22 Error
                            </div>
                          </Option>
                          <Option
                            value="Lớp 23"
                            label="Lớp 23 Die"
                          >
                            <div className="demo-option-label-item">
                              Lớp 23 Die
                            </div>
                          </Option>
                          <Option
                            value="Lớp 24"
                            label="Lớp 24 Gỡ suspended ngày 1"
                          >
                            <div className="demo-option-label-item">
                              Lớp 24 Gỡ suspended ngày 1
                            </div>
                          </Option>
                          <Option
                            value="Lớp 25"
                            label="Lớp 25 Gỡ suspended ngày 2"
                          >
                            <div className="demo-option-label-item">
                              Lớp 25 Gỡ suspended ngày 2
                            </div>
                          </Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label="Hỗ trợ" name="mail_support">
                        <Select
                          style={{ width: "100%" }}
                          placeholder="select one item"
                          optionLabelProp="label"
                        >
                          <Option value="Nguyễn Hoài" label="Nguyễn Hoài">
                            <div className="demo-option-label-item">
                              Nguyễn Hoài
                            </div>
                          </Option>
                          <Option value="Khắc Liêm" label="Khắc Liêm">
                            <div className="demo-option-label-item">
                              Khắc Liêm
                            </div>
                          </Option>
                        </Select>
                      </Form.Item>
                    </Col>
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
                    {listInfo.map((item) => {
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
                    dataSource={listInfo}
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
                                <Input onChange={() => infoForm.submit()} />
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
                    {listDate.map((item, index) => {
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
                  2022-11-23 16:50:34|;
                </span>
              </Card>
            </Col>
          </Row>
        </Tabs.TabPane>

        <Tabs.TabPane tab="HƯỚNG DẪN" key="3"></Tabs.TabPane>
      </Tabs>
    </Card>
  );
};

export default mail_info;
