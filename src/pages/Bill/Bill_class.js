import {
  Button,
  Card,
  Table,
  Tabs,
  Row,
  Col,
  Form,
  Input,
  DatePicker,
  Select,
  Divider,
  Modal,
  InputNumber,
  Upload,
  Mentions,
} from "antd";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { showError, showSuccess } from "../../utils";
import { listselect_bill_owner, listselect_bill_work } from "./Bill_list";
import {
  Create,
  getPayAndCollect,
  updateBill,
  getListBill,
  get_Bill_employee,
} from "../../api/bill";
import { PlusOutlined } from "@ant-design/icons";
/* // Liên quan mention
const onChange = (value) => {
  console.log("Change:", value);
};
const onSelect = (option) => {
  console.log("select", option);
}; */
const MOCK_DATA = {
  "@": ["afc163", "zombiej", "yesmeck"],
  "#": ["1.0", "2.0", "3.0"],
};
// Liên quan upload ảnh

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
//------------------------------------------------

// useState để tạo kho dữ liệu trong nội bộ components !== biến thường là khi dữ liệu được cập nhật thì UI thay đổi theo

const Bill_class = () => {
  const [content, setContent] = useState("abc");
  const { Option } = Select;
  const month = dayjs().format("MM");
  const year = dayjs().format("YYYY");
  const countDay_last = dayjs(
    year + "-" + (parseInt(month) - 1) + "-" + "01"
  ).daysInMonth();
  const countDay = dayjs().daysInMonth();
  const countDay_next = dayjs(
    year + "-" + (parseInt(month) + 1) + "-" + "01"
  ).daysInMonth();

  const dispatch = useDispatch();
  const history = useHistory();
  const { users_function, users_name } = useSelector((state) => state.auth);
  const [data, setData] = useState();
  const { RangePicker } = DatePicker;
  const [listselect_bill_work_new, setListBillWorkNew] = useState(
    listselect_bill_work
  );
  // Liên kết mention
  const [prefix, setPrefix] = useState("@");
  const onSearch = (_, newPrefix) => {
    setPrefix(newPrefix);
  };

  const rangePresets = [
    {
      label: "Default",
      value: [dayjs().add(-30, "d"), dayjs().add(30, "d")],
    },
    {
      label: "Tháng trước",
      value: [
        dayjs(year + "-" + (parseInt(month) - 1) + "-" + "01"),
        dayjs(year + "-" + (parseInt(month) - 1) + "-" + countDay_last),
      ],
    },
    {
      label: "Tháng này",
      value: [
        dayjs(year + "-" + month + "-" + "01"),
        dayjs(year + "-" + month + "-" + countDay),
      ],
    },
    {
      label: "Tháng sau",
      value: [
        dayjs(year + "-" + (parseInt(month) + 1) + "-" + "01"),
        dayjs(year + "-" + (parseInt(month) + 1) + "-" + countDay_next),
      ],
    },
    {
      label: "Last 30 Days",
      value: [dayjs().add(-30, "d"), dayjs()],
    },
    {
      label: "Last 90 Days",
      value: [dayjs().add(-90, "d"), dayjs()],
    },
  ];
  const [filterDate, setFilterDate] = useState();
  // có 2 form : TẠO HÓA ĐƠN THU CHI và CHI TIẾT HÀNG HÓA nên tạo
  const [form] = Form.useForm();
  const [formProduct] = Form.useForm();
  const [listselect_employee, setlistselect_employee] = useState();

  // AUTO trong html:
  const renderTotalMoney = () => {
    let quantity = formProduct.getFieldValue("bill_number");
    let price = formProduct.getFieldValue("bill_price");
    let bill_total = quantity * price;
    formProduct.setFieldValue("bill_total", bill_total);
    form.setFieldValue("bill_payment", bill_total);
    let payment = form.getFieldValue("bill_payment");
    let debt = payment - bill_total;
    form.setFieldValue("bill_debt", debt);
  };
  const renderpayment = () => {
    let bill_payment = form.getFieldValue("bill_payment");
    let bill_total = formProduct.getFieldValue("bill_total");
    form.setFieldValue("bill_debt", bill_payment - bill_total);
  };
  const rendertype = (value) => {
    if (value == "Phiếu chi") {
      setListBillWorkNew([
        "Mua device, proxy & gia hạn",
        "Mua sim, phone & gia hạn",
        "Mua info",
        "Mua mail",
        "Thanh toán lương, thưởng hoa hồng",
        "Chi phí văn phòng",
        "Chi phí vận chuyển",
        "Chi phí checkout, tracking",
        "Chi phí Kicksold",
      ]);
    } else {
      setListBillWorkNew([
        "Thu tiền bán hàng",
        "Thu tiền bán tài nguyên",
        "Thu tiền khác",
        "Thu tiền đi vay",
      ]);
    }
  };

  // Bước 1: onFinish Lấy dữ liệu (values) từ FORM, sau đó xử lý và gửi dữ liêu lên server bằng phương thức post. dùng hàm postData_sever
  const onFinish = (values) => {
    // check dữ liểu chưa chuẩn thì báo lỗi
    if (values.bill_date == null || values.bill_expiry_date == null) {
      return showError("Lỗi date");
    }

    let bill_file = [];
    fileList?.map((item) => {
      let fileUrl = "";
      if (item?.xhr?.response) {
        fileUrl = JSON.parse(item.xhr.response).url;
      } else {
        fileUrl = item.url;
      }
      bill_file.push(fileUrl);
    });

    // Xử lý dữ liệu ngày tháng, multi select, earewa trước

    values.bill_date = dayjs(values.bill_date).format("YYYY-MM-DD");
    values.bill_expiry_date = dayjs(values.bill_expiry_date).format(
      "YYYY-MM-DD"
    );

    let productValues = formProduct.getFieldsValue();
    // Ghép nối dữ liệu từ các form và gửi toàn bộ lên server thông qua 1 object newData

    let newData = {
      ...values,
      ...productValues,
      bill_image_url: bill_file.length > 0 ? bill_file.join(",") : "",
    };
    postData_Create(newData);
  };

  // Bước 2: Gửi dữ liệu lên server Xử lý bất đồng bộ: dùng async await
  const postData_Create = async (newData) => {
    // Gọi API để gửi dữ liệu đi
    const response = await Create(newData);
    if (response.status == 200) {
      showSuccess("Thêm bill thành công");
    } else {
      showError("Thêm bill thất bại");
    }
  };

  // Hàm gọi dữ liệu về từ database
  const gettooldata = async () => {
    const res = await get_Bill_employee();
    let data = res.data;
    setlistselect_employee(data);
    //upload ảnh
    if (data?.ebay_image_url) {
      let dataImage = [];
      let imageArr = data.ebay_image_url.split(",");
      imageArr.map((item, index) => {
        dataImage.push({
          uid: index,
          name: item,
          status: "done",
          url: item,
        });
      });
      setFileList(dataImage);
    }
  };

  //---------------Bảng-------------------
  const columns_suggest_pay = [
    {
      title: "Stt",
      dataIndex: "Stt",
      width: 30,
    },
    {
      title: "Công việc",
      dataIndex: "bill_work_suggest_pay",
      ellipsis: true,
      render: (text) => (
        <a
          onClick={() =>
            history.push(
              `bill_table/${encodeURIComponent(text + " ?action= Đề xuất")}`
            )
          }
        >
          {text}
        </a>
      ),
    },
    {
      title: "Số tiền",
      dataIndex: "bill_total_suggest_pay",
      render: (text) => VND.format(text),
    },
    {
      title: "Tỷ trọng",
      dataIndex: "bill_density_suggest_pay",
      responsive: ["md"],
    },
  ];
  const [data_suggest_pay, setDataSuggestPay] = useState();

  const columns_suggest_collect = [
    {
      title: "Stt",
      dataIndex: "Stt",
      width: 30,
    },
    {
      title: "Công việc",
      dataIndex: "bill_work_suggest_collect",
      ellipsis: true,
      render: (text) => (
        <a
          onClick={() =>
            history.push(
              `bill_table/${encodeURIComponent(text + " ?action= Đề xuất")}`
            )
          }
        >
          {text}
        </a>
      ),
    },
    {
      title: "Số tiền",
      dataIndex: "bill_total_suggest_collect",
      render: (text) => VND.format(text),
    },
    {
      title: "Tỷ trọng",
      dataIndex: "bill_density_suggest_collect",
      responsive: ["md"],
    },
  ];
  const [data_suggest_collect, setDataSuggestCollect] = useState();
  //--------------------------------

  const columns_pay = [
    {
      title: "Stt",
      dataIndex: "Stt",
      width: 30,
    },
    {
      title: "Công việc",
      dataIndex: "bill_work_pay",
      ellipsis: true,
      render: (text) => (
        <a
          onClick={() =>
            history.push(
              `bill_table/${encodeURIComponent(text + " ?action= Thực hiện")}`
            )
          }
        >
          {text}
        </a>
      ),
    },
    {
      title: "Số tiền",
      dataIndex: "bill_total_pay",
      ellipsis: true,
      render: (text) => VND.format(text),
    },
    {
      title: "Tỷ trọng",
      dataIndex: "bill_density_pay",
      responsive: ["md"],
    },
  ];
  const [data_pay, setDataPay] = useState();

  const columns_collect = [
    {
      title: "Stt",
      dataIndex: "Stt",
      width: 30,
    },
    {
      title: "Công việc",
      dataIndex: "bill_work_collect",
      ellipsis: true,
      render: (text) => (
        <a
          onClick={() =>
            history.push(
              `bill_table/${encodeURIComponent(text + " ?action= Thực hiện")}`
            )
          }
        >
          {text}
        </a>
      ),
    },
    {
      title: "Số tiền",
      dataIndex: "bill_total_collect",
      ellipsis: true,
      render: (text) => VND.format(text),
    },
    {
      title: "Tỷ trọng",
      dataIndex: "bill_density_collect",
      responsive: ["md"],
    },
  ];
  const [data_collect, setDataCollect] = useState();

  /* const test = () => {
    let productData = formProduct.getFieldsValue();
    console.log(productData);
    postupdateBill(productData);
  }; 
  const postupdateBill = async (productData) => {
    // Gọi API để gửi dữ liệu đi
    const response = await updateBill(productData);
    if (response.status == 200) {
      showSuccess("Thêm bill thành công");
    } else {
      showError("Thêm bill thất bại");
    }
  }; */

  //--------------------------------
  const onRangeChange = (dates, dateStrings) => {
    if (dates) {
      setFilterDate({
        from: dateStrings[0],
        to: dateStrings[1],
      });
    } else {
      console.log("Clear");
    }
  };

  const handleFilter = async () => {
    let response = await getPayAndCollect({
      ...filterDate,
    });
    if (response.status == 200) {
      const { data } = response;
      let arrKey_bill_work = [];
      let totalMoney_pay = 0;
      let totalMoney_collect = 0;
      let totalMoney_suggest_pay = 0;
      let totalMoney_suggest_collect = 0;

      data?.map((item) => {
        if (
          !arrKey_bill_work.some((key) => {
            return key == item.bill_work;
          })
        ) {
          arrKey_bill_work.push(item.bill_work);
        }
      });

      let listbill_collect = [
        "Thu tiền bán hàng",
        "Thu tiền bán tài nguyên",
        "Thu tiền khác",
        "Thu tiền đi vay",
      ];
      let arrPay = [];
      let arrSuggestPay = [];
      let arrCollect = [];
      let arrSuggestCollect = [];
      arrKey_bill_work.map((key, index) => {
        if (listbill_collect.indexOf(key) == -1) {
          let bill_work_pay = key;
          let bill_total_pay = 0;
          let bill_density_pay = "1,5%";

          let bill_work_suggest_pay = key;
          let bill_total_suggest_pay = 0;
          let bill_density_suggest_pay = "1,5%";

          data.map((item) => {
            if (item.bill_action == "Thực hiện") {
              if (item.bill_work == key) {
                bill_total_pay += parseInt(item.bill_total);
              }
            } else {
              if (item.bill_work == key) {
                bill_total_suggest_pay += parseInt(item.bill_total);
              }
            }
          });

          arrPay.push({
            key: index + 2,
            Stt: index + 2,
            bill_work_pay: bill_work_pay,
            bill_total_pay: bill_total_pay,
            bill_density_pay: bill_density_pay,
          });
          bill_density_suggest_pay =
            bill_work_suggest_pay / bill_total_suggest_pay;
          arrSuggestPay.push({
            key: index + 2,
            Stt: index + 2,
            bill_work_suggest_pay: bill_work_suggest_pay,
            bill_total_suggest_pay: bill_total_suggest_pay,
            bill_density_suggest_pay: bill_density_suggest_pay,
          });
        } else {
          let bill_work_collect = key;
          let bill_total_collect = 0;
          let bill_density_collect = "1,5%";

          let bill_suggest_work_collect = key;
          let bill_suggest_total_collect = 0;
          let bill_suggest_density_collect = "1,5%";

          data.map((item) => {
            if (item.bill_action == "Thực hiện") {
              if (item.bill_work == key) {
                bill_total_collect += parseInt(item.bill_total);
              }
            } else {
              if (item.bill_work == key) {
                bill_suggest_total_collect += parseInt(item.bill_total);
              }
            }
          });

          arrCollect.push({
            key: index + 2,
            Stt: index + 2,
            bill_work_collect: bill_work_collect,
            bill_total_collect: bill_total_collect,
            bill_density_collect: bill_density_collect,
          });

          arrSuggestCollect.push({
            key: index + 2,
            Stt: index + 2,
            bill_work_suggest_collect: bill_suggest_work_collect,
            bill_total_suggest_collect: bill_suggest_total_collect,
            bill_density_suggest_collect: bill_suggest_density_collect,
          });
        }
      });

      arrPay.map((item) => {
        totalMoney_pay += parseInt(item.bill_total_pay);
      });

      arrPay.unshift({
        key: 1,
        Stt: 1,
        bill_work_pay: "Tổng tiền",
        bill_total_pay: totalMoney_pay,
        bill_density_pay: "100%",
      });
      setDataPay(arrPay);

      arrSuggestPay.map((item) => {
        totalMoney_suggest_pay += parseInt(item.bill_total_suggest_pay);
      });

      arrSuggestPay.unshift({
        key: 1,
        Stt: 1,
        bill_work_suggest_pay: "Tổng tiền",
        bill_total_suggest_pay: totalMoney_suggest_pay,
        bill_density_suggest_pay: "100%",
      });
      setDataSuggestPay(arrSuggestPay);

      arrCollect.map((item) => {
        totalMoney_collect += parseInt(item.bill_total_collect);
      });

      arrCollect.unshift({
        key: 1,
        Stt: 1,
        bill_work_collect: "Tổng tiền",
        bill_total_collect: totalMoney_collect,
        bill_density_collect: "100%",
      });

      setDataCollect(arrCollect);

      arrSuggestCollect.map((item) => {
        totalMoney_suggest_collect += parseInt(item.bill_total_suggest_collect);
      });

      arrSuggestCollect.unshift({
        key: 1,
        Stt: 1,
        bill_work_suggest_collect: "Tổng tiền",
        bill_total_suggest_collect: totalMoney_suggest_collect,
        bill_density_suggest_collect: "100%",
      });

      setDataSuggestCollect(arrSuggestCollect);
    } else {
      showError("Có lỗi xảy ra");
    }
  };

  // Hàm gọi dữ liệu thu chi về

  const getDataBill = async () => {
    let filter = [
      dayjs()
        .add(-60, "d")
        .format("YYYY-MM-DD"),
      dayjs()
        .add(+60, "d")
        .format("YYYY-MM-DD"),
    ];
    setFilterDate({
      from: filter[0],
      to: filter[1],
    });
    let response = await getPayAndCollect({
      from: filter[0],
      to: filter[1],
    });

    if (response.status == 200) {
      const { data } = response;
      let arrKey_bill_work = [];
      let totalMoney_pay = 0;
      let totalMoney_collect = 0;
      let totalMoney_suggest_pay = 0;
      let totalMoney_suggest_collect = 0;

      data?.map((item) => {
        if (
          !arrKey_bill_work.some((key) => {
            return key == item.bill_work;
          })
        ) {
          arrKey_bill_work.push(item.bill_work);
        }
      });

      let listbill_collect = [
        "Thu tiền bán hàng",
        "Thu tiền bán tài nguyên",
        "Thu tiền khác",
        "Thu tiền đi vay",
      ];
      let arrPay = [];
      let arrSuggestPay = [];
      let arrCollect = [];
      let arrSuggestCollect = [];
      arrKey_bill_work.map((key, index) => {
        if (listbill_collect.indexOf(key) == -1) {
          let bill_work_pay = key;
          let bill_total_pay = 0;
          let bill_density_pay = "1,5%";

          let bill_work_suggest_pay = key;
          let bill_total_suggest_pay = 0;
          let bill_density_suggest_pay = "1,5%";

          data.map((item) => {
            if (item.bill_action == "Thực hiện") {
              if (item.bill_work == key) {
                bill_total_pay += parseInt(item.bill_total);
              }
            } else {
              if (item.bill_work == key) {
                bill_total_suggest_pay += parseInt(item.bill_total);
              }
            }
          });
          //bill_density_pay= parseInt(bill_total_pay/totalMoney_suggest_pay);
          arrPay.push({
            key: index + 2,
            Stt: index + 2,
            bill_work_pay: bill_work_pay,
            bill_total_pay: bill_total_pay,
            bill_density_pay: bill_density_pay,
          });

          arrSuggestPay.push({
            key: index + 2,
            Stt: index + 2,
            bill_work_suggest_pay: bill_work_suggest_pay,
            bill_total_suggest_pay: bill_total_suggest_pay,
            bill_density_suggest_pay: bill_density_suggest_pay,
          });
        } else {
          let bill_work_collect = key;
          let bill_total_collect = 0;
          let bill_density_collect = "1,5%";

          let bill_suggest_work_collect = key;
          let bill_suggest_total_collect = 0;
          let bill_suggest_density_collect = "1,5%";

          data.map((item) => {
            if (item.bill_action == "Thực hiện") {
              if (item.bill_work == key) {
                bill_total_collect += parseInt(item.bill_total);
              }
            } else {
              if (item.bill_work == key) {
                bill_suggest_total_collect += parseInt(item.bill_total);
              }
            }
          });

          arrCollect.push({
            key: index + 2,
            Stt: index + 2,
            bill_work_collect: bill_work_collect,
            bill_total_collect: bill_total_collect,
            bill_density_collect: bill_density_collect,
          });

          arrSuggestCollect.push({
            key: index + 2,
            Stt: index + 2,
            bill_work_suggest_collect: bill_suggest_work_collect,
            bill_total_suggest_collect: bill_suggest_total_collect,
            bill_density_suggest_collect: bill_suggest_density_collect,
          });
        }
      });

      arrPay.map((item) => {
        totalMoney_pay += parseInt(item.bill_total_pay);
      });

      arrPay.unshift({
        key: 1,
        Stt: 1,
        bill_work_pay: "Tổng tiền",
        bill_total_pay: totalMoney_pay,
        bill_density_pay: "100%",
      });

      setDataPay(arrPay);

      arrSuggestPay.map((item) => {
        totalMoney_suggest_pay += parseInt(item.bill_total_suggest_pay);
      });

      arrSuggestPay.unshift({
        key: 1,
        Stt: 1,
        bill_work_suggest_pay: "Tổng tiền",
        bill_total_suggest_pay: totalMoney_suggest_pay,
        bill_density_suggest_pay: "100%",
      });

      setDataSuggestPay(arrSuggestPay);

      arrCollect.map((item) => {
        totalMoney_collect += parseInt(item.bill_total_collect);
      });

      arrCollect.unshift({
        key: 1,
        Stt: 1,
        bill_work_collect: "Tổng tiền",
        bill_total_collect: totalMoney_collect,
        bill_density_collect: "100%",
      });
      arrCollect.result_pay =
        parseInt(totalMoney_pay) - parseInt(totalMoney_collect);
      setDataCollect(arrCollect);

      arrSuggestCollect.map((item) => {
        totalMoney_suggest_collect += parseInt(item.bill_total_suggest_collect);
      });

      arrSuggestCollect.unshift({
        key: 1,
        Stt: 1,
        bill_work_suggest_collect: "Tổng tiền",
        bill_total_suggest_collect: totalMoney_suggest_collect,
        bill_density_suggest_collect: "100%",
      });

      arrSuggestCollect.result_suggest_pay =
        parseInt(totalMoney_suggest_pay) - parseInt(totalMoney_suggest_collect);
      setDataSuggestCollect(arrSuggestCollect);
    } else {
      showError("Có lỗi xảy ra");
    }
  };

  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  // Upload ảnh
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState();

  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleChange = async ({ fileList }) => {
    setFileList(fileList);
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  // Những hàm được gọi trong useEffect sẽ được chạy lần đầu khi vào trang
  useEffect(() => {
    getDataBill();
    gettooldata();
  }, []);

  return (
    <div>
      {["Giám đốc", "Phó Giám đốc", "Trưởng phòng"].indexOf(users_function) !==
      -1 ? (
        <Card>
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="BÁO CÁO THU CHI" key="1">
              <Row gutter={[24, 0]}>
                <Col xs={24} xl={12} className="mb-24">
                  <Card
                    title={
                      <strong
                        style={{
                          color: "#18a689",
                        }}
                      >
                        BẢNG ĐỀ XUẤT
                      </strong>
                    }
                    extra={
                      <>
                        <Row gutter={[24, 0]}>
                          <Col xs={16} xl={16} className="mb-24">
                            <RangePicker
                              size="large"
                              presets={rangePresets}
                              onChange={onRangeChange}
                              defaultValue={[
                                dayjs().add(-30, "d"),
                                dayjs().add(30, "d"),
                              ]}
                            />
                          </Col>
                          <Col xs={8} xl={8} className="mb-24">
                            <Button
                              style={{
                                background: "#18a689",
                                color: "white",
                              }}
                              onClick={() => handleFilter()}
                            >
                              Kết quả
                            </Button>
                          </Col>
                        </Row>
                      </>
                    }
                  >
                    <Divider>
                      {"BẢNG ĐỀ XUẤT CHI: " +
                        VND.format(
                          data_suggest_collect?.result_suggest_pay
                        )}{" "}
                    </Divider>
                    <Table
                      columns={columns_suggest_pay}
                      dataSource={data_suggest_pay}
                      size="middle"
                    />
                    <Divider>BẢNG ĐỀ XUẤT THU </Divider>
                    <Table
                      columns={columns_suggest_collect}
                      dataSource={data_suggest_collect}
                      size="middle"
                    />
                  </Card>
                </Col>
                <Col xs={24} xl={12} className="mb-24">
                  <Card
                    title={
                      <strong
                        style={{
                          color: "#1890FD",
                        }}
                      >
                        BẢNG THU CHI
                      </strong>
                    }
                  >
                    <Divider>
                      {" "}
                      {"BẢNG CHI TIỀN: " + VND.format(data_collect?.result_pay)}
                    </Divider>
                    <Table
                      columns={columns_pay}
                      dataSource={data_pay}
                      size="middle"
                    />
                    <Divider>BẢNG THU TIỀN</Divider>
                    <Table
                      columns={columns_collect}
                      dataSource={data_collect}
                      size="middle"
                    />
                  </Card>
                </Col>
              </Row>
            </Tabs.TabPane>
            <Tabs.TabPane tab="TẠO HÓA ĐƠN" key="2">
              <Row gutter={[24, 0]}>
                <Col xs={24} xl={12} className="mb-24">
                  <Card
                    title={
                      <strong
                        style={{
                          color: "#1890FD",
                        }}
                      >
                        TẠO HÓA ĐƠN THU CHI
                      </strong>
                    }
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
                          Tạo hóa đơn
                        </Button>
                        {/* <Button onClick={() => test()}>Test</Button> */}
                      </>
                    }
                  >
                    <Form
                      form={form}
                      name="basic"
                      autoComplete="off"
                      size="large"
                      onFinish={onFinish}
                      initialValues={{
                        bill_date: dayjs(),
                        bill_expiry_date: dayjs(),
                        bill_type: "Phiếu chi",
                        bill_action: "Đề xuất",
                        bill_owner: "Phòng sản xuất",
                        bill_employee: "Khắc Liêm",
                        bill_payment: "0",
                        bill_debt: "0",
                      }}
                    >
                      <Row gutter={[24, 0]}>
                        <Col xs={12} xl={8} className="mb-24">
                          <Form.Item label="Ngày tháng" name="bill_date">
                            <DatePicker
                              style={{ float: "right" }}
                              format="YYYY-MM-DD"
                            />
                          </Form.Item>
                        </Col>
                        <Col xs={12} xl={8} className="mb-24">
                          <Form.Item label="Hạng mục" name="bill_type">
                            <Select
                              optionlabelprop="label"
                              onChange={rendertype}
                            >
                              <Option value="Phiếu chi" label="Phiếu chi">
                                <div className="demo-option-label-item">
                                  Phiếu chi
                                </div>
                              </Option>
                              <Option value="Phiếu thu" label="Phiếu thu">
                                <div className="demo-option-label-item">
                                  Phiếu thu
                                </div>
                              </Option>
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col xs={12} xl={8} className="mb-24">
                          <Form.Item label="Hành động" name="bill_action">
                            <Select optionlabelprop="label">
                              <Option value="Đề xuất" label="Đề xuất">
                                <div className="demo-option-label-item">
                                  Đề xuất
                                </div>
                              </Option>
                              <Option value="Thực hiện" label="Thực hiện">
                                <div className="demo-option-label-item">
                                  Thực hiện
                                </div>
                              </Option>
                            </Select>
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row gutter={[24, 0]}>
                        <Col xs={12} xl={8} className="mb-24">
                          <Form.Item label="Phòng ban" name="bill_owner">
                            <Select optionlabelprop="label">
                              {listselect_bill_owner.map((item, index) => {
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
                        <Col xs={12} xl={8} className="mb-24">
                          <Form.Item label="Nhân viên" name="bill_employee">
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

                        <Col xs={12} xl={8} className="mb-24">
                          <Form.Item label="NCC" name="bill_supplier">
                            <Mentions
                              style={{
                                width: "100%",
                              }}
                              size="large"
                              autoSize="true"
                              prefix={["@", "#"]}
                              onSearch={onSearch}
                              options={(MOCK_DATA[prefix] || []).map(
                                (value) => ({
                                  key: value,
                                  value,
                                  label: value,
                                })
                              )}
                            />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row gutter={[24, 0]}>
                        <Col xs={12} xl={8} className="mb-24">
                          <Form.Item
                            label="Điện thoại"
                            name="bill_contact_phone"
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col xs={12} xl={8} className="mb-24">
                          <Form.Item label="Web" name="bill_contact_social1">
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col xs={0} xl={8} className="mb-24">
                          <Form.Item label="Social" name="bill_contact_social2">
                            <Input />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row gutter={[24, 0]}>
                        <Col xs={12} xl={8} className="mb-24">
                          <Form.Item label="Thanh toán" name="bill_payment">
                            <InputNumber
                              style={{
                                width: "100%",
                              }}
                              step="10000"
                              formatter={(value) =>
                                ` ${value}`.replace(
                                  /\B(?=(\d{3})+(?!\d))/g,
                                  ","
                                )
                              }
                              parser={(value) =>
                                value.replace(/\$\s?|(,*)/g, "")
                              }
                              onChange={renderpayment}
                            />
                          </Form.Item>
                        </Col>
                        <Col xs={0} xl={8} className="mb-24">
                          <Form.Item label="Công nợ" name="bill_debt">
                            <InputNumber
                              style={{
                                width: "100%",
                              }}
                              formatter={(value) =>
                                ` ${value}`.replace(
                                  /\B(?=(\d{3})+(?!\d))/g,
                                  ","
                                )
                              }
                              parser={(value) =>
                                value.replace(/\$\s?|(,*)/g, "")
                              }
                              disabled
                            />
                          </Form.Item>
                        </Col>
                        <Col xs={12} xl={8} className="mb-24">
                          <Form.Item label="Thời hạn" name="bill_expiry_date">
                            <DatePicker
                              style={{ float: "right" }}
                              format="YYYY-MM-DD"
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row gutter={[24, 0]}>
                        <Col span={24}>
                          <Form.Item label="Ghi chú" name="bill_note">
                            <Input placeholder="input here" />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row gutter={[24, 0]}>
                        <Form.Item name="bill_image_url">
                          <Upload
                            multiple
                            listType="picture-card"
                            action="https://backend.penda.vn/api/files"
                            fileList={fileList}
                            onPreview={handlePreview}
                            onChange={handleChange}
                          >
                            {uploadButton}
                          </Upload>
                        </Form.Item>
                      </Row>
                    </Form>
                  </Card>
                </Col>
                <Col xs={24} xl={12} className="mb-24">
                  <Card
                    title={
                      <strong
                        style={{
                          color: "#1890FD",
                        }}
                      >
                        CHI TIẾT HÀNG HÓA
                      </strong>
                    }
                  >
                    <Form
                      form={formProduct}
                      name="basic"
                      autoComplete="off"
                      size="large"
                      initialValues={{
                        bill_work: "Mua device, proxy & gia hạn",
                        bill_number: "0",
                        bill_price: "0",
                        bill_total: "0",
                      }}
                    >
                      <Row gutter={[24, 0]}>
                        <Col xs={24} xl={12} className="mb-24">
                          <Form.Item label="Công việc" name="bill_work">
                            <Select optionlabelprop="label">
                              {listselect_bill_work_new.map((item, index) => {
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
                        <Col xs={24} xl={12} className="mb-24">
                          <Form.Item label="Nội dung" name="bill_content">
                            <Input placeholder="Mua key tháng 12" />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row gutter={[24, 0]}>
                        <Col xs={12} xl={8} className="mb-24">
                          <Form.Item label="Số lượng" name="bill_number">
                            <InputNumber
                              style={{
                                width: "100%",
                              }}
                              size="large"
                              placeholder="1000"
                              onChange={renderTotalMoney}
                            />
                          </Form.Item>
                        </Col>
                        <Col xs={12} xl={8} className="mb-24">
                          <Form.Item label="Giá tiền" name="bill_price">
                            <InputNumber
                              style={{
                                width: "100%",
                              }}
                              step="10000"
                              size="large"
                              formatter={(value) =>
                                ` ${value}`.replace(
                                  /\B(?=(\d{3})+(?!\d))/g,
                                  ","
                                )
                              }
                              parser={(value) =>
                                value.replace(/\$\s?|(,*)/g, "")
                              }
                              onChange={renderTotalMoney}
                            />
                          </Form.Item>
                        </Col>
                        <Col xs={12} xl={8} className="mb-24">
                          <Form.Item label="Thành tiền" name="bill_total">
                            <InputNumber
                              style={{
                                width: "100%",
                              }}
                              size="large"
                              formatter={(value) =>
                                ` ${value} đ`.replace(
                                  /\B(?=(\d{3})+(?!\d))/g,
                                  ","
                                )
                              }
                              parser={(value) =>
                                value.replace(/\$\s?|(,*)/g, "")
                              }
                              disabled
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Form>
                  </Card>
                </Col>
              </Row>
            </Tabs.TabPane>

            <Tabs.TabPane tab="HƯỚNG DẪN" key="3">
              <CKEditor
                editor={ClassicEditor}
                data="<p>Hello from CKEditor 5!</p>"
                config={{
                  ckfinder: {
                    uploadUrl: "https://backend.penda.vn/api/files",
                  },
                }}
                onReady={(editor) => {
                  // You can store the "editor" and use when it is needed.
                  console.log("Editor is ready to use!", editor);
                }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setContent(data);
                  console.log({ event, editor, data });
                }}
                onBlur={(event, editor) => {
                  console.log("Blur.", editor);
                }}
                onFocus={(event, editor) => {
                  console.log("Focus.", editor);
                }}
              />
              <div dangerouslySetInnerHTML={{ __html: content }}></div>
            </Tabs.TabPane>
          </Tabs>
          <Modal
            open={previewOpen}
            title={previewTitle}
            footer={null}
            onCancel={handleCancel}
          >
            <img alt="example" style={{ width: "100%" }} src={previewImage} />
          </Modal>
        </Card>
      ) : null}
    </div>
  );
};

export default Bill_class;
