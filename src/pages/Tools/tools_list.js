import React from "react";
import { Card, Col, Row } from "antd";
import { useHistory } from "react-router-dom";
const Tools_list = () => {
  const { Meta } = Card;
  const history = useHistory();
  const handleClick = (link) => {
    history.push(link);
  };
  return (
    <div>
      <Row gutter={4}>
        <Col className="gutter-row" span={6}>
          <div>
            <Card
              onClick={() => handleClick("/products/create")}
              hoverable
              style={{ width: 240 }}
              cover={
                <img
                  alt="example"
                  src="https://mastergo-local-default.oss-cn-beijing.aliyuncs.com/ant-design-mastergo.svg"
                />
              }
            >
              <Meta title="Nhập liệu" description="www.instagram.com" />
            </Card>
          </div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div>
            <Card
              onClick={() => handleClick("/products/cccd")}
              hoverable
              style={{ width: 240 }}
              cover={
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/basement_prod/048ee28f-2c80-4d15-9aa3-4f5ddac50465.svg"
                />
              }
            >
              <Meta title="CCCD" description="www.instagram.com" />
            </Card>
          </div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div>
            <Card
              onClick={() => handleClick("/products/tools/docbank")}
              hoverable
              style={{ width: 240 }}
              cover={
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/basement_prod/c0c3852c-d245-4330-886b-cb02ef49eb6d.svg"
                />
              }
            >
              <Meta title="Doc Bank" description="www.instagram.com" />
            </Card>
          </div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div>
            <Card
              onClick={() => handleClick("/personnel")}
              hoverable
              style={{ width: 240 }}
              cover={
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/basement_prod/d475d063-2754-4442-b9db-5d164e06acc9.svg"
                />
              }
            >
              <Meta title="Xử lý dữ liệu" description="www.instagram.com" />
            </Card>
          </div>
        </Col>
      </Row>
      <br></br>
      <br></br>
      <Row gutter={4}>
        <Col className="gutter-row" span={6}>
          <div>
            <Card
              hoverable
              style={{ width: 240 }}
              cover={
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/basement_prod/b443f4be-5116-49b7-873f-a7c8502b8f0e.svg"
                />
              }
            >
              <Meta title="Tài chính" description="www.instagram.com" />
            </Card>
          </div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div>
            <Card
              hoverable
              style={{ width: 240 }}
              cover={
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/basement_prod/77e6a9ae-24a9-4be6-be42-f7fa8ee0eecf.svg"
                />
              }
            >
              <Meta title="Ban kiểm soát" description="www.instagram.com" />
            </Card>
          </div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div>
            <Card
              hoverable
              style={{ width: 240 }}
              cover={
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/basement_prod/7b9ed3f2-6f05-4ddb-bac3-d55feb71e0ac.svg"
                />
              }
            >
              <Meta title="Kế hoạch & Dự Án" description="www.instagram.com" />
            </Card>
          </div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div>
            <Card
              hoverable
              style={{ width: 240 }}
              cover={
                <img
                  alt="example"
                  src="https://uploads-ssl.webflow.com/5ecbd337fe499992c9ed75ba/5f2a7a30f3e817085cec5ac9_ant-xd-svg.svg"
                />
              }
            >
              <Meta
                title="Nâng cấp và phục hồi tài khoản"
                description="www.instagram.com"
              />
            </Card>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Tools_list;
