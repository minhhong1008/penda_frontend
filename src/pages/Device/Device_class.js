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
      render: (text) => <a onClick={() => history.push(`device_class/table?class=${encodeURIComponent(text)}`)}>{text}</a>,
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
      class: "PC 1",
      content: "Máy tính 01",
      count_account: "100",
      device_vn: "100",
      device_us: "0",
    },
    {
        key: "2",
        class: "PC 2",
        content: "Máy tính 02",
        count_account: "100",
        device_vn: "100",
        device_us: "0",
      },
      {
        key: "3",
        class: "PC 3",
        content: "Máy tính 03",
        count_account: "100",
        device_vn: "100",
        device_us: "0",
      },
      {
        key: "4",
        class: "PC 4",
        content: "Máy tính 04",
        count_account: "100",
        device_vn: "100",
        device_us: "0",
      },
      {
        key: "5",
        class: "PC 5",
        content: "Máy tính 05",
        count_account: "100",
        device_vn: "100",
        device_us: "0",
      },
      {
        key: "6",
        class: "PC 6",
        content: "Máy tính 06",
        count_account: "100",
        device_vn: "100",
        device_us: "0",
      },
      {
        key: "7",
        class: "PC 7",
        content: "Máy tính 07",
        count_account: "100",
        device_vn: "100",
        device_us: "0",
      },
      {
        key: "8",
        class: "PC 8",
        content: "Máy tính 08",
        count_account: "100",
        device_vn: "100",
        device_us: "0",
      },
      {
        key: "9",
        class: "PC 9",
        content: "Máy tính 09",
        count_account: "100",
        device_vn: "100",
        device_us: "0",
      },
      {
        key: "10",
        class: "PC 10",
        content: "Máy tính 10",
        count_account: "100",
        device_vn: "100",
        device_us: "0",
      },
      {
        key: "11",
        class: "PC 11",
        content: "Máy tính 11",
        count_account: "100",
        device_vn: "100",
        device_us: "0",
      },
      {
        key: "12",
        class: "PC 12",
        content: "Máy tính 12",
        count_account: "100",
        device_vn: "100",
        device_us: "0",
      },
      {
        key: "13",
        class: "PC 2",
        content: "Máy tính 13",
        count_account: "100",
        device_vn: "100",
        device_us: "0",
      },
      {
        key: "14",
        class: "PC 14",
        content: "Máy tính 14",
        count_account: "100",
        device_vn: "100",
        device_us: "0",
      },
      {
        key: "15",
        class: "PC 15",
        content: "Máy tính 15",
        count_account: "100",
        device_vn: "100",
        device_us: "0",
      },
      {
        key: "16",
        class: "PC 16",
        content: "Máy tính 16",
        count_account: "100",
        device_vn: "100",
        device_us: "0",
      },
      {
        key: "17",
        class: "PC 17",
        content: "Máy tính 17",
        count_account: "100",
        device_vn: "100",
        device_us: "0",
      },
      {
        key: "18",
        class: "PC 18",
        content: "Máy tính 18",
        count_account: "100",
        device_vn: "100",
        device_us: "0",
      },
      {
        key: "19",
        class: "PC 19",
        content: "Máy tính 19",
        count_account: "100",
        device_vn: "100",
        device_us: "0",
      },
      {
        key: "20",
        class: "PC 20",
        content: "Máy tính 20",
        count_account: "100",
        device_vn: "100",
        device_us: "0",
      },
      {
        key: "21",
        class: "PC 21",
        content: "Máy tính 21",
        count_account: "100",
        device_vn: "100",
        device_us: "0",
      },
      {
        key: "22",
        class: "PC 22",
        content: "Máy tính 22",
        count_account: "100",
        device_vn: "100",
        device_us: "0",
      },
  ];
  return (
    <div>
      <Card title="BẢNG TÀI KHOẢN THEO LỚP DEVICE VN">
        <Card type="inner">
          <Table columns={columns} dataSource={data}></Table>
        </Card>
      </Card>
    </div>
  );
};

export default Device_class;
