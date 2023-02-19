import React from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Layout,
  Menu,
  Button,
  Row,
  Col,
  Typography,
  Form,
  Input,
  Switch,
  Spin,
} from "antd";
import signinbg from "../assets/images/img-signin.jpg";
import {
  DribbbleOutlined,
  TwitterOutlined,
  InstagramOutlined,
  GithubOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../actions/authActions";

const { Title } = Typography;
const { Footer, Content } = Layout;

const SignIn = () => {
  const authUser = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.auth);

  const [remember, setRemember] = React.useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  React.useEffect(() => {
    if (authUser.profile !== null) {
      history.push("/HomePage");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser]);

  const onFinish = (values) => {
    const userLogin = {
      users_mail: values.users_mail,
      users_password: values.users_password,
      remember: remember,
    };
    dispatch(loginAction(userLogin));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  function onChange(checked) {
    setRemember(checked);
  }
  return (
    <Spin tip="Loading..." spinning={loading}>
      <Layout
        className="layout-default layout-signin"
        style={{ height: "100vh" }}
      >
        <Content className="signin">
          <Row gutter={[24, 0]} justify="space-around">
            <Col
              xs={{ span: 24, offset: 0 }}
              lg={{ span: 6, offset: 2 }}
              md={{ span: 12 }}
            >
              <Title className="mb-15">Đăng Nhập</Title>
              <Title className="font-regular text-muted" level={5}>
                Nhập email và mật khẩu của bạn để đăng nhập
              </Title>
              <Form
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                layout="vertical"
                className="row-col"
              >
                <Form.Item
                  className="username"
                  label="Email"
                  name="users_mail"
                  rules={[
                    {
                      required: true,
                      message: "Hãy nhập email!",
                    },
                  ]}
                >
                  <Input placeholder="Email" />
                </Form.Item>

                <Form.Item
                  className="username"
                  label="Mật khẩu"
                  name="users_password"
                  rules={[
                    {
                      required: true,
                      message: "Hãy nhập mật khẩu!",
                    },
                  ]}
                >
                  <Input placeholder="Password" />
                </Form.Item>

                <Form.Item
                  name="remember"
                  className="aligin-center"
                  valuePropName="checked"
                >
                  <Switch onChange={onChange} />
                  Ghi nhớ đăng nhập
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: "100%" }}
                  >
                    Đăng nhập
                  </Button>
                </Form.Item>
                <p className="font-semibold text-muted">
                  Bạn không có tài khoản?{" "}
                  
                  <Link to="/sign-up" className="text-dark font-bold">
                    Đăng ký
                  </Link>
                </p>
              </Form>
            </Col>
            <Col
              className="sign-img"
              style={{ padding: 12 }}
              xs={{ span: 24 }}
              lg={{ span: 12 }}
              md={{ span: 12 }}
            >
              <img src={signinbg} alt="" />
            </Col>
          </Row>
        </Content>
        
      </Layout>
    </Spin>
  );
};

export default SignIn;
