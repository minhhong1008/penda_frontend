import './cccd.css';
import {
    Col,
    Row,
    Button,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Select,
    Switch,
    Slider
} from 'antd';
import { useState } from 'react';
import { matSaus, matTruocs, fingers } from './assets';
import { useEffect } from 'react';
import { getImageSize } from 'react-image-size';
import html2canvas from 'html2canvas';
import { createFileName } from "use-react-screenshot";
import { Rnd } from "react-rnd";
import * as helpers from '../docbank/helpers/helpers';

const CCCD = () => {
    const [cccdData, setCCCĐata] = useState({
        so: "",
        ten: "",
        ngaySinh: "",
        gioiTinh: "Nam",
        queQuan: "",
        noiThuongTru: "",
        coGiaTriDen: "",
        dacDiemNhanDang: "",
        ngayTao: "",
        idMatSau: "",
        quocTich: "Việt Nam"
    });

    const [matTruoc, setMatTruoc] = useState(matTruocs[0]);
    const [matSau, setMatSau] = useState(matSaus[0]);

    const [kichCoMatTruoc, setKichCoMatTruoc] = useState({
        width: 0,
        height: 0
    });

    const [kichCoMatSau, setKichCoMatSau] = useState({
        width: 0,
        height: 0
    });

    const [matTruocScale, setMatTruocScale] = useState(0.3);
    const [matSauScale, setMatSauScale] = useState(0.3);

    useEffect(() => {
        getImageSize(matTruoc).then(({ width, height }) => {
            const newWidth = width * 0.3;
            const newHeight = height * 0.3;
            setKichCoMatTruoc({ ...kichCoMatTruoc, width: newWidth, height: newHeight });
        });

        getImageSize(matSau).then(({ width, height }) => {
            const newWidth = width * 0.3;
            const newHeight = height * 0.3;
            setKichCoMatSau({ ...kichCoMatSau, width: newWidth, height: newHeight });
        });
    }, []);

    const [form] = Form.useForm();

    const matTruocScaleChange = (value) => {
        if (isNaN(value)) {
            return;
        }
        setMatTruocScale(value);
        getImageSize(matTruoc).then(({ width, height }) => {
            const newWidth = width * value;
            const newHeight = height * value;
            setKichCoMatTruoc({ ...kichCoMatTruoc, width: newWidth, height: newHeight });
        });
    };

    const matSauScaleChange = (value) => {
        if (isNaN(value)) {
            return;
        }
        setMatSauScale(value);
        getImageSize(matSau).then(({ width, height }) => {
            const newWidth = width * value;
            const newHeight = height * value;
            setKichCoMatSau({ ...kichCoMatSau, width: newWidth, height: newHeight });
        });
    };

    const download = (image, { name = cccdData.ten, extension = "jpg" } = {}) => {
        const a = document.createElement("a");
        a.href = image.toDataURL("image/png;base64");
        a.download = createFileName(extension, name);
        a.click();
    }

    const downloadScreenshot = () => {
        html2canvas(document.getElementById("mat-truoc")).then((canvas) => {
            download(canvas);
        });
        html2canvas(document.getElementById("mat-sau")).then((canvas) => {
            download(canvas);
        });
    }

    const hoanThanh = (values) => {
        const newValues = values;
        newValues.ngayGD = newValues.ngaySinh?.toString();
        newValues.gioGD = newValues.coGiaTriDen?.toString();
        newValues.tuNgay = newValues.ngayTao.toString();
        newValues.gioiTinh = newValues.gioiTinh ? "Nữ" : "Nam";
        setCCCĐata(newValues);
        console.log(cccdData);
    }

    return (
        <div>
            <div style={{ marginBottom: "20px" }}>
                <Select placeholder="Chọn mặt trước CCCD" size='large' style={{ marginRight: "20px" }}>
                    {matTruocs.map(item =>
                    (
                        <Select.Option value={item}>{item.replace("/static/media/", "").replace(/\..+$/, "")}</Select.Option>
                    )
                    )}
                </Select>
                <Select placeholder="Chọn mặt sau CCCD" size='large'>
                    {matSaus.map(item =>
                    (
                        <Select.Option value={item}>{item.replace("/static/media/", "").replace(/\..+$/, "")}</Select.Option>
                    )
                    )}
                </Select>
            </div>

            <Row gutter={16}>
                <Col className="gutter-row" span={8}>
                    <Form
                        onFinish={hoanThanh}
                        form={form}
                        labelCol={{
                            span: 4,
                        }}
                        wrapperCol={{
                            span: 14,
                        }}
                        layout="horizontal"
                        style={{
                            maxWidth: 600,
                        }}
                    >
                        <Form.Item name={["so"]} label="Số CCCD" initialValue={""}>
                            <Input defaultValue={""} />
                        </Form.Item>
                        <Form.Item name={["ten"]} label="Họ và tên" initialValue={""}>
                            <Input defaultValue={""} />
                        </Form.Item>
                        <Form.Item name={["ngaySinh"]} label="Ngày sinh" initialValue={""}>
                            <DatePicker size='large' style={{ width: "100%" }} />
                        </Form.Item>
                        <Form.Item label="Giới tính" name={["gioiTinh"]} valuePropName="checked" initialValue={false}>
                            <Switch checkedChildren="Nữ" unCheckedChildren="Nam" defaultChecked={false} checked={false} />
                        </Form.Item>
                        <Form.Item name={["queQuan"]} label="Quê quán" initialValue={""}>
                            <Input defaultValue={""} />
                        </Form.Item>
                        <Form.Item name={["noiThuongTru"]} label="Nơi thường trú" initialValue={""}>
                            <Input defaultValue={""} />
                        </Form.Item>
                        <Form.Item name={["coGiaTriDen"]} label="Có giá trị đến" initialValue={""}>
                            <DatePicker size='large' style={{ width: "100%" }} />
                        </Form.Item>
                        <Form.Item name={["dacDiemNhanDang"]} label="Đđ nhận dạng" initialValue={""}>
                            <Input defaultValue={""} />
                        </Form.Item>
                        <Form.Item name={["ngayTao"]} label="Ngày tạo" initialValue={""}>
                            <DatePicker size='large' style={{ width: "100%" }} />
                        </Form.Item>
                        <Form.Item name={["idMatSau"]} label="ID phía mặt sau" initialValue={""}>
                            <Input defaultValue={""} />
                        </Form.Item>
                        <Form.Item>
                            <Button type='primary' htmlType='submit'>Hoàn thành</Button>
                        </Form.Item>
                        <Form.Item>
                            <Button type='primary' onClick={downloadScreenshot}>Lưu lại</Button>
                        </Form.Item>
                    </Form>
                </Col>
                <Col className="gutter-row" span={16}>
                    <Row style={{ marginBottom: "20px" }}>
                        <Col span={6}>
                            <div style={{
                                fontWeight: "bolder",
                                margin: "5px 10px"

                            }}>
                                Thay đổi kích cỡ mặt trước bằng cách kéo thanh trượt
                            </div>
                        </Col>
                        <Col span={12}>
                            <Slider
                                min={0}
                                max={3}
                                onChange={matTruocScaleChange}
                                value={typeof matTruocScale === 'number' ? matTruocScale : 1}
                                step={0.1}
                            />
                        </Col>
                        <Col span={4}>
                            <InputNumber
                                min={0}
                                max={3}
                                style={{
                                    margin: '0 16px',
                                }}
                                step={0.1}
                                value={matTruocScale}
                                onChange={matTruocScaleChange}
                            />
                        </Col>
                    </Row>
                    <div id='mat-truoc' style={{
                        width: kichCoMatTruoc.width,
                        height: kichCoMatTruoc.height,
                        background: `url("${matTruoc}") 0% 0% / contain no-repeat`
                    }}>
                        <Rnd
                            bounds="parent"
                            className='dragTable'
                            style={{ fontWeight: "bolder" }}
                            default={{
                                width: 100,
                                height: 50,
                                x: 0,
                                y: 0
                            }}
                        >
                            <svg viewBox="0 0 20 20" className='dynamic-text'>
                                <g requiredFeatures="http://www.w3.org/Graphics/SVG/feature/1.2/#TextFlow">
                                    <text x="50%" style={{ fill: "black" }} y="14" textAnchor="middle">{cccdData.so}</text>
                                </g>

                            </svg>
                        </Rnd>
                        <Rnd
                            bounds="parent"
                            className='dragTable'
                            default={{
                                width: 100,
                                height: 50,
                                x: 0,
                                y: 0
                            }}
                        >
                            <svg viewBox="0 0 20 20" className='dynamic-text'>
                                <text x="50%" style={{ fill: "black" }} y="14" textAnchor="middle">{cccdData.ten}</text>
                            </svg>
                        </Rnd>
                        <Rnd
                            bounds="parent"
                            className='dragTable'
                            default={{
                                width: 100,
                                height: 50,
                                x: 0,
                                y: 0
                            }}
                        >
                            <svg viewBox="0 0 20 20" className='dynamic-text'>
                                <text x="50%" style={{ fill: "black" }} y="14" textAnchor="middle">{helpers.formatDate(cccdData.ngaySinh)}</text>
                            </svg>
                        </Rnd>
                        <Rnd
                            bounds="parent"
                            className='dragTable'
                            default={{
                                width: 100,
                                height: 50,
                                x: 0,
                                y: 0
                            }}
                        >
                            <svg viewBox="0 0 20 20" className='dynamic-text'>
                                <text x="50%" style={{ fill: "black" }} y="14" textAnchor="middle">{cccdData.gioiTinh}</text>
                            </svg>
                        </Rnd>
                        <Rnd
                            bounds="parent"
                            className='dragTable'
                            default={{
                                width: 100,
                                height: 50,
                                x: 0,
                                y: 0
                            }}
                        >
                            <svg viewBox="0 0 20 20" className='dynamic-text'>
                                <text x="50%" style={{ fill: "black" }} y="14" textAnchor="middle">{cccdData.quocTich}</text>
                            </svg>
                        </Rnd>
                        <Rnd
                            bounds="parent"
                            className='dragTable'
                            default={{
                                width: 100,
                                height: 50,
                                x: 0,
                                y: 0
                            }}
                        >
                            <svg viewBox="0 0 20 20" className='dynamic-text'>
                                <text x="50%" style={{ fill: "black" }} y="14" textAnchor="middle">{cccdData.queQuan}</text>
                            </svg>
                        </Rnd>
                        <Rnd
                            bounds="parent"
                            className='dragTable'
                            default={{
                                width: 100,
                                height: 50,
                                x: 0,
                                y: 0
                            }}
                        >
                            <svg viewBox="0 0 20 20" className='dynamic-text'>
                                <text x="50%" style={{ fill: "black" }} y="14" textAnchor="middle">{cccdData.noiThuongTru}</text>
                            </svg>
                        </Rnd>
                    </div>
                    <Row style={{ marginBottom: "20px" }}>
                        <Col span={6}>
                            <div style={{
                                fontWeight: "bolder",
                                margin: "5px 10px"

                            }}>
                                Thay đổi kích cỡ mặt sau bằng cách kéo thanh trượt
                            </div>
                        </Col>
                        <Col span={12}>
                            <Slider
                                min={0}
                                max={3}
                                onChange={matSauScaleChange}
                                value={typeof matSauScale === 'number' ? matSauScale : 1}
                                step={0.1}
                            />
                        </Col>
                        <Col span={4}>
                            <InputNumber
                                min={0}
                                max={3}
                                style={{
                                    margin: '0 16px',
                                }}
                                step={0.1}
                                value={matSauScale}
                                onChange={matSauScaleChange}
                            />
                        </Col>
                    </Row>
                    <div id='mat-sau' style={{
                        width: kichCoMatSau.width,
                        height: kichCoMatSau.height,
                        background: `url("${matSau}") 0% 0% / contain no-repeat`
                    }}></div>
                </Col>
            </Row>
        </div>
    )
}

export default CCCD;