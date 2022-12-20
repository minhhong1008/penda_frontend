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
  Collapse,
  Space,
  TreeSelect,
} from "antd";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCountEtsy } from "../../api/etsy/index";
const Etsy_class = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const columns = [
    {
      title: "Lớp",
      dataIndex: "class",
      key: "class",
      render: (text) => (
        <a
          onClick={() =>
            history.push(`etsy_class/table?class=${encodeURIComponent(text)}`)
          }
        >
          {text}
        </a>
      ),
    },
    {
      title: "TỔNG TÀI KHOẢN",
      dataIndex: "etsy_count",
      key: "etsy_count",
    },
    {
      title: "ĐÃ HOÀN THÀNH",
      dataIndex: "content_complete",
      key: "content_complete",
    },
    {
      title: "CẦN KIỂM TRA",
      dataIndex: "content_check",
      key: "content_check",
    },
    {
      title: "CẦN THỰC HIỆN",
      dataIndex: "content_action",
      key: "content_action",
    },
  ];
  const baseData = [
    {
      key: "1",
      class: "Lớp 1",
      etsy_count: "0",
      content_complete: "Đã đầy đủ tài nguyên",
      content_check: "Kiểm tra tài nguyên",
      content_action: "Reg mail, or login mail --> chuyển Lớp 2",
    },
    {
      key: "2",
      class: "Lớp 2",
      etsy_count: "0",
      content_complete: "Đã có mail",
      content_check: "Kiểm tra mail",
      content_action:
        "Change info mail, mail recover, mail forward, avatar, verify, bảo mật --> chuyển Lớp 3",
    },
    {
      key: "3",
      class: "Lớp 3",
      etsy_count: "0",
      content_complete: "Hoàn thành Mail",
      content_check: "Kiểm tra mail",
      content_action: "Tạo Buyer  --> Chuyển lớp 4",
    },
    {
      key: "4",
      class: "Lớp 4",
      etsy_count: "0",
      content_complete: "Đã có Buyer",
      content_check: "Kiểm tra mail, buyer",
      content_action:
        "Change avatar, add cart, add Like, add adress--> Chuyển lớp 5",
    },
    {
      key: "5",
      class: "Lớp 5",
      etsy_count: "0",
      content_complete:
        "tao mail  thay đổi thông tin infor ( họ tên, mk, mail kp)",
      content_check: "Thêm sdt, mail forword",
      content_action: "Thêm sdt, mail forword",
    },
    {
      key: "6",
      class: "Lớp 6",
      etsy_count: "0",
      content_complete:
        "tao mail  thay đổi thông tin infor ( họ tên, mk, mail kp)",
      content_check: "Thêm sdt, mail forword",
      content_action: "Thêm sdt, mail forword",
    },
    {
      key: "7",
      class: "Lớp 7",
      etsy_count: "0",
      content_complete:
        "tao mail  thay đổi thông tin infor ( họ tên, mk, mail kp)",
      content_check: "Thêm sdt, mail forword",
      content_action: "Thêm sdt, mail forword",
    },
    {
      key: "8",
      class: "Lớp 8",
      etsy_count: "0",
      content_complete:
        "tao mail  thay đổi thông tin infor ( họ tên, mk, mail kp)",
      content_check: "Thêm sdt, mail forword",
      content_action: "Thêm sdt, mail forword",
    },
    {
      key: "9",
      class: "Lớp 9",
      etsy_count: "0",
      content_complete:
        "tao mail  thay đổi thông tin infor ( họ tên, mk, mail kp)",
      content_check: "Thêm sdt, mail forword",
      content_action: "Thêm sdt, mail forword",
    },
    {
      key: "10",
      class: "Lớp 10",
      etsy_count: "0",
      content_complete:
        "tao mail  thay đổi thông tin infor ( họ tên, mk, mail kp)",
      content_check: "Thêm sdt, mail forword",
      content_action: "Thêm sdt, mail forword",
    },
    {
      key: "11",
      class: "Lớp 11",
      etsy_count: "0",
      content_complete:
        "tao mail  thay đổi thông tin infor ( họ tên, mk, mail kp)",
      content_check: "Thêm sdt, mail forword",
      content_action: "Thêm sdt, mail forword",
    },
    {
      key: "12",
      class: "Lớp 12",
      etsy_count: "0",
      content_complete:
        "tao mail  thay đổi thông tin infor ( họ tên, mk, mail kp)",
      content_check: "Thêm sdt, mail forword",
      content_action: "Thêm sdt, mail forword",
    },
    {
      key: "13",
      class: "Lớp 13",
      etsy_count: "0",
      content_complete:
        "tao mail  thay đổi thông tin infor ( họ tên, mk, mail kp)",
      content_check: "Thêm sdt, mail forword",
      content_action: "Thêm sdt, mail forword",
    },
    {
      key: "14",
      class: "Lớp 14",
      etsy_count: "0",
      content_complete:
        "tao mail  thay đổi thông tin infor ( họ tên, mk, mail kp)",
      content_check: "Thêm sdt, mail forword",
      content_action: "Thêm sdt, mail forword",
    },
    {
      key: "15",
      class: "Lớp 15",
      etsy_count: "0",
      content_complete:
        "tao mail  thay đổi thông tin infor ( họ tên, mk, mail kp)",
      content_check: "Thêm sdt, mail forword",
      content_action: "Thêm sdt, mail forword",
    },
    {
      key: "16",
      class: "Lớp 16",
      etsy_count: "0",
      content_complete:
        "tao mail  thay đổi thông tin infor ( họ tên, mk, mail kp)",
      content_check: "Thêm sdt, mail forword",
      content_action: "Thêm sdt, mail forword",
    },
    {
      key: "17",
      class: "Lớp 17",
      etsy_count: "0",
      content_complete:
        "tao mail  thay đổi thông tin infor ( họ tên, mk, mail kp)",
      content_check: "Thêm sdt, mail forword",
      content_action: "Thêm sdt, mail forword",
    },
    {
      key: "18",
      class: "Lớp 18",
      etsy_count: "0",
      content_complete:
        "tao mail  thay đổi thông tin infor ( họ tên, mk, mail kp)",
      content_check: "Thêm sdt, mail forword",
      content_action: "Thêm sdt, mail forword",
    },
    {
      key: "19",
      class: "Lớp 19",
      etsy_count: "0",
      content_complete:
        "tao mail  thay đổi thông tin infor ( họ tên, mk, mail kp)",
      content_check: "Thêm sdt, mail forword",
      content_action: "Thêm sdt, mail forword",
    },
    {
      key: "20",
      class: "Lớp 20",
      etsy_count: "0",
      content_complete:
        "tao mail  thay đổi thông tin infor ( họ tên, mk, mail kp)",
      content_check: "Thêm sdt, mail forword",
      content_action: "Thêm sdt, mail forword",
    },
    {
      key: "21",
      class: "Lớp 21",
      etsy_count: "0",
      content_complete:
        "tao mail  thay đổi thông tin infor ( họ tên, mk, mail kp)",
      content_check: "Thêm sdt, mail forword",
      content_action: "Thêm sdt, mail forword",
    },
    {
      key: "22",
      class: "Lớp 22",
      etsy_count: "0",
      content_complete:
        "tao mail  thay đổi thông tin infor ( họ tên, mk, mail kp)",
      content_check: "Thêm sdt, mail forword",
      content_action: "Thêm sdt, mail forword",
    },
    {
      key: "23",
      class: "Lớp 23",
      etsy_count: "0",
      content_complete:
        "tao mail  thay đổi thông tin infor ( họ tên, mk, mail kp)",
      content_check: "Thêm sdt, mail forword",
      content_action: "Thêm sdt, mail forword",
    },
    {
      key: "24",
      class: "Lớp 24",
      etsy_count: "0",
      content_complete:
        "tao mail  thay đổi thông tin infor ( họ tên, mk, mail kp)",
      content_check: "Thêm sdt, mail forword",
      content_action: "Thêm sdt, mail forword",
    },
    {
      key: "25",
      class: "Lớp 25",
      etsy_count: "0",
      content_complete:
        "tao mail  thay đổi thông tin infor ( họ tên, mk, mail kp)",
      content_check: "Thêm sdt, mail forword",
      content_action: "Thêm sdt, mail forword",
    },
  ]

  const [dataClass, setDataClass] = useState();

  const countEtsy = async () => {
    
    let { data } = await getCountEtsy();
    console.log(data)
    baseData.forEach((item) => {
      data?.data?.forEach((data) => {
        if (data._id == item.class) {
          console.log(item.class)
          item.etsy_count = data.count.toString();
        }
      });
    });
    setDataClass(baseData);
  };

  useEffect(() => {
    countEtsy();
  }, []);

  return (
    <div>
      <Card title="BẢNG TÀI KHOẢN THEO LỚP ETSY">
        <Card type="inner">
          <Table
            columns={columns}
            dataSource={dataClass}
            pagination={{
              pageSizeOptions: [
                "10",
                "20",
                "30",
                "50",
                "100",
                "0",
                "300",
                "500",
                "1000",
                "00",
              ],
              position: ["bottomRight", "topRight"],
              showSizeChanger: true,
              defaultPageSize: 100,
            }}
          ></Table>
        </Card>
      </Card>
    </div>
  );
};

export default Etsy_class;
