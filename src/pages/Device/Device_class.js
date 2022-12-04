import { Card, Space, Table, Tag } from "antd";
import React from "react";
import { useHistory } from "react-router-dom";

const Device_class = () => {
  const history = useHistory();
  const columns = [
    {
      title: "Lớp",
      dataIndex: "class",
      key: "class",
      render: (text) => <a onClick={() => history.push("device_class/table")}>{text}</a>,
    },
    {
      title: "Nội dung",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "Tổng tài khoản",
      dataIndex: "count_account",
      key: "count_account",
    },
    {
      title: "device VN",
      dataIndex: "device_vn",
      key: "device_vn",
    },
    {
      title: "device US",
      dataIndex: "device_us",
      key: "device_us",
    },
  ];
  const data = [
    {
      key: "1",
      class: "Lớp 1 new",
      content: "Setup máy",
      count_account: "334",
      device_vn: "334",
      device_us: "0",
    },
    {
        key: "2",
        class: "Lớp 2",
        content: "( phải có chrome và info) change file infoacc.txt",
        count_account: "334",
        device_vn: "334",
        device_us: "0",
      },
      {
        key: "3",
        class: "Lớp 3",
        content: "Dang nhap Gmail forword, , doc báo dan trí... device...",
        count_account: "334",
        device_vn: "334",
        device_us: "0",
      },
  ];
  return (
    <div>
      <Card title="BẢNG TÀI KHOẢN THEO LỚP device VN">
        <Card type="inner">
          <Table columns={columns} dataSource={data}></Table>
        </Card>
      </Card>
    </div>
  );
};

export default Device_class;
