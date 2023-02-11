import {
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Tabs,
  TextArea,
} from "antd";
import { UserOutlined } from '@ant-design/icons';
const ebayitem_info = () => {
  const { Option } = Select;

  return (
    <Card title={"SẢN PHẨM"}>
      <Tabs>
        <Tabs.TabPane tab={"THÔNG TIN SẢN PHẨM: "} key="1">
          <Row gutter={[24, 0]}>
            <Col xs={24} xl={12} className="mb-24">
              <Card title={"THÔNG TIN SẢN PHẨM"}>
                <Row gutter={[24, 0]}>
                  <Col xs={12} xl={8} className="mb-24">
                    <Form.Item label="Mã sản phẩm" name="item_id">
                      <InputNumber />
                    </Form.Item>
                  </Col>
                  <Col xs={12} xl={8} className="mb-24">
                    <Form.Item label="Mã hóa" name="item_code">
                      <Input prefix={<UserOutlined />} placeholder="ĐIền mã sp" addonBefore="http://" suffix=".com" defaultValue="mysite" />
                    </Form.Item>
                  </Col>
                  <Col xs={0} xl={8} className="mb-24">
                    <Form.Item label="Mã sản phẩm" name="item_id">
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            </Col>

            <Col xs={24} xl={12} className="mb-24">
              <Card title={"BBBBB"}>
                <Row gutter={[24, 0]}>
                  <Col span={8}>
                    <Form.Item label="Mã hóa" name="item_code">
                      <Select size={"large"}>
                        <Option>AAAAAA</Option>
                        <Option>BBBBBBBBB</Option>
                        <Option>CCCCCCCCCC</Option>
                        <Option>DDDDD</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Tabs.TabPane>

        <Tabs.TabPane tab={"NỘI DUNG SẢN PHẨM: "} key="2">
          <Col xl={15}>
            <Card title={"BBBBB"}>
              <Row gutter={[24, 0]}>
                <Col span={8}>
                  <Form.Item label="Mã hóa" name="item_code">
                    <Select size={"large"}>
                      <Option>AAAAAA</Option>
                      <Option>BBBBBBBBB</Option>
                      <Option>CCCCCCCCCC</Option>
                      <Option>DDDDD</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Mã sản phẩm" name="item_id">
                    <Input.TextArea></Input.TextArea>
                    <Button type="primary">sdfsdfs</Button>
                  </Form.Item>
                </Col>
                <Col span={15}>
                  <Form.Item label="Mã hóa" name="item_code">
                    <Select size={"large"}></Select>
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          </Col>
        </Tabs.TabPane>
      </Tabs>
    </Card>
  );
};

export default ebayitem_info;
