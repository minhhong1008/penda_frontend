import React from "react";
import { Card, Col, Row } from "antd";
import { useHistory } from "react-router-dom";
const HomePage = () => {
  const { Meta } = Card;
  const history = useHistory();
  const handleClick = (link) => {
    history.push(link);
  }
  return (
    <div>
      <Row gutter={4}>
        <Col className="gutter-row" span={6}>
          <div>
            <Card
            onClick={() => handleClick("/company")}
              hoverable
              style={{ width: 240 }}
              cover={
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/basement_prod/048ee28f-2c80-4d15-9aa3-4f5ddac50465.svg"
                />
              }
            >
              <Meta
                title="Giới thiệu công ty"
                description="www.instagram.com"
              />
            </Card>
          </div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div>
            <Card
              onClick={() => handleClick("/products")}
              hoverable
              style={{ width: 240 }}
              cover={
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/basement_prod/048ee28f-2c80-4d15-9aa3-4f5ddac50465.svg"
                />
              }
            >
              <Meta
                title="Sản xuất"
                description="www.instagram.com"
              />
            </Card>
          </div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div>
            <Card
            onClick={() => handleClick("/business")}
              hoverable
              style={{ width: 240 }}
              cover={
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/basement_prod/048ee28f-2c80-4d15-9aa3-4f5ddac50465.svg"
                />
              }
            >
              <Meta
                title="Kinh doanh"
                description="www.instagram.com"
              />
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
                  src="https://gw.alipayobjects.com/zos/basement_prod/048ee28f-2c80-4d15-9aa3-4f5ddac50465.svg"
                />
              }
            >
              <Meta
                title="Quản trị nhân sự"
                description="www.instagram.com"
              />
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
                  src="https://gw.alipayobjects.com/zos/basement_prod/048ee28f-2c80-4d15-9aa3-4f5ddac50465.svg"
                />
              }
            >
              <Meta
                title="Tài chính"
                description="www.instagram.com"
              />
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
                  src="https://gw.alipayobjects.com/zos/basement_prod/048ee28f-2c80-4d15-9aa3-4f5ddac50465.svg"
                />
              }
            >
              <Meta
                title="Ban kiểm soát"
                description="www.instagram.com"
              />
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
                  src="https://gw.alipayobjects.com/zos/basement_prod/048ee28f-2c80-4d15-9aa3-4f5ddac50465.svg"
                />
              }
            >
              <Meta
                title="Kế hoạch & Dự Án"
                description="www.instagram.com"
              />
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
                  src="https://gw.alipayobjects.com/zos/basement_prod/048ee28f-2c80-4d15-9aa3-4f5ddac50465.svg"
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

export default HomePage;
