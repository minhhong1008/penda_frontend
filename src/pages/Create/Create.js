import { Card, Row, Col, Form, Input, Select, Button } from "antd";
import React, { useState } from "react";
import { createData } from "../../api/create";

const Create = () => {
  const [form] = Form.useForm();

  const [noteValue, setNoteValue] = useState("");
  const [selectListInfo, setSelectListInfo] = useState(["info"]);
  const listInfo = [
    {
      title: "INFO",
      thumbnail:
        "https://cdn.pixabay.com/photo/2017/08/16/00/29/add-person-2646097_1280.png",
    },
    {
      title: "MAIL",
      thumbnail:
        "https://www.citypng.com/public/uploads/preview/-11597283936hxzfkdluih.png",
    },
    {
      title: "SIM",
      thumbnail:
        "https://static.vecteezy.com/system/resources/previews/007/140/884/original/sim-card-line-circle-background-icon-vector.jpg",
    },
    {
      title: "BANK",
      thumbnail:
        "https://previews.123rf.com/images/alexwhite/alexwhite1609/alexwhite160904656/62626176-etsy-flat-design-yellow-round-web-icon.jpg",
    },
    {
      title: "CARD",
      thumbnail:
        "https://www.iconbunny.com/icons/media/catalog/product/1/0/1089.9-credit-card-icon-iconbunny.jpg",
    },
    {
      title: "EBAY",
      thumbnail: "https://aux2.iconspalace.com/uploads/312694120.png",
    },
    {
      title: "ETSY",
      thumbnail:
        "https://png.pngitem.com/pimgs/s/118-1182357_circle-hd-png-download.png",
    },
    {
      title: "AMAZON",
      thumbnail:
        "https://icons-for-free.com/download-icon-amazon+icon-1320194704838275475_512.png",
    },
    {
      title: "SHOPEE",
      thumbnail:
        "https://freepngimg.com/convert-png/109014-shopee-logo-free-download-image",
    },
    {
      title: "DEVICE",
      thumbnail:
        "https://www.iconbunny.com/icons/media/catalog/product/5/9/597.9-tablets-icon-iconbunny.jpg",
    },
  ];

  const changeSelectListInfo = (values) => {
    setSelectListInfo(values);
  };

  const handleChangeNote = (e) => {
    setNoteValue(e.target.value);
  };

  const onFinish = async (values) => {
    let newValue = {
      ...values,
      processing: values?.processing
        ? values.processing.join(",")
        : "",
      type: values?.type ? values.type.join(",") : "",
      sell_status: values?.sell_status
        ? values.sell_status.join(",")
        : "",
      owner: values?.owner ? values.owner.join(",") : "",
      employee: values?.employee
        ? values.employee.join(",")
        : "",
      data: noteValue,
    };
    console.log(selectListInfo);
    const { data } = createData(newValue, selectListInfo);
    console.log(data);
  };

  return (
    <Card
      title="Nhập thông tin"
      extra={<Button onClick={() => form.submit()}>Tạo</Button>}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Card title="THÔNG TIN ETSY">
            <Form
              form={form}
              name="form-create"
              onFinish={onFinish}
              autoComplete="off"
            >
              <Row gutter={16}>
                <Select
                  style={{ width: "100%" }}
                  placeholder="select one item"
                  optionLabelProp="label"
                  onChange={changeSelectListInfo}
                  value={selectListInfo}
                >
                  {listInfo.map((item) => {
                    return (
                      <Option
                        value={item.title.toLocaleLowerCase()}
                        label={item.title}
                      >
                        <div className="demo-option-label-item">
                          {item.title}
                        </div>
                      </Option>
                    );
                  })}
                </Select>
              </Row>
              <br></br>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item label="etsy chi tiết" name="detail">
                    <Input size="small" placeholder="input here" />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item label="Tiến trình" name="processing">
                <Select
                  mode="multiple"
                  style={{ width: "100%" }}
                  placeholder="select one item"
                  optionLabelProp="label"
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

              <Form.Item label="Loại etsy" name="type">
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
                  <Option value="etsy Buyer" label="Buyer">
                    <div className="demo-option-label-item">Buyer</div>
                  </Option>
                  <Option value="etsy Seller" label="Seller">
                    <div className="demo-option-label-item">Seller</div>
                  </Option>
                  <Option value="Gỡ Suspended" label="Gỡ Suspended">
                    <div className="demo-option-label-item">Gỡ Suspended</div>
                  </Option>
                  <Option value="ADS" label="ADS">
                    <div className="demo-option-label-item">Quảng cáo</div>
                  </Option>
                  <Option value="Above Standard" label="Above Standard">
                    <div className="demo-option-label-item">Above Standard</div>
                  </Option>
                  <Option value="Top Rate" label="Top Rate">
                    <div className="demo-option-label-item">Top Rate</div>
                  </Option>
                </Select>
              </Form.Item>

              <Form.Item label="TT Bán" name="sell_status">
                <Select
                  mode="multiple"
                  style={{ width: "100%" }}
                  placeholder="select one item"
                  optionLabelProp="label"
                >
                  <Option value="Chuẩn bị bán" label="Chuẩn bị bán">
                    <div className="demo-option-label-item">Chuẩn bị bán</div>
                  </Option>
                  <Option value="Đủ điều kiện bán" label="Đủ điều kiện bán">
                    <div className="demo-option-label-item">
                      Đủ điều kiện bán
                    </div>
                  </Option>

                  <Option value="Bán tài khoản" label="Bán tài khoản">
                    <div className="demo-option-label-item">Bán tài khoản</div>
                  </Option>
                  <Option value="Đang giao dịch" label="Đang giao dịch">
                    <div className="demo-option-label-item">Đang giao dịch</div>
                  </Option>

                  <Option value="Bán thành công" label="Bán thành công">
                    <div className="demo-option-label-item">Bán thành công</div>
                  </Option>
                  <Option value="Bảo hành" label="Bảo hành">
                    <div className="demo-option-label-item">Bảo hành</div>
                  </Option>
                  <Option value="Hết bảo hành" label="Hết bảo hành">
                    <div className="demo-option-label-item">Hết bảo hành</div>
                  </Option>
                </Select>
              </Form.Item>

              <Form.Item label="Sở hữu" name="owner">
                <Select
                  mode="multiple"
                  style={{ width: "100%" }}
                  placeholder="select one item"
                  optionLabelProp="label"
                >
                  <Option value="Phòng sản xuất" label="Phòng sản xuất">
                    <div className="demo-option-label-item">Phòng sản xuất</div>
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
                    <div className="demo-option-label-item">Kho lưu trữ</div>
                  </Option>
                </Select>
              </Form.Item>

              <Form.Item label="Nhân viên" name="employee">
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
                  <Form.Item label="Trạng thái" name="status">
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
                        <div className="demo-option-label-item">Suspended</div>
                      </Option>
                      <Option value="Disable" label="Disable">
                        <div className="demo-option-label-item">Disable</div>
                      </Option>
                      <Option value="Die" label="Die">
                        <div className="demo-option-label-item">Die</div>
                      </Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Lớp etsy" name="class">
                    <Select
                      //mode="multiple"
                      style={{ width: "100%" }}
                      optionLabelProp="label"
                    >
                      <Option value="Lớp 1" label="Lớp 1 New">
                        <div className="demo-option-label-item">Lớp 1 New</div>
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
                      <Option value="Lớp 20" label="Lớp 20 etsy error">
                        <div className="demo-option-label-item">
                          Lớp 20 etsy error
                        </div>
                      </Option>
                      <Option value="Lớp 21" label="Lớp 21 etsy die">
                        <div className="demo-option-label-item">
                          Lớp 21 etsy die
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
          <Input.TextArea
            value={noteValue}
            onChange={handleChangeNote}
            rows={24}
          ></Input.TextArea>
        </Col>
      </Row>
    </Card>
  );
};

export default Create;
