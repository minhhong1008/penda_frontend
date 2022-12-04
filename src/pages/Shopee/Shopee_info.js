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
    Collapse,
    Space,
  } from "antd";
  import React, { useEffect, useState } from "react";
  import { useParams } from "react-router-dom";
  import moment from "moment";
  import { postShopeeInfo, getShopeeInfo } from "../../api/shopee/index";
  const Shopee_info = () => {
    const [shopeeData, setShopeeData] = useState({
      shopee_id: "hahahah",
    });
 
    let { id } = useParams();
    const [form] = Form.useForm();
    const { Option } = Select;
    const onFinish = async (values) => {
      values.birth_date = moment(values.birth_date).format("DD/MM/YYYY");
      //values.status = values.status.join(",");
      const data = await postShopeeInfo(values);
      console.log(data);
    };
    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };
  
    const getInfoShopee = async () => {
      const { data } = await getShopeeInfo(id);
      let newData = {};
      //newData.status = data.status.split(",");
      newData.shopee_id = data.shopee_id;
      newData.passport = data.passport;
      newData.birth_date = data.birth_date;
      console.log(newData);
      setShopeeData(newData);
    };
  
    useEffect(() => {
      getInfoShopee();
    }, []);
  
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
                <Card title="THÔNG TIN shopee">
                  <Form
                    form={form}
                    name="basic"
                    onFinish={onFinish}
                    initialValues={shopeeData}
                    autoComplete="off"
                  >
                    <Row gutter={16}>
                      <Col span={12}>
                        <Form.Item
                          label="shopee User"
                          name="shopee_user"
                          rules={[
                            {
                              required: true,
                              message: "Hãy nhập shopee id!",
                            },
                          ]}
                        >
                          <Input size="small" placeholder="input here" />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="shopee Pass" name="shopee_password">
                          <Input size="small" placeholder="input here" />
                        </Form.Item>
                      </Col>
                    </Row>
  
                    <Form.Item label="Tiến trình" name="shopee_processing">
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
  
                    <Form.Item label="Loại shopee" name="shopee_types">
                      <Select
                        mode="multiple"
                        style={{ width: "100%" }}
                        placeholder="select one item"
                        optionLabelProp="label"
                      >
                        <Option value="shopee Buyer" label="Buyer">
                          <div className="demo-option-label-item">shopee Buyer</div>
                        </Option>
                        <Option value="shopee Seller" label="Seller">
                          <div className="demo-option-label-item">
                            shopee Seller
                          </div>
                        </Option>
                        <Option value="VN" label="VN">
                          <div className="demo-option-label-item">VN</div>
                        </Option>
                        <Option value="US" label="US">
                          <div className="demo-option-label-item">US</div>
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
  
                    <Form.Item label="TT Bán" name="shopee_sell_status">
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
  
                    <Form.Item label="Sở hữu" name="shopee_owner">
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
                      </Select>
                    </Form.Item>
  
                    <Form.Item label="Nhân viên" name="shopee_employee">
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
  
                    <Form.Item label="Quy trình" name="shopee_outline">
                      <Select
                        mode="multiple"
                        style={{ width: "100%" }}
                        placeholder="select one item"
                        optionLabelProp="label"
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
                        <Option value="Đấu giá" label="Đấu giá">
                          <div className="demo-option-label-item">Đấu giá</div>
                        </Option>
                        <Option value="Fix giá" label="Fix giá">
                          <div className="demo-option-label-item">Fix giá</div>
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
                      </Select>
                    </Form.Item>
  
                    <Row gutter={16}>
                      <Col span={12}>
                        <Form.Item label="Trạng thái" name="shopee_status">
                          <Select
                            //mode="multiple"
                            style={{ width: "100%" }}
                            optionLabelProp="label"
                          >
                            <Option value="Live" label="Live">
                              <div className="demo-option-label-item">Live</div>
                            </Option>
                            <Option value="Suspended" label="Suspended">
                              <div className="demo-option-label-item">
                                Suspended
                              </div>
                            </Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="Lớp shopee" name="shopee_class">
                          <Select
                            //mode="multiple"
                            style={{ width: "100%" }}
                            optionLabelProp="label"
                          >
                            <Option value="Lớp 1" label="Lớp 1">
                              <div className="demo-option-label-item">Lớp 1</div>
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
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form>
                </Card>
              </Col>
              <Col span={12}>
                <Card title="THÔNG TIN TÀI NGUYÊN">
                  <Form>
                    <Form.Item label="Tài nguyên" name="shopee_material">
                      <Select
                        mode="multiple"
                        style={{ width: "100%" }}
                        placeholder="select one item"
                        optionLabelProp="label"
                      >
                        <Option value="Info" label="Info">
                          <div className="demo-option-label-item">Info</div>
                        </Option>
                        <Option value="Phone" label="Phone">
                          <div className="demo-option-label-item">Phone</div>
                        </Option>
                        <Option value="Mail" label="Mail">
                          <div className="demo-option-label-item">Mail</div>
                        </Option>
                        <Option value="Bank" label="Bank">
                          <div className="demo-option-label-item">Bank</div>
                        </Option>
                        <Option value="Doc" label="Doc">
                          <div className="demo-option-label-item">Doc</div>
                        </Option>
                      </Select>
                    </Form.Item>
  
                    <Row gutter={16}>
                      <Col span={8}>
                        <Form.Item label="shopee Info" name="info_shopee">
                          <Input size="small" placeholder="Phùng Văn Minh" />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item label="Ngày sinh" name="info_birthday">
                          <Input size="small" placeholder="17/08/1984" />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item label="Trạng thái" name="Info_status">
                          <Input size="small" placeholder="Đã sử dụng" />
                        </Form.Item>
                      </Col>
                    </Row>
  
                    <Row gutter={16}>
                      <Col span={8}>
                        <Form.Item label="shopee Phone" name="phone_shopee">
                          <Input size="small" placeholder="09833333333" />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item label="Hạn dử dụng" name="phone_datelimit">
                          <Input size="small" placeholder="17/12/2022" />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item label="Trạng thái" name="phone_status">
                          <Input size="small" placeholder="Khóa 1 chiều" />
                        </Form.Item>
                      </Col>
                    </Row>
  
                    <Row gutter={16}>
                      <Col span={8}>
                        <Form.Item label="shopee Mail" name="mail_shopee">
                          <Input
                            size="small"
                            placeholder="phungvanminh@gmail.com"
                          />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item label="Password" name="mail_password">
                          <Input size="small" placeholder="vanminh@123" />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item label="Trạng thái" name="mail_status">
                          <Input size="small" placeholder="Live" />
                        </Form.Item>
                      </Col>
                    </Row>
  
                    <Row gutter={16}>
                      <Col span={8}>
                        <Form.Item label="shopee Bank" name="bank_shopee">
                          <Input size="small" placeholder="Payoneer" />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item label="Number" name="bank_number">
                          <Input
                            size="small"
                            placeholder="4046 4825 4281 2969|01-26|304|Nguyen Thi Hoai"
                          />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item label="Trạng thái" name="bank_status">
                          <Input size="small" placeholder="Đã sử dụng" />
                        </Form.Item>
                      </Col>
                    </Row>
  
                    <Row gutter={16}>
                      <Col span={8}>
                        <Form.Item label="shopee Device" name="device_shopee">
                          <Input size="small" placeholder="PC06" />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item label="shopee Vbox" name="device_vbox">
                          <Input size="small" placeholder="E_88888" />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item label="Trạng thái" name="device_status">
                          <Input size="small" placeholder="Đang hoạt động" />
                        </Form.Item>
                      </Col>
                    </Row>
  
                    <Row gutter={16}>
                      <Col span={8}>
                        <Form.Item label="shopee Limit" name="shopee_limit">
                          <Input placeholder="1000" />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item label="shopee Sold" name="shopee_sold">
                          <Input placeholder="150" />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item label="shopee Listed" name="shopee_listed">
                          <Input placeholder="600" />
                        </Form.Item>
                      </Col>
                    </Row>
  
                    <Row gutter={16}>
                      <Col span={8}>
                        <Form.Item label="Phí Order" name="shopee_fees">
                          <Input placeholder="25%" />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item label="Handing time" name="shopee_handing_time">
                          <Input placeholder="10" />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item label="Lợi nhuận" name="shopee_profit">
                          <Input placeholder="2.5" />
                        </Form.Item>
                      </Col>
                    </Row>
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
                    form={form}
                    name="basic"
                    onFinish={onFinish}
                    initialValues={shopeeData}
                    autoComplete="off"
                  >
                    <Row gutter={16}>
                      <Col span={8}>
                        <Form.Item label="Ngày tạo" name="shopeedate_creat">
                          <DatePicker format={"DD/MM/YYYY"} />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item label="Ngày verify" name="shopeedate_verify">
                          <DatePicker format={"DD/MM/YYYY"} />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item label="Ngày seller" name="shopeedate_seller">
                          <DatePicker format={"DD/MM/YYYY"} />
                        </Form.Item>
                      </Col>
                    </Row>
  
                    <Row gutter={16}>
                      <Col span={8}>
                        <Form.Item label="Ngày list 1" name="shopeedate_list1">
                          <DatePicker format={"DD/MM/YYYY"} />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item label="Ngày list 2" name="shopeedate_list2">
                          <DatePicker format={"DD/MM/YYYY"} />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item label="Ngày list 3" name="shopeedate_list3">
                          <DatePicker format={"DD/MM/YYYY"} />
                        </Form.Item>
                      </Col>
                    </Row>
  
                    <Row gutter={16}>
                      <Col span={8}>
                        <Form.Item label="Ngày list 4" name="shopeedate_list4">
                          <DatePicker format={"DD/MM/YYYY"} />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item label="Ngày list 5" name="shopeedate_list5">
                          <DatePicker format={"DD/MM/YYYY"} />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item label="Ngày list 6" name="shopeedate_list6">
                          <DatePicker format={"DD/MM/YYYY"} />
                        </Form.Item>
                      </Col>
                    </Row>
  
                    <Row gutter={16}>
                      <Col span={8}>
                        <Form.Item label="Ngày suspend" name="shopeedate_suspended">
                          <DatePicker format={"DD/MM/YYYY"} />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item label="Ngày chat" name="shopeedate_contact">
                          <DatePicker format={"DD/MM/YYYY"} />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item label="Ngày khôi phục" name="shopeedate_restore">
                          <DatePicker format={"DD/MM/YYYY"} />
                        </Form.Item>
                      </Col>
                    </Row>
                    <br></br>
                    <Row gutter={16}>
                      <Col span={8}>
                        <Form.Item label="Ngày lên lớp" name="shopeedate_class">
                          <DatePicker format={"DD/MM/YYYY"} />
                        </Form.Item>
                      </Col>
  
                      <Col span={8}>
                        <Form.Item
                          label="YC seller"
                          name="shopeedate_request_upseller"
                        >
                          <DatePicker format={"DD/MM/YYYY"} />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          label="YC list 1"
                          name="shopeedate_request_list1"
                        >
                          <DatePicker format={"DD/MM/YYYY"} />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={16}>
                      <Col span={8}>
                        <Form.Item
                          label="YC list 2"
                          name="shopeedate_request_list2"
                        >
                          <DatePicker format={"DD/MM/YYYY"} />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          label="YC list 3"
                          name="shopeedate_request_list3"
                        >
                          <DatePicker format={"DD/MM/YYYY"} />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          label="YC list 4"
                          name="shopeedate_request_list4"
                        >
                          <DatePicker format={"DD/MM/YYYY"} />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form>
                </Card>
              </Col>
  
              <Col span={12}>
                <Card title="LỊCH SỬ">
                  <Row gutter={16}>
                    <Form.Item name="shopee_note" label="Ghi chú">
                      <Input.TextArea />
                    </Form.Item>
                  </Row>
  
                  <span>
                    Lớp 1 => Lớp 2 | Thế Minh Hồng, 2022-11-24 00:01:42 57 => shopee
                    VN | Thế Minh Hồng, 2022-11-25 16:12:36 Bùi Thị Ngát (T) =>
                    Khắc Liêm | Thế Minh Hồng, 2022-11-25 23:27:43 Khắc Liêm =>
                    Khắc Liêm | Thế Minh Hồng, 2022-11-25 23:28:05 Lớp 2 => Lớp 1
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
  
  export default Shopee_info;
  