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
import moment from "moment";
import { postbankInfo, getbankInfo } from "../../api/bank/index";
const bank_info = () => {
  const [bankData, setbankData] = useState({
    bank_id: "D_1000",
  });

  let { id } = useParams();
  const [form] = Form.useForm();
  const { Option } = Select;
  const onFinish = async (values) => {
    values.birth_date = moment(values.birth_date).format("DD/MM/YYYY");
    //values.status = values.status.join(",");
    const data = await postbankInfo(values);
    console.log(data);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const getInfobank = async () => {
    const { data } = await getbankInfo(id);
    let newData = {};
    //newData.status = data.status.split(",");
    newData.bank_id = data.bank_id;
    newData.passport = data.passport;
    newData.birth_date = data.birth_date;
    console.log(newData);
    setbankData(newData);
  };

  useEffect(() => {
    getInfobank();
  }, []);

  const listInfo = [
    {
      title: "INFO",
      thumbnail: "https://cdn.pixabay.com/photo/2017/08/16/00/29/add-person-2646097_1280.png",
      value: "I_101|Phùng Văn Minh|17/08/1984|026084888888|Bắc Giang",
    },
    {
      title: "MAIL",
      thumbnail: "https://www.citypng.com/public/uploads/preview/-11597283936hxzfkdluih.png",
      value: "I_101|Phùng Văn Minh|17/08/1984|026084888888|Bắc Giang",
    },
    {
      title: "SIM",
      thumbnail:
        "https://static.vecteezy.com/system/resources/previews/007/140/884/original/sim-card-line-circle-background-icon-vector.jpg",
      value: "I_101|Phùng Văn Minh|17/08/1984|026084888888|Bắc Giang",
    },
    {
      title: "BANK",
      thumbnail: "https://previews.123rf.com/images/alexwhite/alexwhite1609/alexwhite160904656/62626176-bank-flat-design-yellow-round-web-icon.jpg",
      value: "I_101|Phùng Văn Minh|17/08/1984|026084888888|Bắc Giang",
    },
    {
      title: "CARD",
      thumbnail: "https://www.iconbunny.com/icons/media/catalog/product/1/0/1089.9-credit-card-icon-iconbunny.jpg",
      value: "I_101|Phùng Văn Minh|17/08/1984|026084888888|Bắc Giang",
    },
    {
      title: "EBAY",
      thumbnail: "https://aux2.iconspalace.com/uploads/312694120.png",
      value:
        "G_101|phungvanminh@gbank.com|phung873458|pc06.penda@gbank.com|live",
    },
    {
      title: "ETSY",
      thumbnail:
        "https://png.pngitem.com/pimgs/s/118-1182357_circle-hd-png-download.png",
      value: "03885652654|live",
    },
    {
      title: "AMAZON",
      thumbnail:
        "https://icons-for-free.com/download-icon-amazon+icon-1320194704838275475_512.png",
      value: "PC06|E_88888|live",
    },
    {
      title: "SHOPEE",
      thumbnail:
        "https://freepngimg.com/convert-png/109014-shopee-logo-free-download-image",
      value: "PC06|E_88888|live",
    },
    {
      title: "bank",
      thumbnail: "https://www.iconbunny.com/icons/media/catalog/product/5/9/597.9-tablets-icon-iconbunny.jpg",
      value: "PC06|E_88888|live",
    },
  ];

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
              <Card title="THÔNG TIN bank">
                <Form
                  form={form}
                  name="basic"
                  onFinish={onFinish}
                  initialValues={bankData}
                  autoComplete="off"
                >
                  <Row gutter={16}>
                    <Col span={6}>
                      <Form.Item
                        label="bank id"
                        name="bank_id"
                        rules={[
                          {
                            required: true,
                            message: "Hãy nhập bank id!",
                          },
                        ]}
                      >
                        <Input size="small" placeholder="input here" />
                      </Form.Item>
                    </Col>
                    <Col span={10}>
                      <Form.Item label="bank User" name="bank_user">
                        <Input size="small" placeholder="input here" />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label="bank Pass" name="bank_password">
                        <Input size="small" placeholder="input here" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={24}>
                      <Form.Item
                        label="Bank chi tiết"
                        name="bank_detail"
                       
                      >
                        <Input size="small" placeholder="input here" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Form.Item label="Loại bank" name="bank_types">
                    <Select
                      mode="multiple"
                      style={{ width: "100%" }}
                      placeholder="select one item"
                      optionLabelProp="label"
                    >
                      
                      <Option value="PC" label="PC">
                        <div className="demo-option-label-item">PC</div>
                      </Option>
                      <Option value="Phone" label="Phone">
                        <div className="demo-option-label-item">Phone</div>
                      </Option>
                      <Option value="VPS" label="VPS">
                        <div className="demo-option-label-item">VPS</div>
                      </Option>
                      <Option value="VMW" label="VMW">
                        <div className="demo-option-label-item">VMW</div>
                      </Option>
                      <Option value="Antidetect" label="Antidetect">
                        <div className="demo-option-label-item">Antidetect</div>
                      </Option>
                      <Option value="Gologin" label="Gologin">
                        <div className="demo-option-label-item">Gologin</div>
                      </Option>
                    </Select>
                  </Form.Item>

                  <Form.Item label="Sở hữu" name="bank_owner">
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

                  <Form.Item label="Nhân viên" name="bank_employee">
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
                      <Form.Item label="Trạng thái" name="bank_status">
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
                      <Form.Item label="Lớp bank" name="bank_class">
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
                          <Option value="Lớp 20" label="Lớp 20 bank error">
                            <div className="demo-option-label-item">
                              Lớp 20 bank error
                            </div>
                          </Option>
                          <Option value="Lớp 21" label="Lớp 21 bank die">
                            <div className="demo-option-label-item">
                              Lớp 21 bank die
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
              <Form.Item label="Hiển thị" name="bank_view">
                    <Select
                      mode="multiple"
                      style={{ width: "100%" }}
                      placeholder="select one item"
                      optionLabelProp="label"
                    >
                      
                      <Option value="Info" label="Info">
                        <div className="demo-option-label-item">Info</div>
                      </Option>
                      <Option value="Mail" label="Mail">
                        <div className="demo-option-label-item">Mail</div>
                      </Option>
                      <Option value="Sim" label="Sim">
                        <div className="demo-option-label-item">Sim</div>
                      </Option>
                      <Option value="bank" label="bank">
                        <div className="demo-option-label-item">bank</div>
                      </Option>
                      <Option value="Bank" label="Bank">
                        <div className="demo-option-label-item">Bank</div>
                      </Option>
                      <Option value="Payoneer" label="Payoneer">
                        <div className="demo-option-label-item">Payoneer</div>
                      </Option>
                      <Option value="Paypal" label="Paypal">
                        <div className="demo-option-label-item">Paypal</div>
                      </Option>
                      <Option value="Ebay" label="Ebay">
                        <div className="demo-option-label-item">Ebay</div>
                      </Option>
                      <Option value="Etsy" label="Etsy">
                        <div className="demo-option-label-item">Etsy</div>
                      </Option>
                      <Option value="Amazon" label="Amazon">
                        <div className="demo-option-label-item">Amazon</div>
                      </Option>
                      <Option value="Shopee" label="Shopee">
                        <div className="demo-option-label-item">Shopee</div>
                      </Option>
                    </Select>
                  </Form.Item>
                <List
                  itemLayout="horizontal"
                  dataSource={listInfo}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar src={item.thumbnail} />}
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
                  initialValues={bankData}
                  autoComplete="off"
                >
                  <Row gutter={16}>
                    <Col span={8}>
                      <Form.Item label="Ngày tạo" name="bankdate_creat">
                        <DatePicker format={"DD/MM/YYYY"} />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label="Ngày verify" name="bankdate_verify">
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
                  <Form.Item name="bank_note" label="Ghi chú">
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
    </Card>
  );
};

export default bank_info;
