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
  postsimInfo,
  getsimInfo,
  updatesimInfo,
} from "../../api/sim/index";
import { showError, showSuccess } from "../../utils";
import { useSelector } from "react-redux";

const sim_info = () => {
  const { Option } = Select;
  const { users_function, users_name } = useSelector((state) => state.auth);
  // Lấy ID từ trên param url
  let { id } = useParams();
  // Khai báo các kho dữ liệu
  const [simData, setsimData] = useState({});
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
      sim_plan: values?.sim_plan ? values.sim_plan.join(",") : "",
      sim_processing: values?.sim_processing
        ? values.sim_processing.join(",")
        : "",
      sim_type: values?.sim_type ? values.sim_type.join(",") : "",
      sim_sell_status: values?.sim_sell_status
        ? values.sim_sell_status.join(",")
        : "",
      sim_owner: values?.sim_owner ? values.sim_owner.join(",") : "",
      sim_employee: values?.sim_employee
        ? values.sim_employee.join(",")
        : "",
      list_view: selectListInfo.length > 0 ? selectListInfo.join(",") : "",

      simdate_start: dateData?.sim_date_start
        ? moment(dateData.sim_date_start).format("MM-DD-YYYY")
        : "",
      simdate_verify: dateData?.sim_date_verify
        ? moment(dateData.sim_date_verify).format("MM-DD-YYYY")
        : "",
      sim_note: noteValue,
    };
    const response = await updatesimInfo(newValue, id);
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
  const getInfosim = async () => {
    const { data } = await getsimInfo(id);
    const newData = {
      ...data,
      sim_plan: data?.sim_plan ? data.sim_plan.split(",") : "",
      sim_employee: data?.sim_employee ? data.sim_employee.split(",") : "",
      sim_processing: data?.sim_processing
        ? data.sim_processing.split(",")
        : "",
      sim_type: data?.sim_type ? data.sim_type.split(",") : "",
      sim_sell_status: data?.sim_sell_status
        ? data.sim_sell_status.split(",")
        : "",
      sim_owner: data?.sim_owner ? data.sim_owner.split(",") : "",
    };
    form.setFieldsValue(newData);
    infoForm.setFieldsValue(newData);
    dateForm.setFieldsValue({
      sim_date_start: moment(data.sim_date_start),
      sim_date_verify: moment(data.sim_date_verify),
    });
    setInfo(data);
    setNoteValue(data.sim_note);
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
    getInfosim();
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
        "https://previews.123rf.com/images/alexwhite/alexwhite1609/alexwhite160904656/62626176-sim-flat-design-yellow-round-web-icon.jpg",
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
      value: "simdate_delivery",
    },
    {
      title: "Ngày tạo",
      value: "simdate_start",
    },
    {
      title: "Ngày chuyển lớp",
      value: "simdate_nextclass",
    },
    {
      title: "Ngày verify",
      value: "simdate_verify",
    },
    {
      title: "Ngày Seller",
      value: "simdate_seller",
    },
    {
      title: "Ngày verify Bank",
      value: "simdate_verifybank",
    },
    {
      title: "Ngày draft",
      value: "simdate_draft",
    },
    {
      title: "Ngày list1",
      value: "simdate_list1",
    },
    {
      title: "Ngày list2",
      value: "simdate_list2",
    },
    {
      title: "Ngày list3",
      value: "simdate_list3",
    },
    {
      title: "Ngày list4",
      value: "simdate_list4",
    },
    {
      title: "Ngày list5",
      value: "simdate_list5",
    },

    {
      title: "Dự kiến seller",
      value: "simdate_expectedseller",
    },
    {
      title: "Dự kiến list 1",
      value: "simdate_expectedlist1",
    },
    {
      title: "Dự kiến list 2",
      value: "simdate_expectedlist2",
    },
    {
      title: "Dự kiến list 3",
      value: "simdate_expectedlist3",
    },
    {
      title: "Dự kiến list 4",
      value: "simdate_expectedlist4",
    },
    {
      title: "Dự kiến list 5",
      value: "simdate_expectedlist5",
    },

    {
      title: "Ngày Suspended",
      value: "simdate_suspended",
    },
    {
      title: "Ngày check",
      value: "simdate_checksus1",
    },
    {
      title: "Ngày gỡ sus 1",
      value: "simdate_contact1",
    },
    {
      title: "Ngày gỡ sus 2",
      value: "simdate_contact2",
    },
    {
      title: "Ngày gỡ sus 3",
      value: "simdate_contact3",
    },
    {
      title: "Ngày gỡ sus 4",
      value: "simdate_contact4",
    },
    {
      title: "Ngày gỡ sus 5",
      value: "simdate_contact5",
    },
    {
      title: "Ngày check",
      value: "simdate_checksus2",
    },
    {
      title: "Ngày check",
      value: "simdate_checksus3",
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
        <Tabs.TabPane tab="SAVE"></Tabs.TabPane>
        <Tabs.TabPane tab="THÔNG TIN TÀI KHOẢN" key="1">
          <Row gutter={16}>
            <Col span={12}>
              <Card title="THÔNG TIN ETSY">
                <Form
                  form={form}
                  name="basic"
                  onFinish={onFinish}
                  initialValues={simData}
                  autoComplete="off"
                >
                  <Row gutter={16}>
                    <Col span={6}>
                      <Form.Item
                        label="sim id"
                        name="sim_id"
                        rules={[
                          {
                            required: true,
                            message: "Hãy nhập sim id!",
                          },
                        ]}
                        onClick={() =>
                          copyToClipboard(form.getFieldValue("sim_id"))
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
                      <Form.Item label="sim User" name="sim_user">
                        <Input size="small" placeholder="input here" />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label="sim Pass" name="sim_password">
                        <Input size="small" placeholder="input here" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={24}>
                      <Form.Item label="sim chi tiết" name="sim_detail">
                        <Input size="small" placeholder="input here" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={16}>
                    <Col span={5}>
                      <Form.Item label="Giá sim" name="sim_limit">
                        <Input size="small" />
                      </Form.Item>
                    </Col>
                    <Col span={5}>
                      <Form.Item label="Số tiền" name="sim_item">
                        <Input size="small"  />
                      </Form.Item>
                    </Col>
                    <Col span={7}>
                      <Form.Item label="Hạn gọi" name="sim_sold">
                        <Input size="small"  />
                      </Form.Item>
                    </Col>
                    <Col span={7}>
                      <Form.Item label="Hạn nghe" name="sim_feedback">
                        <Input size="small"  />
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
                      name="sim_plan"
                      disabled={true}
                    >
                      <Select
                        mode="multiple"
                        style={{ width: "100%" }}
                        placeholder="select one item"
                        optionLabelProp="label"
                      >
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

                  <Form.Item label="Tiến trình" name="sim_processing">
                    <Select
                      mode="multiple"
                      style={{ width: "100%" }}
                      placeholder="select one item"
                      optionLabelProp="label"
                      //status="warning"
                    >
                      <Option value="Đánh số" label="Đánh số">
                        <div className="demo-option-label-item">Đánh số</div>
                      </Option>
                      <Option value="Sắp xếp" label="Sắp xếp">
                        <div className="demo-option-label-item">Sắp xếp</div>
                      </Option>
                      <Option value="Check hạn" label="Check hạn">
                        <div className="demo-option-label-item">Check hạn</div>
                      </Option>
                      <Option value="SMS" label="SMS">
                        <div className="demo-option-label-item">SMS</div>
                      </Option>
                      <Option value="Call" label="Call">
                        <div className="demo-option-label-item">Call</div>
                      </Option>
                      <Option value="Nạp tiền" label="Nạp tiền">
                        <div className="demo-option-label-item">Nạp tiền</div>
                      </Option>
                      <Option value="Error" label="Error">
                        <div className="demo-option-label-item">Error</div>
                      </Option>
                      <Option value="Khóa 1 chiều" label="Khóa 1 chiều">
                        <div className="demo-option-label-item">Khóa 1 chiều</div>
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
                    <Form.Item label="Loại sim" name="sim_type">
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
                      <Option value="4G" label="4G">
                        <div className="demo-option-label-item">4G</div>
                      </Option>
                      <Option value="Vinaphone" label="Vinaphone">
                        <div className="demo-option-label-item">Vinaphone</div>
                      </Option>
                      <Option value="Viettel" label="Viettel">
                        <div className="demo-option-label-item">Viettel</div>
                      </Option>
                      <Option value="Mobiphone" label="Mobiphone">
                        <div className="demo-option-label-item">Mobiphone</div>
                      </Option>
                      <Option value="VietNammobile" label="VietNammobile">
                        <div className="demo-option-label-item">VietNammobile</div>
                      </Option>
                      <Option value="Gphone" label="Gphone">
                        <div className="demo-option-label-item">Gphone</div>
                      </Option>
                      <Option value="Reg" label="Reg">
                        <div className="demo-option-label-item">Reg</div>
                      </Option>
                      <Option value="Buy" label="Buy">
                        <div className="demo-option-label-item">
                          Buy
                        </div>
                      </Option>
                      <Option value="Trả trước" label="Trả trước">
                        <div className="demo-option-label-item">
                          Trả trước
                        </div>
                      </Option>
                      <Option value="Trả sau" label="Trả sau">
                        <div className="demo-option-label-item">
                          Trả sau
                        </div>
                      </Option>
                      <Option value="Error" label="Error">
                        <div className="demo-option-label-item">Error</div>
                      </Option>
                      <Option value="Die" label="Die">
                        <div className="demo-option-label-item">Die</div>
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
                      name="sim_sell_status"
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
                    <Form.Item label="Sở hữu" name="sim_owner">
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
                    <Form.Item label="Nhân viên" name="sim_employee">
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
                      <Form.Item label="Trạng thái" name="sim_status">
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
                          <Option value="Request verify" label="Request verify">
                            <div className="demo-option-label-item">
                              Request verify
                            </div>
                          </Option>
                          <Option value="die" label="die">
                            <div className="demo-option-label-item">
                              die
                            </div>
                          </Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label="Lớp sim" name="sim_class">
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
                          <Option value="Lớp 20" label="Lớp 20 sim error">
                            <div className="demo-option-label-item">
                              Lớp 20 sim error
                            </div>
                          </Option>
                          <Option value="Lớp 21" label="Lớp 21 Request verify">
                            <div className="demo-option-label-item">
                              Lớp 21 Request verify
                            </div>
                          </Option>
                          <Option value="Lớp 22" label="Lớp 22 khóa 1 chiều">
                            <div className="demo-option-label-item">
                              Lớp 22 khóa 1 chiều
                            </div>
                          </Option>
                          <Option
                            value="Lớp 23"
                            label="Lớp 23 khóa 2 chiều"
                          >
                            <div className="demo-option-label-item">
                              Lớp 23 khóa 2 chiều
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
                      <Form.Item label="Hỗ trợ" name="sim_support">
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
      </Tabs>
    </Card>
  );
};

export default sim_info;
