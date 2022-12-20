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
import { getListshopeeActions } from "../../actions/shopeeActions";

const Shopee_table = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const { shopees } = useSelector((state) => state.shopee);
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
      dataIndex: "shopee_id",
      key: "shopee_id",
      render: (text, record) => (
        <a
          onClick={() =>
            history.push(`table/${encodeURIComponent(record.shopee_id)}`)
          }
        >
          {text}
        </a>
      ),
      sorter: (a, b) => {
        return a.shopee_id.localeCompare(b.shopee_id);
      },
    },
    {
      title: "TÀI KHOẢN",
      dataIndex: "shopee_user",
      key: "shopee_user",
      sorter: (a, b) => {
        return a.shopee_user.localeCompare(b.shopee_user);
      },
    },
    {
      title: "TIẾN TRÌNH",
      dataIndex: "shopee_processing",
      key: "shopee_processing",
      sorter: (a, b) => {
        return a.shopee_user.localeCompare(b.shopee_device);
      },
    },
    {
      title: "VẤN ĐỀ",
      dataIndex: "shopee_error",
      key: "shopee_error",
      sorter: (a, b) => {
        return a.shopee_user.localeCompare(b.shopee_class);
      },
    },

    {
      title: "NHÂN VIÊN",
      dataIndex: "shopee_employee",
      key: "shopee_employee",
      sorter: (a, b) => {
        return a.shopee_user.localeCompare(b.shopee_employee);
      },
    },

    {
      title: "GHI CHÚ",
      dataIndex: "shopee_note",
      key: "shopee_note",
      sorter: (a, b) => {
        return a.shopee_user.localeCompare(b.shopee_note);
      },
    },
  ];

  const handleChangeFilter = (values) => {
    let newValue = values.join(",");
    dispatch(
      getListshopeeActions({
        shopee_employee: newValue,
      })
    );
  };

  const getListShopee = () => {
    dispatch(
      getListshopeeActions({
        shopee_class: class_name,
      })
    );
  };

  useEffect(() => {
    getListShopee();
  }, [class_name]);

  return (
    <div>
      <Card>
      <Form.Item label="Lọc Shopee">
            <TreeSelect
                mode="multiple"
                onChange={handleChangeFilter}
                multiple
                optionLabelProp="label"
                treeData={[
                  {
                    title: "Lớp",
                    value: "shopee_class",
                    children: [
                      { title: "Lớp 1", value: "Lớp 1" },
                      { title: "Lớp 2", value: "Lớp 2" },
                    ],
                  },
                  {
                    title: "Thiết bị",
                    value: "shopee_device",
                    children: [
                      { title: "PC06", value: "PC06" },
                      { title: "PC07", value: "PC07" },
                    ],
                  },
                  {
                    title: "Nhân viên",
                    value: "shopee_employee",
                    children: [
                      { title: "Nguyễn Hoài", value: "Nguyễn Hoài" },
                      { title: "Khắc Liêm", value: "Khắc Liêm" },
                    ],
                  },
                ]}
              />
            </Form.Item>
        <Tabs defaultActiveKey="1">

          <Tabs.TabPane tab="BẢNG LỚP SHOPEE" key="1">
            
            <Card type="inner">
              <Table
                columns={columns}
                dataSource={shopees}
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
            <p>1. Shopee mã EB_12345</p>
            <p>
              1. Shopee được tạo từ tool - nhập liệu - Chọn SHOPEE, bảng bên cạnh
              nhập user|pass (user: là tên shop shopee chuẩn bị sẵn, có hướng dẫn
              tạo acc bên tool nhập liệu)
            </p>
            <p>
              2. Quy trình: là kế hoạch triển khai acc theo các yêu cầu định
              sẵn. Kế hoạch được tạo khi tạo mã Shopee từ tool nhập liệu
            </p>
            <p>
              3. Tiến trình: Là quá trình thực hiện công việc của nhân viên. Từ
              tiến trình ta biết được acc đang làm đến hạng mục nào, nếu suspend
              thì biết được suspend ở hạng mục nào, dùng để tạo báo cáo, phân
              loại acc
            </p>
            <p>
              4. Loại shopee: Là tổng quan 1 tài khoản shopee, dùng để tạo báo cáo,
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
              9. Lớp shopee: Dùng để xác định tổng quan các hạng mục đã triển
              khai, dùng tạo báo cáo, phân loại acc
            </p>
            <p>
              10. Upload ảnh: Dùng để upload câu hỏi bảo mật, upload ảnh shopee
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
              Để tạo 1 acc shopee or etsy... trên 1 device thì vào device đó ấn
              tạo shopee or etsy...
            </p>
            <p>
              Để thay đổi field của nhiều acc 1 lúc, hoặc xem báo cáo cơ bản thì
              vào phần tool- xử lý số liệu - filter{" "}
            </p>
            <p>
              Thông tin tài nguyên: acc nào suspend thì icon chuyển về mầu xám
            </p>
            <br></br>
           
          </Tabs.TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default Shopee_table;
