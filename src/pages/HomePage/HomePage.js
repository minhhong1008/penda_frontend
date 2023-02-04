import React from "react";
import { Card, Col, Row } from "antd";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
const HomePage = () => {
  const { Meta } = Card;
  const history = useHistory();
  const { users_function, users_name, users_owner } = useSelector(
    (state) => state.auth
  );
  let new_users_owner = users_owner?.split(",");
  const handleClick = (link) => {
    history.push(link);
  };
  return (
    <div>
      <Row gutter={[24, 0]}>
        <Col xs={12} xl={6} className="mb-24">
          <div>
            <Card
              onClick={() => handleClick("/blog/company")}
              hoverable
              style={{ width: "100%" }}
              cover={
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/basement_prod/048ee28f-2c80-4d15-9aa3-4f5ddac50465.svg"
                />
              }
            >
              <Meta
                title="Giới thiệu công ty"
                description="www.matbiec.penda.vn"
              />
            </Card>
          </div>
        </Col>

        {new_users_owner?.indexOf("Phòng sản xuất") !== -1 ? (
          <Col xs={12} xl={6} className="mb-24">
            <div>
              <Card
                onClick={() => handleClick("/products")}
                hoverable
                style={{ width: "100%" }}
                cover={
                  <img
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/basement_prod/c0c3852c-d245-4330-886b-cb02ef49eb6d.svg" //
                  />
                }
              >
                <Meta
                  title="Phòng sản xuất"
                  description="www.matbiec.penda.vn"
                />
              </Card>
            </div>
          </Col>
        ) : null}

        {new_users_owner?.indexOf("Phòng Kinh doanh") !== -1 ? (
          <Col xs={12} xl={6} className="mb-24">
            <div>
              <Card
                onClick={() => handleClick("/business")}
                hoverable
                style={{ width: "100%" }}
                cover={
                  <img
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/basement_prod/5edc7f4d-3302-4710-963b-7b6c77ea8d06.svg"
                  />
                }
              >
                <Meta
                  title="Phòng Kinh doanh"
                  description="www.matbiec.penda.vn"
                />
              </Card>
            </div>
          </Col>
        ) : null}
        {new_users_owner?.indexOf("Phòng hành chính nhân sự") !== -1 ? (
          <Col xs={12} xl={6} className="mb-24">
            <div>
              <Card
                onClick={() => handleClick("/personnel")}
                hoverable
                style={{ width: "100%" }}
                cover={
                  <img
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/basement_prod/b443f4be-5116-49b7-873f-a7c8502b8f0e.svg"
                  />
                }
              >
                <Meta
                  title="Phòng hành chính nhân sự"
                  description="www.matbiec.penda.vn"
                />
              </Card>
            </div>
          </Col>
        ) : null}
      </Row>

      <br></br>
      <br></br>
      <Row gutter={[24, 0]}>
        {new_users_owner?.indexOf("Phòng kế toán quản trị") !== -1 ? (
          <Col xs={12} xl={6} className="mb-24">
            <div>
              <Card
                onClick={() => handleClick("/finance")}
                hoverable
                style={{ width: "100%" }}
                cover={
                  <img
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/basement_prod/7b9ed3f2-6f05-4ddb-bac3-d55feb71e0ac.svg" //finance
                  />
                }
              >
                <Meta
                  title="Phòng kế toán quản trị"
                  description="www.matbiec.penda.vn"
                />
              </Card>
            </div>
          </Col>
        ) : null}
        {new_users_owner?.indexOf("Ban kiểm soát") !== -1 ? (
          <Col xs={12} xl={6} className="mb-24">
            <div>
              <Card
                onClick={() => handleClick("/control")}
                hoverable
                style={{ width: "100%" }}
                cover={
                  <img
                    alt="example"
                    src="https://user-images.githubusercontent.com/7129/149994038-76214796-cd6a-4e80-b0a4-117e8edac050.png"
                  />
                }
              >
                <Meta
                  title="Ban kiểm soát"
                  description="www.matbiec.penda.vn"
                />
              </Card>
            </div>
          </Col>
        ) : null}
        {new_users_owner?.indexOf("Phòng kế hoạch") !== -1 ? (
          <Col xs={12} xl={6} className="mb-24">
            <div>
              <Card
                onClick={() => handleClick("/plan")}
                hoverable
                style={{ width: "100%" }}
                cover={
                  <img
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/basement_prod/a9dc586a-fe0a-4c7d-ab4f-f5ed779b963d.svg"
                  />
                }
              >
                <Meta
                  title="Phòng kế hoạch"
                  description="www.matbiec.penda.vn"
                />
              </Card>
            </div>
          </Col>
        ) : null}
        {new_users_owner?.indexOf("Phòng phục hồi") !== -1 ? (
          <Col xs={12} xl={6} className="mb-24">
            <div>
              <Card
                onClick={() => handleClick("/repair")}
                hoverable
                style={{ width: "100%" }}
                cover={
                  <img
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/basement_prod/d475d063-2754-4442-b9db-5d164e06acc9.svg"
                  />
                }
              >
                <Meta
                  title="Phòng phục hồi"
                  description="www.matbiec.penda.vn"
                />
              </Card>
            </div>
          </Col>
        ) : null}
        <Col xs={12} xl={6} className="mb-24">
          <div>
            <Card
              onClick={() => handleClick("/crawl")}
              hoverable
              style={{ width: "100%" }}
              cover={
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/basement_prod/048ee28f-2c80-4d15-9aa3-4f5ddac50465.svg"
                />
              }
            >
              <Meta
                title="Quét data"
                description="www.matbiec.penda.vn"
              />
            </Card>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default HomePage;
