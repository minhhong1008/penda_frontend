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
import moment from "moment";
import {
  postfacebookInfo,
  getfacebookInfo,
  updatefacebookInfo,
} from "../../api/facebook/index";
import { showError, showSuccess } from "../../utils";

const facebook_info = () => {
  const { Option } = Select;

// Lấy ID từ trên param url
  let { id } = useParams();
// Khai báo các kho dữ liệu
  const [facebookData, setfacebookData] = useState({});
  const [dateData, setDateData] = useState();
  const [info, setInfo] = useState();
  const [selectListInfo, setSelectListInfo] = useState(["info_id"]);
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
      facebook_processing: values?.facebook_processing
        ? values.facebook_processing.join(",")
        : "",
      facebook_type: values?.facebook_type ? values.facebook_type.join(",") : "",
      facebook_sell_status: values?.facebook_sell_status
        ? values.facebook_sell_status.join(",")
        : "",
      facebook_owner: values?.facebook_owner ? values.facebook_owner.join(",") : "",
      facebook_employee: values?.facebook_employee
        ? values.facebook_employee.join(",")
        : "",
      list_view: selectListInfo.length > 0 ? selectListInfo.join(",") : "",
      facebook_date_start: dateData?.facebook_date_start
        ? moment(dateData.facebook_date_start).format("MM-DD-YYYY")
        : "",
      facebook_date_verify: dateData?.facebook_date_verify
        ? moment(dateData.facebook_date_verify).format("MM-DD-YYYY")
        : "",
      facebook_note: noteValue,
    };
    const response = await updatefacebookInfo(newValue, id);
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
  const getInfofacebook = async () => {
    const { data } = await getfacebookInfo(id);
    const newData = {
      ...data,
      facebook_employee: data.facebook_employee.split(","),
      facebook_processing: data.facebook_processing.split(","),
      facebook_type: data.facebook_type.split(","),
      facebook_sell_status: data.facebook_sell_status.split(","),
      facebook_owner: data.facebook_owner.split(","),
    };
    form.setFieldsValue(newData);
    infoForm.setFieldsValue(newData);
    dateForm.setFieldsValue({
      facebook_date_start: moment(data.facebook_date_start),
      facebook_date_verify: moment(data.facebook_date_verify),
    });
    setInfo(data);
    setNoteValue(data.facebook_note);
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
    getInfofacebook();
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
        "https://previews.123rf.com/images/alexwhite/alexwhite1609/alexwhite160904656/62626176-ebay-flat-design-yellow-round-web-icon.jpg",
      value: "",
    },
    {
      title: "CARD",
      thumbnail:
        "https://www.iconbunny.com/icons/media/catalog/product/1/0/1089.9-credit-card-icon-iconbunny.jpg",
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
      title: "FACKEBOOK",
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
      title: "Ngày tạo",
      value: "facebook_date_start",
    },
    {
      title: "Ngày verify",
      value: "facebook_date_verify",
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
              <Card title="THÔNG TIN FACEBOOK">
                <Form
                  form={form}
                  name="basic"
                  onFinish={onFinish}
                  initialValues={facebookData}
                  autoComplete="off"
                >
                  <Row gutter={16}>
                    <Col span={6}>
                      <Form.Item
                        label="facebook id"
                        name="facebook_id"
                        rules={[
                          {
                            required: true,
                            message: "Hãy nhập facebook id!",
                          },
                        ]}
                      >
                        <Input size="small" placeholder="input here" />
                      </Form.Item>
                    </Col>
                    <Col span={10}>
                      <Form.Item label="facebook User" name="facebook_user">
                        <Input size="small" placeholder="input here" />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label="facebook Pass" name="facebook_password">
                        <Input size="small" placeholder="input here" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={24}>
                      <Form.Item label="facebook chi tiết" name="facebook_detail">
                        <Input size="small" placeholder="input here" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Form.Item label="Tiến trình" name="facebook_processing">
                    <Select
                      mode="multiple"
                      style={{ width: "100%" }}
                      placeholder="select one item"
                      optionLabelProp="label"
                      //status="warning"
                    >
                      <Option value="Mail" label="Mail">
                        <div className="demo-option-label-item">Mail</div>
                      </Option>
                      <Option value="Buyer" label="Buyer">
                        <div className="demo-option-label-item">Buyer</div>
                      </Option>
                      <Option value="Verify" label="Verify">
                        <div className="demo-option-label-item">Verify</div>
                      </Option>
                      <Option value="Seller" label="Seller">
                        <div className="demo-option-label-item">Seller</div>
                      </Option>
                      <Option value="List" label="List">
                        <div className="demo-option-label-item">List</div>
                      </Option>
                    </Select>
                  </Form.Item>

                  <Form.Item label="Loại facebook" name="facebook_type">
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
                      <Option value="facebook Buyer" label="Buyer">
                        <div className="demo-option-label-item">Buyer</div>
                      </Option>
                      <Option value="facebook Seller" label="Seller">
                        <div className="demo-option-label-item">Seller</div>
                      </Option>
                      <Option value="Gỡ Suspended" label="Gỡ Suspended">
                        <div className="demo-option-label-item">
                          Gỡ Suspended
                        </div>
                      </Option>
                      <Option value="ADS" label="ADS">
                        <div className="demo-option-label-item">Quảng cáo</div>
                      </Option>
                      <Option value="Above Standard" label="Above Standard">
                        <div className="demo-option-label-item">
                          Above Standard
                        </div>
                      </Option>
                      <Option value="Top Rate" label="Top Rate">
                        <div className="demo-option-label-item">Top Rate</div>
                      </Option>
                    </Select>
                  </Form.Item>

                  <Form.Item label="TT Bán" name="facebook_sell_status">
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
                      <Option value="Đủ điều kiện bán" label="Đủ điều kiện bán">
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

                  <Form.Item label="Sở hữu" name="facebook_owner">
                    <Select
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
                      <Option value="Phòng Kinh doanh" label="Phòng Kinh doanh">
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

                  <Form.Item label="Nhân viên" name="facebook_employee">
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
                        <div className="demo-option-label-item">Khắc Liêm</div>
                      </Option>
                    </Select>
                  </Form.Item>

                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item label="Trạng thái" name="facebook_status">
                        <Select
                          //mode="multiple"
                          style={{ width: "100%" }}
                          optionLabelProp="label"
                        >
                          <Option value="Live" label="Live">
                            <div className="demo-option-label-item">Live</div>
                          </Option>
                          <Option value="Error" label="Error">
                            <div className="demo-option-label-item">Error</div>
                          </Option>
                          <Option value="Suspended" label="Suspended">
                            <div className="demo-option-label-item">
                              Suspended
                            </div>
                          </Option>
                          <Option value="Disable" label="Disable">
                            <div className="demo-option-label-item">
                              Disable
                            </div>
                          </Option>
                          <Option value="Die" label="Die">
                            <div className="demo-option-label-item">Die</div>
                          </Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Lớp facebook" name="facebook_class">
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
                          <Option value="Lớp 20" label="Lớp 20 facebook error">
                            <div className="demo-option-label-item">
                              Lớp 20 facebook error
                            </div>
                          </Option>
                          <Option value="Lớp 21" label="Lớp 21 facebook die">
                            <div className="demo-option-label-item">
                              Lớp 21 facebook die
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
                  2022-11-23 16:50:34|Ctrl + /;Shift + Alt + A;Ctrl + Shift +
                  [;Ctrl + K, Ctrl + 0;Ctrl + K, Ctrl + J;Ctrl + K, Ctrl +
                  [;Ctrl + K, Ctrl + ];
                </span>
              </Card>
            </Col>
          </Row>
        </Tabs.TabPane>
      </Tabs>
    </Card>
  );
};

export default facebook_info;
