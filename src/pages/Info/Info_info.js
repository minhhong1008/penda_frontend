import {Button,Card,Tabs,Row,Col,Form,Input,DatePicker,Select,Modal,Avatar,List,} from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { postInfoInfo, getInfoInfo } from "../../api/info/index";
const Info_info = () => {
  const [infoData, setInfoData] = useState({
    info_id: "hahahah",
  });

  let { id } = useParams();
  const [form] = Form.useForm();
  const { Option } = Select;
  const onFinish = async (values) => {
    values.birth_date = moment(values.birth_date).format("DD/MM/YYYY");
    //values.status = values.status.join(",");
    const data = await postInfoInfo(values);
    console.log(data);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const getInfoInfo = async () => {
    const { data } = await getInfoInfo(id);
    let newData = {};
    //newData.status = data.status.split(",");
    newData.info_id = data.info_id;
    newData.passport = data.passport;
    newData.birth_date = data.birth_date;
    console.log(newData);
    setInfoData(newData);
  };

  useEffect(() => {
    getInfoInfo();
  }, []);

  const listInfo = [
    {
      title: "MAIL",
      thumbnail: "https://www.citypng.com/public/uploads/preview/-11597283936hxzfkdluih.png",
      value: "I_101|Phùng Văn Minh|17/08/1984|026084888888|Bắc Giang",
    },
    {
      title: "EBAY",
      thumbnail: "https://aux2.iconspalace.com/uploads/312694120.png",
      value:
        "G_101|phungvanminh@gmail.com|phung873458|pc06.penda@gmail.com|live",
    },
    {
      title: "ETSY",
      thumbnail: "https://png.pngitem.com/pimgs/s/118-1182357_circle-hd-png-download.png",
      value: "03885652654|live",
    },
    {
      title: "PAYONEER",
      thumbnail: "https://www.clipartkey.com/mpngs/m/130-1300370_payoneer-logo-circle.png",
      value: "ACB|788888888|Phung Van Minh|live",
    },
    {
      title: "PAYPAL",
      thumbnail:
        "https://upload.wikimedia.org/wikipedia/commons/a/a4/Paypal_2014_logo.png",
      value: "4256598896565654|2/26|456|live",
    },
    {
      title: "AMAZON",
      thumbnail: "https://icons-for-free.com/download-icon-amazon+icon-1320194704838275475_512.png",
      value: "PC06|E_88888|live",
    },
    {
      title: "SHOPEE",
      thumbnail: "https://www.kibrispdr.org/data/1065/download-logo-shopee-ico-8.jpg",
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
                    <Col span={24}>
                      <Form.Item label="Quê quán........" name="info_origin">
                        <Input size="small" placeholder="I_1000" />
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
                      <Form.Item label="Đặc điểm nhận dạng" name="info_identifying">
                        <Input size="small" placeholder="Nốt ruồi c: 2cm dưới mép trái" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={8}>
                      <Form.Item
                        label="Có giá trị đến"
                        name="infodate_expiry"
                       
                      >
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
                        <div className="demo-option-label-item">Fake</div>
                      </Option>
                      <Option value="trust" label="trust">
                        <div className="demo-option-label-item">trust</div>
                      </Option>
                      <Option value="buy" label="buy">
                        <div className="demo-option-label-item">buy</div>
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
                  initialValues={infoData}
                  autoComplete="off"
                ></Form>
              </Card>
            </Col>

            <Col span={12}>
              <Card title="LỊCH SỬ">
                <Row gutter={16}>
                  <Form.Item name="info_note" label="Ghi chú">
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

export default Info_info;
