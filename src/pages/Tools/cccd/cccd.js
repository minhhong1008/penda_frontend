import "./cccd.css";
import { Button, Col, Form, Input, Row, Select } from "antd";
import "antd/dist/reset.css";
// import thư viện ảnh
import img1 from "./assets/mat_truoc.jpg";
import img2 from "./assets/mat_sau.jpg";
import img3 from "./assets/finger/van-tay-1.png";
import img4 from "./assets/finger/van-tay-2.png";
import nen1 from "./assets/background/nen_1.jpg";
import nen2 from "./assets/background/nen_2.jpg";
import nen3 from "./assets/background/nen_3.jpg";

import { createRef, useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { useScreenshot, createFileName } from "use-react-screenshot";
import dayjs from "dayjs";

function CCCD({ info }) {
  const [form] = Form.useForm();
  const inRef = createRef(null);
  const outRef = createRef(null);



  // set hình nền
  const [background, setBackground] = useState();
  const renderBackground = () => {
    const arr = [nen1, nen2, nen3];
    var rand = arr[Math.floor(Math.random() * arr.length)];
    setBackground(rand);
  };
  // set vân tay
  const [finger1, setFinger1] = useState();
  const renderFinger1 = () => {
    const arr = [img3, img4];
    var rand = arr[Math.floor(Math.random() * arr.length)];
    setFinger1(rand);
  };
  const [finger2, setFinger2] = useState();
  const renderFinger2 = () => {
    const arr = [img3, img4];
    var rand = arr[Math.floor(Math.random() * arr.length)];
    setFinger2(rand);
  };

  const [card, setCard] = useState({
    card_id: "004183886158",
    name: "PHUNG VAN MINH",
    birth_date: "10/05/2000",
    date: "27/04/2021",
    expiry: "10/05/2025",
    id:
      "IDVNM0810028357026081042835<<98105026M4105028VNM<<<<<<<<<<<6CU<<TUAN<<ANH<<<<<<<<<<<<<<<<<",
    identification: "Sẹo chấm cánh mũi trái",
    nationality: "Việt Nam",
    origin: "Cầu Diễn, Bắc Từ Liêm, Hà Nội",
    residence: "Cầu Diễn, Bắc Từ Liêm, Hà Nội",
    gender: "Nam",
    img: "",
  });
  const [image, takeScreenShot] = useScreenshot({
    type: "image/jpeg",
    quality: 1.0,
  });
  const [fileUrl, setFileUrl] = useState("");
  
  const onFinish = (values) => {
    // let expiry = values.expiry.split("/");
    // console.log(expiry);
    // let exp = expiry[1] + "/" + expiry[0] + "/" + expiry[2];
    // values.expiry = exp;
    setCard(values);
  };
  const onFinishFailed = () => {};

  const download = (image, { name = card.name, extension = "jpg" } = {}) => {
    const a = document.createElement("a");
    a.href = image;
    a.download = createFileName(extension, name);
    a.click();
  };

  const handleSave = () => {
    takeScreenShot(inRef.current).then(download);
    takeScreenShot(outRef.current).then(download);
  };

  const readURL = (event) => {
    const file = event.target.files[0];
    if (file) {
      let fileURL = URL.createObjectURL(file);
      setFileUrl(fileURL);
    }
  };

  const renderCartID = () => {
    let arrName = removeVietnameseTones(card.name).split(" ");
    let str3 = "";
    let space = 30 - str3.length - 1;
    let strSpace = "";
    arrName.map((item, index) => {
      if (index == 0) {
        str3 += item + "<<";
      } else {
        str3 += item + "<";
      }
    });
    for (var i = 0; i < space; i++) {
      strSpace += "<";
    }
    let birth_date_array = card.birth_date.split("/");
    let str_birth_date =
      birth_date_array[2]?.slice(2, 4) +
      birth_date_array[1] +
      birth_date_array[0];
    let expiry_array = card.expiry.split("/");
    let str_expiry =
      expiry_array[2]?.slice(2, 4) + expiry_array[1] + expiry_array[0];
    let str =
      "IDVNM" +
      card.card_id?.slice(3) +
      Math.floor(Math.random() * 10) +
      card.card_id +
      "<<" +
      Math.floor(Math.random() * 10) +
      str_birth_date +
      Math.floor(Math.random() * 10) +
      (card.gender == "Nam" ? "M" : "F") +
      str_expiry +
      Math.floor(Math.random() * 10) +
      "VNM<<<<<<<<<<<" +
      Math.floor(Math.random() * 10) +
      str3 +
      strSpace;
    let stringRow1 = [];
    let stringRow2 = [];
    let stringRow3 = [];
    let arr = str.split("");
    arr.map((item, index) => {
      if (index < 30) {
        stringRow1.push(
          <div
            className={
              item == "0"
                ? "string font"
                : item == "<"
                ? "string font font1"
                : "string"
            }
          >
            {item}
          </div>
        );
      } else if (29 < index && index < 60) {
        stringRow2.push(
          <div
            className={
              item == "0"
                ? "string font"
                : item == "<"
                ? "string font font1"
                : "string"
            }
          >
            {item}
          </div>
        );
      } else if (59 < index && index < 90) {
        stringRow3.push(
          <div
            className={
              item == "0"
                ? "string font"
                : item == "<"
                ? "string font font1"
                : "string"
            }
          >
            {item}
          </div>
        );
      }
    });
    return (
      <div className="list-string">
        <div className="row">{stringRow1}</div>
        <div className="row">{stringRow2}</div>
        <div className="row">{stringRow3}</div>
      </div>
    );
  };

  function removeVietnameseTones(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g, " ");
    str = str.trim();
    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    str = str.replace(
      /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
      " "
    );
    return str;
  }
  useEffect(() => {
    let newValue = {
      card_id: info?.info_passport ? info.info_passport : "004183886158",
      name: info?.info_fullname
        ? info.info_fullname.toUpperCase()
        : "PHUNG VAN MINH",
      birth_date: info?.infodate_birthday
        ? info.infodate_birthday
        : "10/05/2000",
      date: info?.infodate_start ? info.infodate_start : "27/04/2021",
      expiry: info?.infodate_expiry ? info.infodate_expiry : "10/05/2025",
      id:
        "IDVNM0810028357026081042835<<98105026M4105028VNM<<<<<<<<<<<6CU<<TUAN<<ANH<<<<<<<<<<<<<<<<<",
      identification: info?.info_identifying
        ? info.info_identifying
        : "Sẹo chấm cánh mũi trái",
      nationality: "Việt Nam",
      origin: info?.info_origin
        ? info.info_origin
        : "Cầu Diễn, Bắc Từ Liêm, Hà Nội",
      residence: info?.info_residence
        ? info.info_residence
        : "Cầu Diễn, Bắc Từ Liêm, Hà Nội",
      gender: info?.info_sex ? info.info_sex : "Nam",
      img: "",
    };
    form.setFieldsValue(newValue);
    setCard(newValue);
  }, []);

  // info_identifying
  useEffect(() => {
    renderBackground();
    renderFinger1();
    renderFinger2();
  }, []);

  return (
    <div className="CCCD">
      <Row gutter={[24, 24]}>
        <Col span={8}>
          <Form
            name="basic"
            form={form}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item label="Ảnh">
              <input type="file" onChange={readURL} />
            </Form.Item>
            <Form.Item
              label="Số CMND"
              name="card_id"
              rules={[{ required: true, message: "Nhập vào số CMND" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Họ và tên"
              name="name"
              rules={[{ required: true, message: "Nhập vào họ và tên" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Ngày sinh"
              name="birth_date"
              rules={[{ required: true, message: "Nhập vào ngày sinh" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Giới tính"
              name="gender"
              rules={[{ required: true, message: "Chọn giới tính" }]}
            >
              <Select>
                <Select.Option value="Nam">Nam</Select.Option>
                <Select.Option value="Nữ">Nữ</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Quê quán"
              name="origin"
              rules={[{ required: true, message: "Nhập vào quê quán" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Nơi thường trú"
              name="residence"
              rules={[
                { required: true, message: "Nhập vào địa chỉ thường trú" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Có giá trị đến"
              name="expiry"
              rules={[{ required: true, message: "Nhập vào hạn của thẻ" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Đặc điểm nhận dạng"
              name="identification"
              rules={[
                { required: true, message: "Nhập vào đặc điểm nhận dạng" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Ngày tạo"
              name="date"
              rules={[{ required: true, message: "Nhập vào ngày tạo thẻ" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button htmlType="submit">Xem trước</Button>
              <Button type="primary" onClick={handleSave}>
                Lưu lại
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col span={16}>
          <br></br>
          <br></br>
          <div
            ref={inRef}
            style={{
              paddingBottom: "80px",
              width: "960px",
              height: "600px",
              backgroundImage: `url(${background})`,
            }}
          >
            <div className="in-preview">
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <div>
                <img
                  alt="test"
                  className="mat_truoc"
                  style={{ width: "680px", height: "400px" }}
                  src={img1}
                ></img>
              </div>
              <div className="card_id">{card.card_id}</div>
              <div className="name">{card.name}</div>
              <div className="birth_date">{card.birth_date}</div>
              <div className="gender">{card.gender}</div>
              <div className="nationality">{"Việt Nam"}</div>
              <div className="origin">{card.origin}</div>
              <div className="residence">{card.residence}</div>
              <div className="expiry">{card.expiry}</div>
              <div className="qr_code">
                <QRCode
                  fillOpacity={0.8}
                  bgColor={"transparent"}
                  size={80}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  value={
                    card.card_id +
                    "||" +
                    removeVietnameseTones(card.name) +
                    "|" +
                    card.birth_date +
                    "|" +
                    removeVietnameseTones(card.gender) +
                    "|" +
                    removeVietnameseTones(card.residence) +
                    "|" +
                    card.date
                  }
                />
              </div>
              <img alt="test" className="avatar" src={fileUrl}></img>
            </div>
          </div>
          <br></br>
          <br></br>
          <br></br>
          <div
            ref={outRef}
            style={{
              paddingBottom: "80px",
              width: "960px",
              height: "600px",
              backgroundImage: `url(${background})`,
            }}
          >
            <div className="out-preview">
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <div>
                <img
                  className="mat_sau"
                  alt="test"
                  style={{ width: "680px", height: "400px" }}
                  src={img2}
                ></img>
              </div>
              <div className="identification">{card.identification}</div>
              <div className="date">{card.date}</div>
              <div className="id">{renderCartID()}</div>
              <div>
                <img alt="test" className="van-tay-1" src={finger1}></img>
              </div>
              <div>
                <img alt="test" className="van-tay-2" src={finger2}></img>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default CCCD;
