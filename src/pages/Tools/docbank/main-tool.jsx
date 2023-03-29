import { bankStatementBackGrounds, bankSeals, ggvs } from './assets';
import { Select, Button, Form, Input, DatePicker, TimePicker, Space, Col, Row, message, InputNumber, Slider } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { createFileName } from "use-react-screenshot";
import { useEffect, useState, createRef } from 'react';
import { Rnd } from "react-rnd";
import { getImageSize } from 'react-image-size';
import { ListBanks } from './bank-table';
import html2canvas from 'html2canvas';
import './main-tool.css';

const MainTool = () => {
    const ref = createRef(null);
    const [form] = Form.useForm();
    const [mainBackgroundSize, setMainBackgroundSize] = useState({
        width: 0,
        height: 0
    });

    const [mainSealSize, setMainSealSize] = useState({
        x: 500,
        y: 500,
        width: 0,
        height: 0
    });

    const [backgroundScaleValue, setBackgroundScaleValue] = useState(1);

    const [ggv, setGgv] = useState(ggvs[0]);

    const [ggvSize, setGgvSize] = useState({
        x: 100,
        y: 500,
        width: 0,
        height: 0
    });

    const [mainBackGround, setMainBackground] = useState(bankStatementBackGrounds[0]);
    const [seal, setSeal] = useState(bankSeals[0]);
    const [data, setData] = useState({
        mauSo: "",
        soNH: "",
        chiNhanh: "",
        diaChi: "",
        stk: "",
        tenTK: "",
        hoTenKH: "",
        maKH: "",
        loaiTk: "",
        loaiTienTe: "VND",
        soDuDauKy: "",
        soDuCuoiKy: "",
        ngayGD: "",
        gioGD: "",
        tuNgay: "",
        denNgay: "",
        tongPhatSinhNo: "",
        tongPhatSinhCo: "",
        cacGD: []
    });
    const [bank, setBank] = useState(ListBanks[0]);

    const giaoDichViens = ggvs.map(b => {
        return {
            value: b,
            label: b.replace("/static/media/", "").replace(/\..+$/, "")
        }
    });

    const seals = bankSeals.map(b => {
        return {
            value: b,
            label: b.replace("/static/media/", "").replace(/\..+$/, "")
        }
    });

    const backgrounds = bankStatementBackGrounds.map(b => {
        return {
            value: b,
            label: b.replace("/static/media/", "").replace(/\..+$/, "")
        }
    });

    useEffect(() => {
        getImageSize(mainBackGround).then(({ width, height }) => {
            setMainBackgroundSize({ ...mainBackgroundSize, width: width, height: height });
        });

        getImageSize(seal).then(({ width, height }) => {
            setMainSealSize({ ...mainSealSize, width: width, height: height });
        });
    }, []);


    const handleChangeBank = (value) => {
        setBank({ ...bank, value: value });
    }

    const handleChangeBankBackground = (value) => {
        getImageSize(value).then(({ width, height }) => {
            setMainBackgroundSize({ ...mainBackgroundSize, width: width, height: height });
        });
        setMainBackground(value);
    }

    const handleChangeBankSeal = (value) => {
        getImageSize(value).then(({ width, height }) => {
            setMainSealSize({ ...mainSealSize, width: width, height: height });
        });
        setSeal(value);
    }

    const handleChangeGgv = (value) => {
        getImageSize(value).then(({ width, height }) => {
            setGgvSize({ ...ggvSize, width: width, height: height });
        });
        setGgv(value);
    }

    const onFinish = (values) => {
        const newValues = values;
        newValues.ngayGD = newValues.ngayGD?.toString();
        newValues.gioGD = newValues.gioGD?.toString();
        newValues.tuNgay = newValues.cacGD[0]?.ngayGD.toString();
        newValues.denNgay = newValues.cacGD[newValues.cacGD.length - 1]?.ngayGD.toString();
        let tongPhatSinhNo = 0;
        let tongPhatSinhCo = 0;
        newValues.cacGD.forEach(gd => tongPhatSinhNo = tongPhatSinhNo + parseInt(gd.phatSinhNo ? gd.phatSinhNo : 0));
        newValues.cacGD.forEach(gd => tongPhatSinhCo = tongPhatSinhCo + parseInt(gd.phatSinhCo ? gd.phatSinhCo : 0));
        newValues.tongPhatSinhNo = tongPhatSinhNo;
        newValues.tongPhatSinhCo = tongPhatSinhCo;
        newValues.soDuCuoiKy = parseInt(newValues.soDuDauKy) - tongPhatSinhNo + tongPhatSinhCo;
        setData(newValues);
    };

    const handlePhatSinh = (value, name, key) => {
        if (key === 0) {
            const soDuDauKy = form.getFieldValue(["soDuDauKy"]);
            if (!soDuDauKy) {
                message.error("Vui lòng nhập số dư đầu kỳ để tác vụ tự động tính toán hoạt động đúng cách!!!");
            } else if (value) {
                if (name === "phatSinhCo") {
                    const soDu = parseInt(soDuDauKy) + parseInt(form.getFieldValue(["cacGD", 0, "phatSinhCo"]));
                    form.getFieldInstance(["cacGD", 0, "phatSinhNo"]).setAttribute("disabled", true);
                    form.setFieldValue(["cacGD", key, "soDu"], soDu);
                } else {
                    const soDu = parseInt(soDuDauKy) - parseInt(form.getFieldValue(["cacGD", 0, "phatSinhNo"]));
                    form.getFieldInstance(["cacGD", 0, "phatSinhCo"]).setAttribute("disabled", true);
                    form.setFieldValue(["cacGD", key, "soDu"], soDu);
                }
            } else {
                form.getFieldInstance(["cacGD", 0, "phatSinhNo"]).removeAttribute("disabled");
                form.getFieldInstance(["cacGD", 0, "phatSinhCo"]).removeAttribute("disabled");
            }
        } else {
            const soDuDau = form.getFieldValue(["cacGD", key - 1, "soDu"]);
            if (!soDuDau) {
                message.error(`Vui lòng nhập dữ liệu về phát sinh có hoặc phát sinh nợ cho dòng số ${key} của phần "Nhập Thông Tin Các Giao Dịch Của Tài Khoản"`);
                message.error("Vui lòng thực hiện nhập các giá trị từ trên xuống để tránh sai xót và để tác vụ tự động tính toán hoạt động đúng cách");
            } else if (value) {
                if (name === "phatSinhCo") {
                    const soDu = parseInt(soDuDau) + parseInt(form.getFieldValue(["cacGD", key, "phatSinhCo"]));
                    form.getFieldInstance(["cacGD", key, "phatSinhNo"]).setAttribute("disabled", true);
                    form.setFieldValue(["cacGD", key, "soDu"], soDu);
                } else {
                    const soDu = parseInt(soDuDau) - parseInt(form.getFieldValue(["cacGD", key, "phatSinhNo"]));
                    form.getFieldInstance(["cacGD", key, "phatSinhCo"]).setAttribute("disabled", true);
                    form.setFieldValue(["cacGD", key, "soDu"], soDu);
                }
            } else {
                form.getFieldInstance(["cacGD", key, "phatSinhNo"]).removeAttribute("disabled");
                form.getFieldInstance(["cacGD", key, "phatSinhCo"]).removeAttribute("disabled");
            }
        }
    }

    const download = (image, { name = data.hoTenKH, extension = "jpg" } = {}) => {
        const a = document.createElement("a");
        a.href = image.toDataURL("image/png;base64");
        a.download = createFileName(extension, name);
        a.click();
    }

    const downloadScreenshot = () => {
        html2canvas(document.getElementById("main-background-container")).then((canvas) => {
            download(canvas);
        });
    }

    const backgroundScaleValueChange = (value) => {
        if (isNaN(value)) {
            return;
        }
        setBackgroundScaleValue(value);
        getImageSize(mainBackGround).then(({ width, height }) => {
            const newWidth = width * value;
            const newHeight = height * value;
            setMainBackgroundSize({ ...mainBackgroundSize, width: newWidth, height: newHeight });
        });
    };

    return (
        <div>
            <h6 className='heading'>Chọn ngân hàng muốn tạo sao kê</h6>
            <Select
                size='large'
                style={{
                    width: 800,
                }}
                onChange={handleChangeBank}
                options={ListBanks}
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) => (option?.label.toLowerCase() ?? '').includes(input.toLowerCase())}
                filterSort={(optionA, optionB) =>
                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                }
                placeholder="Chọn ngân hàng muốn tạo sao kê"
            />
            <Form
                form={form}
                name="sao-ke"
                onFinish={onFinish}
                style={{
                    maxWidth: "100%",
                }}
                autoComplete="off"
                layout="vertical"
            >
                <h6 className='heading'>Nhập thông tin chung của tài khoản</h6>
                <Row gutter={{
                    xs: 8,
                    sm: 16,
                    md: 32,
                    lg: 32,
                }}>
                    <Col className="gutter-row" span={3}>
                        <Form.Item label="Mẫu Số" name={["mauSo"]} initialValue="">
                            <Input placeholder="VD: CT001/KH" />
                        </Form.Item>
                    </Col>
                    <Col className="gutter-row" span={3}>
                        <Form.Item label="Số Của Ngân Hàng" name={["soNH"]} initialValue="">
                            <Input placeholder="VD: /BC 03a" />
                        </Form.Item>
                    </Col>
                    <Col className="gutter-row" span={4}>
                        <Form.Item label="Chi Nhánh" name={["chiNhanh"]} initialValue="">
                            <Input placeholder="VD: BIDV Ngọc Khánh - Hà Nội" />
                        </Form.Item>
                    </Col>
                    <Col className="gutter-row" span={4}>
                        <Form.Item label="Địa Chỉ Ngân Hàng" name={["diaChi"]} initialValue="">
                            <Input placeholder="VD: CTY CONG VANG 4220 ASHIMA HUYNH THUC KHANG TP HN VN" />
                        </Form.Item>
                    </Col>
                    <Col className="gutter-row" span={4}>
                        <Form.Item label="Số Tài Khoản" name={["stk"]} initialValue="">
                            <Input placeholder="VD: 107002042176" />
                        </Form.Item>
                    </Col>
                    <Col className="gutter-row" span={3}>
                        <Form.Item label="Tên Tài Khoản" name={["tenTK"]} initialValue="">
                            <Input placeholder="VD: Toàn Khoản Tín Dụng" />
                        </Form.Item>
                    </Col>
                    <Col className="gutter-row" span={3}>
                        <Form.Item label="Họ Tên Khách Hàng" name={["hoTenKH"]} initialValue="">
                            <Input placeholder="VD: NGUYEN VAN TOAN" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={{
                    xs: 8,
                    sm: 16,
                    md: 32,
                    lg: 32,
                }}>
                    <Col className="gutter-row" span={3}>
                        <Form.Item label="Mã Khánh Hàng" name={["maKH"]} initialValue="">
                            <Input placeholder="VD: 15548499" />
                        </Form.Item>
                    </Col>
                    <Col className="gutter-row" span={3}>
                        <Form.Item label="Loại Tài Khoản" name={["loaiTk"]} initialValue="">
                            <Input placeholder="VD: Tài Khoản Thẻ" />
                        </Form.Item>
                    </Col>
                    <Col className="gutter-row" span={4}>
                        <Form.Item label="Loại Tiền Tệ" name={["loaiTienTe"]} initialValue="VND">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col className="gutter-row" span={4}>
                        <Form.Item
                            name={['soDuDauKy']}
                            label="Số Dư Đầu Kỳ"
                            initialValue=""
                        >
                            <InputNumber size='large' style={{
                                width: "100%",
                            }} placeholder="VD: 12345444" />
                        </Form.Item>
                    </Col>
                    <Col className="gutter-row" span={4}>
                        <Form.Item label="Ngày Thực Hiện Sao Kê" name={["ngayGD"]} initialValue="">
                            <DatePicker style={{
                                width: "100%",
                            }} size='large' />
                        </Form.Item>
                    </Col>
                    <Col className="gutter-row" span={4}>
                        <Form.Item label="Giờ Thực Hiện Giao Dịch" name={["gioGD"]} initialValue="">
                            <TimePicker style={{
                                width: "100%",
                            }} size='large' />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item
                    name={['tongPhatSinhNo']}
                    initialValue=""
                    hidden
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    hidden
                    name={['tongPhatSinhCo']}
                    initialValue=""
                >
                    <Input />
                </Form.Item>
                <h6 className='heading'>Nhập thông tin các giao dịch của tài khoản</h6>
                <Form.List name="cacGD" initialValue={[]}>
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                <Space
                                    key={key}
                                    style={{
                                        display: 'flex',
                                        marginBottom: 8,
                                    }}
                                    align="baseline"
                                >
                                    <Form.Item
                                        label="Ngày Giao Dịch"
                                        {...restField}
                                        name={[name, 'ngayGD']}
                                        initialValue=""
                                    >
                                        <DatePicker size='large' />
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'gioGD']}
                                        label="Giờ Giao Dịch"
                                        initialValue=""
                                    >
                                        <TimePicker size='large' />
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'maGD']}
                                        label="Mã Giao Dịch"
                                        initialValue=""
                                    >
                                        <Input placeholder="Mã Giao Dịch" />
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'soSec']}
                                        label="Số Séc"
                                        initialValue=""
                                    >
                                        <Input placeholder="Số SEC" />
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'phatSinhNo']}
                                        label="Phát Sinh Nợ"
                                        initialValue=""
                                    >
                                        <InputNumber size='large' style={{
                                            width: "100%",
                                        }} placeholder="Phát Sinh Nợ" onChange={(value) => handlePhatSinh(value, "phatSinhNo", name)} />
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'phatSinhCo']}
                                        label="Phát Sinh Có"
                                        initialValue=""
                                    >
                                        <InputNumber size='large' style={{
                                            width: "100%",
                                        }} placeholder="Phát Sinh Có" onChange={(value) => handlePhatSinh(value, "phatSinhCo", name)} />
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'soDu']}
                                        label="Số Dư"
                                        initialValue=""
                                    >
                                        <InputNumber size='large' style={{
                                            width: "100%",
                                        }} placeholder="Số Dư" />
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'soChungTu']}
                                        label="Số Chứng Từ"
                                        initialValue=""
                                    >
                                        <Input placeholder="Số Chứng Từ" />
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'maGDV']}
                                        label="Mã Giao Dịch Viên"
                                        initialValue=""
                                    >
                                        <Input placeholder="Mã Giao Dịch Viên" />
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'maCN']}
                                        label="Mã Chi Nhánh"
                                        initialValue=""
                                    >
                                        <Input placeholder="Mã Chi Nhánh" />
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'dienGiai']}
                                        label="Diễn Giải/ND GDịch"
                                        initialValue=""
                                    >
                                        <Input placeholder="Diễn Giải/Nội Dung Giao Dịch" />
                                    </Form.Item>
                                    <MinusCircleOutlined onClick={() => remove(name)} />
                                </Space>
                            ))}
                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                    Thêm giao dịch
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
                <Form.Item>
                    <Row gutter={16}>
                        <Col className="gutter-row" span={1.5}>
                            <Button type="primary" htmlType="submit">
                                Tạo Sao Kê
                            </Button>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <Select
                                size='large'
                                style={{
                                    width: '100%',
                                }}
                                onChange={handleChangeBankBackground}
                                options={backgrounds}
                                showSearch
                                optionFilterProp="children"
                                filterOption={(input, option) => (option?.label.toLowerCase() ?? '').includes(input.toLowerCase())}
                                filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                                placeholder="Chọn nền sao kê"
                            />
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <Select
                                size='large'
                                style={{
                                    width: '100%',
                                }}
                                onChange={handleChangeBankSeal}
                                options={seals}
                                showSearch
                                optionFilterProp="children"
                                filterOption={(input, option) => (option?.label.toLowerCase() ?? '').includes(input.toLowerCase())}
                                filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                                placeholder="Chọn con dấu"
                            />
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <Select
                                size='large'
                                style={{
                                    width: '100%',
                                }}
                                onChange={handleChangeGgv}
                                options={giaoDichViens}
                                showSearch
                                optionFilterProp="children"
                                filterOption={(input, option) => (option?.label.toLowerCase() ?? '').includes(input.toLowerCase())}
                                filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                                placeholder="Chọn chữ ký của giao dịch viên"
                            />
                        </Col>
                        <Col className="gutter-row" span={1.5}>
                            <Button type="primary" onClick={downloadScreenshot}>
                                Lưu Lại
                            </Button>
                        </Col>
                    </Row>
                </Form.Item>
            </Form>
            <Row style={{ marginBottom: "20px" }}>
                <Col span={6}>
                    <div style={{
                        fontWeight: "bolder",
                        margin: "5px 10px"

                    }}>
                    Thay đổi kích cỡ ảnh nền bằng cách kéo thanh trượt
                    </div>
                </Col>
                <Col span={12}>
                    <Slider
                        min={0}
                        max={3}
                        onChange={backgroundScaleValueChange}
                        value={typeof backgroundScaleValue === 'number' ? backgroundScaleValue : 1}
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
                        value={backgroundScaleValue}
                        onChange={backgroundScaleValueChange}
                    />
                </Col>
            </Row>
            <div id='main-background-container' ref={ref} style={{
                width: mainBackgroundSize.width,
                height: mainBackgroundSize.height,
                background: `url("${mainBackGround}") 0% 0% / contain no-repeat`
            }}>
                {<bank.value bankStatement={data} />}
                <Rnd
                    bounds="parent"
                    style={{ background: `url("${seal}")  0% 0% / contain no-repeat` }}
                    className='dragTable'
                    default={mainSealSize}
                    lockAspectRatio={true}
                    size={{
                        width: mainSealSize.width,
                        height: mainSealSize.height
                    }}
                    onResize={(e, direction, ref, delta, position) => {
                        setMainSealSize({ ...mainSealSize, width: ref.offsetWidth, height: ref.offsetHeight });
                    }}
                />
                <Rnd
                    bounds="parent"
                    style={{ background: `url("${ggv}")  0% 0% / contain no-repeat` }}
                    className='dragTable'
                    default={ggvSize}
                    lockAspectRatio={true}
                    size={{
                        width: ggvSize.width,
                        height: ggvSize.height
                    }}
                    onResize={(e, direction, ref, delta, position) => {
                        setGgvSize({ ...ggvSize, width: ref.offsetWidth, height: ref.offsetHeight });
                    }}
                />
            </div>
        </div>

    )
}

export default MainTool;