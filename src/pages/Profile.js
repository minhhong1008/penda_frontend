import React, { useState } from "react";
import {
  Row,
  Col,
  Card,
  Button,
  Descriptions,
  Avatar,
  Form,
  Input,
  DatePicker,
  Upload,
  Spin
} from "antd";

import ImgCrop from "antd-img-crop";
import BgProfile from "../assets/images/bg-profile.jpg";
import profilavatar from "../assets/images/face-1.jpg";
import { getUser } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import { getProfileAction, updateProfileAction } from "../actions/userActions";
import dayjs from "dayjs";

function Profile() {
  const user = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.user);

  const { _id } = JSON.parse(getUser());
  const dispatch = useDispatch();

  React.useEffect(() => {
    getUserProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUserProfile = () => {
    dispatch(getProfileAction(_id));
  };

  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url:
        "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
  ]);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  const renderRole = (role) => {
    switch (role) {
      case 1: {
        return "Quản Trị Viên";
      }
      case 0: {
        return "Trưởng Phòng";
      }
      default: {
        return "Nhân Viên";
      }
    }
  };

  const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 16 },
  };

  const onFinish = (values) => {
    dispatch(
      updateProfileAction({
        _id,
        values: {
          ...values,
          birth_date: dayjs(values.birth_date).format("DD-MM-YYYY"),
        },
      })
    );
  };

  return (
    <Spin tip="Loading..." spinning={loading}>
      <div
        className="profile-nav-bg"
        style={{ backgroundImage: "url(" + BgProfile + ")" }}
      ></div>

      <Card
        className="card-profile-head"
        bodyStyle={{ display: "none" }}
        style={{ margin: "20px 0" }}
        title={
          <Row justify="space-between" align="middle" gutter={[24, 0]}>
            <Col span={24} md={12} className="col-info">
              <Avatar.Group>
                <Avatar size={74} shape="square" src={profilavatar} />
                <div className="avatar-info">
                  <h4 className="font-semibold m-0">{user?.profile?.name}</h4>
                  <p>Chức vụ: {renderRole(user?.profile?.role)}</p>
                </div>
              </Avatar.Group>
            </Col>
            <Col
              span={24}
              md={12}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            ></Col>
          </Row>
        }
      ></Card>

      <Row gutter={[24, 0]}>
        <Col xl={8} xs={24} className="mb-24">
          <Card
            bordered={false}
            title={<h6 className="font-semibold m-0">Thông Tin Cá Nhân</h6>}
            className="header-solid h-full card-profile-information"
            bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
          >
            <p className="text-dark">{user?.profile?.about}</p>
            <hr className="my-25" />
            <Descriptions>
              <Descriptions.Item label="Họ và tên" span={3}>
                {user?.profile?.name}
              </Descriptions.Item>
              <Descriptions.Item label="Ngày sinh" span={3}>
                {user?.profile?.birth_date}
              </Descriptions.Item>
              <Descriptions.Item label="Số điện thoại" span={3}>
                {user?.profile?.phone}
              </Descriptions.Item>
              <Descriptions.Item label="Email" span={3}>
                {user?.profile?.email}
              </Descriptions.Item>
              <Descriptions.Item label="Địa chỉ" span={3}>
                {user?.profile?.location}
              </Descriptions.Item>
              <Descriptions.Item label="Số căn cước" span={3}>
                {user?.profile?.identity_card_number}
              </Descriptions.Item>
              <Descriptions.Item label="Thông tin thanh toán" span={3}>
                {user?.profile?.bank_name} - {user?.profile?.bank_number}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
        <Col xl={16} xs={24} className="mb-24">
          <Card className="header-solid h-full card-profile-information">
            <Form
              disabled={true}
              initialValues={{
                ...user.profile,
                birth_date: user?.profile?.birth_date
                  ? dayjs(user?.profile?.birth_date)
                  : "",
              }}
              name="nest-messages"
              {...layout}
              onFinish={onFinish}
            >
              <Form.Item name="imgUrl" label="Ảnh đại diện">
                <ImgCrop rotate>
                  <Upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture-card"
                    fileList={fileList}
                    onChange={onChange}
                    onPreview={onPreview}
                  >
                    {fileList.length < 5 && "+ Upload"}
                  </Upload>
                </ImgCrop>
              </Form.Item>
              <Form.Item name="name" label="Họ và tên">
                <Input />
              </Form.Item>
              <Form.Item name="email" label="Email" rules={[{ type: "email" }]}>
                <Input disabled={true} />
              </Form.Item>
              <Form.Item name="birth_date" label="Ngày sinh">
                <DatePicker format={"DD-MM-YYYY"} />
              </Form.Item>
              <Form.Item name="phone" label="Số điện thoại">
                <Input />
              </Form.Item>
              <Form.Item name="identity_card_number" label="Số căn cước">
                <Input />
              </Form.Item>
              <Form.Item name="location" label="Địa chỉ">
                <Input />
              </Form.Item>
              <Form.Item name="bank_name" label="Ngân hàng">
                <Input />
              </Form.Item>
              <Form.Item name="bank_number" label="Số tài khoản">
                <Input />
              </Form.Item>
              <Form.Item name="about" label="Tiểu sử">
                <Input.TextArea />
              </Form.Item>
              <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button type="primary" htmlType="submit">
                  Cập Nhật
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </Spin>
  );
}

export default Profile;
