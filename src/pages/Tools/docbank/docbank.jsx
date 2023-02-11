import './docbank.css'
import { Button, Col, Form, Input, Row, Space } from 'antd'
import { createRef, useState } from 'react';
import dau from './assets/dau.png';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useScreenshot, createFileName } from "use-react-screenshot";

function App() {
  const ref = createRef(null);
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  })
  const [image, takeScreenShot] = useScreenshot({
    type: "image/jpeg",
    quality: 1.0
  });
  console.log(image);
  const [values, setValues] = useState([]);
  const [data, setData] = useState({
    chi_nhanh: "215 NHTM DT&PTVN-CN CAU GIAY",
    stk: "2151000000000",
    ten_tk: "NGUYEN VAN A",
    tu_ngay: "01/08/22",
    den_ngay: "22/11/22",
    ngay: "22/11/2022",
    gio: "10:03:13",
    so_du_dau: "10000000"
  });
  const download = (image, { name = data.ten_tk, extension = "jpg" } = {}) => {
    const a = document.createElement("a");
    a.href = image;
    a.download = createFileName(extension, name);
    a.click();
  };
  const onFinish = (values) => {

    setValues(values.row)
  };

  const handleFinish = (values) => {
    setData(values)
  }

  const handleDownload = () => {
    takeScreenShot(ref.current).then(download);
  }

  const renderPhatSinhNo = () => {
    if (values.length > 0) {
      let count = 0;
      values?.map((item) => {
        count += parseInt(item.phat_sinh_no ?? 0);
      })
      return count?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ".00" ?? "0".replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ".00";
    } else {
      return "0".replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ".00";
    }
  }

  const renderPhatSinhCo = () => {
    if (values.length > 0) {
      let count = 0;
      values?.map((item) => {
        count += parseInt(item.phat_sinh_co ?? 0);
      })
      return count?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ".00" ?? "0".replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ".00";
    } else {
      return "0".replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ".00";
    }
  }

  const renderTong = () => {
    if (values.length > 0) {
      let so_du = 0;
      values?.map((item) => {
        so_du += parseInt(item.so_du) ?? 0;
      })
      
      return (parseInt(data.so_du_dau) - parseInt(so_du))?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ".00" ?? "0".replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ".00";
    } else {
      return "0".replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ".00";
    }
  }

  return (
    <div>
      <Form onFinish={handleFinish}>
        <Row gutter={16}>
          <Col span={6}>
            <Form.Item 
              name="chi_nhanh"
            >
              <Input placeholder="Chi nhánh" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
            
              name="stk"
            >
              <Input placeholder="Số tài khoản" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name="ten_tk"
            >
              <Input placeholder="Tên tài khoản" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name="so_du_dau"
            >
              <Input placeholder="Số dư đầu" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={6}>
            <Form.Item
              name="tu_ngay"
            >
              <Input placeholder="Từ ngày" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name="den_ngay"
            >
              <Input placeholder="Đến ngày" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name="ngay"
            >
              <Input placeholder="Ngày" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name="gio"
            >
              <Input placeholder="Giờ" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button type="default" htmlType="submit">
            Thêm thông tin
          </Button>
        </Form.Item>
      </Form>
      <Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
        <Form.List name="row">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                  <Form.Item
                    {...restField}
                    name={[name, 'ngay']}
                  >
                    <Input placeholder="Ngày" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'ma_gd']}
                  >
                    <Input placeholder="Mã giao dịch" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'so_sec']}
                  >
                    <Input placeholder="Số séc" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'phat_sinh_no']}
                  >
                    <Input placeholder="Phát sinh nợ" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'phat_sinh_co']}
                  >
                    <Input placeholder="Phát sinh có" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'so_du']}
                  >
                    <Input placeholder="Số dư" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'dien_giai']}
                  >
                    <Input placeholder="Diễn giải" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  Thêm hàng
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item>
          <Button htmlType="submit">
            Xem trước
          </Button>
          <Button type="primary" onClick={handleDownload}>
            Lưu lại
          </Button>
        </Form.Item>
      </Form>
      <div className='preview' ref={ref}>
        <div className='head'>
          <Row gutter={16}>
            <Col span={8}>
              <div className='title'>
                <p>NGAN HANG TMCP DT&PT VIET NAM</p>
                <p>CHI NHANH: {data.chi_nhanh}</p>
              </div>
            </Col>
            <Col span={8}><div className='title'>
              <p>SAO KE TAI KHOAN NGAN HANG</p>
              <p>TK SO: {data.stk} LOAI NGOAI TE: VND</p>
              <p>TEN TK: {data.ten_tk}</p>
              <p>TU NGAY: {data.tu_ngay} DEN: {data.den_ngay}</p>
            </div></Col>
            <Col span={8}><div className='title'>
              <p>TRANG: 1</p>
              <p>NGAY: {data.ngay}</p>
              <p>GIO: {data.gio}</p>
            </div></Col>
          </Row>
        </div>
        <div style={{ margin: "40px 0" }}></div>

        <div className="content">
          <table id="table-preview">
            <tr>
              <td>NGAY</td>
              <td>MA GD</td>
              <td>SO SEC</td>
              <td>PHAT SINH NO</td>
              <td>PHAT SINH CO</td>
              <td>SO DU</td>
              <td>DIEN GIAI</td>
            </tr>
            <tr>
              <td>---------</td>
              <td>----------</td>
              <td>-----------</td>
              <td>---------</td>
              <td>-----------</td>
              <td>---------</td>
              <td>---------</td>
            </tr>
            <tr>
              <td></td>
              <td>SD DAU</td>
              <td></td>
              <td></td>
              <td></td>
              <td>{data?.so_du_dau ? data.so_du_dau.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ".00" : "0.00"}</td>
              <td></td>
            </tr>
            {
              values.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item?.ngay ?? ""}</td>
                    <td>{item?.ma_gd ?? ""}</td>
                    <td>{item?.so_sec ?? ""}</td>
                    <td>{item?.phat_sinh_no ? item.phat_sinh_no.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ".00" : ""}</td>
                    <td>{item?.phat_sinh_co ? item.phat_sinh_co.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ".00" : ""}</td>
                    <td>{item?.so_du ? item.so_du.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ".00" : ""}</td>
                    <td>{item?.dien_giai ?? ""}</td>
                  </tr>
                )
              })
            }
            <tr>
              <td></td>
              <td>TONG</td>
              <td></td>
              <td>{renderPhatSinhNo()}</td>
              <td>{renderPhatSinhCo()}</td>
              <td></td>
              <td></td></tr>
            <tr>
              <td></td>
              <td>SO DU CUOI</td>
              <td></td>
              <td></td>
              <td></td>
              <td>{renderTong()}</td>
              <td></td>
            </tr>
          </table>
        </div>

        <div className='foot'>
          <img src={dau} />
        </div>
      </div>
    </div>
  )
}

export default App
