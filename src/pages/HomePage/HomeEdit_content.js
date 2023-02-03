import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  Button,
  Card,
  Form,
  Input,
  Avatar,
  Row,
  Col,
  DatePicker,
  Select,
  InputNumber,
} from "antd";
import { updateBlog, detailBlog } from "../../api/blog";
import React, { useEffect, useState } from "react";
import { showError, showSuccess } from "../../utils";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";

const HomeEdit_content = () => {
  // Khai báo các kho dữ liệu
  let { id } = useParams();
  const [projectData, setprojectData] = useState({});
  const [formContent] = Form.useForm();

  const onFinish_content = async (values) => {
    if(values.blog_date == null){
        return showError("Lỗi ngày tháng");
      }

    values.blog_date = dayjs(values.blog_date).format(
        "YYYY-MM-DD"
      );

    const response = await updateBlog({
      values: values,
      id: id,
    });
    if (response.status == 200) {
      showSuccess("Thêm thành công");
    } else {
      showError("Có lỗi rồi");
    }
  };

  // Hàm gọi dữ liệu về từ database
  const getContent = async () => {
    let response = await detailBlog(id);
    let data = response.data;
    const newData = {
        ...data,
        blog_date: data?.blog_date
        ? dayjs(data.blog_date)
        : "",
      };
    
    formContent.setFieldsValue(newData);
    setprojectData(newData);
  };
  //  Những hàm được gọi trong useEffect sẽ được chạy lần đầu khi vào trang
  useEffect(() => {
    getContent();
  }, []);

  return (
    <Card
      title="Blog"
      extra={<Button onClick={() => formContent.submit()}>Lưu bài viết</Button>}
    >
      <Form
        form={formContent}
        onFinish={onFinish_content}
        initialValues={projectData}
      >
        <Row gutter={[24, 0]}>
          <Col xs={24} xl={12} className="mb-24">
            <Form.Item name="blog_title" label="Tiêu đề">
              <Input placeholder="title" maxLength={50} />
            </Form.Item>
          </Col>
          <Col xs={24} xl={12} className="mb-24">
            <Form.Item name="blog_thumbnail" label="Link ảnh">
              <Input placeholder="thumbnail" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[24, 0]}>
          <Col xs={24} xl={12} className="mb-24">
            <Form.Item name="blog_description" label="Miêu tả">
              <Input placeholder="description" maxLength={80} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[24, 0]}>
          <Col xs={12} xl={4} className="mb-24">
            <Form.Item name="blog_date" label="Thời gian">
              <DatePicker
                style={{ float: "right" }}
                format="YYYY-MM-DD"
                defaultValue={dayjs()}
                size="large"
              />
            </Form.Item>
          </Col>
          <Col xs={12} xl={4} className="mb-24">
            <Form.Item name="blog_employee" label="Nhân viên">
              <Select
                style={{ width: "100%" }}
                placeholder="select one item"
                optionlabelprop="label"
                size="large"
              >
                <Option value="Minh Hồng" label="Minh Hồng">
                  <div className="demo-option-label-item">Minh Hồng</div>
                </Option>
                <Option value="Khắc Liêm" label="Khắc Liêm">
                  <div className="demo-option-label-item">Khắc Liêm</div>
                </Option>
                <Option value="Nguyễn Hoài" label="Nguyễn Hoài">
                  <div className="demo-option-label-item">Nguyễn Hoài</div>
                </Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={12} xl={4} className="mb-24">
            <Form.Item name="blog_page" label="Trang hiển thị">
              <Select
                style={{ width: "100%" }}
                placeholder="select one item"
                optionlabelprop="label"
                size="large"
              >
                <Option value="company" label="company">
                  <div className="demo-option-label-item">company</div>
                </Option>
                <Option value="train_class" label="Đào tạo">
                  <div className="demo-option-label-item">Đào tạo</div>
                </Option>
                <Option value="recruit_class" label="Tuyển dụng">
                  <div className="demo-option-label-item">Tuyển dụng</div>
                </Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={6} xl={4} className="mb-24">
            <Form.Item name="blog_star" label="Sao">
              <InputNumber placeholder="title" size="large" />
            </Form.Item>
          </Col>
          <Col xs={6} xl={4} className="mb-24">
            <Form.Item name="blog_sort" label="Vị trí">
              <InputNumber placeholder="title" size="large" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item name="blog_content" label="Bài viết">
          <CKEditor
            editor={ClassicEditor}
            data={projectData.blog_content}
            config={{
              ckfinder: {
                uploadUrl: "http://backend.penda.vn/api/files",
              },
            }}
            onChange={(event, editor) => {
              const data_CKEditor = editor.getData();
              formContent.setFieldValue("blog_content", data_CKEditor);
            }}
          />
        </Form.Item>
      </Form>
    </Card>
  );
};

export default HomeEdit_content;
