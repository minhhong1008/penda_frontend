import { Card, Row, Col, Form, Input, Select, Button } from "antd";
import React, { useState } from "react";
import { createData } from "../../api/create";

const Create = () => {
  const [form] = Form.useForm();

  const [noteValue, setNoteValue] = useState("");
  const [selectListInfo, setSelectListInfo] = useState(["info"]);

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
        "https://i.pinimg.com/originals/90/b2/65/90b26573e0f822d9bb987d05ce396cbc.png",
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

  const changeSelectListInfo = (values) => {
    setSelectListInfo(values);
  };

  const handleChangeNote = (e) => {
    setNoteValue(e.target.value);
  };

  const onFinish = async (values) => {
    let newValue = {
      ...values,
     
      processing: values?.processing ? values.processing.join(",") : "",
      type: values?.type ? values.type.join(",") : "",
      sell_status: values?.sell_status ? values.sell_status.join(",") : "",
      owner: values?.owner ? values.owner.join(",") : "",
      employee: values?.employee ? values.employee.join(",") : "",
      data: noteValue,
    };
   
    const { data } = createData(newValue, selectListInfo);
  };

  return (
    <Card
      title="NHẬP SỐ LIỆU ĐẦU VÀO"
      extra={<Button onClick={() => form.submit()}>Tạo</Button>}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Card title="THÔNG TIN ITEM">
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
                  <Form.Item label="chi tiết" name="detail">
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

              <Form.Item label="Loại item" name="type">
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
                  <Option value="Buyer" label="Buyer">
                    <div className="demo-option-label-item">Buyer</div>
                  </Option>
                  <Option value="Seller" label="Seller">
                    <div className="demo-option-label-item">Seller</div>
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
                      <Option value="Active" label="Active">
                        <div className="demo-option-label-item">Active</div>
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
                  <Form.Item label="Lớp item" name="class">
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
            placeholder=" user item|password item 
            user item|password item"
            onChange={handleChangeNote}
            rows={24}
          ></Input.TextArea>
        </Col>
      </Row>
    </Card>
  );
};

export default Create;
