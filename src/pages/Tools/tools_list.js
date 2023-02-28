import React from "react";
import { Card, Col, Row } from "antd";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
const Tools_list = () => {
  const { Meta } = Card;
  const history = useHistory();
  const { users_function } = useSelector((state) => state.auth);
  const handleClick = (link) => {
    history.push(link);
  };
  return (
    <div>
      {[
        "Phó phòng",
        "Tổ trưởng",
        "Tổ phó",
        "Chuyên viên",
        "Nhân viên",
        "Tập sự",
        "Thử việc",
      ].indexOf(users_function) == -1 ? (
        <Row gutter={16}>
          <Col className="gutter-row" span={6}>
            <div>
              <Card
                onClick={() => handleClick("/products/tooldata_info")}
                hoverable
                style={{ width: 240 }}
                cover={
                  <img
                    alt="example"
                    src="https://mastergo-local-default.oss-cn-beijing.aliyuncs.com/ant-design-mastergo.svg"
                  />
                }
              >
                <Meta title="Nhập liệu" description="www.matbiec.penda.vn" />
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
                <Meta title="CCCD" description="www.matbiec.penda.vn" />
              </Card>
            </div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div>
              <Card
                onClick={() => handleClick("/products/docbank")}
                hoverable
                style={{ width: 240 }}
                cover={
                  <img
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/basement_prod/c0c3852c-d245-4330-886b-cb02ef49eb6d.svg"
                  />
                }
              >
                <Meta title="Doc Bank" description="www.matbiec.penda.vn" />
              </Card>
            </div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div>
              <Card
                onClick={() => handleClick("/")}
                hoverable
                style={{ width: 240 }}
                cover={
                  <img
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/basement_prod/d475d063-2754-4442-b9db-5d164e06acc9.svg"
                  />
                }
              >
                <Meta
                  title="Xử lý dữ liệu"
                  description="www.matbiec.penda.vn"
                />
              </Card>
            </div>
          </Col>
        </Row>
      ) : null}
      <br></br>
      <br></br>
      {[
        "Phó phòng",
        "Tổ trưởng",
        "Tổ phó",
        "Chuyên viên",
        "Nhân viên",
        "Tập sự",
        "Thử việc",
      ].indexOf(users_function) == -1 ? (
        <Row gutter={16}>
          <Col className="gutter-row" span={6}>
            <div>
              <Card
                onClick={() => handleClick("/products/report_overview")}
                hoverable
                style={{ width: 240 }}
                cover={
                  <img
                    alt="example"
                    src="https://mastergo-local-default.oss-cn-beijing.aliyuncs.com/ant-design-mastergo.svg"
                  />
                }
              >
                <Meta title="BÁO CÁO TỔNG QUAN" description="www.matbiec.penda.vn" />
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
                <Meta title="CCCD" description="www.matbiec.penda.vn" />
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
                <Meta title="Doc Bank" description="www.matbiec.penda.vn" />
              </Card>
            </div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div>
              <Card
                onClick={() => handleClick("/")}
                hoverable
                style={{ width: 240 }}
                cover={
                  <img
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/basement_prod/d475d063-2754-4442-b9db-5d164e06acc9.svg"
                  />
                }
              >
                <Meta
                  title="Xử lý dữ liệu"
                  description="www.matbiec.penda.vn"
                />
              </Card>
            </div>
          </Col>
          
        </Row>
      ) : null}
    </div>
  );
};

export default Tools_list;
