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
import { createBlog } from "../../api/blog";
import React from "react";
import { showError, showSuccess } from "../../utils";
import dayjs from "dayjs";
import SunEditor, { buttonList } from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import plugins from 'suneditor/src/plugins'
const { Option } = Select;
const Blog_info = () => {
  const [formContent] = Form.useForm();
  const onFinish_content = async (values) => {
    if (values.blog_date == null) {
      return showError("Lỗi ngày tháng - Nhân viên");
    }
    values.blog_date = dayjs(values.blog_date).format("YYYY-MM-DD");
    const response = await createBlog(values);
    if (response.status == 200) {
      showSuccess("Thêm thành công");
    } else {
      showError("Có lỗi rồi");
    }
  };

  return (
    <Card
      title="Blog"
      extra={<Button onClick={() => formContent.submit()}>Tạo bài viết</Button>}
    >
      <Form
        form={formContent}
        onFinish={onFinish_content}
        initialValues={{
          blog_employee: "Minh Hồng",
          blog_page: "train_class",
          blog_star: "3",
          blog_sort: "1",
          blog_date: dayjs(),
          blog_type: "Bài báo",
        }}
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
                <Option value="target_class" label="Mục tiêu & Kế hoạch">
                  <div className="demo-option-label-item">Mục tiêu & Kế hoạch</div>
                </Option>
                <Option value="process_class" label="Quy trình">
                  <div className="demo-option-label-item">Quy trình</div>
                </Option>
                <Option value="science_class" label="Kiến thức">
                  <div className="demo-option-label-item">Kiến thức</div>
                </Option>
                <Option value="train_class" label="Đào tạo">
                  <div className="demo-option-label-item">Đào tạo</div>
                </Option>
                <Option value="english_class" label="English">
                  <div className="demo-option-label-item">English</div>
                </Option>
                <Option value="recruit_class" label="Tuyển dụng">
                  <div className="demo-option-label-item">Tuyển dụng</div>
                </Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={12} xl={4} className="mb-24">
            <Form.Item name="blog_type" label="Hạng mục">
              <Select
                style={{ width: "100%" }}
                placeholder="select one item"
                optionlabelprop="label"
                size="large"
              >
                <Option value="Bài báo" label="Bài báo">
                  <div className="demo-option-label-item">Bài báo</div>
                </Option>
                <Option value="Mục tiêu" label="Mục tiêu">
                  <div className="demo-option-label-item">Mục tiêu</div>
                </Option>
                <Option value="Kế hoạch" label="Kế hoạch">
                  <div className="demo-option-label-item">Kế hoạch</div>
                </Option>
                <Option value="Quy trình" label="Quy trình">
                  <div className="demo-option-label-item">Quy trình</div>
                </Option>
                <Option value="Quy định" label="Quy định">
                  <div className="demo-option-label-item">Quy định</div>
                </Option>
                <Option value="Kiến thức" label="Kiến thức">
                  <div className="demo-option-label-item">Kiến thức</div>
                </Option>
                <Option value="English" label="English">
                  <div className="demo-option-label-item">English</div>
                </Option>
                <Option value="Chức vụ" label="Chức vụ">
                  <div className="demo-option-label-item">Chức vụ</div>
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
          {/* <CKEditor
            editor={ClassicEditor}
            data="<p>Hello from CKEditor 5!</p>"
            config={{
              ckfinder: {
                uploadUrl: "https://backend.penda.vn/api/files",
              },
            }}
            onChange={(event, editor) => {
              const data_CKEditor = editor.getData();
              formContent.setFieldValue("blog_content", data_CKEditor);
            }}
          /> */}
          <SunEditor 
            lang="en" 
            name="panda-editor" 
            defaultValue="<b>Chào mừng bạn đến với Panda.vn</b>"
            /* defaultStyle= "font-size:22px;" */
            autoFocus={true}
            height="600px"
            setOptions={{
              plugins: plugins,
              buttonList: [
                ['undo', 'redo'],
                ['font', 'fontSize', 'formatBlock'],
                ['paragraphStyle', 'blockquote'],
                ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
                ['fontColor', 'hiliteColor', 'textStyle'],
                ['removeFormat'],
                '/', // đây là ký tự xuống dòng, khi muốn xuống dòng giữa các cụm thanh công cụ, thêm ký tự này vào là trên thanh công cụ các nút sẽ xuống dòng
                ['outdent', 'indent'],
                ['align', 'horizontalRule', 'list', 'lineHeight'],
                ['table', 'link', 'image', 'video', 'audio'],
                ['fullScreen', 'showBlocks', 'codeView'],
                ['preview', 'print'],
                ['save', 'template']
              ]
            }}
            onChange={(content) => {
              console.log(content);
            }}
            />
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Blog_info;
