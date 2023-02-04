import icondevice from "../../assets/images/iconSocial/icondevice.jpg";
import iconproxy from "../../assets/images/iconSocial/iconproxy.jpg";
import iconinfo from "../../assets/images/iconSocial/iconinfo.png";
import iconmail from "../../assets/images/iconSocial/iconmail.png";
import iconsim from "../../assets/images/iconSocial/iconsim.jpg";
import iconbank from "../../assets/images/iconSocial/iconbank.jpg";
import iconebay from "../../assets/images/iconSocial/iconebay.jpg";
import iconetsy from "../../assets/images/iconSocial/iconetsy.png";
import iconamazon from "../../assets/images/iconSocial/iconamazon.png";
import iconshopee from "../../assets/images/iconSocial/iconshopee.png";
import iconfacebook from "../../assets/images/iconSocial/iconfacebook.png";
import icontiktok from "../../assets/images/iconSocial/icontiktok.png";
import iconpayoneer from "../../assets/images/iconSocial/iconpayoneer.png";
import iconpaypal from "../../assets/images/iconSocial/iconpaypal.png";
import iconpingpong from "../../assets/images/iconSocial/iconpingpong.jpg";
import iconcustomer from "../../assets/images/iconSocial/iconcustomer.png";
import React from "react";
import { Alert, Divider, Space } from "antd";

export const listselect_view_acc = [
  {
    title: "CUSTOMER",
    thumbnail: iconcustomer,
    value: "customer_id",
  },
  {
    title: "DEVICE",
    thumbnail: icondevice,
    value: "device_id",
  },
  {
    title: "PROXY",
    thumbnail: iconproxy,
    value: "proxy_id",
  },
  {
    title: "INFO",
    thumbnail: iconinfo,
    value: "info_id",
  },
  {
    title: "MAIL",
    thumbnail: iconmail,
    value: "mail_id",
  },
  {
    title: "SIM",
    thumbnail: iconsim,
    value: "sim_id",
  },
  {
    title: "BANK",
    thumbnail: iconbank,
    value: "bank_id",
  },
  {
    title: "PAYONEER",
    thumbnail: iconpayoneer,
    value: "payoneer_id",
  },
  {
    title: "PAYPAL",
    thumbnail: iconpaypal,
    value: "paypal_id",
  },
  {
    title: "PINGPONG",
    thumbnail: iconpingpong,
    value: "pingpong_id",
  },
  {
    title: "EBAY",
    thumbnail: iconebay,
    value: "ebay_id",
  },
  {
    title: "ETSY",
    thumbnail: iconetsy,
    value: "etsy_id",
  },
  {
    title: "AMAZON",
    thumbnail: iconamazon,
    value: "amazon_id",
  },
  {
    title: "SHOPEE",
    thumbnail: iconshopee,
    value: "shopee_id",
  },
  {
    title: "FACEBOOK",
    thumbnail: iconfacebook,
    value: "facebook_id",
  },
  {
    title: "TIKTOK",
    thumbnail: icontiktok,
    value: "tiktok_id",
  },
];

export const listselect_ebay_error = [
  "Xong",
  "Không login",
  "Sai pass",
  "Không về code",
  "Không thấy sim",
];

export const listselect_ebay_processing = [
  "Login Gmail",
  "Verify Gmail",
  "Buyer",
  "View",
  "Like",
  "Policies",
  "Verify address",
  "Verify phone",
  "Verify mail",
  "Verify Full",
  "Avatar",
  "Add to cart",
  "Seller",
  "Verify Bank",
  "Draft",
  "List",
  "Sold",
  "Move room",
  "Quảng cáo",
  "Above Standard",
  "Top Rate",
  "Restrict",
  "Suspended",
];

export const listselect_ebay_plan = [
  "Phone",
  "PC",
  "Antidetect",
  "Gologin",
  "VPS",
  "Windows 10",
  "Windows 11",
  "MAC",
  "Ubuntu",
  "Chrome",
  "Firefox",
  "Edge",
  "Safari",
  "USB 4G",
  "Sproxy 4G",
  "Proxy",
  "Info real",
  "Info gen",
  "Sim real",
  "Sim otp",
  "Bank real",
  "Bank gen",
  "Quy trình 1",
  "Quy trình 2",
  "Quy trình 3",
  "Quy trình 4",
  "Quy trình 5",
  "Quy trình 6",
  "Quy trình 7",
  "Quy trình 8",
  "Quy trình 9",
  "Quy trình 10",
  "Quy trình 11",
  "Quy trình 12",
];
export const listselect_ebay_block = [
  "Team 1",
  "Team 2",
  "Team 3",
  "Team 4",
  "Block 1",
  "Block 2",
  "Block 3",
  "Block 4",
  "Block 5",
  "Block 6",
  "Block 7",
  "Block 8",
  "Block 9",
  "Block 10",
  "Block 11",
  "Block 12",
  "Block 13",
  "Block 14",
  "Block 15",
  "Block 16",
  "Block 17",
  "Block 18",
  "Block 19",
  "Block 20",
  "Block 21",
  "Block 22",
  "Block 23",
  "Block 24",
  "Block 25",
];
export const listselect_ebay_type = [
  "VN",
  "US",
  "Buyer",
  "Kick Sold",
  "Seller",
  "Non Suspended",
  "Gỡ Suspended",
  "Above Standard",
  "Top Rate",
  "Bán acc",
  "Bán hàng",
];

export const listselect_ebay_sell_status = [
  "Đang thực hiện",
  "Đang chuẩn bị",
  "Đủ điều kiện bán",
  "Bán tài khoản",
  "Đang giao dịch",
  "Bán thành công",
  "Bảo hành",
  "Hết bảo hành",
];

export const listselect_ebay_owner = [
  "Phòng sản xuất",
  "Phòng phục hồi",
  "Phòng Kinh doanh",
  "Phòng nâng cấp",
  "Kho lưu trữ",
];

export const listselect_ebay_status = [
  "Null",
  "Live",
  "Active",
  "Error",
  "Restrict",
  "Suspended",
];

export const listselect_ebay_class = [
  {
    title: "Lớp 0",
    value: "Lớp 0",
  },
  {
    title: "Lớp 1 New",
    value: "Lớp 1",
  },
  {
    title: "Lớp 2",
    value: "Lớp 2",
  },
  {
    title: "Lớp 3",
    value: "Lớp 3",
  },
  {
    title: "Lớp 4",
    value: "Lớp 4",
  },
  {
    title: "Lớp 5",
    value: "Lớp 5",
  },
  {
    title: "Lớp 6",
    value: "Lớp 6",
  },
  {
    title: "Lớp 7",
    value: "Lớp 7",
  },
  {
    title: "Lớp 8",
    value: "Lớp 8",
  },
  {
    title: "Lớp 9 Seller",
    value: "Lớp 9",
  },
  {
    title: "Lớp 10 List",
    value: "Lớp 10",
  },
  {
    title: "Lớp 11 List",
    value: "Lớp 11",
  },
  {
    title: "Lớp 12 Chuyển",
    value: "Lớp 12",
  },
  {
    title: "Lớp 14",
    value: "Lớp 14",
  },
  {
    title: "Lớp 15",
    value: "Lớp 15",
  },
  {
    title: "Lớp 16",
    value: "Lớp 16",
  },
  {
    title: "Lớp 17",
    value: "Lớp 17",
  },
  {
    title: "Lớp 18",
    value: "Lớp 18",
  },
  {
    title: "Lớp 19",
    value: "Lớp 19",
  },
  {
    title: "Lớp 20 Error",
    value: "Lớp 20",
  },
  {
    title: "Lớp 21 Buyer Suspended",
    value: "Lớp 21",
  },
  {
    title: "Lớp 22 Buyer Suspended verify",
    value: "Lớp 22",
  },
  {
    title: "Lớp 23 Seller restrict",
    value: "Lớp 23",
  },
  {
    title: "Lớp 24 Seller restrict list",
    value: "Lớp 24",
  },
  {
    title: "Lớp 25 Seller restrict Sold",
    value: "Lớp 25",
  },
  {
    title: "Lớp 26 Seller Suspended",
    value: "Lớp 26",
  },
  {
    title: "Lớp 27 Seller Suspended list",
    value: "Lớp 27",
  },
  {
    title: "Lớp 28 Seller Suspended Sold",
    value: "Lớp 28",
  },
  {
    title: "Lớp 29",
    value: "Lớp 29",
  },
  {
    title: "Lớp 30",
    value: "Lớp 30",
  },
];

//  List danh sách các trường trong bảng DATE
export const tablelist_ebay_Date = [
  {
    title: "Ngày giao",
    value: "ebaydate_delivery",
  },
  {
    title: "Ngày chuyển lớp",
    value: "ebaydate_nextclass",
  },
  {
    title: "Ngày tạo",
    value: "ebaydate_start",
  },
  {
    title: "Ngày verify",
    value: "ebaydate_verify",
  },
  {
    title: "Ngày Seller",
    value: "ebaydate_seller",
  },
  {
    title: "Ngày verify Bank",
    value: "ebaydate_verifybank",
  },
  {
    title: "Ngày draft",
    value: "ebaydate_draft",
  },
  {
    title: "Ngày list1",
    value: "ebaydate_list1",
  },
  {
    title: "Ngày list2",
    value: "ebaydate_list2",
  },
  {
    title: "Ngày list3",
    value: "ebaydate_list3",
  },
  {
    title: "Ngày list4",
    value: "ebaydate_list4",
  },
  {
    title: "Ngày list5",
    value: "ebaydate_list5",
  },
  {
    title: "Ngày chuyển phòng",
    value: "ebaydate_moveroom",
  },

  {
    title: "Dự kiến seller",
    value: "ebaydate_calendarseller",
  },
  {
    title: "Dự kiến list 1",
    value: "ebaydate_calendarlist1",
  },
  {
    title: "Dự kiến list 2",
    value: "ebaydate_calendarlist2",
  },
  {
    title: "Dự kiến list 3",
    value: "ebaydate_calendarlist3",
  },
  {
    title: "Dự kiến list 4",
    value: "ebaydate_calendarlist4",
  },
  {
    title: "Dự kiến list 5",
    value: "ebaydate_calendarlist5",
  },
  {
    title: "Ngày error",
    value: "ebaydate_error",
  },
  {
    title: "Ngày restrict",
    value: "ebaydate_restrict",
  },
  {
    title: "Ngày Suspended",
    value: "ebaydate_suspended",
  },
  {
    title: "Ngày check",
    value: "ebaydate_checksus1",
  },
  {
    title: "Ngày check",
    value: "ebaydate_checksus2",
  },
  {
    title: "Ngày check",
    value: "ebaydate_checksus3",
  },
  {
    title: "Ngày gỡ sus 1",
    value: "ebaydate_contact1",
  },
  {
    title: "Ngày gỡ sus 2",
    value: "ebaydate_contact2",
  },
  {
    title: "Ngày gỡ sus 3",
    value: "ebaydate_contact3",
  },
  {
    title: "Ngày gỡ sus 4",
    value: "ebaydate_contact4",
  },
  {
    title: "Ngày gỡ sus 5",
    value: "ebaydate_contact5",
  },
];

export const listselect_ebay_fields = [];

export const HuongDanEbay_info = () => {
  return (
    <Space
      direction="vertical"
      style={{
        width: "100%",
      }}
    >
      <Alert
        message="Tổng quan"
        description={
          <>
            <p>1. 1 Bộ tài khoản sẽ cùng ID với nhau và liên kết với nhau</p>
            <p>2. Định dạng ngày tháng yyyy-mm-dd hh:mm</p>
          </>
        }
        type="success"
      />
      <Alert
        message="Hướng dẫn các trường"
        description={
          <>
            <p>
              1. 1 Bộ tài khoản bao gồm: Tài nguyên + phương thức thanh toán +
              các loại tài khoản
            </p>
            <p>
              2. id là mã của tài khoản, dùng để phân biết các tài khoản với
              nhau
            </p>
            <p>3. User là tên của tài khoản</p>
            <p>4. Pass là mật khẩu của tài khoản, 1 bộ tài khoản </p>

            <p>
              5. Quy trình: là kế hoạch triển khai tài khoản theo các yêu cầu
              định sẵn. Quy trình được tạo ngay từ đầu bằng Tooldata nhập liệu
            </p>
            <p>
              6. Tiến trình: Là quá trình thực hiện công việc của nhân viên. Từ
              tiến trình ta biết được tài khoản đang làm đến hạng mục nào, nếu
              suspend thì biết được suspend ở hạng mục nào, dùng để tạo báo cáo,
              phân loại tài khoản
            </p>
            <p>
              7. Loại ebay: Là tổng quan 1 tài khoản ebay, dùng để tạo báo cáo,
              phân loại tài khoản
            </p>
            <p>
              8. Trạng thái bán: Dùng để phân loại tài khoản của phòng kinh
              doanh
            </p>
            <p>9. Sở hữu: Dùng để phân quyền các phòng ban theo tài khoản</p>
            <p>10. Nhân viên: Dùng để phân quyền nhân viên theo tài khoản</p>
            <p>
              11. Trạng thái: Dùng để xác định trạng thái của tài khoản, tạo báo
              cáo, phân loại tài khoản
            </p>
            <p>
              12. Lớp ebay: Dùng để xác định tổng quan các hạng mục đã triển
              khai, dùng tạo báo cáo, phân loại tài khoản
            </p>
            <p>
              13. Upload ảnh: Dùng để upload câu hỏi bảo mật, upload ảnh tài
              khoản suspended, tải cccd, doc bank...Tên ảnh lưu cùng tên ID và
              thêm 2FA với câu hỏi bảo mật, Sus với suspended,..VD
              (3T1_555_2FA.JPG, 3T1_555_SUS.JPG)
            </p>
            <p>
              14. Click vào loại tài khoản trong bảng THÔNG TIN TÀI NGUYÊN:
              chuyển đến trang chi tiết của tài khoản đó
            </p>
            <br></br>
          </>
        }
        type="info"
      />
      <Alert
        message="Tính năng tự động "
        description={
          <>
            <p>1. Khi chọn trạng thái:</p>
            <p>
              - "error" : Tự động chuyển tài khoản về lớp 20, tự động điền ngày
              lỗi, tự động thêm người hỗ trợ và thêm phòng phục hồi
            </p>

            <p>
              - "Restrict " : Tự động chuyển tài khoản về lớp 23, tự động điền
              ngày Suspended, tự động thêm người hỗ trợ và thêm phòng phục hồi
            </p>
            <p>
              - "Suspended " : Tự động chuyển tài khoản về lớp 26, tự động điền
              ngày Suspended, tự động thêm người hỗ trợ và thêm phòng phục hồi
            </p>

            <p>
              2. Khi chọn lớp: Có các lớp tự động Lớp 4, Lớp 6, Lớp 9, Lớp 12 tự
              động điền ngày lên lớp và thêm các trường vào tiến trình
            </p>
            <p>
              3. Khi chọn tiến trình thì tự động điền ngày tưng ứng với tiến
              trình được chọn, tự động điền ngày chuyển lớp khi chuyển lớp
            </p>
            <p>
              4. Khi chọn lớp của Info trong bảng liên kết - Tự động thay đổi
              lớp của tài nguyên theo lớp Info
            </p>
            <p>
              5. Khi ấn lưu - tự động ghi lại lịch sử: user|lớp cũ|ngày tháng
            </p>
            <p>
              6. Tài khoản được tạo từ Tooldata (có hướng dẫn tạo tài khoản bên
              Tooldata nhập liệu)
            </p>
            <p>
              7.Để thay đổi field của nhiều tài khoản 1 lúc, hoặc xem báo cáo cơ
              bản thì vào phần Tooldata- xử lý số liệu - filter
            </p>
          </>
        }
        type="warning"
      />
      <Alert
        message="Kiểm tra & xử lý số liệu"
        description={
          <>
            <p>
              1. Kiểm tra tiến trình của tài khoản có phù hợp với lớp không?
            </p>
            <p>2. Kiểm tra và xử lý các phát sinh của tài khoản</p>
          </>
        }
        type="error"
      />
    </Space>
  );
};

export const HuongDanEbay_table = () => {
  return (
    <Space
      direction="vertical"
      style={{
        width: "100%",
      }}
    >
      <Alert
        message="ID"
        description={
          <>
            <p>1. 1 Bộ tài khoản sẽ cùng ID với nhau và liên kết với nhau</p>
            <p>2. ID nhân viên: VN_1 - VN_1000</p>
            <p>
              3. ID Theo tháng: 3T1_1 - 3T1_1000, 3T2_1 - 3T2_1000 (3 là năm,T1
              là tháng 1, tương tự với T2...)
            </p>
            <p>4. ID Tài nguyên cũ: E_12345 - E_99999</p>
          </>
        }
        type="success"
      />
      <Alert
        message="Checked & Previous page"
        description={
          <>
            <p>
              1. Chọn checked để thự hiện copy ID của tài khoản, phục vụ công
              tác xử lý số liệu trong bảng Tooldata
            </p>
            <p>
              2. Previous page chọn số lượng để hiển thị tài khoản theo số lượng
            </p>
          </>
        }
        type="info"
      />
      <Alert
        message="Phân quyền & Lọc "
        description={
          <>
            <p>
              1. Vị trí trưởng phòng trở lên có thể xem được tất cả các tài
              khoản của nhận viên
            </p>
            <p>2. Nhân viên chỉ xem được những tài khoản do mình quản lý</p>
            <p>3. Lọc sẽ lọc theo: ebay_id, eBay User, Quy trình,eBay block,Tiến trình,Phát sinh, Block và nhân viên ( đang phát triển)</p>
          </>
        }
        type="warning"
      />
      <Alert
        message="Kiểm tra & xử lý số liệu"
        description={
          <>
            <p>
              1. Kiểm tra tiến trình của tài khoản có phù hợp với lớp không?
            </p>
            <p>2. Kiểm tra và xử lý các phát sinh của tài khoản</p>
          </>
        }
        type="error"
      />
    </Space>
  );
};

export const HuongDanEbay_class = () => {
  return (
    <Space
      direction="vertical"
      style={{
        width: "100%",
      }}
    >
      <Alert
        message="Tổng quan"
        description={
          <>
            <p>1. 1 Bộ tài khoản sẽ cùng ID với nhau và liên kết với nhau</p>
            <p>2. Định dạng ngày tháng yyyy-mm-dd hh:mm</p>
          </>
        }
        type="success"
      />
      <Alert
        message="Hướng dẫn các trường"
        description={
          <>
            <p>
              1. 1 Bộ tài khoản bao gồm: Tài nguyên + phương thức thanh toán +
              các loại tài khoản
            </p>
            <p>
              2. id là mã của tài khoản, dùng để phân biết các tài khoản với
              nhau
            </p>
            <p>3. User là tên của tài khoản</p>
            <p>4. Pass là mật khẩu của tài khoản, 1 bộ tài khoản </p>

            <p>
              5. Quy trình: là kế hoạch triển khai tài khoản theo các yêu cầu
              định sẵn. Quy trình được tạo ngay từ đầu bằng Tooldata nhập liệu
            </p>
            <p>
              6. Tiến trình: Là quá trình thực hiện công việc của nhân viên. Từ
              tiến trình ta biết được tài khoản đang làm đến hạng mục nào, nếu
              suspend thì biết được suspend ở hạng mục nào, dùng để tạo báo cáo,
              phân loại tài khoản
            </p>
            <p>
              7. Loại ebay: Là tổng quan 1 tài khoản ebay, dùng để tạo báo cáo,
              phân loại tài khoản
            </p>
            <p>
              8. Trạng thái bán: Dùng để phân loại tài khoản của phòng kinh
              doanh
            </p>
            <p>9. Sở hữu: Dùng để phân quyền các phòng ban theo tài khoản</p>
            <p>10. Nhân viên: Dùng để phân quyền nhân viên theo tài khoản</p>
            <p>
              11. Trạng thái: Dùng để xác định trạng thái của tài khoản, tạo báo
              cáo, phân loại tài khoản
            </p>
            <p>
              12. Lớp ebay: Dùng để xác định tổng quan các hạng mục đã triển
              khai, dùng tạo báo cáo, phân loại tài khoản
            </p>
            <p>
              13. Upload ảnh: Dùng để upload câu hỏi bảo mật, upload ảnh tài
              khoản suspended, tải cccd, doc bank...Tên ảnh lưu cùng tên ID và
              thêm 2FA với câu hỏi bảo mật, Sus với suspended,..VD
              (3T1_555_2FA.JPG, 3T1_555_SUS.JPG)
            </p>
            <p>
              14. Click vào loại tài khoản trong bảng THÔNG TIN TÀI NGUYÊN:
              chuyển đến trang chi tiết của tài khoản đó
            </p>
            <br></br>
          </>
        }
        type="info"
      />
      <Alert
        message="Tính năng tự động "
        description={
          <>
            <p>1. Khi chọn trạng thái:</p>
            <p>
              - "error" : Tự động chuyển tài khoản về lớp 20, tự động điền ngày
              lỗi, tự động thêm người hỗ trợ và thêm phòng phục hồi
            </p>

            <p>
              - "Restrict " : Tự động chuyển tài khoản về lớp 23, tự động điền
              ngày Suspended, tự động thêm người hỗ trợ và thêm phòng phục hồi
            </p>
            <p>
              - "Suspended " : Tự động chuyển tài khoản về lớp 26, tự động điền
              ngày Suspended, tự động thêm người hỗ trợ và thêm phòng phục hồi
            </p>

            <p>
              2. Khi chọn lớp: Có các lớp tự động Lớp 4, Lớp 6, Lớp 9, Lớp 12 tự
              động điền ngày lên lớp và thêm các trường vào tiến trình
            </p>
            <p>
              3. Khi chọn tiến trình thì tự động điền ngày tưng ứng với tiến
              trình được chọn, tự động điền ngày chuyển lớp khi chuyển lớp
            </p>
            <p>
              4. Khi chọn lớp của Info trong bảng liên kết - Tự động thay đổi
              lớp của tài nguyên theo lớp Info
            </p>
            <p>
              5. Khi ấn lưu - tự động ghi lại lịch sử: user|lớp cũ|ngày tháng
            </p>
            <p>
              6. Tài khoản được tạo từ Tooldata (có hướng dẫn tạo tài khoản bên
              Tooldata nhập liệu)
            </p>
            <p>
              7. Để thay đổi field của nhiều tài khoản 1 lúc, hoặc xem báo cáo cơ
              bản thì vào phần Tooldata- xử lý số liệu - filter
            </p>
          </>
        }
        type="warning"
      />
      <Alert
        message="Kiểm tra & xử lý số liệu"
        description={
          <>
            <p>
              1. Kiểm tra tiến trình của tài khoản có phù hợp với lớp không?
            </p>
            <p>2. Kiểm tra và xử lý các phát sinh của tài khoản</p>
          </>
        }
        type="error"
      />
    </Space>
  );
};

const ContentEbay = () => (
  <>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne
      merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen,
      quo modo.
    </p>
    <Divider>Text</Divider>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne
      merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen,
      quo modo.
    </p>
    <Divider orientation="left">Left Text</Divider>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne
      merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen,
      quo modo.
    </p>
    <Divider orientation="right">Right Text</Divider>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne
      merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen,
      quo modo.
    </p>
    <Divider orientation="left" orientationMargin="0">
      Left Text with 0 orientationMargin
    </Divider>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne
      merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen,
      quo modo.
    </p>
    <Divider orientation="right" orientationMargin={50}>
      Right Text with 50px orientationMargin
    </Divider>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne
      merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen,
      quo modo.
    </p>
  </>
);
export default ContentEbay;
/*   const listTest1 = () => {
    let listTest = [];
    for (var i = 0; i < 10; i++) {
      listTest.push({
        title: "Ngày " + i,
        value: "Số " + i
      })
    }
    return listTest;
  };

  let a = listTest1();

  console.log(a.map());
  console.log('hahaha'); */
