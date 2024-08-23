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
  import dayjs from "dayjs";
  import {
    postetsyorderInfo,
    getetsyorderInfo,
    updateetsyorderInfo,
  } from "../../api/etsyorder/index";
  import { showError, showSuccess } from "../../utils";
  
  const Etsyorder_info = () => {
    const { Option } = Select;
  
  // Lấy ID từ trên param url
    let { id } = useParams();
  // Khai báo các kho dữ liệu
    const [etsyorderData, setetsyorderData] = useState({});
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
        etsyorder_plan: values?.etsyorder_plan ? values.etsyorder_plan.join(",") : "",
        etsyorder_processing: values?.etsyorder_processing
          ? values.etsyorder_processing.join(",")
          : "",
        etsyorder_type: values?.etsyorder_type ? values.etsyorder_type.join(",") : "",
        etsyorder_sell_status: values?.etsyorder_sell_status
          ? values.etsyorder_sell_status.join(",")
          : "",
        etsyorder_owner: values?.etsyorder_owner ? values.etsyorder_owner.join(",") : "",
        etsyorder_employee: values?.etsyorder_employee
          ? values.etsyorder_employee.join(",")
          : "",
        list_view: selectListInfo.length > 0 ? selectListInfo.join(",") : "",
        
        etsyorder_date_start: dateData?.etsyorder_date_start
          ? dayjs(dateData.etsyorder_date_start).format("YYYY-MM-DD")
          : "",
        etsyorder_date_verify: dateData?.etsyorder_date_verify
          ? dayjs(dateData.etsyorder_date_verify).format("YYYY-MM-DD")
          : "",
        etsyorder_note: noteValue,
      };
      const response = await updateetsyorderInfo(newValue, id);
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
    const getInfoetsyorder = async () => {
      const { data } = await getetsyorderInfo(id);
      const newData = {
        ...data,
        etsyorder_plan: data?.etsyorder_plan ?  data.etsyorder_plan.split(","):"",
        etsyorder_employee: data?.etsyorder_employee ?  data.etsyorder_employee.split(","):"",
        etsyorder_processing:data?.etsyorder_processing ?  data.etsyorder_processing.split(","):"",
        etsyorder_type: data?.etsyorder_type ?  data.etsyorder_type.split(","):"",
        etsyorder_sell_status: data?.etsyorder_sell_status ?  data.etsyorder_sell_status.split(","):"",
        etsyorder_owner: data?.etsyorder_owner ?  data.etsyorder_owner.split(","):"",
      };
      form.setFieldsValue(newData);
      infoForm.setFieldsValue(newData);
      dateForm.setFieldsValue({
        etsyorder_date_start: dayjs(data.etsyorder_date_start),
        etsyorder_date_verify: dayjs(data.etsyorder_date_verify),
      });
      setInfo(data);
      setNoteValue(data.etsyorder_note);
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
      getInfoetsyorder();
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
          "https://cdn.pixabay.com/photo/2017/08/16/00/29/add-project-2646097_1280.png",
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
        value: "etsyorder_date_start",
      },
      {
        title: "Ngày verify",
        value: "etsyorder_date_verify",
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
                <Card title="THÔNG TIN ETSYORDER">
                  <Form
                    form={form}
                    name="basic"
                    onFinish={onFinish}
                    initialValues={etsyorderData}
                    autoComplete="off"
                  >
                    <Row gutter={16}>
                      <Col span={6}>
                        <Form.Item
                          label="etsyorder id"
                          name="etsyorder_id"
                          rules={[
                            {
                              required: true,
                              message: "Hãy nhập etsyorder id!",
                            },
                          ]}
                        >
                          <Input  placeholder="input here" />
                        </Form.Item>
                      </Col>
                      <Col span={10}>
                        <Form.Item label="etsyorder User" name="etsyorder_user">
                          <Input  placeholder="input here" />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item label="etsyorder Pass" name="etsyorder_password">
                          <Input  placeholder="input here" />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={16}>
                      <Col span={24}>
                        <Form.Item label="etsyorder chi tiết" name="etsyorder_detail">
                          <Input  placeholder="input here" />
                        </Form.Item>
                      </Col>
                    </Row>
  
                    <Row gutter={16}>
                      <Col span={6}>
                        <Form.Item
                          label="etsyorder limit"
                          name="etsyorder_limit"
                        >
                          <Input  placeholder="0" />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item label="etsyorder items" name="etsyorder_item">
                          <Input  placeholder="0" />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item label="etsyorder Sold" name="etsyorder_sold">
                          <Input  placeholder="0" />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item label="etsyorder Feedback" name="etsyorder_feedback">
                          <Input  placeholder="0" />
                        </Form.Item>
                      </Col>
                    </Row>
  
                    <Form.Item label="Quy trình" name="etsyorder_plan">
                      <Select
                        mode="multiple"
                        style={{ width: "100%" }}
                        placeholder="select one item"
                        optionlabelprop="label"
                        //status="warning"
                      >
                        <Option value="Chrome" label="Chrome">
                          <div className="demo-option-label-item">Chrome</div>
                        </Option>
                        <Option value="Firefox" label="Firefox">
                          <div className="demo-option-label-item">Firefox</div>
                        </Option>
                        <Option value="Eagle" label="Eagle">
                          <div className="demo-option-label-item">Eagle</div>
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
  
  
  
                    <Form.Item label="Tiến trình" name="etsyorder_processing">
                      <Select
                        mode="multiple"
                        style={{ width: "100%" }}
                        placeholder="select one item"
                        optionlabelprop="label"
                        //status="warning"
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
                        <Option value="Avatar" label="Avatar">
                          <div className="demo-option-label-item">Avatar</div>
                        </Option>
                        <Option value="Verify Full" label="Verify Full">
                          <div className="demo-option-label-item">Verify</div>
                        </Option>
                        <Option value="Seller" label="Seller">
                          <div className="demo-option-label-item">Seller</div>
                        </Option>
                        <Option value="Draft" label="Draft">
                          <div className="demo-option-label-item">Draft</div>
                        </Option>
                        <Option value="List" label="List">
                          <div className="demo-option-label-item">List</div>
                        </Option>
                        <Option value="Sold" label="Sold">
                          <div className="demo-option-label-item">Sold</div>
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
  
                    <Form.Item label="Loại etsyorder" name="etsyorder_type">
                      <Select
                        mode="multiple"
                        style={{ width: "100%" }}
                        placeholder="select one item"
                        optionlabelprop="label"
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
                        <Option value="Kick Sold" label="Kick Sold">
                          <div className="demo-option-label-item">Kick Sold</div>
                        </Option>
                        <Option value="Seller" label="Seller">
                          <div className="demo-option-label-item">Seller</div>
                        </Option>
                        <Option value="Gỡ Suspended" label="Gỡ Suspended">
                          <div className="demo-option-label-item">
                            Gỡ Suspended
                          </div>
                        </Option>
                        <Option value="Bán hàng" label="Bán hàng">
                          <div className="demo-option-label-item">
                          Bán hàng
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
  
                    <Form.Item label="TT Bán" name="etsyorder_sell_status">
                      <Select
                        mode="multiple"
                        style={{ width: "100%" }}
                        placeholder="select one item"
                        optionlabelprop="label"
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
  
                    <Form.Item label="Sở hữu" name="etsyorder_owner">
                      <Select
                        mode="multiple"
                        style={{ width: "100%" }}
                        placeholder="select one item"
                        optionlabelprop="label"
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
  
                    <Form.Item label="Nhân viên" name="etsyorder_employee">
                      <Select
                        mode="multiple"
                        style={{ width: "100%" }}
                        placeholder="select one item"
                        optionlabelprop="label"
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
                        <Form.Item label="Trạng thái" name="etsyorder_status">
                          <Select
                            //mode="multiple"
                            style={{ width: "100%" }}
                            optionlabelprop="label"
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
                        <Form.Item label="Lớp etsyorder" name="etsyorder_class">
                          <Select
                            //mode="multiple"
                            style={{ width: "100%" }}
                            optionlabelprop="label"
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
                            <Option value="Lớp 20" label="Lớp 20 etsyorder error">
                              <div className="demo-option-label-item">
                                Lớp 20 etsyorder error
                              </div>
                            </Option>
                            <Option value="Lớp 21" label="Lớp 21 etsyorder die">
                              <div className="demo-option-label-item">
                                Lớp 21 etsyorder die
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
                    optionlabelprop="label"
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
                                format="YYYY-MM-DD"
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
                    2022-11-23 16:50:34
                  </span>
                </Card>
              </Col>
            </Row>
          </Tabs.TabPane>
        </Tabs>
      </Card>
    );
  };
  
  export default Etsyorder_info;
  