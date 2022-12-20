import { Card, Space, Table, Tag } from "antd";
import React from "react";
import { useHistory } from "react-router-dom";

const Ebayitem_class = () => {
  const history = useHistory();
  const columns = [
    {
      title: "Lớp",
      dataIndex: "class",
      key: "class",
      render: (text) => <a onClick={() => history.push(`ebayitem_class/table?class=${encodeURIComponent(text)}`)}>{text}</a>,
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
      title: "Ebayitem VN",
      dataIndex: "ebayitem_vn",
      key: "ebayitem_vn",
    },
    {
      title: "Ebayitem US",
      dataIndex: "ebayitem_us",
      key: "ebayitem_us",
    },
  ];
  const data = [
    {
      key: "1",
      class: "Lớp 1",
      content: "Đăng nhập mail, tao mail  thay đổi thông tin infor ( họ tên, mk, mail kp)",
      count_account: "334",
      ebayitem_vn: "334",
      ebayitem_us: "0",
    },
    {
        key: "2",
        class: "Lớp 2",
        content: "Thêm sdt, mail forword ,check info mail live chuyển lớp 3",
        count_account: "334",
        ebayitem_vn: "334",
        ebayitem_us: "0",
      },
      {
        key: "3",
        class: "Lớp 3",
        content: "Tao ebayitem, etsy, shopee chuyển lớp 4 ( lỗi các các loại acc )",
        count_account: "334",
        ebayitem_vn: "334",
        ebayitem_us: "0",
      },
      {
        key: "4",
        class: "Lớp 4",
        content: "add địa chỉ  Verify mail & Phone ebayitem, kiểm tra etsy , shoppe  ok  chuyển lớp 5",
        count_account: "334",
        ebayitem_vn: "334",
        ebayitem_us: "0",
      },
      {
        key: "5",
        class: "Lớp 5",
        content: "Tao payoneer , ok  chuyển lớp 6 ( ko tạo po chuyển lớp 3 )",
        count_account: "334",
        ebayitem_vn: "334",
        ebayitem_us: "0",
      },
      {
        key: "6",
        class: "Lớp 6",
        content: "tạo tài khoản chưa có  shopee, amazon paypal , lên seller etsy, chuyển lớp 7",
        count_account: "334",
        ebayitem_vn: "334",
        ebayitem_us: "0",
      },
      {
        key: "7",
        class: "Lớp 7",
        content: "đã lên seller etsy, cbi cccd để vào desktop, check ip",
        count_account: "334",
        ebayitem_vn: "334",
        ebayitem_us: "0",
      },
      {
        key: "8",
        class: "Lớp 8 UpSeller",
        content: "Up seller,Tao drap  ( check ip khi duyệt ip mới cho lên ), up cmt, Vào po",
        count_account: "334",
        ebayitem_vn: "334",
        ebayitem_us: "0",
      },
      {
        key: "9",
        class: "Lớp 9",
        content: "List 1 lây sp ở đâu ? anh chụp , chuyển lên diver list dạng nào ? bao nhiieu ngày list 2",
        count_account: "334",
        ebayitem_vn: "334",
        ebayitem_us: "0",
      },
      {
        key: "10",
        class: "Lớp 10",
        content: "List 2",
        count_account: "334",
        ebayitem_vn: "334",
        ebayitem_us: "0",
      },
      {
        key: "11",
        class: "Lớp 11",
        content: "List 3",
        count_account: "334",
        ebayitem_vn: "334",
        ebayitem_us: "0",
      },
      {
        key: "12",
        class: "Lớp 12 Chuyển",
        content: "Bán Acc vào Myebayitem",
        count_account: "334",
        ebayitem_vn: "334",
        ebayitem_us: "0",
      },
  ];
  return (
    <div>
      <Card title="BẢNG TÀI KHOẢN THEO LỚP EBAY VN">
        <Card type="inner">
          <Table columns={columns} dataSource={data}></Table>
        </Card>
      </Card>
    </div>
  );
};

export default Ebayitem_class;
