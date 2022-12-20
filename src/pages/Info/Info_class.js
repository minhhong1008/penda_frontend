import { Card, Space, Table, Tag } from "antd";
import React from "react";
import { useHistory } from "react-router-dom";

const Info_class = () => {
  const history = useHistory();
  const columns = [
    {
      title: "Lớp",
      dataIndex: "class",
      key: "class",
      render: (text) => <a onClick={() => history.push(`info_class/table?class=${encodeURIComponent(text)}`)}>{text}</a>,
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
      title: "info VN",
      dataIndex: "info_vn",
      key: "info_vn",
    },
    {
      title: "info US",
      dataIndex: "info_us",
      key: "info_us",
    },
  ];
  const data = [
    {
      key: "1",
      class: "Lớp 1",
      content: "Info VN mới",
      count_account: "334",
      info_vn: "334",
      info_us: "0",
    },
    {
        key: "2",
        class: "Lớp 2",
        content: "Info US mới",
        count_account: "334",
        info_vn: "334",
        info_us: "0",
      },
      {
        key: "3",
        class: "Lớp 3",
        content: "Info VN đang dùng",
        count_account: "334",
        info_vn: "334",
        info_us: "0",
      },
      {
        key: "4",
        class: "Lớp 4",
        content: "Info US đang dùng",
        count_account: "334",
        info_vn: "334",
        info_us: "0",
      },
      {
        key: "5",
        class: "Lớp 5",
        content: "Info VN lưu trữ",
        count_account: "334",
        info_vn: "334",
        info_us: "0",
      },
      {
        key: "6",
        class: "Lớp 6",
        content: "Info US lưu trữ",
        count_account: "334",
        info_vn: "334",
        info_us: "0",
      },
      {
        key: "7",
        class: "Lớp 7",
        content: "Info VN đã bán",
        count_account: "334",
        info_vn: "334",
        info_us: "0",
      },
      {
        key: "8",
        class: "Lớp 8",
        content: "Info US đã bán",
        count_account: "334",
        info_vn: "334",
        info_us: "0",
      },
      {
        key: "9",
        class: "Lớp 9 UpSeller",
        content: "",
        count_account: "334",
        info_vn: "334",
        info_us: "0",
      },
  ];
  return (
    <div>
      <Card title="BẢNG TÀI KHOẢN THEO LỚP INFO VN">
        <Card type="inner">
          <Table columns={columns} dataSource={data}></Table>
        </Card>
      </Card>
    </div>
  );
};

export default Info_class;
