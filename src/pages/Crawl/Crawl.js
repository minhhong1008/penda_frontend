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
  Space,
  Switch,
  TimePicker,
  Checkbox,
} from "antd";
import React from "react";
import { Create, CrawlApi } from "../../api/crawl/index.js";
import { CheckOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { showError, showSuccess } from "../../utils";

const Crawl = () => {
  const [form] = Form.useForm();
  const { Option } = Select;
  const format = "HH:mm";
  const handleCrawl = () => {
    form.submit();
  };
  // Bước 1: onFinish Lấy dữ liệu (values) từ FORM, sau đó xử lý và gửi dữ liêu lên server bằng phương thức post. dùng hàm postData_sever
  const onFinish = async (values) => {
    // check dữ liểu chưa chuẩn thì báo lỗi
    console.log(values);
    if (values.crawl_cron_time == null) {
      return showError("Lỗi date");
    }
    if (values.crawl_cron == "auto") {
      values.crawl_cron_time = dayjs(values.crawl_cron_time).format("HH:mm");
      postData_Create(values);
    } else {
      let { data } = await CrawlApi(values);
      console.log(data);
    }
  };
  // Bước 2: Gửi dữ liệu lên server Xử lý bất đồng bộ: dùng async await
  const postData_Create = async (values) => {
    // Gọi API để gửi dữ liệu đi
    const response = await Create(values);
    if (response.status == 200) {
      showSuccess("Thêm bill thành công");
    } else {
      showError("Thêm bill thất bại");
    }
  };

  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };
  return (
    <div>
      <Card
        title="Quét dữ liệu"
        extra={
          <>
            <Button
              onClick={() => {
                form.submit();
              }}
              style={{
                background: "#1890FD",
                color: "white",
              }}
            >
              Lưu Cron
            </Button>
            {/* <Button onClick={() => test()}>Test</Button> */}
          </>
        }
      >
        <Form
          form={form}
          onFinish={onFinish}
          initialValues={{
            crawl_cron: "disable",
            crawl_cron_time: dayjs("22:00", format),
            crawl_website: "amazon.com",
            crawl_local: "usa",
            crawl_categories: "handmade",
            crawl_rate: "3",
            crawl_count_rate: "5000",
            crawl_deliver: "7",
            crawl_instock: "10",
            crawl_price_min: "5",
            crawl_price_max: "25",
            crawl_prime:"prime",
            crawl_search_key:"search_link",
            crawl_link:
              "https://www.amazon.com/s?k=World+Cups&page=1",
          }}
        >
          <Row gutter={[24, 0]} style={{ width: "100%" }}>
            <Col xs={12} xl={3} className="mb-24">
              {" "}
              <Form.Item name="crawl_cron" label="Cron">
                <Switch
                  checkedChildren="Auto"
                  unCheckedChildren="disable"
                  defaultunChecked
                />
              </Form.Item>
            </Col>
            <Col xs={12} xl={3} className="mb-24">
              <Form.Item label="Time cron" name="crawl_cron_time">
                <TimePicker format={format} size="large" />
              </Form.Item>
            </Col>
            <Col xs={12} xl={6} className="mb-24">
              <Form.Item label="Website" name="crawl_website">
                <Select optionlabelprop="label">
                  <Option value="amazon.com" label="amazon.com">
                    <div className="demo-option-label-item">amazon.com</div>
                  </Option>
                  <Option value="homedepot.com" label="homedepot.com">
                    <div className="demo-option-label-item">homedepot.com</div>
                  </Option>
                  <Option value="ebay.com" label="ebay.com">
                    <div className="demo-option-label-item">ebay.com</div>
                  </Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={12} xl={6} className="mb-24">
              <Form.Item label="local" name="crawl_local">
                <Select optionlabelprop="label">
                  <Option value="usa" label="USA">
                    <div className="demo-option-label-item">USA</div>
                  </Option>
                  <Option value="vietNam" label="VietNam">
                    <div className="demo-option-label-item">VietNam</div>
                  </Option>
                  <Option value="germany" label="Germany">
                    <div className="demo-option-label-item">Germany</div>
                  </Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={12} xl={6} className="mb-24">
              <Form.Item label="Categories" name="crawl_categories">
                <Select optionlabelprop="label">
                  <Option value="handmade" label="handmade">
                    <div className="demo-option-label-item">handmade</div>
                  </Option>
                  <Option value="kitchen" label="kitchen">
                    <div className="demo-option-label-item">kitchen</div>
                  </Option>
                  <Option value="garden" label="garden">
                    <div className="demo-option-label-item">garden</div>
                  </Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          {/* <Row gutter={[24, 0]} style={{ width: "100%" }}>
            <Col span={24}>
              <Form.Item name="crawl_url" label="Địa chỉ URL">
                <Input placeholder="Nhập url" />
              </Form.Item>
            </Col>
          </Row> */}
          <Row gutter={[24, 0]} style={{ width: "100%" }}>
            <Col xs={12} xl={6} className="mb-24">
              <Form.Item name="crawl_rate" label="Rating">
                <Rate allowHalf />
              </Form.Item>
            </Col>
            <Col xs={12} xl={6} className="mb-24">
              <Form.Item name="crawl_count_rate" label="Đánh giá">
                <Input />
              </Form.Item>
            </Col>
            <Col xs={12} xl={6} className="mb-24">
              <Form.Item name="crawl_deliver" label="Deliver">
                <Input />
              </Form.Item>
            </Col>
            <Col xs={12} xl={6} className="mb-24">
              <Form.Item name="crawl_instock" label="In Stock">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[24, 0]} style={{ width: "100%" }}>
          
            <Col xs={12} xl={6} className="mb-24">
              <Form.Item label="Prime" name="crawl_prime">
                <Select optionlabelprop="label">
                  <Option value="prime" label="prime">
                    <div className="demo-option-label-item">prime</div>
                  </Option>
                  
                </Select>
              </Form.Item>
            </Col>
            <Col xs={12} xl={6} className="mb-24">
              <Form.Item label="Search key" name="crawl_search_key">
                <Select optionlabelprop="label">
                  <Option value="search_key" label="search_key">
                    <div className="demo-option-label-item">search key</div>
                  </Option>
                  <Option value="search_link" label="search link">
                    <div className="demo-option-label-item">search link</div>
                  </Option>
                  
                </Select>
              </Form.Item>
            </Col>

          <Col xs={12} xl={6} className="mb-24">
              <Form.Item name="crawl_price_min" label="Giá min">
                <Input />
              </Form.Item>
            </Col>

            
            <Col xs={12} xl={6} className="mb-24">
              <Form.Item name="crawl_price_max" label="Giá max">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col xs={24} xl={24} className="mb-24">
              <Form.Item name="crawl_link" label="Link crawl">
                <Input.TextArea
                  //value={noteValue}
                  rows={6}
                />
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

/*              Asin = "",
                Price = 0.00,
                Quantity = 0,
                Delivery = 0,
                Star = 0,
                Ratings = 0,
                IsPrime = false,
                Brand = "",
                Title = "",
                Availability = "",
                Icon = "",
                FeatureBullets = "",
                Description = "",
                Details = "",
                GroupAsin = new List<string>(),
                Pictures = new List<string>(),
                Categories = new List<AmazonCategory>() 
*/
