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
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  postEbayInfo,
  getEbayInfo,
  updateEbayInfo,
} from "../../api/ebay/index";
import { showError, showSuccess } from "../../utils";
const Ebay_info = () => {
  const [visibleModalAdd, setVisibleModalAdd] = useState(false);
  const [ebayData, setEbayData] = useState({});
  let { id } = useParams();
  const [form] = Form.useForm();
  const [formEbays] = Form.useForm();
  const { Option } = Select;
  const onFinish = async (values) => {
    let newValues = {
      ...values,
      ebay_employee: values.ebay_employee.join(","),
    };
    const response = await updateEbayInfo(newValues, id);
    if (response.status == 200) {
      showSuccess("Sửa thành công");
    } else {
      showError("Sửa không thành công");
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onFinishEbay = async (values) => {
    // values.birth_date = moment(values.birth_date).format("DD/MM/YYYY");
    values.ebay_employee = values.ebay_employee.join(",");
    const data = await postEbayInfo(values);
    console.log(data);
  };

  const handleAddEbays = () => {
    formEbays.submit();
  };

  const handleCloseModal = () => {
    setVisibleModalAdd(false);
  };

  useEffect(() => {
    getInfoEbay();
  }, []);

  const getInfoEbay = async () => {
    const { data } = await getEbayInfo(id);
    setEbayData(data);
    const newData = {
      ...data,
      ebay_employee: data.ebay_employee.split(","),
    };
    form.setFieldsValue(newData);
  };

  const listInfo = [
    {
      title: "INFO",
      thumbnail: "https://cdn-icons-png.flaticon.com/512/64/64159.png",
      value: ""
    },
    {
      title: "MAIL",
      thumbnail: "https://cdn-icons-png.flaticon.com/512/761/761755.png",
      value: ""
    },
    {
      title: "PHONE",
      thumbnail: "https://cdn-icons-png.flaticon.com/512/455/455705.png",
      value: ""
    },
    {
      title: "BANK",
      thumbnail: "https://cdn-icons-png.flaticon.com/512/2830/2830155.png",
      value: ""
    },
  ];

  return (
    <Card
      title={id}
      extra={
        <>
          <Button onClick={() => form.submit()}>Lưu thông tin</Button>
          <Button onClick={() => setVisibleModalAdd(true)}>
            Thêm tài khoản
          </Button>
        </>
      }
    >
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="SAVE"></Tabs.TabPane>
        <Tabs.TabPane tab="THÔNG TIN TÀI KHOẢN" key="1">
          <Row gutter={16}>
            <Col span={12}>
              <Card title="THÔNG TIN EBAY">
                <Form
                  form={form}
                  name="basic"
                  onFinish={onFinish}
                  initialValues={ebayData}
                  autoComplete="off"
                >
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        label="eBay User"
                        name="ebay_user"
                        rules={[
                          {
                            required: true,
                            message: "Hãy nhập eBay id!",
                          },
                        ]}
                      >
                        <Input size="small" placeholder="input here" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="eBay Pass" name="ebay_password">
                        <Input size="small" placeholder="input here" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item label="Tiến trình" name="ebay_processing">
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

                  <Form.Item label="Loại eBay" name="ebay_types">
                    <Select
                      mode="multiple"
                      style={{ width: "100%" }}
                      placeholder="select one item"
                      optionLabelProp="label"
                    >
                      <Option value="eBay Buyer" label="Buyer">
                        <div className="demo-option-label-item">eBay Buyer</div>
                      </Option>
                      <Option value="eBay Seller" label="Seller">
                        <div className="demo-option-label-item">
                          eBay Seller
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

                  <Form.Item label="TT Bán" name="ebay_sell_status">
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

                  <Form.Item label="Sở hữu" name="ebay_owner">
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

                  <Form.Item label="Nhân viên" name="ebay_employee">
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

                  <Form.Item label="Quy trình" name="ebay_outline">
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
                      <Form.Item label="Trạng thái" name="ebay_status">
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
                      <Form.Item label="Lớp eBay" name="ebay_class">
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
                <List
                  itemLayout="horizontal"
                  dataSource={listInfo}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={
                          <Avatar src={item.thumbnail} />
                        }
                        title={<a href="https://ant.design">{item.title}</a>}
                        description={<Input />}
                      />
                    </List.Item>
                  )}
                />
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
                  value={ebayData}
                  autoComplete="off"
                >
                  <Row gutter={16}>
                    <Col span={8}>
                      <Form.Item label="Ngày tạo" name="ebaydate_creat">
                        <DatePicker format={"DD/MM/YYYY"} />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label="Ngày verify" name="ebaydate_verify">
                        <DatePicker format={"DD/MM/YYYY"} />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label="Ngày seller" name="ebaydate_seller">
                        <DatePicker format={"DD/MM/YYYY"} />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={16}>
                    <Col span={8}>
                      <Form.Item label="Ngày list 1" name="ebaydate_list1">
                        <DatePicker format={"DD/MM/YYYY"} />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label="Ngày list 2" name="ebaydate_list2">
                        <DatePicker format={"DD/MM/YYYY"} />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label="Ngày list 3" name="ebaydate_list3">
                        <DatePicker format={"DD/MM/YYYY"} />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={16}>
                    <Col span={8}>
                      <Form.Item label="Ngày list 4" name="ebaydate_list4">
                        <DatePicker format={"DD/MM/YYYY"} />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label="Ngày list 5" name="ebaydate_list5">
                        <DatePicker format={"DD/MM/YYYY"} />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label="Ngày list 6" name="ebaydate_list6">
                        <DatePicker format={"DD/MM/YYYY"} />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={16}>
                    <Col span={8}>
                      <Form.Item label="Ngày suspend" name="ebaydate_suspended">
                        <DatePicker format={"DD/MM/YYYY"} />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label="Ngày chat" name="ebaydate_contact">
                        <DatePicker format={"DD/MM/YYYY"} />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label="Ngày khôi phục" name="ebaydate_restore">
                        <DatePicker format={"DD/MM/YYYY"} />
                      </Form.Item>
                    </Col>
                  </Row>
                  <br></br>
                  <Row gutter={16}>
                    <Col span={8}>
                      <Form.Item label="Ngày lên lớp" name="ebaydate_class">
                        <DatePicker format={"DD/MM/YYYY"} />
                      </Form.Item>
                    </Col>

                    <Col span={8}>
                      <Form.Item
                        label="YC seller"
                        name="ebaydate_request_upseller"
                      >
                        <DatePicker format={"DD/MM/YYYY"} />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        label="YC list 1"
                        name="ebaydate_request_list1"
                      >
                        <DatePicker format={"DD/MM/YYYY"} />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={8}>
                      <Form.Item
                        label="YC list 2"
                        name="ebaydate_request_list2"
                      >
                        <DatePicker format={"DD/MM/YYYY"} />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        label="YC list 3"
                        name="ebaydate_request_list3"
                      >
                        <DatePicker format={"DD/MM/YYYY"} />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        label="YC list 4"
                        name="ebaydate_request_list4"
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
                  <Form.Item name="ebay_note" label="Ghi chú">
                    <Input.TextArea />
                  </Form.Item>
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
      <Modal
        title="Thêm tài khoản Ebay"
        open={visibleModalAdd}
        onOk={handleAddEbays}
        onCancel={handleCloseModal}
      >
        <Form
          form={formEbays}
          name="basic"
          onFinish={onFinishEbay}
          autoComplete="off"
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="eBay User"
                name="ebay_user"
                rules={[
                  {
                    required: true,
                    message: "Hãy nhập eBay id!",
                  },
                ]}
              >
                <Input size="small" placeholder="input here" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="eBay Pass" name="ebay_password">
                <Input size="small" placeholder="input here" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="Nhân viên" name="ebay_employee">
            <Select
              mode="multiple"
              style={{ width: "100%" }}
              placeholder="select one item"
              optionLabelProp="label"
            >
              <Option value="Nguyễn Hoài" label="Nguyễn Hoài">
                <div className="demo-option-label-item">Nguyễn Hoài</div>
              </Option>
              <Option value="Khắc Liêm" label="Khắc Liêm">
                <div className="demo-option-label-item">Khắc Liêm</div>
              </Option>
            </Select>
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Trạng thái" name="ebay_status">
                <Select
                  //mode="multiple"
                  style={{ width: "100%" }}
                  optionLabelProp="label"
                >
                  <Option value="Live" label="Live">
                    <div className="demo-option-label-item">Live</div>
                  </Option>
                  <Option value="Suspended" label="Suspended">
                    <div className="demo-option-label-item">Suspended</div>
                  </Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Lớp eBay" name="ebay_class">
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
      </Modal>
    </Card>
  );
};

export default Ebay_info;
