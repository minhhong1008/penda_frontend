import {
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Rate,
  Row,
  Select,
  Slider,
} from "antd";
import React from "react";
import { CrawlApi } from "../../api/crawl/index.js";

const Crawl = () => {
  const [form] = Form.useForm();
  const handleCrawl = () => {
    form.submit();
  };
  const handleFinish = async (values) => {
    let { data } = await CrawlApi(values);
    console.log(data);
    // console.log(values);
  };
  return (
    <div>
      <Card title="Quét dữ liệu">
        <Form form={form} onFinish={handleFinish}>
          <Row>
            <Col span={4}>Địa chỉ URL</Col>
            <Col span={20}>
              <Form.Item name="url">
                <Input placeholder="Nhập url" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={4}>Rating tối thiểu</Col>
            <Col span={20}>
              <Form.Item name="rate">
                <Rate allowHalf />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={4}>Khoảng giá</Col>
            <Col span={20}>
              <Form.Item name="price_range">
                <Slider range step={1} min={2} max={300} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={4}>Số lượng bán tối thiểu</Col>
            <Col span={20}>
              <Form.Item name="count_rate">
                <Input defaultValue={"0"}/>
              </Form.Item>
            </Col>
          </Row>
          <Button onClick={() => handleCrawl()}>Quét</Button>
        </Form>
      </Card>
    </div>
  );
};

export default Crawl;
