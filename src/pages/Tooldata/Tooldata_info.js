import {
  Button,
  Card,
  Tabs,
  Row,
  Col,
  Form,
  Input,
  DatePicker,
  Select,
  Modal,
  Avatar,
  List,
  InputNumber,
} from "antd";
import * as XLSX from "xlsx";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// gửi dữ liệu lên và nhận về từ Back_end
import { createData, getEmployee } from "../../api/tooldata";
import { showError, showSuccess } from "../../utils";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { createBlog } from "../../api/blog";

// lấy dữ liệu về từ file list
import {
  listselect_ebay_block,
  listselect_ebay_type,
  listselect_ebay_owner,
  listselect_ebay_status,
  listselect_ebay_class,
} from "../Ebay/Ebay_list";
import {
  listselect_processing,
  listselect_plan,
  listInfo,
  listselect_view_field,
} from "./Tooldata_list";

import { list_address } from "./List_address";
import { list_full_name } from "./List_fullname";

import dayjs from "dayjs";
const { Option } = Select;
const Tooldata_info = () => {
  // Khai báo các kho dữ liệu
  const [form] = Form.useForm();
  const [formContent] = Form.useForm();
  const [formExcel] = Form.useForm();
  const { users_function } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const [noteValue, setNoteValue] = useState("");
  const [
    selectList_create_collection,
    setSelectList_create_collection,
  ] = useState(["device"]);

  const [listselect_employee, setList_employee] = useState();

  // hiển thị lại list
  const changeSelectList_create_collection = (values) => {
    setSelectList_create_collection(values);
  };

  const handleChange_list_rowdata = (e) => {
    setNoteValue(e.target.value);
  };
  // Hàm để gửi dữ liệu đi
  const onFinish = async (values) => {
    let newValue = {
      ...values,
      view: values?.view ? values.view.join(",") : "",
      plan: values?.plan ? values.plan.join(",") : "",
      block: values?.block ? values.block.join(",") : "",
      processing: values?.processing ? values.processing.join(",") : "",
      type: values?.type ? values.type.join(",") : "",
      sell_status: values?.sell_status ? values.sell_status.join(",") : "",
      owner: values?.owner ? values.owner.join(",") : "",
      employee: values?.employee ? values.employee.join(",") : "",
      data: noteValue,
    };

    const { data } = createData(newValue, selectList_create_collection);

    showSuccess("Đã chạy");
  };

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

  // Hàm gọi dữ liệu về từ database
  const gettooldata = async () => {
    const res = await getEmployee();
    let data = res.data;
    setList_employee(data);
  };
  //  Những hàm được gọi trong useEffect sẽ được chạy lần đầu khi vào trang
  useEffect(() => {
    gettooldata();
  }, []);

  // Hàm onChange khi click vào 1 item
  const onChange_view = (values) => {
    let view = [
      "device_id",
      "proxy_id",
      "info_id",
      "mail_id",
      "sim_id",
      "bank_id",
      "payoneer_id",
      "paypal_id",
      "pingpong_id",
      "ebay_id",
      "etsy_id",
      "amazon_id",
      "shopee_id",
      "facebook_id",
      "tiktok_id",
    ];
    let plan = [
      "PC",
      "Antidetect",
      "Windows 10",
      "Chrome",
      "USB 4G",
      "Info real",
      "Sim real",
      "Bank real",
      "Quy trình 1",
    ];
    let block = ["Team 1"];
    let processing = ["New"];
    let sell_status = ["Đang thực hiện"];
    let type = ["VN"];
    let owner = ["Phòng sản xuất"];
    form.setFieldsValue({
      class: "Lớp 1",
      view: view,
      plan: plan,
      block: block,
      processing: processing,
      type: type,
      sell_status: sell_status,
      owner: owner,
      status: "Live",
    });
  };

  const onImportExcel = (e) => {
    e.preventDefault();

    var files = e.target.files,
      f = files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
      var data = e.target.result;
      let readedData = XLSX.read(data, { type: "binary" });
      const wsname = readedData.SheetNames[0];
      const ws = readedData.Sheets[wsname];
      const dataParse = XLSX.utils.sheet_to_json(ws, { header: 1 });
      let newData = "";
      dataParse?.map((row) => {
        let text = "";
        row?.map((item) => {
          text = text + item + "|";
        });
        text += "\n";
        newData += text;
      });
      form.setFieldValue("list_rowdata", newData);
    };
    reader.readAsBinaryString(f);
  };
  // tạo random info
  const setGenInfo = () => {
    let Gen_info = noteValue?.toString().split("\n");

    let newNoteValue = "";
    Gen_info.forEach((item) => {
      // Lấy full_name và gender, sau đó tạo CCCD
      let full_list_info =
        list_full_name[Math.floor(Math.random() * (list_full_name.length - 1))];
      let full_name = full_list_info.split("|")[2];
      let gender = full_list_info.split("|")[6];
      // Tạo ngày sinh
      let day = Math.floor(Math.random() * (30 - 1)) + 1;
      let mon = Math.floor(Math.random() * (12 - 1)) + 1;
      let year = Math.floor(Math.random() * (1999 - 1979)) + 1979;
      if (day < 10) {
        day = "0" + day;
      }
      if (mon < 10) {
        mon = "0" + mon;
      }
      let birthday = year + "/" + mon + "/" + day;

      // Tạo địa chỉ
      let index = Math.floor(Math.random() * (list_address.length - 1));
      let full_list_address = list_address[index];
      let street_village = full_list_address.split("|")[2];
      let commune_ward = full_list_address.split("|")[4];
      let district_town = full_list_address.split("|")[6];
      let province_city = full_list_address.split("|")[8];
      let province_city_zipcode = full_list_address.split("|")[9];
      let full_address =
        street_village +
        "- " +
        commune_ward +
        "- " +
        district_town +
        "- " +
        province_city;

      // Tạo CCCD
      let citizen_id = full_list_address.split("|")[10];

      if (gender == "female") {
        citizen_id = citizen_id + "1" + year.toString().slice(2, 4);
        for (let index = 0; index < 6; index++) {
          citizen_id = citizen_id + Math.floor(Math.random() * 10);
        }
      } else {
        citizen_id = citizen_id + "0" + year.toString().slice(2, 4);
        for (let index = 0; index < 6; index++) {
          citizen_id = citizen_id + Math.floor(Math.random() * 10);
        }
      }

      // Tạo địa chỉ
      let full_list_address2 =
        list_address[index + Math.floor(Math.random() * 20)];
      let street_village2 = full_list_address2.split("|")[2];
      let commune_ward2 = full_list_address2.split("|")[4];
      let district_town2 = full_list_address2.split("|")[6];
      let province_city2 = full_list_address2.split("|")[8];
      let province_city_zipcode2 = full_list_address2.split("|")[9];
      let full_address2 =
        street_village2 +
        "- " +
        commune_ward2 +
        "- " +
        district_town2 +
        "- " +
        province_city2;

      // Gép nối dữ liệu phù hợp matbiec.penda.vn
      let upload_info =
        item +
        "|" +
        gender +
        "|" +
        birthday +
        "|" +
        full_name +
        "|" +
        citizen_id +
        "|" +
        citizen_id +
        "|" +
        full_address +
        "|" +
        full_address2 +
        "|" +
        province_city_zipcode2 +
        "\n";

      newNoteValue = newNoteValue + upload_info;
    });
    setNoteValue(newNoteValue);
    form.setFieldValue("list_rowdata", newNoteValue);
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
        <Card title="NHẬP SỐ LIỆU ĐẦU VÀO">
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="TẠO TÀI KHOẢN " key="1">
              <Row gutter={16}>
                <Col span={12}>
                  <Card
                    title="TẠO TÀI KHOẢN :"
                    extra={
                      <>
                        <Button
                          style={{
                            background: "#18a689",
                            color: "white",
                          }}
                          onClick={() => form.submit()}
                        >
                          Hành động
                        </Button>
                      </>
                    }
                  >
                    <Form
                      form={form}
                      name="form-create"
                      onFinish={onFinish}
                      autoComplete="off"
                      size="large"
                    >
                      <Form.Item
                        label="Tạo collection"
                        name="create_collection"
                      >
                        <Select
                          mode="multiple"
                          style={{ width: "100%" }}
                          placeholder="select one item"
                          optionlabelprop="label"
                          size="large"
                          onChange={changeSelectList_create_collection}
                          value={selectList_create_collection}
                        >
                          {listInfo.map((item) => {
                            return (
                              <Option
                                value={item.title.toLocaleLowerCase()}
                                label={item.title}
                              >
                                <div className="demo-option-label-item">
                                  {item.title}
                                </div>
                              </Option>
                            );
                          })}
                        </Select>
                      </Form.Item>

                      <Form.Item label="List view *" name="view">
                        <Select
                          mode="multiple"
                          style={{ width: "100%" }}
                          placeholder="select one item"
                          optionlabelprop="label"
                          size="large"
                        >
                          {listselect_view_field.map((item) => {
                            return (
                              <Option value={item.value} label={item.value}>
                                <div className="demo-option-label-item">
                                  {item.value}
                                </div>
                              </Option>
                            );
                          })}
                        </Select>
                      </Form.Item>

                      <Form.Item label="Quy trình *" name="plan">
                        <Select
                          mode="multiple"
                          style={{ width: "100%" }}
                          placeholder="select one item"
                          optionlabelprop="label"
                          size="large"
                          classNamePrefix="select"
                        >
                          {listselect_plan.map((item, index) => {
                            return (
                              <Option value={item} label={item} key={index}>
                                <div className="demo-option-label-item">
                                  {item}
                                </div>
                              </Option>
                            );
                          })}
                        </Select>
                      </Form.Item>

                      <Form.Item label="Block *" name="block">
                        <Select
                          mode="multiple"
                          style={{ width: "100%" }}
                          placeholder="select one item"
                          optionlabelprop="label"
                          size="large"
                          classNamePrefix="select"
                        >
                          {listselect_ebay_block.map((item, index) => {
                            return (
                              <Option value={item} label={item} key={index}>
                                <div className="demo-option-label-item">
                                  {item}
                                </div>
                              </Option>
                            );
                          })}
                        </Select>
                      </Form.Item>

                      <Form.Item label="Tiến trình" name="processing">
                        <Select
                          mode="multiple"
                          style={{ width: "100%" }}
                          placeholder="select one item"
                          optionlabelprop="label"
                          size="large"
                        >
                          { 
                          
                          listselect_processing.map((item, index) => {
                            return (
                              <Option value={item} label={item} key={index}>
                                <div className="demo-option-label-item">
                                  {item}
                                </div>
                              </Option>
                            );
                          })}
                        </Select>
                      </Form.Item>

                      <Form.Item label="Loại item *" name="type">
                        <Select
                          mode="multiple"
                          style={{ width: "100%" }}
                          placeholder="select one item"
                          optionlabelprop="label"
                          size="large"
                        >
                          {listselect_ebay_type.map((item, index) => {
                            return (
                              <Option value={item} label={item} key={index}>
                                <div className="demo-option-label-item">
                                  {item}
                                </div>
                              </Option>
                            );
                          })}
                        </Select>
                      </Form.Item>

                      <Form.Item label="TT Bán" name="sell_status">
                        <Select
                          mode="multiple"
                          style={{ width: "100%" }}
                          placeholder="select one item"
                          optionlabelprop="label"
                          size="large"
                          onChange={onChange_view}
                        >
                          <Option value="Đang thực hiện" label="Đang thực hiện">
                            <div className="demo-option-label-item">
                              Đang thực hiện
                            </div>
                          </Option>
                        </Select>
                      </Form.Item>

                      <Form.Item label="Sở hữu *" name="owner">
                        <Select
                          mode="multiple"
                          style={{ width: "100%" }}
                          placeholder="select one item"
                          optionlabelprop="label"
                          size="large"
                        >
                          {listselect_ebay_owner.map((item, index) => {
                            return (
                              <Option value={item} label={item} key={index}>
                                <div className="demo-option-label-item">
                                  {item}
                                </div>
                              </Option>
                            );
                          })}
                        </Select>
                      </Form.Item>

                      <Form.Item label="Nhân viên *" name="employee">
                        <Select
                          mode="multiple"
                          style={{ width: "100%" }}
                          placeholder="select one item"
                          optionlabelprop="label"
                          size="large"
                        >
                          {listselect_employee?.map((item) => {
                            return (
                              <Option value={item} label={item}>
                                <div className="demo-option-label-item">
                                  {item}
                                </div>
                              </Option>
                            );
                          })}
                        </Select>
                      </Form.Item>

                      <Row gutter={16}>
                        <Col span={8}>
                          <Form.Item label="Trạng thái *" name="status">
                            <Select
                              //mode="multiple"
                              style={{ width: "100%" }}
                              optionlabelprop="label"
                              size="large"
                            >
                              {listselect_ebay_status.map((item, index) => {
                                return (
                                  <Option value={item} label={item} key={index}>
                                    <div className="demo-option-label-item">
                                      {item}
                                    </div>
                                  </Option>
                                );
                              })}
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col span={8}>
                          <Form.Item label="Lớp ebay *" name="class">
                            <Select
                              //mode="multiple"
                              style={{ width: "100%" }}
                              optionlabelprop="label"
                              size="large"
                            >
                              {listselect_ebay_class.map((item, index) => {
                                return (
                                  <Option
                                    value={item.value}
                                    label={item.title}
                                    key={index}
                                  >
                                    <div className="demo-option-label-item">
                                      {item.title}
                                    </div>
                                  </Option>
                                );
                              })}
                            </Select>
                          </Form.Item>
                        </Col>
                      </Row>
                    </Form>
                  </Card>
                </Col>
                <Col span={12}>
                  <Card
                    title="NHẬP DỮ LIỆU"
                    extra={
                      <>
                        <Button onClick={() => setOpen(true)}>Nhập</Button>
                        <Button onClick={() => setGenInfo()}>Gen Info</Button>
                      </>
                    }
                  >
                    <Form
                      form={form}
                      name="form-create"
                      onFinish={onFinish}
                      autoComplete="off"
                    >
                      <Form.Item label="List data" name="list_rowdata">
                        <Input.TextArea
                          value={noteValue}
                          placeholder="Etsy id|Etsy User|Etsy Pass|Etsy chi tiết|Etsy limit|Etsy items|Etsy Sold|Etsy Fb"
                          onChange={handleChange_list_rowdata}
                          rows={15}
                        ></Input.TextArea>
                      </Form.Item>
                    </Form>
                  </Card>
                </Col>
              </Row>
            </Tabs.TabPane>
            <Tabs.TabPane tab="TẠO BÀI VIẾT" key="2">
              <Card
                title="Blog"
                extra={
                  <Button onClick={() => formContent.submit()}>
                    Tạo bài viết
                  </Button>
                }
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
                          {listselect_employee?.map((item) => {
                            return (
                              <Option value={item} label={item}>
                                <div className="demo-option-label-item">
                                  {item}
                                </div>
                              </Option>
                            );
                          })}
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
                            <div className="demo-option-label-item">
                              company
                            </div>
                          </Option>
                          <Option value="process_class" label="Quy trình">
                            <div className="demo-option-label-item">
                              Quy trình
                            </div>
                          </Option>
                          <Option value="science_class" label="Kiến thức">
                            <div className="demo-option-label-item">
                              Kiến thức
                            </div>
                          </Option>
                          <Option value="train_class" label="Đào tạo">
                            <div className="demo-option-label-item">
                              Đào tạo
                            </div>
                          </Option>
                          <Option value="recruit_class" label="Tuyển dụng">
                            <div className="demo-option-label-item">
                              Tuyển dụng
                            </div>
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
                            <div className="demo-option-label-item">
                              Bài báo
                            </div>
                          </Option>
                          <Option value="Quy trình" label="Quy trình">
                            <div className="demo-option-label-item">
                              Quy trình
                            </div>
                          </Option>
                          <Option value="Quy định" label="Quy định">
                            <div className="demo-option-label-item">
                              Quy định
                            </div>
                          </Option>
                          <Option value="Kiến thức" label="Kiến thức">
                            <div className="demo-option-label-item">
                              Kiến thức
                            </div>
                          </Option>
                          <Option value="Chức vụ" label="Chức vụ">
                            <div className="demo-option-label-item">
                              Chức vụ
                            </div>
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
                      data="<p>Hello from CKEditor 5!</p>"
                      config={{
                        ckfinder: {
                          uploadUrl: "https://backend.penda.vn/api/files",
                        },
                      }}
                      onChange={(event, editor) => {
                        const data_CKEditor = editor.getData();
                        formContent.setFieldValue(
                          "blog_content",
                          data_CKEditor
                        );
                      }}
                    />
                  </Form.Item>
                </Form>
              </Card>
            </Tabs.TabPane>
            <Tabs.TabPane tab="XỬ LÝ ẢNH" key="3"></Tabs.TabPane>
            <Tabs.TabPane tab="HƯỚNG DẪN" key="4">
              <p>
                VD1: Tạo mới mỗi loại 100 tài khoản và liên kết các tài khoản
                với nhau:
              </p>
              <p>
                <strong>
                  Bước 1: Tạo liên kết các loại tài khoản với nhau
                </strong>
              </p>
              <p>
                - Chọn Tạo collection : CREATE, Sau đó muốn tạo tài khoản nào
                thì chọn tài khoản đó (VD DEVICE,PROXY,...,TIKTOK)
              </p>
              <p>
                - Điền vào list data mã id theo dòng (VD E_1,E_2,E_3,...,E_100)
              </p>
              <p>- Chọn TT bán: Tự động điền các trường còn lại</p>
              <p>
                - Ấn nút tạo tài khoản , sau đó vào từng thư mục tài khoản để
                kiểm tra tài khoản đó được tạo ra ở Lớp 1
              </p>
              <br></br>
              <p>
                <strong>
                  Bước 2: Update dữ liệu vào từng loại tài khoản (VD ETSY)
                </strong>
              </p>
              <p>
                - Chọn Tạo collection: UPDATE:Sau đó muốn update tài khoản nào
                thì chọn tài khoản đó(VD ETSY)
              </p>
              <p>- Điền các trường khác theo mong muốn</p>
              <p>
                - Điền list data: Mỗi dòng là 1 tài khoản tương ứng. Cấu trúc
                của mỗi dòng (VD: Etsy_id|Etsy User|Etsy Pass|Etsy chi tiết|Etsy
                limit|Etsy items|Etsy Sold|Etsy Fb) , thứ tự tương ứng theo
                trình tự input từ trái qua phải, từ trên xuống dưới
              </p>

              <p>
                - Ấn nút tạo tài khoản , sau đó vào từng thư mục tài khoản để
                kiểm tra tài khoản đó đã update thông tin chuẩn chưa
              </p>
              <br></br>
              <p></p>
            </Tabs.TabPane>
          </Tabs>
        </Card>
      ) : null}
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        title="Nhập giá trị hàng, cột"
      >
        <Form form={formExcel}>
          <Form.Item name="ky_tu">
            <Input placeholder="Ký tự ( |, B, C, F)" />
          </Form.Item>
          <Form.Item name="col">
            <Input placeholder="Số cột ( A, B, C, F)" />
          </Form.Item>
          <Form.Item name="row">
            <Input placeholder="Số hàng ( 1, 2, 5, 8)" />
          </Form.Item>
          <input
            type="file"
            name="excel_file"
            accept=".xlsx, .xls"
            onChange={onImportExcel}
          />
        </Form>
      </Modal>
    </div>
  );
};

export default Tooldata_info;
