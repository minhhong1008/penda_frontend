//import React from 'react'
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
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getListebayActions } from "../../actions/ebayActions";

const Ebay_table = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const { ebays } = useSelector((state) => state.ebay);
  const class_name = urlParams.get("class");
  const dispatch = useDispatch();
  const history = useHistory();

  const columns = [
    {
      title: "STT",
      key: "index",
      render: (text, record, index) => index + 1,
    },
    {
      title: "#",
      dataIndex: "ebay_id",
      key: "ebay_id",
      render: (text, record) => (
        <a
          onClick={() =>
            history.push(`table/${encodeURIComponent(record.ebay_id)}`)
          }
        >
          {text}
        </a>
      ),
      sorter: (a, b) => {
        return a.ebay_id.localeCompare(b.ebay_id);
      },
    },
    {
      title: "TÀI KHOẢN",
      dataIndex: "ebay_user",
      key: "ebay_user",
      sorter: (a, b) => {
        return a.ebay_user.localeCompare(b.ebay_user);
      },
    },
    {
      title: "TIẾN TRÌNH",
      dataIndex: "ebay_processing",
      key: "ebay_processing",
      sorter: (a, b) => {
        return a.ebay_user.localeCompare(b.ebay_device);
      },
    },
    {
      title: "VẤN ĐỀ",
      dataIndex: "ebay_error",
      key: "ebay_error",
      sorter: (a, b) => {
        return a.ebay_user.localeCompare(b.ebay_class);
      },
    },

    {
      title: "NHÂN VIÊN",
      dataIndex: "ebay_employee",
      key: "ebay_employee",
      sorter: (a, b) => {
        return a.ebay_user.localeCompare(b.ebay_employee);
      },
    },

    {
      title: "GHI CHÚ",
      dataIndex: "ebay_note",
      key: "ebay_note",
      sorter: (a, b) => {
        return a.ebay_user.localeCompare(b.ebay_note);
      },
    },
  ];

  const handleChangeFilter = (values) => {
    let newValue = values.join(",");
    dispatch(
      getListebayActions({
        ebay_employee: newValue,
      })
    );
  };

  const getListEbay = () => {
    dispatch(
      getListebayActions({
        ebay_class: class_name,
      })
    );
  };

  useEffect(() => {
    getListEbay();
  }, [class_name]);

  return (
    <div>
      <Card>
      <Form.Item label="Lọc eBay">
            <TreeSelect
                mode="multiple"
                onChange={handleChangeFilter}
                multiple
                optionLabelProp="label"
                treeData={[
                  {
                    title: "Lớp",
                    value: "ebay_class",
                    children: [
                      { title: "Lớp 1", value: "Lớp 1" },
                      { title: "Lớp 2", value: "Lớp 2" },
                    ],
                  },
                  {
                    title: "Thiết bị",
                    value: "ebay_device",
                    children: [
                      { title: "PC06", value: "PC06" },
                      { title: "PC07", value: "PC07" },
                    ],
                  },
                  {
                    title: "Nhân viên",
                    value: "ebay_employee",
                    children: [
                      { title: "Nguyễn Hoài", value: "Nguyễn Hoài" },
                      { title: "Khắc Liêm", value: "Khắc Liêm" },
                    ],
                  },
                ]}
              />
            </Form.Item>
        <Tabs defaultActiveKey="1">

          <Tabs.TabPane tab="BẢNG LỚP EBAY" key="1">
            
            <Card type="inner">
              <Table
                columns={columns}
                dataSource={ebays}
                pagination={{
                  pageSizeOptions: [
                    "10",
                    "20",
                    "30",
                    "50",
                    "100",
                    "200",
                    "300",
                    "500",
                    "1000",
                    "2000",
                  ],
                  position: ["bottomRight", "topRight"],
                  showSizeChanger: true,
                  defaultPageSize: 100,
                  
                }}
              ></Table>
            </Card>
          </Tabs.TabPane>
          <Tabs.TabPane tab="HƯỚNG DẪN" key="2">
            <p>1. Ebay mã EB_12345</p>
            <p>
              1. Ebay được tạo từ tool - nhập liệu - Chọn EBAY, bảng bên cạnh
              nhập user|pass (user: là tên shop ebay chuẩn bị sẵn, có hướng dẫn
              tạo acc bên tool nhập liệu)
            </p>
            <p>
              2. Quy trình: là kế hoạch triển khai acc theo các yêu cầu định
              sẵn. Kế hoạch được tạo khi tạo mã Ebay từ tool nhập liệu
            </p>
            <p>
              3. Tiến trình: Là quá trình thực hiện công việc của nhân viên. Từ
              tiến trình ta biết được acc đang làm đến hạng mục nào, nếu suspend
              thì biết được suspend ở hạng mục nào, dùng để tạo báo cáo, phân
              loại acc
            </p>
            <p>
              4. Loại ebay: Là tổng quan 1 tài khoản ebay, dùng để tạo báo cáo,
              phân loại acc
            </p>
            <p>
              5. Trạng thái bán: Dùng để phân loại tài khoản của phòng kinh
              doanh
            </p>
            <p>6. Sở hữu: Dùng để phân quyền các phòng ban theo acc</p>
            <p>7. Nhân viên: Dùng để phân quyền nhân viên theo acc</p>
            <p>
              8. Trạng thái: Dùng để xác định trạng thái của acc, tạo báo cáo,
              phân loại acc
            </p>
            <p>
              9. Lớp ebay: Dùng để xác định tổng quan các hạng mục đã triển
              khai, dùng tạo báo cáo, phân loại acc
            </p>
            <p>
              10. Upload ảnh: Dùng để upload câu hỏi bảo mật, upload ảnh ebay
              suspended, tải cccd
            </p>
            <p>
              11. Click vào loại acc trong bảng THÔNG TIN TÀI NGUYÊN: chuyển đến
              trang chi tiết của tài nguyên đó
            </p>
            <br></br>
            <p>
              Tính năng: Khi chọn suspend + upload ảnh + Lớp nhỏ hơn 9 - tự động
              chuyển acc về lớp 20, tự động điền ngày suspend, tự động chọn
              suspended trong tiến trình,tự động thêm phòng phục hồi tài khoản,
              tự động disable tất cả các field{" "}
            </p>
            <p>
              Tính năng: Khi chọn suspend + upload ảnh + Lớp lớn hơn 8 - tự động
              chuyển acc về lớp 21, tự động điền ngày suspend, tự động chọn
              suspended trong tiến trình,tự động thêm phòng phục hồi tài khoản,
              tự động disable tất cả các field{" "}
            </p>
            <p>
              Khi chọn tiến trình thì tự động điền ngày tưng ứng với tiến trình
              được chọn, tự động điền ngày chuyển lớp khi chuyển lớp{" "}
            </p>
            <p>Khi ấn lưu - tự động ghi lại lịch sử: user|lớp cũ|ngày tháng</p>
            <p>
              Để tạo 1 acc ebay or etsy... trên 1 device thì vào device đó ấn
              tạo ebay or etsy...
            </p>
            <p>
              Để thay đổi field của nhiều acc 1 lúc, hoặc xem báo cáo cơ bản thì
              vào phần tool- xử lý số liệu - filter{" "}
            </p>
            <p>
              Thông tin tài nguyên: acc nào suspend thì icon chuyển về mầu xám
            </p>
            <br></br>
            <p>
              Ctrl + /;Shift + Alt + A (comment);Ctrl + Shift + [;Ctrl + K, Ctrl
              + 0;Ctrl + K, Ctrl + J;Ctrl + K, Ctrl + [;Ctrl + K, Ctrl + ];{" "}
            </p>
          </Tabs.TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default Ebay_table;
