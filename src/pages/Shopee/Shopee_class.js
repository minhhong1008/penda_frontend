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
import { getCountShopee } from "../../api/shopee/index";
const Shopee_class = () => {
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
            history.push(`shopee_class/table?class=${encodeURIComponent(text)}`)
          }
        >
          {text}
        </a>
      ),
    },
    {
      title: "TỔNG",
      dataIndex: "shopee_count",
      key: "shopee_count",
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
      shopee_count: "0",
      content_complete: "Đã đầy đủ tài nguyên",
      content_check: "Kiểm tra tài nguyên",
      content_action: "Reg mail, or login mail --> chuyển Lớp 2",
    },
    {
      key: "2",
      class: "Lớp 2",
      shopee_count: "0",
      content_complete: "Đã có mail",
      content_check: "Kiểm tra mail",
      content_action:
        "Change info mail, mail recover, mail forward, avatar, verify, bảo mật --> chuyển Lớp 3",
    },
    {
      key: "3",
      class: "Lớp 3",
      shopee_count: "0",
      content_complete: "Hoàn thành Mail",
      content_check: "Kiểm tra mail",
      content_action: "Tạo Buyer  --> Chuyển lớp 4",
    },
    {
      key: "4",
      class: "Lớp 4",
      shopee_count: "0",
      content_complete: "Đã có Buyer",
      content_check: "Kiểm tra mail, buyer",
      content_action:
        "Change avatar, add cart, add Like, add adress--> Chuyển lớp 5",
    },
    {
      key: "5",
      class: "Lớp 5",
      shopee_count: "0",
      content_complete:
        "tao mail  thay đổi thông tin infor ( họ tên, mk, mail kp)",
      content_check: "Thêm sdt, mail forword",
      content_action: "Thêm sdt, mail forword",
    },
    {
      key: "6",
      class: "Lớp 6",
      shopee_count: "0",
      content_complete:
        "tao mail  thay đổi thông tin infor ( họ tên, mk, mail kp)",
      content_check: "Thêm sdt, mail forword",
      content_action: "Thêm sdt, mail forword",
    },
    {
      key: "7",
      class: "Lớp 7",
      shopee_count: "0",
      content_complete:
        "tao mail  thay đổi thông tin infor ( họ tên, mk, mail kp)",
      content_check: "Thêm sdt, mail forword",
      content_action: "Thêm sdt, mail forword",
    },
    {
      key: "8",
      class: "Lớp 8",
      shopee_count: "0",
      content_complete:
        "tao mail  thay đổi thông tin infor ( họ tên, mk, mail kp)",
      content_check: "Thêm sdt, mail forword",
      content_action: "Thêm sdt, mail forword",
    },
    {
      key: "9",
      class: "Lớp 9",
      shopee_count: "0",
      content_complete:
        "tao mail  thay đổi thông tin infor ( họ tên, mk, mail kp)",
      content_check: "Thêm sdt, mail forword",
      content_action: "Thêm sdt, mail forword",
    },
    {
      key: "10",
      class: "Lớp 10",
      shopee_count: "0",
      content_complete: (
        <div>
          tao mail thay đổi thông tin infor ( họ tên, mk, mail kp) tao mail thay
          đổi thông tin infor <br></br> ( họ tên, mk, mail kp) tao mail thay đổi
          thông tin infor ( họ tên, mk, mail kp)
        </div>
      ),
      content_check: (
        <div>
          Thêm sdt, <br></br> mail forword
        </div>
      ),
      content_action: "Thêm sdt, mail forword",
    },
    {
      key: "11",
      class: "Lớp 11",
      shopee_count: "0",
      content_complete:
        "tao mail  thay đổi thông tin infor ( họ tên, mk, mail kp)",
      content_check: "Thêm sdt, mail forword",
      content_action: "Thêm sdt, mail forword",
    },
    {
      key: "12",
      class: "Lớp 12",
      shopee_count: "0",
      content_complete:
        "tao mail  thay đổi thông tin infor ( họ tên, mk, mail kp)",
      content_check: "Thêm sdt, mail forword",
      content_action: "Thêm sdt, mail forword",
    },
    {
      key: "13",
      class: "Lớp 13",
      shopee_count: "0",
      content_complete:
        "tao mail  thay đổi thông tin infor ( họ tên, mk, mail kp)",
      content_check: "Thêm sdt, mail forword",
      content_action: "Thêm sdt, mail forword",
    },
    {
      key: "14",
      class: "Lớp 14",
      shopee_count: "0",
      content_complete:
        "tao mail  thay đổi thông tin infor ( họ tên, mk, mail kp)",
      content_check: "Thêm sdt, mail forword",
      content_action: "Thêm sdt, mail forword",
    },
    {
      key: "15",
      class: "Lớp 15",
      shopee_count: "0",
      content_complete:
        "tao mail  thay đổi thông tin infor ( họ tên, mk, mail kp)",
      content_check: "Thêm sdt, mail forword",
      content_action: "Thêm sdt, mail forword",
    },
    {
      key: "16",
      class: "Lớp 16",
      shopee_count: "0",
      content_complete:
        "tao mail  thay đổi thông tin infor ( họ tên, mk, mail kp)",
      content_check: "Thêm sdt, mail forword",
      content_action: "Thêm sdt, mail forword",
    },
    {
      key: "17",
      class: "Lớp 17",
      shopee_count: "0",
      content_complete:
        "tao mail  thay đổi thông tin infor ( họ tên, mk, mail kp)",
      content_check: "Thêm sdt, mail forword",
      content_action: "Thêm sdt, mail forword",
    },
    {
      key: "18",
      class: "Lớp 18",
      shopee_count: "0",
      content_complete:
        "tao mail  thay đổi thông tin infor ( họ tên, mk, mail kp)",
      content_check: "Thêm sdt, mail forword",
      content_action: "Thêm sdt, mail forword",
    },
    {
      key: "19",
      class: "Lớp 19",
      shopee_count: "0",
      content_complete:
        "tao mail  thay đổi thông tin infor ( họ tên, mk, mail kp)",
      content_check: "Thêm sdt, mail forword",
      content_action: "Thêm sdt, mail forword",
    },
    {
      key: "20",
      class: "Lớp 20",
      shopee_count: "0",
      content_complete:
        "tao mail  thay đổi thông tin infor ( họ tên, mk, mail kp)",
      content_check: "Thêm sdt, mail forword",
      content_action: "Thêm sdt, mail forword",
    },
    {
      key: "21",
      class: "Lớp 21",
      shopee_count: "0",
      content_complete:
        "tao mail  thay đổi thông tin infor ( họ tên, mk, mail kp)",
      content_check: "Thêm sdt, mail forword",
      content_action: "Thêm sdt, mail forword",
    },
    {
      key: "22",
      class: "Lớp 22",
      shopee_count: "0",
      content_complete:
        "tao mail  thay đổi thông tin infor ( họ tên, mk, mail kp)",
      content_check: "Thêm sdt, mail forword",
      content_action: "Thêm sdt, mail forword",
    },
    {
      key: "23",
      class: "Lớp 23",
      shopee_count: "0",
      content_complete:
        "tao mail  thay đổi thông tin infor ( họ tên, mk, mail kp)",
      content_check: "Thêm sdt, mail forword",
      content_action: "Thêm sdt, mail forword",
    },
    {
      key: "24",
      class: "Lớp 24",
      shopee_count: "0",
      content_complete:
        "tao mail  thay đổi thông tin infor ( họ tên, mk, mail kp)",
      content_check: "Thêm sdt, mail forword",
      content_action: "Thêm sdt, mail forword",
    },
    {
      key: "25",
      class: "Lớp 25",
      shopee_count: "0",
      content_complete:
        "tao mail  thay đổi thông tin infor ( họ tên, mk, mail kp)",
      content_check: "Thêm sdt, mail forword",
      content_action: "Thêm sdt, mail forword",
    },
    {
      key: "26",
      class: "Lớp 26",
      shopee_count: "0",
      content_complete:
        "tao mail  thay đổi thông tin infor ( họ tên, mk, mail kp)",
      content_check: "Thêm sdt, mail forword",
      content_action: "Thêm sdt, mail forword",
    },
    {
      key: "27",
      class: "Lớp 27",
      shopee_count: "0",
      content_complete:
        "tao mail  thay đổi thông tin infor ( họ tên, mk, mail kp)",
      content_check: "Thêm sdt, mail forword",
      content_action: "Thêm sdt, mail forword",
    },
    {
      key: "28",
      class: "Lớp 28",
      shopee_count: "0",
      content_complete:
        "tao mail  thay đổi thông tin infor ( họ tên, mk, mail kp)",
      content_check: "Thêm sdt, mail forword",
      content_action: "Thêm sdt, mail forword",
    },
    {
      key: "29",
      class: "Lớp 29",
      shopee_count: "0",
      content_complete:
        "tao mail  thay đổi thông tin infor ( họ tên, mk, mail kp)",
      content_check: "Thêm sdt, mail forword",
      content_action: "Thêm sdt, mail forword",
    },
    {
      key: "30",
      class: "Lớp 30",
      shopee_count: "0",
      content_complete:
        "tao mail  thay đổi thông tin infor ( họ tên, mk, mail kp)",
      content_check: "Thêm sdt, mail forword",
      content_action: "Thêm sdt, mail forword",
    },
  ];

  const [dataClass, setDataClass] = useState();

  const countShopee = async () => {
    let { data } = await getCountShopee();
    baseData.forEach((item) => {
      data?.data?.forEach((data) => {
        if (data._id == item.class) {
          item.shopee_count = data.count.toString();
        }
      });
    });
    setDataClass(baseData);
  };

  const onChange = (key) => {
    console.log(key);
  };

  useEffect(() => {
    countShopee();
  }, []);

  return (
    <div>
      <Card>
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="BẢNG TÀI KHOẢN THEO LỚP EBAY" key="1">
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
          </Tabs.TabPane>
          <Tabs.TabPane tab="HƯỚNG DẪN" key="2">
          <p>1. Shopee mã EB_12345</p>
          <p>
            1. Shopee được tạo từ tool - nhập liệu - Chọn EBAY, bảng bên cạnh nhập
            user|pass (user: là tên shop shopee chuẩn bị sẵn, có hướng dẫn tạo acc
            bên tool nhập liệu)
          </p>
          <p>
            2. Quy trình: là kế hoạch triển khai acc theo các yêu cầu định sẵn.
            Kế hoạch được tạo khi tạo mã Shopee từ tool nhập liệu
          </p>
          <p>
            3. Tiến trình: Là quá trình thực hiện công việc của nhân viên. Từ
            tiến trình ta biết được acc đang làm đến hạng mục nào, nếu suspend
            thì biết được suspend ở hạng mục nào, dùng để tạo báo cáo, phân loại
            acc
          </p>
          <p>
            4. Loại shopee: Là tổng quan 1 tài khoản shopee, dùng để tạo báo cáo,
            phân loại acc
          </p>
          <p>
            5. Trạng thái bán: Dùng để phân loại tài khoản của phòng kinh doanh
          </p>
          <p>6. Sở hữu: Dùng để phân quyền các phòng ban theo acc</p>
          <p>7. Nhân viên: Dùng để phân quyền nhân viên theo acc</p>
          <p>
            8. Trạng thái: Dùng để xác định trạng thái của acc, tạo báo cáo,
            phân loại acc
          </p>
          <p>
            9. Lớp shopee: Dùng để xác định tổng quan các hạng mục đã triển khai,
            dùng tạo báo cáo, phân loại acc
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
            suspended trong tiến trình,tự động thêm phòng phục hồi tài khoản, tự
            động disable tất cả các field{" "}
          </p>
          <p>
            Tính năng: Khi chọn suspend + upload ảnh + Lớp lớn hơn 8 - tự động
            chuyển acc về lớp 21, tự động điền ngày suspend, tự động chọn
            suspended trong tiến trình,tự động thêm phòng phục hồi tài khoản, tự
            động disable tất cả các field{" "}
          </p>
          <p>
            Khi chọn tiến trình thì tự động điền ngày tưng ứng với tiến trình
            được chọn, tự động điền ngày chuyển lớp khi chuyển lớp{" "}
          </p>
          <p>Khi ấn lưu - tự động ghi lại lịch sử: user|lớp cũ|ngày tháng</p>
          <p>
            Để tạo 1 acc shopee or etsy... trên 1 device thì vào device đó ấn tạo
            shopee or etsy...
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
            Ctrl + /;Shift + Alt + A (comment);Ctrl + Shift + [;Ctrl + K, Ctrl +
            0;Ctrl + K, Ctrl + J;Ctrl + K, Ctrl + [;Ctrl + K, Ctrl + ];{" "}
          </p>
          </Tabs.TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default Shopee_class;
