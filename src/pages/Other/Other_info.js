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
  import dayjs from "dayjs";
  import { postOtherInfo, getOtherInfo } from "../../api/other/index";
  const Other_info = () => {
    const [otherData, setOtherData] = useState({
      other_id: "hahahah",
    });
  
    let { id } = useParams();
    const [form] = Form.useForm();
    const { Option } = Select;
    const onFinish = async (values) => {
      values.birth_date = dayjs(values.birth_date).format("DD/MM/YYYY");
      //values.status = values.status.join(",");
      const data = await postOtherInfo(values);
      console.log(data);
    };
    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };
  
    const getInfoOther = async () => {
      const { data } = await getOtherInfo(id);
      let newData = {};
      //newData.status = data.status.split(",");
      newData.other_id = data.other_id;
      newData.passport = data.passport;
      newData.birth_date = data.birth_date;
      console.log(newData);
      setOtherData(newData);
    };
  
    useEffect(() => {
      getInfoOther();
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
                <Card title="THÔNG TIN other">
                  <Form
                    form={form}
                    name="basic"
                    onFinish={onFinish}
                    initialValues={otherData}
                    autoComplete="off"
                  >
                    <Row gutter={16}>
                      <Col span={12}>
                        <Form.Item
                          label="other User"
                          name="other_user"
                          rules={[
                            {
                              required: true,
                              message: "Hãy nhập other id!",
                            },
                          ]}
                        >
                          <Input  placeholder="input here" />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="other Pass" name="other_password">
                          <Input  placeholder="input here" />
                        </Form.Item>
                      </Col>
                    </Row>
  
                    <Form.Item label="Tiến trình" name="other_processing">
                      <Select
                        mode="multiple"
                        style={{ width: "100%" }}
                        placeholder="select one item"
                        optionlabelprop="label"
                        //status="warning"
                      >
                        <Option value="Mail" label="Mail">
                          <div className="demo-option-label-item">Mail</div>
                        </Option>
                        <Option value="Buyer" label="Buyer">
                          <div className="demo-option-label-item">Buyer</div>
                        </Option>
                        <Option value="Verify Full" label="Verify Full">
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
  
                    <Form.Item label="Loại other" name="other_types">
                      <Select
                        mode="multiple"
                        style={{ width: "100%" }}
                        placeholder="select one item"
                        optionlabelprop="label"
                      >
                        <Option value="other Buyer" label="Buyer">
                          <div className="demo-option-label-item">other Buyer</div>
                        </Option>
                        <Option value="other Seller" label="Seller">
                          <div className="demo-option-label-item">
                            other Seller
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
  
                    <Form.Item label="TT Bán" name="other_sell_status">
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
  
                    <Form.Item label="Sở hữu" name="other_owner">
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
                      </Select>
                    </Form.Item>
  
                    <Form.Item label="Nhân viên" name="other_employee">
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
  
                    <Form.Item label="Quy trình" name="other_outline">
                      <Select
                        mode="multiple"
                        style={{ width: "100%" }}
                        placeholder="select one item"
                        optionlabelprop="label"
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
                        <Form.Item label="Trạng thái" name="other_status">
                          <Select
                            //mode="multiple"
                            style={{ width: "100%" }}
                            optionlabelprop="label"
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
                        <Form.Item label="Lớp other" name="other_class">
                          <Select
                            //mode="multiple"
                            style={{ width: "100%" }}
                            optionlabelprop="label"
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
                    <Form.Item label="Tài nguyên" name="other_material">
                      <Select
                        mode="multiple"
                        style={{ width: "100%" }}
                        placeholder="select one item"
                        optionlabelprop="label"
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
                        <Form.Item label="other Info" name="info_other">
                          <Input  placeholder="Phùng Văn Minh" />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item label="Ngày sinh" name="info_birthday">
                          <Input  placeholder="17/08/1984" />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item label="Trạng thái" name="Info_status">
                          <Input  placeholder="Đã sử dụng" />
                        </Form.Item>
                      </Col>
                    </Row>
  
                    <Row gutter={16}>
                      <Col span={8}>
                        <Form.Item label="other Phone" name="phone_other">
                          <Input  placeholder="09833333333" />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item label="Hạn dử dụng" name="phone_datelimit">
                          <Input  placeholder="17/12/2022" />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item label="Trạng thái" name="phone_status">
                          <Input  placeholder="Khóa 1 chiều" />
                        </Form.Item>
                      </Col>
                    </Row>
  
                    <Row gutter={16}>
                      <Col span={8}>
                        <Form.Item label="other Mail" name="mail_other">
                          <Input
                            
                            placeholder="phungvanminh@gmail.com"
                          />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item label="Password" name="mail_password">
                          <Input  placeholder="vanminh@123" />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item label="Trạng thái" name="mail_status">
                          <Input  placeholder="Live" />
                        </Form.Item>
                      </Col>
                    </Row>
  
                    <Row gutter={16}>
                      <Col span={8}>
                        <Form.Item label="other Bank" name="bank_other">
                          <Input  placeholder="Payoneer" />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item label="Number" name="bank_number">
                          <Input
                            
                            placeholder="4046 4825 4281 2969|01-26|304|Nguyen Thi Hoai"
                          />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item label="Trạng thái" name="bank_status">
                          <Input  placeholder="Đã sử dụng" />
                        </Form.Item>
                      </Col>
                    </Row>
  
                    <Row gutter={16}>
                      <Col span={8}>
                        <Form.Item label="other Device" name="device_other">
                          <Input  placeholder="PC06" />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item label="other Vbox" name="device_vbox">
                          <Input  placeholder="E_88888" />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item label="Trạng thái" name="device_status">
                          <Input  placeholder="Đang hoạt động" />
                        </Form.Item>
                      </Col>
                    </Row>
  
                    <Row gutter={16}>
                      <Col span={8}>
                        <Form.Item label="other Limit" name="other_limit">
                          <Input placeholder="1000" />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item label="other Sold" name="other_sold">
                          <Input placeholder="150" />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item label="other Listed" name="other_listed">
                          <Input placeholder="600" />
                        </Form.Item>
                      </Col>
                    </Row>
  
                    <Row gutter={16}>
                      <Col span={8}>
                        <Form.Item label="Phí Order" name="other_fees">
                          <Input placeholder="25%" />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item label="Handing time" name="other_handing_time">
                          <Input placeholder="10" />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item label="Lợi nhuận" name="other_profit">
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
                    initialValues={otherData}
                    autoComplete="off"
                  >
                    <Row gutter={16}>
                      <Col span={8}>
                        <Form.Item label="Ngày tạo" name="otherdate_creat">
                          <DatePicker format={"DD/MM/YYYY"} />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item label="Ngày verify" name="otherdate_verify">
                          <DatePicker format={"DD/MM/YYYY"} />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item label="Ngày seller" name="otherdate_seller">
                          <DatePicker format={"DD/MM/YYYY"} />
                        </Form.Item>
                      </Col>
                    </Row>
  
                    <Row gutter={16}>
                      <Col span={8}>
                        <Form.Item label="Ngày list 1" name="otherdate_list1">
                          <DatePicker format={"DD/MM/YYYY"} />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item label="Ngày list 2" name="otherdate_list2">
                          <DatePicker format={"DD/MM/YYYY"} />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item label="Ngày list 3" name="otherdate_list3">
                          <DatePicker format={"DD/MM/YYYY"} />
                        </Form.Item>
                      </Col>
                    </Row>
  
                    <Row gutter={16}>
                      <Col span={8}>
                        <Form.Item label="Ngày list 4" name="otherdate_list4">
                          <DatePicker format={"DD/MM/YYYY"} />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item label="Ngày list 5" name="otherdate_list5">
                          <DatePicker format={"DD/MM/YYYY"} />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item label="Ngày list 6" name="otherdate_list6">
                          <DatePicker format={"DD/MM/YYYY"} />
                        </Form.Item>
                      </Col>
                    </Row>
  
                    <Row gutter={16}>
                      <Col span={8}>
                        <Form.Item label="Ngày suspend" name="otherdate_suspended">
                          <DatePicker format={"DD/MM/YYYY"} />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item label="Ngày chat" name="otherdate_contact">
                          <DatePicker format={"DD/MM/YYYY"} />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item label="Ngày khôi phục" name="otherdate_restore">
                          <DatePicker format={"DD/MM/YYYY"} />
                        </Form.Item>
                      </Col>
                    </Row>
                    <br></br>
                    <Row gutter={16}>
                      <Col span={8}>
                        <Form.Item label="Ngày lên lớp" name="otherdate_class">
                          <DatePicker format={"DD/MM/YYYY"} />
                        </Form.Item>
                      </Col>
  
                      <Col span={8}>
                        <Form.Item
                          label="YC seller"
                          name="otherdate_request_upseller"
                        >
                          <DatePicker format={"DD/MM/YYYY"} />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          label="YC list 1"
                          name="otherdate_request_list1"
                        >
                          <DatePicker format={"DD/MM/YYYY"} />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={16}>
                      <Col span={8}>
                        <Form.Item
                          label="YC list 2"
                          name="otherdate_request_list2"
                        >
                          <DatePicker format={"DD/MM/YYYY"} />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          label="YC list 3"
                          name="otherdate_request_list3"
                        >
                          <DatePicker format={"DD/MM/YYYY"} />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          label="YC list 4"
                          name="otherdate_request_list4"
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
                    <Form.Item name="other_note" label="Ghi chú">
                      <Input.TextArea />
                    </Form.Item>
                  </Row>
  
                  <span>
                   
                  </span>
                </Card>
              </Col>
            </Row>
          </Tabs.TabPane>
        </Tabs>
      </Card>
    );
  };
  
  export default Other_info;
  