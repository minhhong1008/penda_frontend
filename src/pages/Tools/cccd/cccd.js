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
import { matSaus, matTruocs, vantay1s, vantay2s, anhs } from './assets';
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
        noiThuongTruTren: "",
        noiThuongTruDuoi: "",
        coGiaTriDen: "",
        dacDiemNhanDangTren: "",
        dacDiemNhanDangDuoi: "",
        ngayTao: "",
        idMatSau: "",
        idMatSau1: "",
        idMatSau2: "",
        quocTich: "Việt Nam"
    });

    const [matTruoc, setMatTruoc] = useState(matTruocs[0]);
    const [matSau, setMatSau] = useState(matSaus[0]);

    const [vantay1, setVantay1] = useState(vantay1s[0]);
    const [vantay2, setVantay2] = useState(vantay2s[0]);

    const [anh, setAnh] = useState(anhs[0]);

    const [kichCoMatTruoc, setKichCoMatTruoc] = useState({
        width: 0,
        height: 0
    });

    const [kichCoMatSau, setKichCoMatSau] = useState({
        width: 0,
        height: 0
    });

    const [matTruocScale, setMatTruocScale] = useState(0.2);
    const [matSauScale, setMatSauScale] = useState(0.2);

    useEffect(() => {
        getImageSize(matTruoc).then(({ width, height }) => {
            const newWidth = width * 0.2;
            const newHeight = height * 0.2;
            setKichCoMatTruoc({ ...kichCoMatTruoc, width: newWidth, height: newHeight });
        });

        getImageSize(matSau).then(({ width, height }) => {
            const newWidth = width * 0.2;
            const newHeight = height * 0.2;
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

    const download = (image, { name = cccdData.ten, extension = "png" } = {}) => {
        const a = document.createElement("a");
        a.href = image.toDataURL();
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
    }

    return (
        <div>
            <div style={{ marginBottom: "20px" }}>
                <Select placeholder="Chọn mặt trước CCCD" size='large' style={{ marginRight: "20px" }} onChange={(value) => setMatTruoc(value)}>
                    {matTruocs.map(item =>
                    (
                        <Select.Option value={item}>{item.replace("/static/media/", "").replace(/\..+$/, "")}</Select.Option>
                    )
                    )}
                </Select>
                <Select placeholder="Chọn mặt sau CCCD" size='large' style={{ marginRight: "20px" }} onChange={(value) => setMatSau(value)}>
                    {matSaus.map(item =>
                    (
                        <Select.Option value={item}>{item.replace("/static/media/", "").replace(/\..+$/, "")}</Select.Option>
                    )
                    )}
                </Select>
                <Select placeholder="Chọn vân tay 1" size='large' style={{ marginRight: "20px" }} onChange={(value) => setVantay1(value)}>
                    {vantay1s.map(item =>
                    (
                        <Select.Option value={item}>{item.replace("/static/media/", "").replace(/\..+$/, "")}</Select.Option>
                    )
                    )}
                </Select>
                <Select placeholder="Chọn vân tay 2" size='large' style={{ marginRight: "20px" }} onChange={(value) => setVantay2(value)}>
                    {vantay2s.map(item =>
                    (
                        <Select.Option value={item}>{item.replace("/static/media/", "").replace(/\..+$/, "")}</Select.Option>
                    )
                    )}
                </Select>
                <Select placeholder="Chọn ảnh đại diện" size='large' style={{ marginRight: "20px" }} onChange={(value) => setAnh(value)}>
                    {anhs.map(item =>
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
                        <Form.Item name={["noiThuongTruTren"]} label="Nơi thường trú 1" initialValue={""}>
                            <Input defaultValue={""} />
                        </Form.Item>
                        <Form.Item name={["noiThuongTruDuoi"]} label="Nơi thường trú 2" initialValue={""}>
                            <Input defaultValue={""} />
                        </Form.Item>
                        <Form.Item name={["coGiaTriDen"]} label="Có giá trị đến" initialValue={""}>
                            <DatePicker size='large' style={{ width: "100%" }} />
                        </Form.Item>
                        <Form.Item name={["dacDiemNhanDangTren"]} label="Đđ nhận dạng 1" initialValue={""}>
                            <Input defaultValue={""} />
                        </Form.Item>
                        <Form.Item name={["dacDiemNhanDangDuoi"]} label="Đđ nhận dạng 2" initialValue={""}>
                            <Input defaultValue={""} />
                        </Form.Item>
                        <Form.Item name={["ngayTao"]} label="Ngày tạo" initialValue={""}>
                            <DatePicker size='large' style={{ width: "100%" }} />
                        </Form.Item>
                        <Form.Item name={["idMatSau"]} label="ID phía mặt sau" initialValue={""}>
                            <Input defaultValue={""} />
                        </Form.Item>
                        <Form.Item name={["idMatSau1"]} label="ID phía mặt sau 1" initialValue={""}>
                            <Input defaultValue={""} />
                        </Form.Item>
                        <Form.Item name={["idMatSau2"]} label="ID phía mặt sau 2" initialValue={""}>
                            <Input defaultValue={""} />
                        </Form.Item>
                        <Form.Item name={["quocTich"]} initialValue={"Việt Nam"} hidden>
                            <Input defaultValue={"Việt Nam"} />
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
                            style={{
                                background: `url("${anh}") 0% 0% / contain no-repeat`
                            }}
                            default={{
                                width: 138,
                                height: 184,
                                x: 110,
                                y: 266
                            }}
                        >
                        </Rnd>
                        <Rnd
                            bounds="parent"
                            className='dragTable'
                            style={{ fontWeight: 800, fontSize: "27px"}}
                            default={{
                                width: 190,
                                height: 35,
                                x: 325,
                                y: 276
                            }}
                            onResize={(e, direction, ref, delta, position) => {
                                ref.style.fontSize = `${ref.offsetHeight - 8}px`;
                            }}
                        >
                            {cccdData.so}
                        </Rnd>
                        <Rnd
                            bounds="parent"
                            className='dragTable'
                            style={{ fontWeight: 550, fontSize: "19px" }}
                            default={{
                                width: 196,
                                height: 27,
                                x: 265,
                                y: 332
                            }}
                            onResize={(e, direction, ref, delta, position) => {
                                ref.style.fontSize = `${ref.offsetHeight - 8}px`;
                            }}
                        >
                            {cccdData.ten}
                        </Rnd>
                        <Rnd
                            bounds="parent"
                            className='dragTable'
                            style={{ fontWeight: 550, fontSize: "17px" }}
                            default={{
                                width: 90,
                                height: 25,
                                x: 422,
                                y: 355
                            }}
                            onResize={(e, direction, ref, delta, position) => {
                                ref.style.fontSize = `${ref.offsetHeight - 8}px`;
                            }}
                        >
                            {helpers.formatDate(cccdData.ngaySinh)}
                        </Rnd>
                        <Rnd
                            bounds="parent"
                            className='dragTable'
                            style={{ fontWeight: 550,fontSize: "17px"}}
                            default={{
                                width: 65,
                                height: 25,
                                x: 360,
                                y: 380
                            }}
                            onResize={(e, direction, ref, delta, position) => {
                                ref.style.fontSize = `${ref.offsetHeight - 8}px`;
                            }}
                        >
                            {cccdData.gioiTinh}
                        </Rnd>
                        <Rnd
                            bounds="parent"
                            className='dragTable'
                            style={{ fontWeight: 550, fontSize: "17px" }}
                            default={{
                                width: 90,
                                height: 25,
                                x: 560,
                                y: 380
                            }}
                            onResize={(e, direction, ref, delta, position) => {
                                ref.style.fontSize = `${ref.offsetHeight - 8}px`;
                            }}
                        >
                            {cccdData.quocTich}
                        </Rnd>
                        <Rnd
                            bounds="parent"
                            className='dragTable'
                            style={{ fontWeight: 550, fontSize: "17px"}}
                            default={{
                                width: 370,
                                height: 25,
                                x: 267,
                                y: 422
                            }}
                            onResize={(e, direction, ref, delta, position) => {
                                ref.style.fontSize = `${ref.offsetHeight - 8}px`;
                            }}
                        >
                            {cccdData.queQuan}
                        </Rnd>
                        <Rnd
                            bounds="parent"
                            className='dragTable'
                            style={{ fontWeight: 550, fontSize: "17px" }}
                            default={{
                                width: 150,
                                height: 25,
                                x: 493,
                                y: 448
                            }}
                            onResize={(e, direction, ref, delta, position) => {
                                ref.style.fontSize = `${ref.offsetHeight - 8}px`;
                            }}
                        >
                            {cccdData.noiThuongTruTren}
                        </Rnd>
                        <Rnd
                            bounds="parent"
                            className='dragTable'
                            style={{ fontWeight: 550, fontSize: "17px" }}
                            default={{
                                width: 355,
                                height: 25,
                                x: 265,
                                y: 470
                            }}
                            onResize={(e, direction, ref, delta, position) => {
                                ref.style.fontSize = `${ref.offsetHeight - 8}px`;
                            }}
                        >
                            {cccdData.noiThuongTruDuoi}
                        </Rnd>
                        <Rnd
                            bounds="parent"
                            className='dragTable'
                            style={{
                                fontWeight: 550,
                                fontSize: "14px"
                            }}
                            default={{
                                width: 80,
                                height: 22,
                                x: 182,
                                y: 460
                            }}
                            onResize={(e, direction, ref, delta, position) => {
                                ref.style.fontSize = `${ref.offsetHeight - 8}px`;
                            }}
                        >
                            {helpers.formatDate(cccdData.coGiaTriDen)}
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
                    }}>
                        <Rnd
                            bounds="parent"
                            className='dragTable'
                            style={{ fontWeight: 550, fontSize: "15px" }}
                            default={{
                                width: 80,
                                height: 23,
                                x: 333,
                                y: 791
                            }}
                            onResize={(e, direction, ref, delta, position) => {
                                ref.style.fontSize = `${ref.offsetHeight - 8}px`;
                            }}
                        >
                           {helpers.formatDate(cccdData.ngayTao)}
                        </Rnd>
                        <Rnd
                            bounds="parent"
                            className='dragTable'
                            style={{ fontWeight: 550, fontSize: "15px" }}
                            default={{
                                width: 200,
                                height: 23,
                                x: 90,
                                y: 758
                            }}
                            onResize={(e, direction, ref, delta, position) => {
                                ref.style.fontSize = `${ref.offsetHeight - 8}px`;
                            }}
                        >
                            {cccdData.dacDiemNhanDangTren}
                        </Rnd>
                        <Rnd
                            bounds="parent"
                            className='dragTable'
                            style={{ fontWeight: 550, fontSize: "15px" }}
                            default={{
                                width: 100,
                                height: 23,
                                x: 90,
                                y: 773
                            }}
                            onResize={(e, direction, ref, delta, position) => {
                                ref.style.fontSize = `${ref.offsetHeight - 8}px`;
                            }}
                        >
                            {cccdData.dacDiemNhanDangDuoi}
                        </Rnd>
                        <Rnd
                            bounds="parent"
                            className='dragTable'
                            style={{ fontWeight: 550, fontSize: "28px" }}
                            default={{
                                width: 585,
                                height: 36,
                                x: 93,
                                y: 1006
                            }}
                            onResize={(e, direction, ref, delta, position) => {
                                ref.style.fontSize = `${ref.offsetHeight - 8}px`;
                            }}
                        >
                            {cccdData.idMatSau}
                        </Rnd>
                        <Rnd
                            bounds="parent"
                            className='dragTable'
                            style={{ fontWeight: 550, fontSize: "28px" }}
                            default={{
                                width: 585,
                                height: 36,
                                x: 93,
                                y: 1036
                            }}
                            onResize={(e, direction, ref, delta, position) => {
                                ref.style.fontSize = `${ref.offsetHeight - 8}px`;
                            }}
                        >
                            {cccdData.idMatSau1}
                        </Rnd>
                        <Rnd
                            bounds="parent"
                            className='dragTable'
                            style={{ fontWeight: 550, fontSize: "28px" }}
                            default={{
                                width: 585,
                                height: 36,
                                x: 93,
                                y: 1066
                            }}
                            onResize={(e, direction, ref, delta, position) => {
                                ref.style.fontSize = `${ref.offsetHeight - 8}px`;
                            }}
                        >
                           {cccdData.idMatSau2}
                        </Rnd>
                        <Rnd
                            bounds="parent"
                            className='dragTable'
                            style={{
                                background: `url("${vantay1}") 0% 0% / contain no-repeat`
                            }}
                            default={{
                                width: 144,
                                height: 169,
                                x: 418,
                                y: 750
                            }}
                        >
                        </Rnd>
                        <Rnd
                            bounds="parent"
                            className='dragTable'
                            style={{
                                background: `url("${vantay2}") 0% 0% / contain no-repeat`
                            }}
                            default={{
                                width: 144,
                                height: 169,
                                x: 564,
                                y: 750
                            }}
                        >
                        </Rnd>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default CCCD;