import './testing.css';
import { Button, Col, Form, Input, Row, Space, Radio, Select } from 'antd';
import { createRef, useState } from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { createFileName } from "use-react-screenshot";
import backgroundTemplate from './assets/bank-template.jpg';
import backgroundTemplate1 from './assets/bank-template1.jpg';

import dau_tpbank from './assets/dau-tpbank.png';
import dau_tm from './assets/dau-tm.png';

import { Rnd } from "react-rnd";
import * as htmlToImage from "html-to-image";

function App() {
  const [noHoacCo, setNoHoacCo] = useState(false);
  const [anhnen, setAnhNen] = useState(backgroundTemplate);
  const [condau, setCondau] = useState(dau_tm);
  const chiNhanh = [
    {
      value: "215 NHTM DT&PTVN-CN CAU GIAY",
      label: "215 NHTM DT&PTVN-CN CAU GIAY",
    },
    {
      value: "215 NHTM DT&PTVN-CN CAU GIAY Test",
      label: "215 NHTM DT&PTVN-CN CAU GIAY Test",
    },
    {
      value: "215 NHTM DT&PTVN-CN CAU GIAY test",
      label: "215 NHTM DT&PTVN-CN CAU GIAY test",
    },
  ];

  const stk = [
    {
      value: "2151000000000",
      label: "2151000000000",
    },
    {
      value: "2151000009999",
      label: "2151000009999",
    },
    {
      value: "2151000008888",
      label: "2151000008888",
    },
  ];

  const tenTk = [
    {
      value: "NGUYEN VAN A",
      label: "NGUYEN VAN A",
    },
    {
      value: "NGUYEN VAN B",
      label: "NGUYEN VAN B",
    },
    {
      value: "NGUYEN VAN C",
      label: "NGUYEN VAN C",
    },
  ];

  const anhnens = [
    {
      value: backgroundTemplate,
      label: "Ảnh nền 1",
    },
    {
      value: backgroundTemplate1,
      label: "Ảnh nền 2",
    }
  ];

  const condaus = [
    {
      value: dau_tm,
      label: "Con dấu 1",
    },
    {
      value: dau_tpbank,
      label: "Con dấu 2",
    }
  ];

  const betweenRandomNumber = (min, max) => {  
    return Math.floor(
      Math.random() * (max - min + 1) + min
    )
  }

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  const ref = createRef(null);

  const [values, setValues] = useState([]);
  const [data, setData] = useState({
    chi_nhanh: chiNhanh[0].label,
    stk: stk[0].label,
    ten_tk: tenTk[0].label,
    tu_ngay: values[0] ? formatDate(values[0].ngay) : "",
    den_ngay: values.length ? formatDate(values[values.length - 1].ngay) : "",
    ngay: formatDate(new Date()),
    gio: new Date().toLocaleTimeString(),
    so_du_dau: betweenRandomNumber(100000, 50000000)
  });

  const handleFinish = (event, name) => {
    const newValue = event.target.value;
    setData({...data, [name]: newValue});
  }

  const download = (image, { name = data.ten_tk, extension = "jpg" } = {}) => {
    const a = document.createElement("a");
    a.href = image;
    a.download = createFileName(extension, name);
    a.click();
  }

  const takeScreenShot = async (node) => {
    const dataURI = await htmlToImage.toJpeg(node);
    return dataURI;
  }

  const downloadScreenshot = () => takeScreenShot(ref.current).then(download);

  const renderPhatSinhNo = () => {
    if (values.length > 0) {
      let count = 0;
      values?.map((item) => {
        count += parseInt(item.ps_n ?? 0);
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
        count += parseInt(item.ps_c ?? 0);
      })
      return count?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ".00" ?? "0".replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ".00";
    } else {
      return "0".replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ".00";
    }
  }

  const handleInsertInput = (event) => {
    const input = document.createElement("input");
    input.value = `${event.clientX}, ${event.clientY}`;
    input.setAttribute("style", `top: ${event.nativeEvent.layerY}px; left: ${event.nativeEvent.layerX}px;`);
    document.getElementById("result-form").appendChild(input);
  }

  const handleChangeBackground = (value) => {
    setAnhNen(value);
  }

  const handleChangeMark = (value) => {
    setCondau(value);
  }

  const handleBGSize = (values, name) => {
    const div = document.getElementById("result-form");
    if(name.includes("width")) {
      div.style.width = `${values.target.value}px`;
    } else {
      div.style.height = `${values.target.value}px`
    }
  }

  const handleTextSize = (values) => {
    const div = document.getElementById("result-form");
    const title = document.querySelectorAll(".doc-title > p");
    div.style.fontSize = `${values.target.value}px`;
    title.forEach(tt => tt.style.fontSize = `${values.target.value}px`);
  }

  console.log(data);

  const randomDateByDayPlus = (startDate) => {
    const returnDate = startDate;
    returnDate.setDate(startDate.getDate() + betweenRandomNumber(1,9));
    return returnDate;
  }

  const formatNumber = (number) => {
    const formatter = Intl.NumberFormat('en-US');
    return formatter.format(number) + ".00";
  }

  const createNewRow = (ngay, ma_gd, so_sec, ps_n, ps_c, sodu, diengiai) => {
    return {
      ngay: ngay,
      ma_gd: ma_gd,
      so_sec: so_sec,
      ps_n: ps_n,
      ps_c: ps_c,
      sodu: ps_n ? ( sodu ? sodu - ps_n : data.so_du_dau - ps_n) : ps_c ? (sodu ? sodu + ps_c : data.so_du_dau + ps_c ) : (sodu ? sodu : data.so_du_dau),
      diengiai: diengiai
    }
  }

  const handleAddRow = (fields, add) => {
    if(fields.length == 0) {
      const sixMonthsago = new Date(`${new Date().getMonth()}/${new Date().getDate()}/${new Date().getFullYear()}`);
      sixMonthsago.setMonth(sixMonthsago.getMonth() - 5);
      sixMonthsago.setDate(sixMonthsago.getDate() - betweenRandomNumber(1,9));
      const newRow = createNewRow(sixMonthsago, Math.floor(1000 + Math.random() * 9000), null, noHoacCo === false ? betweenRandomNumber(50000, 1000000) : null, noHoacCo === true ? betweenRandomNumber(50000, 1000000) : null, null, "nothing");
      setValues((values) => ([...values, newRow]));
    } else {
      const newDate = new Date(values[values.length - 1].ngay);
      const soduCuoi = values[values.length - 1].sodu;
      const newRow = createNewRow(randomDateByDayPlus(newDate), Math.floor(1000 + Math.random() * 9000), null, noHoacCo === false ? betweenRandomNumber(50000, 1000000) : null, noHoacCo === true ? betweenRandomNumber(50000, 1000000) : null, soduCuoi, "nothing");
      setValues((values) => ([...values, newRow]));
    }
    add();
  }

  const handleRemoveRow = (key) => {
    const newValues = values.filter((s,i)=>(i != key));
    setValues(newValues);
  }

  const onNoHoacCoChange = (e) => {
    setNoHoacCo(e.target.value);
  };

  const onGDChange = (event, key, name) => {
    const newValue = event.target.value;
    setValues(values.map((x, id) => {
      if(id != key) return x
      return {...x, [name]: newValue}
    }));
  }

  const handleSelectChange = (value, name) => {
    setData({...data, [name]: value});
  }

  return (
    <div>
        <Row gutter={16} style={{marginBottom: 20}}>
          <Col span={6}>
            <Select
              defaultValue="Chọn chi nhánh"
              style={{ width: 300 }}
              onChange={(value) => handleSelectChange(value, "chi_nhanh")}
              options={chiNhanh}
            />
          </Col>
          <Col span={6}>
            <Select
              defaultValue="Chọn số tài khoản"
              style={{ width: 300 }}
              onChange={(value) => handleSelectChange(value, "stk")}
              options={stk}
            />
          </Col>
          <Col span={6}>
            <Select
              defaultValue="Chọn tên chủ khoản"
              style={{ width: 300 }}
              onChange={(value) => handleSelectChange(value, "ten_tk")}
              options={tenTk}
            />
          </Col>
        </Row>
        <Form>
        <Row gutter={16}>
          <Col span={6}>
            <Form.Item
              name="ngay"
            >
              <Input placeholder="Ngày" defaultValue={data.ngay ? data.ngay : ""} onChange={(event) => handleFinish(event, "ngay")}/>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name="gio"
            >
              <Input placeholder="Giờ" defaultValue={data.gio ? data.gio : ""} onChange={(event) => handleFinish(event, "gio")}/>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button type="default" htmlType="submit">
            Thêm thông tin
          </Button>
        </Form.Item>
      </Form>
      <Form name="dynamic_form_nest_item" autoComplete="off" fields={values}>
        <Form.List name="row">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                  <Form.Item {...restField} name={[name, 'ngay']}>
                    <Input placeholder="Ngày" onChange={(event) => onGDChange(event, name, "ngay")} defaultValue={values[name].ngay.toLocaleDateString()}/>
                  </Form.Item>
                  <Form.Item {...restField} name={[name, 'ma_gd']}>
                    <Input placeholder="Mã giao dịch" onChange={(event) => onGDChange(event, name, "ma_gd")} defaultValue={values[name].ma_gd}/>
                  </Form.Item>
                  <Form.Item {...restField} name={[name, 'so_sec']}>
                    <Input placeholder="Số séc" onChange={(event) => onGDChange(event, name, 'so_sec')} defaultValue={values[name].so_sec}/>
                  </Form.Item>
                  <Form.Item {...restField} name={[name, 'ps_n']}>
                    <Input placeholder="Phát sinh nợ" disabled onChange={(event) => onGDChange(event, name, 'ps_n')} defaultValue={values[name].ps_n}/>
                  </Form.Item>
                  <Form.Item {...restField} name={[name, 'ps_c']}>
                    <Input placeholder="Phát sinh có" disabled onChange={(event) => onGDChange(event, name, 'ps_c')} defaultValue={values[name].ps_c}/>
                  </Form.Item>
                  <Form.Item {...restField} name={[name, 'sodu']}>
                    <Input placeholder="Số dư" disabled onChange={(event) => onGDChange(event, name, 'sodu')} defaultValue={values[name].sodu}/>
                  </Form.Item>
                  <Form.Item {...restField} name={[name, 'diengiai']}>
                    <Input placeholder="Diễn giải" onChange={(event) => onGDChange(event, name, 'diengiai')} defaultValue={values[name].diengiai}/>
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => {remove(name); handleRemoveRow(name)}} />
                </Space>
              ))}
              
              <Row gutter={16}>
              <Col span={6}>
                <Form.Item>
                  <Button type="dashed" onClick={() => handleAddRow(fields, add)} block icon={<PlusOutlined />}>
                    Thêm hàng
                  </Button>
                </Form.Item>
              </Col>
              <Col span={6}>
              <Form.Item>
                <Radio.Group onChange={onNoHoacCoChange} value={noHoacCo}>
                  <Radio value={false}>Phát sinh nợ</Radio>
                  <Radio value={true}>Phát sinh có</Radio>
                </Radio.Group>
              </Form.Item>
              </Col>
            </Row>
            </>
          )}
        </Form.List>
        <Form.Item>
          <Form>
            <Row gutter={16}>
              <Col span={4}>
                <Form.Item  name="bg-width">
                  <Input placeholder="Chiều rộng của ảnh" onChange={(event) => handleBGSize(event, "width")}/>
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item name="bg-height">
                  <Input placeholder="Chiều dài của ảnh" onChange={(event) => handleBGSize(event, "height")} />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item name="text-size">
                  <Input placeholder="Kích cỡ của chữ" onChange={handleTextSize} />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Select
                  defaultValue="Chọn ảnh nền"
                  style={{ width: 250 }}
                  onChange={handleChangeBackground}
                  options={anhnens}
                />
              </Col>
              <Col span={4}>
                <Select
                  defaultValue="Chọn con dấu"
                  style={{ width: 250 }}
                  onChange = {handleChangeMark}
                  options={condaus}
                />
              </Col>
            </Row>
          </Form>
          {/* <Button onClick={handleChangeBackground} style={{marginRight: "10px"}}>
            Đổi nền
          </Button> */}
          <Button type="primary" onClick={downloadScreenshot} style={{marginRight: "10px"}}>
            Lưu lại
          </Button>
        </Form.Item>
      </Form>
      <div className='result' id="result-form" ref={ref} onDoubleClick={handleInsertInput} style={{background: `url("${anhnen}") round`, width: 1280, height: 800}}>
        <Rnd
          className='dragTable'
          default={{
            x: 100,
            y: 100,
            width: 800,
            height: 600
          }}
        >
          <div className='table-preview'>
            <div className='head'>
              <Row gutter={16}>
                <Col span={8}>
                  <div className='doc-title'>
                    <p>NGAN HANG TMCP DT&PT VIET NAM</p>
                    <p>CHI NHANH: {data.chi_nhanh}</p>
                  </div>
                </Col>
                <Col span={8}><div className='doc-title'>
                  <p>SAO KE TAI KHOAN NGAN HANG</p>
                  <p>TK SO: {data.stk} LOAI NGOAI TE: VND</p>
                  <p>TEN TK: {data.ten_tk}</p>
                  <p>TU NGAY: {values.length ? formatDate(values[0].ngay) : ""} DEN: {values.length ? formatDate(values[values.length-1].ngay) : ""}</p>
                </div></Col>
                <Col span={8}><div className='doc-title'>
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
                  <td>SO DU DAU</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>{formatNumber(data.so_du_dau)}</td>
                  <td></td>
                </tr>
                {
                  values.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{formatDate(item?.ngay) ?? ""}</td>
                        <td>{item?.ma_gd ?? ""}</td>
                        <td>{item?.so_sec ?? ""}</td>
                        <td>{item.ps_n ? formatNumber(item.ps_n) : ""}</td>
                        <td>{item?.ps_c ? formatNumber(item.ps_c) : ""}</td>
                        <td>{item?.sodu ? formatNumber(item.sodu) : ""}</td>
                        <td>{item?.diengiai ?? ""}</td>
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
                  <td>{values.length && values[values.length - 1].sodu ? formatNumber(values[values.length - 1].sodu) : ""}</td>
                  <td></td>
                </tr>
              </table>
            </div>
          </div>
        </Rnd>
        <Rnd
          style={{background: `url("${condau}") round`}}
          className='dragTable'
          default={{
            x: 500,
            y: 500,
            width: 100,
            height: 100
          }}
        >
        </Rnd>
      </div>
    </div>
  )
}

export default App
