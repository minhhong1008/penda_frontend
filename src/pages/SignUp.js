import React from "react";
import { Layout, Menu, Button, Card, Form, Input, Checkbox, Spin } from "antd";
import logo1 from "../assets/images/logos-facebook.svg";
import logo2 from "../assets/images/logo-apple.svg";
import logo3 from "../assets/images/Google__G__Logo.svg.png";

import { Link, useHistory } from "react-router-dom";
import {
  DribbbleOutlined,
  TwitterOutlined,
  InstagramOutlined,
  GithubOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { registerAction } from "../actions/authActions";
import { showError } from "../utils";

const { Footer, Content } = Layout;

const SignUp = () => {
  const [agee, setAgree] = React.useState(false);
  const authUser = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.auth);
  console.log(loading);
  const history = useHistory();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (authUser.profile !== null) {
      history.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser]);

  const changeAgree = (e) => {
    setAgree(e.target.checked);
  };

  const onFinish = (values) => {
    if (agee) {
      dispatch(registerAction(values));
    } else {
      showError("Vui lòng đồng ý với điều khoản và điều kiện");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Spin tip="Loading..." spinning={loading}>
      <div
        className="layout-default ant-layout layout-sign-up"
        style={{ height: "100vh" }}
      >
        <Content className="p-0">
          <Card
            className="card-signup header-solid h-full ant-card pt-0"
            title={<h5>Đăng Ký Bằng</h5>}
            bordered="false"
            style={{ margin: "0 auto" }}
          >
            <div className="sign-up-gateways">
              <Button type="false">
                <img src={logo1} alt="logo 1" />
              </Button>
              <Button type="false">
                <img src={logo2} alt="logo 2" />
              </Button>
              <Button type="false">
                <img src={logo3} alt="logo 3" />
              </Button>
            </div>
            <p className="text-center my-25 font-semibold text-muted">Hoặc</p>
            <Form
              name="basic"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              className="row-col"
            >
              <Form.Item
                name="users_name"
                rules={[{ required: true, message: "Hãy nhập tên tài khoản!" }]}
              >
                <Input placeholder="Tên tài khoản" />
              </Form.Item>
              <Form.Item
                name="users_mail"
                rules={[{ required: true, message: "Hãy nhập email!" }]}
              >
                <Input placeholder="Email" />
              </Form.Item>
              <Form.Item
                name="users_password"
                rules={[{ required: true, message: "Hãy nhập mật khẩu!" }]}
              >
                <Input placeholder="Mật khẩu" />
              </Form.Item>

              <Form.Item name="remember" valuePropName="checked">
                <Checkbox onChange={(e) => changeAgree(e)}>
                  Tôi đồng ý{" "}
                  <a href="#pablo" className="font-bold text-dark">
                    Điều khoản và Điều kiện
                  </a>
                </Checkbox>
              </Form.Item>

              <Form.Item>
                <Button
                  style={{ width: "100%" }}
                  type="primary"
                  htmlType="submit"
                >
                  Đăng Ký
                </Button>
              </Form.Item>
            </Form>
            <p className="font-semibold text-muted text-center">
              Bạn đã có tài khoản?{" "}
              <Link to="/sign-in" className="font-bold text-dark">
                Đăng nhập
              </Link>
            </p>
          </Card>
        </Content>
        <Footer>
          <Menu mode="horizontal">
            <Menu.Item>Company</Menu.Item>
            <Menu.Item>About Us</Menu.Item>
            <Menu.Item>Teams</Menu.Item>
            <Menu.Item>Products</Menu.Item>
            <Menu.Item>Blogs</Menu.Item>
            <Menu.Item>Pricing</Menu.Item>
          </Menu>
          <Menu mode="horizontal" className="menu-nav-social">
            <Menu.Item>
              <Link to="#">{<DribbbleOutlined />}</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="#">{<TwitterOutlined />}</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="#">{<InstagramOutlined />}</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="#">
                <svg
                  width="18"
                  height="18"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M496 256c0 137-111 248-248 248-25.6 0-50.2-3.9-73.4-11.1 10.1-16.5 25.2-43.5 30.8-65 3-11.6 15.4-59 15.4-59 8.1 15.4 31.7 28.5 56.8 28.5 74.8 0 128.7-68.8 128.7-154.3 0-81.9-66.9-143.2-152.9-143.2-107 0-163.9 71.8-163.9 150.1 0 36.4 19.4 81.7 50.3 96.1 4.7 2.2 7.2 1.2 8.3-3.3.8-3.4 5-20.3 6.9-28.1.6-2.5.3-4.7-1.7-7.1-10.1-12.5-18.3-35.3-18.3-56.6 0-54.7 41.4-107.6 112-107.6 60.9 0 103.6 41.5 103.6 100.9 0 67.1-33.9 113.6-78 113.6-24.3 0-42.6-20.1-36.7-44.8 7-29.5 20.5-61.3 20.5-82.6 0-19-10.2-34.9-31.4-34.9-24.9 0-44.9 25.7-44.9 60.2 0 22 7.4 36.8 7.4 36.8s-24.5 103.8-29 123.2c-5 21.4-3 51.6-.9 71.2C65.4 450.9 0 361.1 0 256 0 119 111 8 248 8s248 111 248 248z"></path>
                </svg>
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="#">{<GithubOutlined />}</Link>
            </Menu.Item>
          </Menu>
          <p className="copyright">
            {" "}
            Copyright © 2021 Muse by <a href="#pablo">Creative Tim</a>.{" "}
          </p>
        </Footer>
      </div>
    </Spin>
  );
};

export default SignUp;
