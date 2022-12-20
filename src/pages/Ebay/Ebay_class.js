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
import { getCountEbay } from "../../api/ebay/index";
const Ebay_class = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const columns = [
    {
      title: (
        <div>
          <strong>LỚP</strong>
        </div>
      ),
      dataIndex: "class",
      key: "class",
      render: (text) => (
        <a
          onClick={() =>
            history.push(`ebay_class/table?class=${encodeURIComponent(text)}`)
          }
        >
          {text}
        </a>
      ),
    },
    {
      title: (
        <div>
          <strong>TỔNG</strong>
        </div>
      ),
      dataIndex: "ebay_count",
      key: "ebay_count",
    },
    {
      title: (
        <div>
          <strong>ĐÃ HOÀN THÀNH</strong>
        </div>
      ),
      dataIndex: "content_complete",
      key: "content_complete",
    },
    {
      title: (
        <div>
          <strong>THỜI GIAN</strong>
        </div>
      ),
      dataIndex: "content_time",
      key: "content_time",
    },
    {
      title: (
        <div>
          <strong>CẦN KIỂM TRA & XỬ LÝ</strong>
        </div>
      ),
      dataIndex: "content_check",
      key: "content_check",
    },
    {
      title: (
        <div>
          <strong>CẦN THỰC HIỆN</strong>
        </div>
      ),
      dataIndex: "content_action",
      key: "content_action",
    },
  ];
  const baseData = [
    {
      key: "1",
      class: "Lớp 1",
      ebay_count: "0",
      content_complete: (
        <div>
          <strong>ĐÃ CÓ TÀI NGUYÊN</strong>
          <br></br> Device, brower, info, mail, sim, bank..
        </div>
      ),
      content_time: <div>1 ngày</div>,
      content_check: (
        <div>
          <strong>Kiểm tra tài nguyên</strong>
          <br></br> Liên hệ quản lý
        </div>
      ),
      content_action: (
        <div>
          <strong>Reg mail, or login mail, xử lý tài nguyên</strong>
          <br></br> Chuyển Lớp 2
        </div>
      ),
    },
    {
      key: "2",
      class: "Lớp 2",
      ebay_count: "0",
      content_complete: "Đã có mail",
      content_time: <div>1 - 3 ngày</div>,
      content_check: (
        <div>
          <strong>Kiểm tra mail die</strong>
          <br></br> Reg lại mail
        </div>
      ),
      content_action: (
        <div>
          <strong>
            Change info mail, tạo payoneer, paypal, xử lý tài nguyên
          </strong>
          <br></br>Mail recover, mail forward, avatar, verify, bảo mật, view
          <br></br> Chuyển Lớp 3
        </div>
      ),
    },
    {
      key: "3",
      class: "Lớp 3",
      ebay_count: "0",
      content_complete: "Đã change info mail, đã đầy đủ tài nguyên",
      content_time: <div>1 ngày</div>,
      content_check: (
        <div>
          <strong>Kiểm tra mail die</strong>
          <br></br> Reg lại mail
        </div>
      ),
      content_action: (
        <div>
          <strong>Tạo Buyer, mail forward</strong>
          <br></br>mail recover, avatar, verify, bảo mật
          <br></br> Chuyển lớp 4
        </div>
      ),
    },
    {
      key: "4",
      class: "Lớp 4",
      ebay_count: "0",
      content_complete: (
        <div>
          <strong> ĐÃ TẠO BUYER</strong>
        </div>
      ),
      content_check: "Kiểm tra mail, buyer",
      content_time: <div>1 ngày</div>,
      content_action: (
        <div>
          <strong>mail recover, avatar, verify, bảo mật</strong>
          <br></br>Change avatar, add cart, add Like, add adress
          <br></br> Chuyển lớp 5
        </div>
      ),
    },
    {
      key: "5",
      class: "Lớp 5",
      ebay_count: "0",
      content_complete: "Mail hoàn thành",
      content_time: <div>1 - 5 ngày</div>,
      content_check: "Check mail, ebay buyer, payoneer",
      content_action: (
        <div>
          <strong>Verify buyer, verify payoneer, paypal</strong>
          <br></br>Change avatar, add cart, add Like, add adress
          <br></br> Chuyển lớp 6
        </div>
      ),
    },
    {
      key: "6",
      class: "Lớp 6",
      ebay_count: "0",
      content_complete: (
        <div>
          <strong> Đã verify buyer, payoneer,paypal</strong>
        </div>
      ),
      content_time: <div>1 ngày</div>,
      content_check: "Check lại toàn bộ",
      content_action: (
        <div>
          <strong>Change avatar, add cart, add Like, policies</strong>
          <br></br>Change avatar, add cart, add Like, add adress
          <br></br> Chuyển lớp 7
        </div>
      ),
    },
    {
      key: "7",
      class: "Lớp 7",
      ebay_count: "0",
      content_complete: "Đủ điều kiện lên seller, chuẩn bị sản phẩm...",
      content_time: <div>1 - 2 ngày</div>,
      content_check: "Kiểm tra toàn diện",
      content_action: (
        <div>
          <strong>Lên lịch seller, lên lịch list</strong>
          <br></br>Chuẩn bị sản phẩm, bank, card, sim...
          <br></br> Chuyển lớp 8
        </div>
      ),
    },
    {
      key: "8",
      class: "Lớp 8",
      ebay_count: "0",
      content_complete: "Đã đầy đủ điều kiến lên seller",
      content_time: <div>1 ngày</div>,
      content_check: "Check",
      content_action: (
        <div>
          <strong>Lên seller</strong>
          <br></br> Tạo drap
          <br></br> Chuyển lớp 9
        </div>
      ),
    },
    {
      key: "9",
      class: "Lớp 9",
      ebay_count: "0",
      content_complete: (
        <div>
          <strong> ĐÃ LÊN SELLER</strong>
        </div>
      ),
      content_time: <div>1 ngày</div>,
      content_check: "Kiểm tra",
      content_action:<div>
      <strong> Verify full...</strong> <br></br> Tạo drap<br></br>Chuyển Lớp 10
    </div>,
    },
    {
      key: "10",
      class: "Lớp 10",
      ebay_count: "0",
      content_complete: <div>Đầy đủ điều kiện list</div>,
      content_time: <div>1-10 ngày</div>,
      content_check: (
        <div>
          Kiểm tra bảo mật <br></br> Mail forword
        </div>
      ),
      content_action: (
        <div>
          <strong> List sản phẩm</strong> <br></br> Tạo drap<br></br>Chuyển Lớp 11
        </div>
      ),
    },
    {
      key: "11",
      class: "Lớp 11",
      ebay_count: "0",
      content_complete: (
        <div>
          <strong> List sản phẩm</strong> <br></br> Tạo drap
        </div>
      ),
      content_time: <div>1-15 ngày</div>,
      content_check: (
        <div>
          Kiểm tra bảo mật <br></br> Mail forword
        </div>
      ),
      content_action: (
        <div>
          <strong> List sản phẩm</strong>
          <br></br> Tạo drap<br></br>Chuyển Lớp 12
        </div>
      ),
    },
    {
      key: "12",
      class: "Lớp 12",
      ebay_count: "0",
      content_complete: <div>
      <strong> CHUYỂN PHÒNG</strong>
      
    </div>,
      content_time: <div>1 ngày</div>,
      content_check: "",
      content_action: (
        <div>
          <strong>Chuyển tài khoản về phòng kinh doanh</strong>
          <br></br>
          <br></br>Chuyển Lớp 14
        </div>
      ),
    },
    {
      key: "14",
      class: "Lớp 14",
      ebay_count: "0",
      content_complete: "",
      content_time: <div>1 ngày</div>,
      content_check: "",
      content_action: (
        <div>
          <strong>
            Giao nhận tài khoản giữu phòng sản xuất và phòng kinh doanh
          </strong>
          <br></br> Giao nhân viên phòng kinh doanh
          <br></br>Chuyển Lớp 15
        </div>
      ),
    },
    {
      key: "15",
      class: "Lớp 15",
      ebay_count: "0",
      content_complete: "",
      content_time: <div>1 ngày</div>,
      content_check: "",
      content_action:
        "Xử lý vấn đề tài khoản giữ phòng kinh doanh và phòng sản xuất",
    },
    {
      key: "16",
      class: "Lớp 16",
      ebay_count: "0",
      content_complete: "",
      content_time: <div>1 ngày</div>,
      content_check: "",
      content_action: "Bảo mật tài khoản của phòng kinh doanh",
    },
    {
      key: "17",
      class: "Lớp 17",
      ebay_count: "0",
      content_complete: "",
      content_time: <div>1 ngày</div>,
      content_check: "",
      content_action: "",
    },
    {
      key: "18",
      class: "Lớp 18",
      ebay_count: "0",
      content_complete: "",
      content_time: <div>1 - 15 ngày</div>,
      content_check: "",
      content_action: "Bán tài khoản, or chuyển tài khoản sang phòng nâng cấp",
    },
    {
      key: "19",
      class: "Lớp 19",
      ebay_count: "0",
      content_complete: (
        <div>
          <strong> ĐÃ BÁN TÀI KHOẢN</strong>
        </div>
      ),
      content_check: (
        <div>
          <strong> ĐÃ BÁN TÀI KHOẢN</strong>
        </div>
      ),
      content_action: "Chuyển tài khoản sang phòng bảo hành",
    },
    {
      key: "20",
      class: "Lớp 20",
      ebay_count: "0",
      content_complete: (
        <div>
          <strong> ERROR</strong>
        </div>
      ),
      content_time: <div>1 - 2 ngày</div>,
      content_check: "Kiểm tra lỗi",
      content_action: "Kiểm tra lỗi và chuyển tài khoản về lớp cũ",
    },
    {
      key: "21",
      class: "Lớp 21",
      ebay_count: "0",
      content_complete: (
        <div>
          <strong> BUYER SUSPENDED</strong>
        </div>
      ),
      content_check: "",
      content_action: "",
    },
    {
      key: "22",
      class: "Lớp 22",
      ebay_count: "0",
      content_complete: "BUYER SUSPENDED VERIFY",
      content_check: "",
      content_action: "",
    },
    {
      key: "23",
      class: "Lớp 23",
      ebay_count: "0",
      content_complete: (
        <div>
          <strong> SELLER RESTRICT</strong>
        </div>
      ),
      content_check: "",
      content_action: "",
    },
    {
      key: "24",
      class: "Lớp 24",
      ebay_count: "0",
      content_complete: "SELLER RESTRICT LIST",
      content_check: "",
      content_action: "",
    },
    {
      key: "25",
      class: "Lớp 25",
      ebay_count: "0",
      content_complete: "SELLER RESTRICT SOLD",
      content_check: "",
      content_action: "",
    },
    {
      key: "26",
      class: "Lớp 26",
      ebay_count: "0",
      content_complete: (
        <div>
          <strong> SELLER SUSPENDED</strong>
        </div>
      ),
      content_check: "",
      content_action: "",
    },
    {
      key: "27",
      class: "Lớp 27",
      ebay_count: "0",
      content_complete: "SELLER SUSPENDED LIST",
      content_check: "",
      content_action: "",
    },
    {
      key: "28",
      class: "Lớp 28",
      ebay_count: "0",
      content_complete: "SELLER SUSPENDED SOLD",
      content_check: "",
      content_action: "",
    },
    {
      key: "29",
      class: "Lớp 29",
      ebay_count: "0",
      content_complete: "",
      content_check: "",
      content_action: "",
    },
    {
      key: "30",
      class: "Lớp 30",
      ebay_count: "0",
      content_complete: "",
      content_check: "",
      content_action: "",
    },
  ];

  const [dataClass, setDataClass] = useState();

  const countEbay = async () => {
    let { data } = await getCountEbay();
    baseData.forEach((item) => {
      data?.data?.forEach((data) => {
        if (data._id == item.class) {
          item.ebay_count = data.count.toString();
        }
      });
    });
    setDataClass(baseData);
  };

  const onChange = (key) => {
    console.log(key);
  };

  useEffect(() => {
    countEbay();
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
              tự động disable tất cả các
            </p>
            <p>
              Tính năng: Khi chọn suspend + upload ảnh + Lớp lớn hơn 8 - tự động
              chuyển acc về lớp 21, tự động điền ngày suspend, tự động chọn
              suspended trong tiến trình,tự động thêm phòng phục hồi tài khoản,
              tự động disable tất cả các
            </p>
            <p>
              Khi chọn tiến trình thì tự động điền ngày tưng ứng với tiến trình
              được chọn, tự động điền ngày chuyển lớp khi chuy
            </p>
            <p>Khi ấn lưu - tự động ghi lại lịch sử: user|lớp cũ|ngày tháng</p>
            <p>
              Để tạo 1 acc ebay or etsy... trên 1 device thì vào device đó ấn
              tạo ebay or etsy...
            </p>
            <p>
              Để thay đổi field của nhiều acc 1 lúc, hoặc xem báo cáo cơ bản thì
              vào phần tool- xử lý số liệu - 
            </p>
            <p>
              Thông tin tài nguyên: acc nào suspend thì icon chuyển về mầu xám
            </p>
            <br></br>
            <p>
              Ctrl + /;Shift + Alt + A (comment);Ctrl + Shift + [;Ctrl + K, Ctrl
              + 0;Ctrl + K, Ctrl + J;Ctrl + K, Ctrl + [;Ctrl + K, Ctr
            </p>
          </Tabs.TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default Ebay_class;
