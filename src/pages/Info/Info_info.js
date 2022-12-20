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
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import {
  postinfoInfo,
  getinfoInfo,
  updateinfoInfo,
} from "../../api/info/index";
import { showError, showSuccess } from "../../utils";
import { PlusOutlined } from '@ant-design/icons';


const Info_info = () => {
  const { Option } = Select;

  // Lấy ID từ trên param url
  let { id } = useParams();
  // Khai báo các kho dữ liệu
  const [infoData, setinfoData] = useState({});
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
     
      info_type: values?.info_type ? values.info_type.join(",") : "",
      
      info_owner: values?.info_owner ? values.info_owner.join(",") : "",
      info_employee: values?.info_employee
        ? values.info_employee.join(",")
        : "",
      list_view: selectListInfo.length > 0 ? selectListInfo.join(",") : "",
      info_date_start: dateData?.info_date_start
        ? moment(dateData.info_date_start).format("MM-DD-YYYY")
        : "",
      info_date_verify: dateData?.info_date_verify
        ? moment(dateData.info_date_verify).format("MM-DD-YYYY")
        : "",
      info_note: noteValue,
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
    const { data } = await getinfoInfo(id);
    const newData = {
      ...data,
      info_employee: data.info_employee.split(","),
      info_type: data.info_type.split(","),
      info_owner: data.info_owner.split(","),
    };
    form.setFieldsValue(newData);
    infoForm.setFieldsValue(newData);
    dateForm.setFieldsValue({
      info_date_start: moment(data.info_date_start),
      info_date_verify: moment(data.info_date_verify),
    });
    setInfo(data);
    setNoteValue(data.info_note);
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
    getInfoinfo();
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
        "https://previews.123rf.com/images/alexwhite/alexwhite1609/alexwhite160904656/62626176-ebay-flat-design-yellow-round-web-icon.jpg",
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
      title: "Ngày tạo",
      value: "info_date_start",
    },
    {
      title: "Ngày verify",
      value: "info_date_verify",
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
              <Card title="THÔNG TIN info">
                <Form
                  form={form}
                  name="basic"
                  onFinish={onFinish}
                  initialValues={infoData}
                  autoComplete="off"
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
                        <Input size="small" placeholder="I_1000" />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label="Giới tính" name="info_sex">
                        <Input size="small" placeholder="Nam" />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label="Ngày sinh" name="infodate_birthday">
                        <Input size="small" placeholder="27/7/1945" />
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
                    <Col span={24}>
                      <Form.Item label="Nơi thường trú" name="info_residence">
                        <Input size="small" placeholder="I_1000" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={24}>
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
                  </Row>
                  <Row gutter={16}>
                    <Col span={8}>
                      <Form.Item label="Có giá trị đến" name="infodate_expiry">
                        <Input size="small" placeholder="25/7/2041" />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label="Ngày CCCD" name="infodate_start">
                        <Input size="small" placeholder="29/4/2021" />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label="Ngày nhập" name="infodate_import">
                        <Input size="small" placeholder="07/12/2022" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Form.Item label="Loại info..." name="info_type">
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
                      <Option value="EU" label="EU">
                        <div className="demo-option-label-item">EU</div>
                      </Option>
                      <Option value="Real" label="Real">
                        <div className="demo-option-label-item">Real</div>
                      </Option>
                      <Option value="Fake" label="Fake">
                        <div className="demo-option-label-item">Gen</div>
                      </Option>
                      <Option value="staff" label="Staff">
                        <div className="demo-option-label-item">Staff</div>
                      </Option>
                      <Option value="trust" label="Trust">
                        <div className="demo-option-label-item">Trust</div>
                      </Option>
                      
                    </Select>
                  </Form.Item>

                  <Form.Item label="Sở hữu...." name="info_owner">
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

                  <Form.Item label="Nhân viên" name="info_employee">
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
                      <Form.Item label="Trạng thái" name="info_status">
                        <Select
                          //mode="multiple"
                          style={{ width: "100%" }}
                          optionLabelProp="label"
                        >
                          <Option value="Full" label="Full">
                            <div className="demo-option-label-item">Full</div>
                          </Option>
                          <Option value="Error" label="Error">
                            <div className="demo-option-label-item">Error</div>
                          </Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Lớp info" name="info_class">
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
                          <Option value="Lớp 20" label="Lớp 20 Suspended">
                            <div className="demo-option-label-item">
                              Lớp 20 Suspended
                            </div>
                          </Option>
                          <Option
                            value="Lớp 21"
                            label="Lớp 21 Seller Suspended"
                          >
                            <div className="demo-option-label-item">
                              Lớp 21 Suspended
                            </div>
                          </Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    {/* <Col span={24}>
                      <Form.Item name="info_image">
                        <Upload
                          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                          listType="picture-card"
                          fileList={fileList}
                          onPreview={handlePreview}
                          onChange={handleChange}
                        >
                          {fileList.length >= 8 ? null : uploadButton}
                        </Upload>
                      </Form.Item>
                    </Col> */}
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
      {/* <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img
          alt="example"
          style={{
            width: "100%",
          }}
          src={previewImage}
        />
      </Modal> */}
    </Card>
  );
};

export default Info_info;
